'use client';

import { Button, Card, Flex, Tabs, TextInput, Text, Input } from '@mantine/core';
import { IconBook, IconPhoto, IconLink } from '@tabler/icons-react';
import { IoChatbox } from 'react-icons/io5';
import { useState, useTransition } from 'react';
import { FilePondFile } from 'filepond';
import { useParams } from 'next/navigation';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { TextEditor } from '@/features/text-editor';
import { ImageDropzone } from '@/features/image-dropzone';
import { CommunitySelect } from './community-select';
import { Database } from '@/lib/database';
import { removeTags } from '@/utils/remove-tags';
import { createPost } from '../api/create-post';
import { uploadImages } from '../api/upload-images';

type NewPostFormProps = {
  spaceId?: string;
  spaces: Database['public']['Tables']['community']['Row'][] | [];
};

export function NewPostForm({ spaceId, spaces }: NewPostFormProps) {
  const [textContent, setTextContent] = useState('');
  const [textContentError, setTextContentError] = useState<string | null>(null);

  const [images, setImages] = useState<FilePondFile[]>([]);
  const [imagesError, setImagesError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const params = useParams();

  // Initialize form
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: { title: '', link: '', details: '' },
    validate: {
      title: (value) => (value.length < 5 ? 'Title must be at lest 5 letters long' : null),
      link: (value) => {
        // Regular expression to validate URLs
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return urlPattern.test(value)
          ? null
          : 'Invalid URL. link should be formatted like https://www.example.com';
      },
      details: (value) => (value.length < 10 ? 'Details must be at lest 10 letters long' : null),
    },
  });

  // Create a new post if there are no form errors
  async function handleCreatePost(type: 'text' | 'link' | 'image' | 'chain') {
    const communityId = params.spaceId as string;
    const communityName = params.spaceName as string;
    const { title } = form.values;
    let content = null;
    if (type === 'text') {
      content = textContent;
    }
    if (type === 'link') {
      content = form.values.link;
    }
    if (type === 'chain') {
      content = form.values.details;
    }

    startTransition(async () => {
      const postId = await createPost({
        communityId,
        communityName,
        title,
        content,
        type,
      });
      if (type === 'image') {
        uploadImages(images, postId);
      }
      notifications.show({ message: 'Your post has been created!' });
    });
  }

  // Validate text form
  const handleTextError = (errors: typeof form.errors) => {
    const sanitizedText = removeTags(textContent) || '';
    if (sanitizedText.length < 10) {
      setTextContentError('Please add at least one image');
    }
    if (errors.title) {
      notifications.show({ message: 'Please fill title field', color: 'red' });
    } else if (sanitizedText.length === 0) {
      notifications.show({ message: 'Content does not meet minimum text length.', color: 'red' });
    } else {
      handleCreatePost('text');
    }
  };

  // Validate link form
  const handleLinkError = (errors: typeof form.errors) => {
    if (errors.title) {
      notifications.show({ message: 'Please fill title field', color: 'red' });
    } else if (errors.link) {
      notifications.show({ message: 'Please provide a valid URL', color: 'red' });
    } else {
      handleCreatePost('link');
    }
  };

  // Validate image form
  const handleImagesError = (errors: typeof form.errors) => {
    if (images.length === 0) {
      setImagesError('Please add at least one image');
    }
    if (errors.title) {
      notifications.show({ message: 'Please fill title field', color: 'red' });
    } else if (images.length === 0) {
      notifications.show({ message: 'Please add at least one image', color: 'red' });
    } else {
      handleCreatePost('image');
    }
  };

  // Validate chain form
  const handleChainError = (errors: typeof form.errors) => {
    if (errors.title) {
      notifications.show({ message: 'Please fill title field', color: 'red' });
    } else if (errors.details) {
      notifications.show({ message: 'Please provide detailsL', color: 'red' });
    } else {
      handleCreatePost('chain');
    }
  };

  return (
    <Card withBorder maw={792} mx="auto">
      <Tabs defaultValue="text">
        <Tabs.List grow>
          <Tabs.Tab value="text" leftSection={<IconBook />}>
            Text
          </Tabs.Tab>
          <Tabs.Tab value="link" leftSection={<IconLink />}>
            Link
          </Tabs.Tab>
          <Tabs.Tab value="images" leftSection={<IconPhoto />}>
            Images
          </Tabs.Tab>
          <Tabs.Tab value="chain" leftSection={<IoChatbox size={18} />}>
            Chain
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel pt="lg" value="text">
          <CommunitySelect spaces={spaces} spaceId={spaceId} />
          <form onSubmit={form.onSubmit(console.log, handleTextError)}>
            <TextInput
              className="mt-4"
              label="Title"
              placeholder="Title"
              {...form.getInputProps('title')}
            />
            <Input.Label className="mt-6">Text Content</Input.Label>
            <TextEditor content={textContent} setContent={setTextContent} />
            <Text size="xs" c="red">
              {textContentError}
            </Text>

            <Flex justify="flex-end" mt="sm">
              <Button
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
                type="submit"
                mt="sm"
                loading={isPending}
              >
                Create
              </Button>
            </Flex>
          </form>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="link">
          <CommunitySelect spaces={spaces} spaceId={spaceId} />
          <form onSubmit={form.onSubmit(console.log, handleLinkError)}>
            <TextInput
              className="mt-4"
              label="Title"
              placeholder="Title"
              {...form.getInputProps('title')}
            />
            <TextInput
              className="mt-6"
              label="Url"
              placeholder="Url Path"
              {...form.getInputProps('link')}
            />
            <Flex justify="flex-end" mt="sm">
              <Button
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
                type="submit"
                mt="sm"
                loading={isPending}
              >
                Create
              </Button>
            </Flex>
          </form>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="images">
          <CommunitySelect spaces={spaces} spaceId={spaceId} />
          <form onSubmit={form.onSubmit(console.log, handleImagesError)}>
            <TextInput
              className="mt-4 "
              label="Title"
              placeholder="Post Title"
              {...form.getInputProps('title')}
            />
            <Input.Label className="mt-6">Images</Input.Label>
            <ImageDropzone files={images} setFiles={setImages} />
            <Text size="xs" c="red">
              {imagesError}
            </Text>
            <Flex justify="flex-end" mt="sm">
              <Button
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
                type="submit"
                mt="sm"
                loading={isPending}
              >
                Create
              </Button>
            </Flex>
          </form>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="chain">
          <CommunitySelect spaces={spaces} spaceId={spaceId} />
          <form onSubmit={form.onSubmit(console.log, handleChainError)}>
            <TextInput
              className="mt-4"
              label="Title"
              placeholder="Title"
              {...form.getInputProps('title')}
            />
            <TextInput
              className="mt-6"
              label="Details"
              placeholder="Url Path"
              {...form.getInputProps('details')}
            />
            <Flex justify="flex-end" mt="sm">
              <Button
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
                type="submit"
                mt="sm"
                loading={isPending}
              >
                Create
              </Button>
            </Flex>
          </form>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

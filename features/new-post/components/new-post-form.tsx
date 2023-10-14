'use client';

import { Button, Card, Flex, Stack, Tabs, TextInput, Text } from '@mantine/core';
import { IconBook, IconPhoto, IconLink } from '@tabler/icons-react';
import { useEffect, useState, useTransition } from 'react';
import { FilePondFile } from 'filepond';
import { redirect, useParams } from 'next/navigation';
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
  const [textContent, setTextContent] = useState('test');
  const [images, setImages] = useState<FilePondFile[]>([]);
  const [isPending, startTransition] = useTransition();
  const [imagesError, setImagesError] = useState<string | null>(null);

  const sanitizedText = removeTags(textContent) || '';

  const params = useParams();

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: { title: '', textContent: '', link: '' },
    validate: {
      title: (value) => (value.length < 5 ? 'Title must be at lest 5 letters long' : null),
      textContent: (value) =>
        value.length < 10 ? 'Content must be at least 10 characters long' : null,
      link: (value) => {
        // Regular expression to validate URLs
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return urlPattern.test(value)
          ? null
          : 'Invalid URL. link should be formatted like https://www.example.com';
      },
    },
  });

  useEffect(() => {
    form.setFieldValue('textContent', sanitizedText);
  }, [textContent]);

  async function handleCreatePost(type: 'text' | 'link' | 'image') {
    startTransition(async () => {
      if (type === 'text') {
        await createPost({
          communityId: params.spaceId as string,
          communityName: params.spaceName as string,
          title: form.values.title,
          content: textContent,
          type: 'text',
        });
        notifications.show({ message: 'Your post has been created!' });
      }

      if (type === 'link') {
        await createPost({
          communityId: params.spaceId as string,
          communityName: params.spaceName as string,
          title: form.values.title,
          content: form.values.link,
          type: 'link',
        });
        notifications.show({ message: 'Your post has been created!' });
      }
      if (type === 'image') {
        const postId = await createPost({
          communityId: params.spaceId as string,
          communityName: params.spaceName as string,
          title: form.values.title,
          type: 'image',
        });
        await uploadImages(images as unknown as File[], postId);
        notifications.show({ message: 'Your post has been created!' });
        redirect(`/spaces/${params.spaceId}/${params.spaceName}/post/${postId}/edit?type=image`);
      }
    });
  }

  const handleTextError = (errors: typeof form.errors) => {
    if (errors.title) {
      notifications.show({ message: 'Please fill title field', color: 'red' });
    } else if (errors.textContent) {
      notifications.show({ message: 'Please provide valid text content', color: 'red' });
    } else {
      handleCreatePost('text');
    }
  };

  const handleLinkError = (errors: typeof form.errors) => {
    if (errors.title) {
      notifications.show({ message: 'Please fill title field', color: 'red' });
    } else if (errors.link) {
      notifications.show({ message: 'Please provide a valid URL', color: 'red' });
    } else {
      handleCreatePost('link');
    }
  };

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

  return (
    <Card withBorder>
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
        </Tabs.List>
        <Tabs.Panel pt="lg" value="text">
          <Stack>
            <CommunitySelect spaces={spaces} spaceId={spaceId} />
            <form onSubmit={form.onSubmit(console.log, handleTextError)}>
              <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
              {/* <TitleInput title={title} setTitle={setTitle} /> */}
              <TextEditor content={textContent} setContent={setTextContent} />
              <Text size="xs" c="red">
                {form.errors.textContent}
              </Text>

              <Flex justify="flex-end" mt="sm">
                <Button type="submit" mt="sm" loading={isPending}>
                  Submit
                </Button>
              </Flex>
            </form>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="link">
          <Stack>
            <CommunitySelect spaces={spaces} spaceId={spaceId} />
            <form onSubmit={form.onSubmit(console.log, handleLinkError)}>
              <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
              <TextInput
                mt="md"
                label="Url"
                placeholder="Url Path"
                {...form.getInputProps('link')}
              />
              <Flex justify="flex-end" mt="sm">
                <Button type="submit" mt="sm" loading={isPending}>
                  Submit
                </Button>
              </Flex>
            </form>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="images">
          <Stack>
            <CommunitySelect spaces={spaces} spaceId={spaceId} />
            <form onSubmit={form.onSubmit(console.log, handleImagesError)}>
              <TextInput label="Title" placeholder="Post Title" {...form.getInputProps('title')} />
              <ImageDropzone files={images} setFiles={setImages} />
              <Text size="xs" c="red">
                {imagesError}
              </Text>
              <Flex justify="flex-end" mt="sm">
                <Button type="submit" mt="sm" loading={isPending}>
                  Submit
                </Button>
              </Flex>
            </form>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

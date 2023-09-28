'use client';

import { Button, Card, Flex, Stack, Tabs } from '@mantine/core';
import { IconBook, IconPhoto, IconLink } from '@tabler/icons-react';
import { useState, useTransition } from 'react';
import { FilePondFile } from 'filepond';
import { redirect, useParams } from 'next/navigation';
import { TextEditor } from '@/features/text-editor';
import { ImageDropzone } from '@/features/image-dropzone';
import { CommunitySelect } from './community-select';
import { Database } from '@/lib/database';
import { TitleInput } from './title-input';
import { LinkInput } from './link-input';
import { removeTags } from '@/utils/remove-tags';
import { createPost } from '../api/create-post';
import { uploadImages } from '../api/upload-images';

type NewPostFormProps = {
  spaceId?: string;
  spaces: Database['public']['Tables']['community']['Row'][] | [];
};

export function NewPostForm({ spaceId, spaces }: NewPostFormProps) {
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('test');
  const [link, setLink] = useState('');
  const [images, setImages] = useState<FilePondFile[]>([]);

  const [isPending, startTransition] = useTransition();

  const sanitizedText = removeTags(textContent) || '';

  const isTextSubmitDisabled = !title || sanitizedText.length < 1;

  const isLinkSubmitDisabled = !title || !link;

  const isImageSubmitDisabled = !title || images.length === 0;

  const params = useParams();

  async function handleCreatePost(postType: string) {
    startTransition(async () => {
      if (postType === 'image') {
        const postId = await createPost({
          communityId: params.spaceId,
          communityName: params.spaceName,
          title,
          type: 'image',
        });

        await uploadImages(images as unknown as File[], postId);
        redirect(`spaces/${params.spaceId}/${params.spaceName}/post/${postId}/edit?type=image`);
      }

      if (postType === 'link') {
        await createPost({
          communityId: params.spaceId,
          communityName: params.spaceName,
          title,
          content: link,
          type: postType,
        });
      }

      if (postType === 'text') {
        await createPost({
          communityId: params.spaceId,
          communityName: params.spaceName,
          title,
          content: textContent,
          type: postType,
        });
      }
    });
  }

  return (
    <Card>
      <Tabs defaultValue="text">
        <Tabs.List>
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
            <TitleInput title={title} setTitle={setTitle} />
            <TextEditor content={textContent} setContent={setTextContent} />
            <Flex justify="flex-end" mt="sm">
              <Button
                onClick={() => handleCreatePost('text')}
                loading={isPending}
                disabled={isTextSubmitDisabled}
              >
                Create
              </Button>
            </Flex>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="link">
          <Stack>
            <CommunitySelect spaces={spaces} spaceId={spaceId} />
            <TitleInput title={title} setTitle={setTitle} />
            <LinkInput link={link} setLink={setLink} />
            <Flex justify="flex-end" mt="sm">
              <Button
                onClick={() => handleCreatePost('link')}
                loading={isPending}
                disabled={isLinkSubmitDisabled}
              >
                Create
              </Button>
            </Flex>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="images">
          <Stack>
            <CommunitySelect spaces={spaces} spaceId={spaceId} />
            <TitleInput title={title} setTitle={setTitle} />
            <ImageDropzone files={images} setFiles={setImages} />
            <Flex justify="flex-end" mt="sm">
              <Button
                onClick={() => handleCreatePost('image')}
                loading={isPending}
                disabled={isImageSubmitDisabled}
              >
                Create
              </Button>
            </Flex>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

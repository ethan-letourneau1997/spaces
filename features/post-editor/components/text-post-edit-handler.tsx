'use client';

import { useState, useTransition } from 'react';

import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { Database } from '@/lib/database';
import { TextEditor } from '@/features/text-editor';
import { updateTextPost } from '../api/update-text-post';

type TextPostEditHandlerProps = {
  post: Database['public']['Tables']['post']['Row'];
};

export function TextPostEditHandler({ post }: TextPostEditHandlerProps) {
  const params = useParams();
  const [textContent, setTextContent] = useState(post.content);
  const [isPending, startTransition] = useTransition();

  async function handleUpdatePost() {
    startTransition(async () => {
      try {
        await updateTextPost(post, params.spaceName as string, textContent!);
        notifications.show({
          title: 'Success',
          message: 'Your post has been updated!',
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Something went wrong!',
        });
      }
    });
  }

  const saveButton = (
    <Button loading={isPending} onClick={handleUpdatePost}>
      Save
    </Button>
  );

  if (textContent) {
    return <TextEditor content={textContent} setContent={setTextContent} buttons={saveButton} />;
  }
}

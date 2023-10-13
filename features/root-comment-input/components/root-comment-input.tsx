'use client';

import { useState, useTransition } from 'react';

import { usePathname } from 'next/navigation';
import { Button } from '@mantine/core';
import { TextEditor } from '@/features/text-editor';
import { Database } from '@/lib/database';
import { createRootComment } from '@/utils/create-root-comment';

type RootCommentInputProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  closeInput: () => void;
};

export function RootCommentInput({ post, closeInput }: RootCommentInputProps) {
  const [comment, setComment] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [remount, setRemount] = useState(0);

  const pathname = usePathname();

  async function handleRootComment() {
    startTransition(async () => {
      await createRootComment(post.id, comment, pathname);
      setComment('');
      setRemount(remount + 1);
      closeInput();
    });
  }

  const replyButton = (
    <>
      <Button variant="subtle" color="red" onClick={closeInput}>
        Cancel
      </Button>
      <Button loading={isPending} onClick={handleRootComment}>
        Reply
      </Button>
    </>
  );

  return (
    <TextEditor
      buttons={replyButton}
      key={remount}
      content={comment}
      setContent={setComment}
      mih="10vh"
    />
  );
}

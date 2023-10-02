'use client';

import { useState, useTransition } from 'react';

import { usePathname } from 'next/navigation';
import { Button } from '@mantine/core';
import { TextEditor } from '@/features/text-editor';
import { Database } from '@/lib/database';
import { createChildComment } from '@/utils/create-child-comment';

type ChildCommentInputProps = {
  parentComment: Database['public']['Views']['comment_details']['Row'];
  handleClose: () => void;
};

export function ChildCommentInput({ parentComment, handleClose }: ChildCommentInputProps) {
  const [comment, setComment] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [remount, setRemount] = useState(0);

  const pathname = usePathname();

  async function handleRootComment() {
    startTransition(async () => {
      await createChildComment(parentComment.id!, parentComment.root_post, comment, pathname);
      setComment('');
      setRemount(remount + 1);
      handleClose();
    });
  }

  const replyButton = (
    <Button loading={isPending} onClick={handleRootComment}>
      Reply
    </Button>
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

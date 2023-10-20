'use client';

import { Button, Input } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { TextEditor } from '@/features/text-editor';
import { createChildComment } from '@/utils/create-child-comment';
import { Database } from '@/lib/database';

type ReplyInputProps = {
  comment: Database['public']['Views']['comment_with_votes']['Row'];
};

export function ReplyInput({ comment }: ReplyInputProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  async function handleCreateComment() {
    startTransition(async () => {
      // const previousImage = avatar ? avatar.file_name : null;
      createChildComment(comment.id, comment.root_post, content, pathname);
      toggle();
      setContent('');
    });
  }

  const buttons = (
    <div className="flex gap-2">
      <Button onClick={toggle} variant="subtle" color="red">
        Cancel
      </Button>
      <Button loading={isPending} onClick={handleCreateComment} variant="outline">
        Reply
      </Button>
    </div>
  );

  return (
    <div className="px-4 py-2 rounded-b-md bg-dark-5 ">
      {opened ? (
        <TextEditor content={content} setContent={setContent} mih="200px" buttons={buttons} />
      ) : (
        <Input
          styles={{
            input: { backgroundColor: '#1A1B1E' },
          }}
          onClick={toggle}
          component="button"
          pointer
        >
          Write a reply
        </Input>
      )}
    </div>
  );
}

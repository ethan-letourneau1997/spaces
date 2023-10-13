'use client';

import { Box, Drawer, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Database } from '@/lib/database';
import { ChildCommentInput } from './child-comment-input';
import { CommentHeader } from '@/features/comments';

type ChildCommentModalProps = {
  parentComment: Database['public']['Views']['comment_details']['Row'];
};

export function ChildCommentModal({ parentComment }: ChildCommentModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box hiddenFrom="sm">
      <UnstyledButton className="!text-sm " variant="subtle" onClick={open}>
        Reply
      </UnstyledButton>
      <Drawer position="bottom" opened={opened} onClose={close} title="Reply to Comment">
        <CommentHeader comment={parentComment} />
        <Box px="md" mt="xs" mb="md">
          <div
            className="text-sm sm:text-base"
            id="CommentContent"
            dangerouslySetInnerHTML={{ __html: parentComment.content || '' }}
          />
        </Box>

        <ChildCommentInput handleClose={close} parentComment={parentComment} />
      </Drawer>
    </Box>
  );
}

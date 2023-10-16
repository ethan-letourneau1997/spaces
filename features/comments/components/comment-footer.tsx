'use client';

import { Collapse, Box, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Database } from '@/lib/database';
import { ChildCommentInput, ChildCommentModal } from '@/features/child-comment-input';

import { CommentOptions } from './comment-options';
import { VoteHandler } from '@/features/vote-handler';

type CommentFooterProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  userVote: number;
  totalVotes: number;
};

export function CommentFooter({ comment, userVote, totalVotes }: CommentFooterProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <div className="flex gap-3 mt-3">
        <VoteHandler userVote={userVote} totalVotes={totalVotes} comment={comment} horizontal />
        <UnstyledButton className="!text-sm font-semibold" visibleFrom="sm" onClick={toggle}>
          {opened ? 'Cancel' : 'Reply'}
        </UnstyledButton>
        <ChildCommentModal parentComment={comment} />
        <CommentOptions comment={comment} />
      </div>

      <Collapse transitionDuration={0} in={opened}>
        <ChildCommentInput handleClose={toggle} parentComment={comment} />
      </Collapse>
    </Box>
  );
}

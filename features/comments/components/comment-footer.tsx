'use client';

import { Collapse, Box, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BsFillReplyFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { Database } from '@/lib/database';
import { ChildCommentInput, ChildCommentModal } from '@/features/child-comment-input';

import { CommentOptions } from './comment-options';
import { VoteButtons } from '@/features/vote-handler';

type CommentFooterProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  userVote: number;
  totalVotes: number;
};

export function CommentFooter({ comment, userVote, totalVotes }: CommentFooterProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <div className="flex gap-4 mt-3">
        <VoteButtons userVote={userVote} totalVotes={totalVotes} comment={comment} horizontal />

        <UnstyledButton
          className="!text-sm hover:!text-dark-0 flex items-center gap-1"
          py={2}
          visibleFrom="sm"
          fw={700}
          c="dark.2"
          onClick={toggle}
        >
          {opened ? <ImCross size={10} /> : <BsFillReplyFill size={18} className="mb-0.5" />}
          {opened ? 'Cancel' : 'Reply'}
        </UnstyledButton>

        <ChildCommentModal parentComment={comment} />
        <CommentOptions comment={comment} />
      </div>

      <Collapse in={opened} pt="xs">
        <ChildCommentInput handleClose={toggle} parentComment={comment} />
      </Collapse>
    </Box>
  );
}

'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { Text, Flex, ActionIcon } from '@mantine/core';

import { Database } from '@/lib/database';

import { upsertCommentVote } from '../api/upsert-comment-vote';

type CommentVoteButtonsProps = {
  commentVotes: number;
  userVote: number;
  comment: Database['public']['Views']['comment_details']['Row'];
  horizontal?: boolean;
};

export function CommentVoteButtons({
  commentVotes,
  userVote,
  comment,
  horizontal,
}: CommentVoteButtonsProps) {
  const [optimisticPostVotes, setOptimisticPostVotes] = useOptimistic<number>(commentVotes);

  const [optimisticUserVote, setOptimisticUserVote] = useOptimistic<number>(userVote);

  async function handleUpvote() {
    if (optimisticUserVote === 0) {
      upsertCommentVote(comment, 1);
      setOptimisticUserVote(1);
      setOptimisticPostVotes(optimisticPostVotes + 1);
    }
    if (optimisticUserVote === 1) {
      upsertCommentVote(comment, 0);
      setOptimisticUserVote(0);
      setOptimisticPostVotes(optimisticPostVotes - 1);
    }
    if (optimisticUserVote === -1) {
      upsertCommentVote(comment, 1);
      setOptimisticUserVote(1);
      setOptimisticPostVotes(optimisticPostVotes + 2);
    }
  }

  async function handleDownvote() {
    if (optimisticUserVote === 0) {
      upsertCommentVote(comment, -1);
      setOptimisticUserVote(-1);
      setOptimisticPostVotes(optimisticPostVotes - 1);
    }
    if (optimisticUserVote === 1) {
      upsertCommentVote(comment, -1);
      setOptimisticUserVote(-1);
      setOptimisticPostVotes(optimisticPostVotes - 2);
    }
    if (optimisticUserVote === -1) {
      upsertCommentVote(comment, 0);
      setOptimisticUserVote(0);
      setOptimisticPostVotes(optimisticPostVotes + 1);
    }
  }

  return (
    <Flex direction={horizontal ? 'row' : 'column'} align="center" justify="center" gap={2}>
      <ActionIcon onClick={handleUpvote} variant="transparent" color="gray">
        {optimisticUserVote === 1 ? <BiSolidUpvote /> : <BiUpvote />}
      </ActionIcon>
      {/* <BiUpvote /> */}

      <Text>{optimisticPostVotes}</Text>
      <ActionIcon onClick={handleDownvote} variant="transparent" color="gray">
        {optimisticUserVote === -1 ? <BiSolidDownvote /> : <BiDownvote />}
      </ActionIcon>
    </Flex>
  );
}

'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import { Text, em, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Database } from '@/lib/database';
import { DownvoteButton, DownvotedButton, UpvoteButton, UpvotedButton } from './vote-buttons';
import { upsertPostVote } from '../api/upsert-post-vote';
import { upsertCommentVote } from '../api/upsert-comment-vote';

type VoteHandlerProps = {
  totalVotes: number;
  userVote: number;
  post?: Database['public']['Views']['detailed_post']['Row'];
  comment?: Database['public']['Views']['comment_details']['Row'];
  horizontal?: boolean;
};

export function VoteHandler({ totalVotes, userVote, post, comment, horizontal }: VoteHandlerProps) {
  const [optimisticTotalVotes, setOptimisticTotalVotes] = useOptimistic<number>(totalVotes);
  const [optimisticUserVote, setOptimisticUserVote] = useOptimistic<number>(userVote);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  function handleVoteChange(newUserVote: number, newOptomisticVote: number) {
    if (post) {
      upsertPostVote(post, newUserVote);
    }
    if (comment) {
      upsertCommentVote(comment, newUserVote);
    }
    setOptimisticUserVote(newUserVote);
    setOptimisticTotalVotes(optimisticTotalVotes + newOptomisticVote);
  }

  async function handleUpvote() {
    if (optimisticUserVote === 0) {
      handleVoteChange(1, 1);
    }
    if (optimisticUserVote === 1) {
      handleVoteChange(0, -1);
    }
    if (optimisticUserVote === -1) {
      handleVoteChange(1, 2);
    }
  }

  async function handleDownvote() {
    if (optimisticUserVote === 0) {
      handleVoteChange(-1, -1);
    }
    if (optimisticUserVote === 1) {
      handleVoteChange(-1, -2);
    }
    if (optimisticUserVote === -1) {
      handleVoteChange(0, 1);
    }
  }

  return (
    <div
      className={`flex items-center gap-1 ${
        horizontal ? 'flex-row' : 'flex-col h-full  justify-between'
      }`}
    >
      <UnstyledButton onClick={handleUpvote} color="gray">
        {optimisticUserVote === 1 ? <UpvotedButton /> : <UpvoteButton />}
      </UnstyledButton>
      {/* <BiUpvote /> */}
      <Text size={isMobile ? 'xs' : 'sm'}>{optimisticTotalVotes}</Text>
      <UnstyledButton onClick={handleDownvote} color="gray">
        {optimisticUserVote === -1 ? <DownvotedButton /> : <DownvoteButton />}
      </UnstyledButton>
    </div>
  );
}

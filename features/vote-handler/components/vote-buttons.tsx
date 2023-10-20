'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import { UnstyledButton } from '@mantine/core';
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { Database } from '@/lib/database';
import { upsertPostVote } from '../api/upsert-post-vote';
import { upsertCommentVote } from '../api/upsert-comment-vote';

type VoteButtonsProps = {
  totalVotes: number;
  userVote: number;
  post?: Database['public']['Views']['detailed_post']['Row'];
  comment?: Database['public']['Views']['comment_details']['Row'];
  horizontal?: boolean;
};

export function VoteButtons({ totalVotes, userVote, post, comment, horizontal }: VoteButtonsProps) {
  const [optimisticTotalVotes, setOptimisticTotalVotes] = useOptimistic<number>(totalVotes);
  const [optimisticUserVote, setOptimisticUserVote] = useOptimistic<number>(userVote);

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
      className={`flex gap-1 ${horizontal ? ' items-center' : 'flex-col gap-2 justify-between'}`}
    >
      <UnstyledButton className="flex items-center " onClick={handleUpvote} color="gray">
        {optimisticUserVote === 1 ? (
          <BiSolidUpvote size={17} className="text-orange-5" />
        ) : (
          <BiUpvote size={17} className="text-dark-2 hover:text-orange-5" />
        )}
      </UnstyledButton>
      <span className="text-sm text-center">{optimisticTotalVotes}</span>
      <UnstyledButton type="button" onClick={handleDownvote} className="flex items-center ">
        {optimisticUserVote === -1 ? (
          <BiSolidDownvote size={17} className="text-orange-5" />
        ) : (
          <BiDownvote size={17} className="text-dark-2 hover:text-orange-5" />
        )}
      </UnstyledButton>
    </div>
  );
}

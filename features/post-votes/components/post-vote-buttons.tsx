'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';

import { Text, Flex, ActionIcon } from '@mantine/core';

import { Database } from '@/lib/database';

import { upsertPostVote } from '../api/upsert-post-vote';
import {
  DownvoteButton,
  DownvotedButton,
  UpvoteButton,
  UpvotedButton,
} from '@/components/vote-buttons';

type PostVoteButtonsProps = {
  postVotes: number;
  userVote: number;
  post: Database['public']['Views']['detailed_post']['Row'];
  horizontal?: boolean;
};

export function PostVoteButtons({ postVotes, userVote, post, horizontal }: PostVoteButtonsProps) {
  const [optimisticPostVotes, setOptimisticPostVotes] = useOptimistic<number>(postVotes);

  const [optimisticUserVote, setOptimisticUserVote] = useOptimistic<number>(userVote);

  async function handleUpvote() {
    if (optimisticUserVote === 0) {
      upsertPostVote(post, 1);
      setOptimisticUserVote(1);
      setOptimisticPostVotes(optimisticPostVotes + 1);
    }
    if (optimisticUserVote === 1) {
      upsertPostVote(post, 0);
      setOptimisticUserVote(0);
      setOptimisticPostVotes(optimisticPostVotes - 1);
    }
    if (optimisticUserVote === -1) {
      upsertPostVote(post, 1);
      setOptimisticUserVote(1);
      setOptimisticPostVotes(optimisticPostVotes + 2);
    }
  }

  async function handleDownvote() {
    if (optimisticUserVote === 0) {
      upsertPostVote(post, -1);
      setOptimisticUserVote(-1);
      setOptimisticPostVotes(optimisticPostVotes - 1);
    }
    if (optimisticUserVote === 1) {
      upsertPostVote(post, -1);
      setOptimisticUserVote(-1);
      setOptimisticPostVotes(optimisticPostVotes - 2);
    }
    if (optimisticUserVote === -1) {
      upsertPostVote(post, 0);
      setOptimisticUserVote(0);
      setOptimisticPostVotes(optimisticPostVotes + 1);
    }
  }

  return (
    <Flex direction={horizontal ? 'row' : 'column'} align="center" justify="center" gap={2}>
      <ActionIcon onClick={handleUpvote} variant="transparent" color="gray">
        {optimisticUserVote === 1 ? <UpvotedButton /> : <UpvoteButton />}
      </ActionIcon>
      {/* <BiUpvote /> */}

      <Text>{optimisticPostVotes}</Text>
      <ActionIcon onClick={handleDownvote} variant="transparent" color="gray">
        {optimisticUserVote === -1 ? <DownvotedButton /> : <DownvoteButton />}
      </ActionIcon>
    </Flex>
  );
}

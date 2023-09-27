'use client';

import { useEffect, useState } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { Text, Flex, Stack, ActionIcon } from '@mantine/core';
import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { Database } from '@/lib/database';

type PostVotesProps = {
  postId: Database['public']['Views']['detailed_post']['Row']['id'];
};

export function PostVotes({ postId }: PostVotesProps) {
  const [totalVotes, setTotalVotes] = useState(0);
  useEffect(() => {
    async function getTotalPostVotes() {
      const votes = await fetchPostVotes(postId);
      setTotalVotes(votes);
    }

    if (postId) {
      getTotalPostVotes();
    }
  }, [postId]);

  return (
    <Flex justify="flex-end">
      <Stack align="center" justify="center" gap={2}>
        <ActionIcon variant="transparent" color="gray">
          <BiUpvote />
        </ActionIcon>
        <Text>{totalVotes}</Text>
        <ActionIcon variant="transparent" color="gray">
          <BiDownvote />
        </ActionIcon>
      </Stack>
    </Flex>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Text, UnstyledButton } from '@mantine/core';
import { BiSolidUpvote } from 'react-icons/bi';
import { fetchPostVotes } from '@/utils/fetch-post-votes';

type SidebarPostVoteCountProps = {
  postId: string | number;
};

export function SidebarPostVoteCount({ postId }: SidebarPostVoteCountProps) {
  const [voteCount, setVoteCount] = useState<number | null>(null);
  async function fetchVoteCount() {
    const votes = await fetchPostVotes(postId);
    setVoteCount(votes);
  }
  useEffect(() => {
    fetchVoteCount();
  }, [postId]);

  const small = true;

  return (
    <div className="flex items-center gap-1 ">
      <UnstyledButton className="flex items-center" c="gray.6" pt={1}>
        <BiSolidUpvote size={small ? 12 : 14} />
      </UnstyledButton>
      <Text size={small ? 'xs' : 'sm'} c="gray.6" fw={500} className="text-sm ">
        {voteCount || 0} vote{voteCount !== 1 || !voteCount ? 's' : ''}
      </Text>
    </div>
  );
}

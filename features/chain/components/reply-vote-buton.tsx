'use client';

import { Button } from '@mantine/core';
import { FaArrowUp } from 'react-icons/fa';
import { experimental_useOptimistic as useOptimistic } from 'react';
import { usePathname } from 'next/navigation';
import { Database } from '@/lib/database';
import { upsertChainCommentVote } from '../api/upsert-chain-comment-vote';

type ReplyVoteButtonProps = {
  comment: Database['public']['Views']['comment_with_votes']['Row'];
  userVote: number;
};

export function ReplyVoteButton({ comment, userVote }: ReplyVoteButtonProps) {
  const [optimisticTotalVotes, setOptimisticTotalVotes] = useOptimistic<number>(
    comment.total_votes
  );
  const [optimisticUserVote, setOptimisticUserVote] = useOptimistic<number>(userVote);

  const pathname = usePathname();

  async function handleRemoveVote() {
    setOptimisticTotalVotes(optimisticTotalVotes - 1);
    setOptimisticUserVote(0);
    upsertChainCommentVote(comment, pathname, 0);
  }

  async function handleAddVote() {
    setOptimisticTotalVotes(optimisticTotalVotes + 1);
    setOptimisticUserVote(1);
    upsertChainCommentVote(comment, pathname, 1);
  }

  return (
    <div className="mt-5">
      {optimisticUserVote === 1 ? (
        <Button
          onClick={handleRemoveVote}
          color="yellow.6"
          variant="outline"
          radius="xl"
          leftSection={<FaArrowUp />}
          size="xs"
        >
          {optimisticTotalVotes}
        </Button>
      ) : (
        <Button
          onClick={handleAddVote}
          color="dark.2"
          variant="outline"
          radius="xl"
          leftSection={<FaArrowUp />}
          size="xs"
          className="hover:!border-yellow-6 hover:text-yellow-6"
        >
          {optimisticTotalVotes}
        </Button>
      )}
    </div>
  );
}

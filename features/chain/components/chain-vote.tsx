import { ActionIcon } from '@mantine/core';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { experimental_useOptimistic as useOptimistic } from 'react';
import { Database } from '@/lib/database';
import { upsertChainCommentVote } from '../api/upsert-chain-comment-vote';

type ChainVotesProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  userVote: number;
  totalVotes: number;
};

export function ChainVotes({ comment, userVote, totalVotes }: ChainVotesProps) {
  const pathname = usePathname();

  const [optimisticVote, setOptimisticVote] = useOptimistic<number>(userVote);
  const [optimisticTotalVotes, setOptimisticTotalVotes] = useOptimistic<number>(totalVotes);

  async function handleCreateVote() {
    setOptimisticVote(1);
    setOptimisticTotalVotes(optimisticTotalVotes + 1);
    upsertChainCommentVote(comment, pathname);
  }

  async function handleRemoveVote() {
    setOptimisticVote(0);
    setOptimisticTotalVotes(optimisticTotalVotes - 1);
    upsertChainCommentVote(comment, pathname, true);
  }

  return (
    <>
      {optimisticVote === 1 ? (
        <ActionIcon>
          <BsHandThumbsUpFill onClick={handleRemoveVote} />
          {optimisticTotalVotes}
        </ActionIcon>
      ) : (
        <ActionIcon onClick={handleCreateVote}>
          <BsHandThumbsUp />
          {optimisticTotalVotes}
        </ActionIcon>
      )}
    </>
  );
}

import useSWR from 'swr';
import { Database } from '@/lib/database';

import { fetchUserCommentVote } from '@/utils/fetch-user-comment-vote';
import { fetchCommentVotes } from '@/utils/fetch-comment-votes';
import { ChainVotes } from './chain-vote';

type ChainVoteHandlerProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
};

export function ChainVoteHandler({ comment }: ChainVoteHandlerProps) {
  const { data: totalVotes } = useSWR(['totalVotes', comment.id], async () => {
    const votes = await fetchCommentVotes(comment.id);
    return votes;
  });

  const { data: userVote } = useSWR(['userVotes', comment.id], async () => {
    const vote = await fetchUserCommentVote(comment.id);
    return vote;
  });

  return <ChainVotes comment={comment} totalVotes={totalVotes} userVote={userVote} />;
}

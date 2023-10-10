import { Database } from '@/lib/database';
import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';
import { VoteButtons } from '../../vote-buttons/components/vote-buttons';

type PostVotesProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostVotes({ post }: PostVotesProps) {
  const postVotes = await fetchPostVotes(post.id);
  const userVote = await fetchUserPostVote(post.id);
  return <VoteButtons post={post} totalVotes={postVotes} userVote={userVote} />;
}

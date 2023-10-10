import { PostVoteButtons } from '@/features/post-votes';
import { Database } from '@/lib/database';
import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';

type PostVotesProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostVotes({ post }: PostVotesProps) {
  const postVotes = await fetchPostVotes(post.id);
  const userVote = await fetchUserPostVote(post.id);
  return <PostVoteButtons post={post} postVotes={postVotes} userVote={userVote} />;
}

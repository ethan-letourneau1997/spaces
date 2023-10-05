import { Database } from '@/lib/database';
import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { PostPreview } from './post-preview';
import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';

export const dynamic = 'force-dynamic';

type PostVotesHandlerProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostVotesHandler({ post }: PostVotesHandlerProps) {
  const postVotes = await fetchPostVotes(post.id);
  const userVote = await fetchUserPostVote(post.id);

  return <PostPreview key={post.id} post={post} postVotes={postVotes} userVote={userVote} />;
}

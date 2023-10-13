import { Database } from '@/lib/database';

import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';
import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';
import { PostPreview } from './post-preview';

export const dynamic = 'force-dynamic';

type PostPreviewHandlerProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostPreviewHandler({ post }: PostPreviewHandlerProps) {
  const postVotes = await fetchPostVotes(post.id);
  const userVote = await fetchUserPostVote(post.id);
  const commentCount = await fetchPostCommentCount(post.id);

  return (
    <PostPreview
      key={post.id}
      post={post}
      postVotes={postVotes}
      userVote={userVote}
      commentCount={commentCount}
    />
  );
}

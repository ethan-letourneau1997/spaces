import { Database } from '@/lib/database';

import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';
import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';
import { PostPreviewDesktop } from './post-preview-desktop';

export const dynamic = 'force-dynamic';

type PostPreviewProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostPreview({ post }: PostPreviewProps) {
  const postVotes = await fetchPostVotes(post.id);
  const userVote = await fetchUserPostVote(post.id);
  const commentCount = await fetchPostCommentCount(post.id);

  return (
    <PostPreviewDesktop
      key={post.id}
      post={post}
      postVotes={postVotes}
      userVote={userVote}
      commentCount={commentCount}
    />
  );
}

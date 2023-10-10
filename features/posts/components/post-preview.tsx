import { Suspense } from 'react';
import { Database } from '@/lib/database';
import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';
import { PostVotes } from './post-votes';
import { PostPreviewCard } from './post-preview-card';

export const dynamic = 'force-dynamic';

type PostPreviewProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostPreview({ post }: PostPreviewProps) {
  const commentCount = await fetchPostCommentCount(post.id);

  const postVotesSection = (
    <Suspense fallback={<>loading...</>}>
      <PostVotes post={post} />
    </Suspense>
  );

  return (
    <PostPreviewCard
      key={post.id}
      post={post}
      commentCount={commentCount || 0}
      postVotesSection={postVotesSection}
    />
  );
}

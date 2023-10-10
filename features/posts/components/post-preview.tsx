import { Suspense } from 'react';
import { Database } from '@/lib/database';
import { PostVotes } from './post-votes';
import { PostPreviewCard } from './post-preview-card';
import { PostPreviewFooterFallback, VoteButtonsFallback } from '@/components/fallbacks';
import { PostPreviewFooter } from './post-preview-footer';

export const dynamic = 'force-dynamic';

type PostPreviewProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostPreview({ post }: PostPreviewProps) {
  const postVotesSection = (
    <Suspense fallback={<VoteButtonsFallback />}>
      <PostVotes post={post} />
    </Suspense>
  );

  const postPreviewFooter = (
    <Suspense fallback={<PostPreviewFooterFallback />}>
      <PostPreviewFooter post={post} />
    </Suspense>
  );

  return (
    <PostPreviewCard
      key={post.id}
      post={post}
      postPreviewFooter={postPreviewFooter}
      postVotesSection={postVotesSection}
    />
  );
}

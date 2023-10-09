import { Suspense } from 'react';
import { FeedPosts } from './feed-posts';
import { PostsSkeleton } from '@/components/PostsSkeleton';

type userSubscriptionProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export async function Feed({ params }: userSubscriptionProps) {
  return (
    <>
      <Suspense fallback={<PostsSkeleton />}>
        <FeedPosts params={params} />
      </Suspense>
    </>
  );
}

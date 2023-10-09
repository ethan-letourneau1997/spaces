import { Suspense } from 'react';
import SpacePosts from './space-posts';
import { PostsSkeleton } from '@/components/PostsSkeleton';

type SpaceProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export async function Space({ params }: SpaceProps) {
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <SpacePosts params={params} />
    </Suspense>
  );
}

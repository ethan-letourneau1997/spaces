import { Suspense } from 'react';
import { PostPreviewsSkeleton } from '@/components/fallbacks';
import { Profile } from '@/features/profile';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    type: string;
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export default async function ProfilePostsPage({ params }: SpacePageProps) {
  return (
    <Suspense fallback={<PostPreviewsSkeleton />}>
      <Profile params={params} />
    </Suspense>
  );
}

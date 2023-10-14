import { Suspense } from 'react';
import { NewPostFormPlaceholder } from '@/components/fallbacks';
import { NewPost } from '@/features/new-post';

export const dynamic = 'force-dynamic';

type NewSpacePostPageProps = {
  params: {
    spaceId: string;
  };
};

export default function NewSpacePostPage({ params }: NewSpacePostPageProps) {
  return (
    <Suspense fallback={<NewPostFormPlaceholder />}>
      <NewPost spaceId={params.spaceId} />
    </Suspense>
  );
}

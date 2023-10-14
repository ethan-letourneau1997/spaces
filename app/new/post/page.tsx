import { Suspense } from 'react';
import { NewPost } from '@/features/new-post';
import { NewPostFormPlaceholder } from '@/components/fallbacks';

export const dynamic = 'force-dynamic';

export default function NewPostPage() {
  return (
    <Suspense fallback={<NewPostFormPlaceholder />}>
      <NewPost />
    </Suspense>
  );
}

import { Suspense } from 'react';
import { Post } from '@/features/post';
import { PostPageSkeleton } from '@/components/fallbacks';

export const dynamic = 'force-dynamic';

type PostPageProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
    postId: string;
  };
};

export default async function EditPage({ params }: PostPageProps) {
  return (
    <Suspense fallback={<PostPageSkeleton />}>
      <Post params={params} />
    </Suspense>
  );
}

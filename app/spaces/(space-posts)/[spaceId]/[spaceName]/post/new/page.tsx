import { NewPost } from '@/features/new-post';

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

export default async function PostPage({ params }: PostPageProps) {
  return (
    <>
      <NewPost spaceId={params.spaceId} />
    </>
  );
}

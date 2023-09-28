import { Post } from '@/features/post';

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
    <>
      <Post params={params} />
    </>
  );
}

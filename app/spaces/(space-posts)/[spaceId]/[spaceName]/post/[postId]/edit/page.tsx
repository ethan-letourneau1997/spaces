import { PostEditor } from '@/features/post-editor';

export const dynamic = 'force-dynamic';

type PostPageProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    postId: string;
  };
  searchParams: {
    type: 'text' | 'image' | 'link';
  };
};

export default async function EditPage({ params, searchParams }: PostPageProps) {
  return (
    <>
      <PostEditor params={params} type={searchParams.type} />
    </>
  );
}

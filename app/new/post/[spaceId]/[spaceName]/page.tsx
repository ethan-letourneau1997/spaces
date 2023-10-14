import { NewPost } from '@/features/new-post';

export const dynamic = 'force-dynamic';

type NewSpacePostPageProps = {
  params: {
    spaceId: string;
  };
};

export default function NewSpacePostPage({ params }: NewSpacePostPageProps) {
  return <NewPost spaceId={params.spaceId} />;
}

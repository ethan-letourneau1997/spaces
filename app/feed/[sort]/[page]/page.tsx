import { Feed } from '@/features/feed';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export default async function FeedPage({ params }: SpacePageProps) {
  return (
    <>
      <Feed params={params} />
    </>
  );
}

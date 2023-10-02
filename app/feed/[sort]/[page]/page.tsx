import { UserFeed } from '@/features/user-feed';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  return (
    <>
      <UserFeed params={params} />
    </>
  );
}

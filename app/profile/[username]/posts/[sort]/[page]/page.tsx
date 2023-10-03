import { Profile } from '@/features/profile';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  return <Profile params={params} />;
}

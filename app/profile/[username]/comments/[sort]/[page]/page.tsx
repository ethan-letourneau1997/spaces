import { ProfileComments } from '@/features/profile-comments';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export default async function ProfileCommentsPage({ params }: SpacePageProps) {
  return <ProfileComments params={params} />;
}

import { ProfilePosts } from '@/features/profile-posts';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export default async function ProfilePostsPage({ params }: SpacePageProps) {
  return <ProfilePosts params={params} />;
}

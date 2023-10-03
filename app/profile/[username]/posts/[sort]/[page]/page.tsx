import { Profile } from '@/features/profile';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    username: string;
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  return (
    <>
      <Profile username={params.username} />
    </>
  );
}

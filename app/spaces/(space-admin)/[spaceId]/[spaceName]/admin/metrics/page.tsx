import { SpaceAdmin } from '@/features/space-admin.tsx';
import { fetchAdminSpace } from '@/utils/fetch-admin-space';

export const dynamic = 'force-dynamic';

type SpaceAdminPageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export default async function SpacePage({ params }: SpaceAdminPageProps) {
  const space = await fetchAdminSpace(params.spaceId);
  const tabContent = <div>space metrics</div>;

  return <SpaceAdmin tabContent={tabContent} space={space} tab="metrics" />;
}

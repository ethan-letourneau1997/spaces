import { SpaceAdmin } from '@/features/space-admin.tsx';
import { SpaceSettings } from '@/features/space-settings';
import { fetchAdminSpace } from '@/utils/fetch-admin-space';
import { fetchSpaceAvatar } from '@/utils/fetch-space-avatar';

export const dynamic = 'force-dynamic';

type SpaceAdminPageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
  searchParams: {
    tab: string;
  };
};

export default async function SpacePage({ params }: SpaceAdminPageProps) {
  const space = await fetchAdminSpace(params.spaceId);
  const avatar = await fetchSpaceAvatar(params.spaceId);

  const tabContent = <SpaceSettings space={space} avatar={avatar} />;

  return <SpaceAdmin space={space} tab="settings" tabContent={tabContent} />;
}

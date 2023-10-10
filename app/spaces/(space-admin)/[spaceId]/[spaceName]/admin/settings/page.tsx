import { SpaceAdmin } from '@/features/space-admin.tsx';
import { SpaceSettings } from '@/features/space-settings';

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
  const tabContent = <SpaceSettings spaceId={params.spaceId} />;

  return (
    <SpaceAdmin
      spaceId={params.spaceId}
      spaceName={params.spaceName}
      tab="settings"
      tabContent={tabContent}
    />
  );
}

import { Suspense } from 'react';
import { SpaceAdmin } from '@/features/space-admin.tsx';
import { SpaceSettings } from '@/features/space-settings';
import { SpaceSettingsFallback } from '@/features/space-settings/components/space-settings-fallbacks';

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
  const tabContent = (
    <Suspense fallback={SpaceSettingsFallback}>
      <SpaceSettings spaceId={params.spaceId} />
    </Suspense>
  );

  return (
    <SpaceAdmin
      spaceId={params.spaceId}
      spaceName={params.spaceName}
      tab="settings"
      tabContent={tabContent}
    />
  );
}

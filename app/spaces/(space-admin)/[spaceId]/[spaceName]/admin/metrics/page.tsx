import { SpaceAdmin } from '@/features/space-admin.tsx';
import { SpaceMetrics } from '@/features/space-metrics';

export const dynamic = 'force-dynamic';

type SpaceAdminPageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export default async function SpacePage({ params }: SpaceAdminPageProps) {
  const tabContent = <SpaceMetrics spaceId={params.spaceId} spaceName={params.spaceName} />;

  return (
    <SpaceAdmin
      tabContent={tabContent}
      spaceId={params.spaceId}
      spaceName={params.spaceName}
      tab="metrics"
    />
  );
}

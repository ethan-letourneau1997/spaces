import { Suspense } from 'react';
import { SpaceAdmin } from '@/features/space-admin.tsx';
import { SpaceMetrics } from '@/features/space-metrics';
import { SpaceMetricsFallback } from '@/features/space-metrics/components/space-metrics-fallback';

export const dynamic = 'force-dynamic';

type SpaceAdminPageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export default async function SpacePage({ params }: SpaceAdminPageProps) {
  const tabContent = (
    <Suspense fallback={SpaceMetricsFallback}>
      <SpaceMetrics spaceId={params.spaceId} />
    </Suspense>
  );

  return (
    <SpaceAdmin
      tabContent={tabContent}
      spaceId={params.spaceId}
      spaceName={params.spaceName}
      tab="metrics"
    />
  );
}

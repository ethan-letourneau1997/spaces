import { Suspense } from 'react';
import { fetchSpacePostCount } from '@/utils/fetch-space-post-count';
import { fetchSubscriberCount } from '@/utils/fetch-subscriber-count';
import { fetchSpaceVoteCount } from '../api/fetch-space-vote-count';

import { SpaceMetricsGrid } from './space-metrics-grid';
import { SpaceMetricsFallback } from './space-metrics-fallback';

type SpaceMetricsProps = {
  spaceId: string;
};

export async function SpaceMetrics({ spaceId }: SpaceMetricsProps) {
  const subscriberCount = await fetchSubscriberCount(spaceId);
  const postCount = await fetchSpacePostCount(spaceId);
  const totalVotes = await fetchSpaceVoteCount(spaceId);

  return (
    <Suspense fallback={SpaceMetricsFallback}>
      <SpaceMetricsGrid
        subscriberCount={subscriberCount}
        postCount={postCount}
        totalVotes={totalVotes}
      />
    </Suspense>
  );
}

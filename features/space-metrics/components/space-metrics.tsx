import { fetchSpacePostCount } from '@/utils/fetch-space-post-count';
import { fetchSubscriberCount } from '@/utils/fetch-subscriber-count';
import { fetchSpaceVoteCount } from '../api/fetch-space-vote-count';

import { SpaceMetricsGrid } from './space-metrics-grid';

type SpaceMetricsProps = {
  spaceId: string;
  spaceName: string;
};

export async function SpaceMetrics({ spaceId, spaceName }: SpaceMetricsProps) {
  const subscriberCount = await fetchSubscriberCount(spaceId);
  const postCount = await fetchSpacePostCount(spaceId);
  const totalVotes = await fetchSpaceVoteCount(spaceId);

  return (
    <SpaceMetricsGrid
      subscriberCount={subscriberCount}
      postCount={postCount}
      totalVotes={totalVotes}
    />
  );
}

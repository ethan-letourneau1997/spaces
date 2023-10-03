import { Space } from '@mantine/core';
import { FeedHeader } from '@/features/posts-header/components/feed-header';
import { FeedPosts } from './feed-posts';

type userSubscriptionProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export async function Feed({ params }: userSubscriptionProps) {
  return (
    <>
      <FeedHeader params={params} />
      <Space h="md" />
      <FeedPosts params={params} />
    </>
  );
}

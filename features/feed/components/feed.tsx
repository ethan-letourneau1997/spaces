import { Space } from '@mantine/core';
import { FeedPostsHeader } from '@/features/posts-header';
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
      <FeedPostsHeader params={params} />
      <Space h="md" />
      <FeedPosts params={params} />
    </>
  );
}

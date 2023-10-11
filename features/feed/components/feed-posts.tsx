import { PostPreviews } from '@/features/posts';
import { fetchSortedFeedPosts } from '../api/fetch-sorted-feed-posts';
import { NoPostsFound } from '@/components/fallbacks';

type userSubscriptionProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export async function FeedPosts({ params }: userSubscriptionProps) {
  const feedPosts = await fetchSortedFeedPosts(params.page, params.sort);

  if (feedPosts && feedPosts.length > 0) return <PostPreviews posts={feedPosts} />;
  if (feedPosts.length === 0 || !feedPosts) return <NoPostsFound />;
}

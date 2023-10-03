import { PostPreviews } from '@/features/posts';
import { fetchSortedFeedPosts } from '../api/fetch-sorted-feed-posts';

type userSubscriptionProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export async function FeedPosts({ params }: userSubscriptionProps) {
  const feedPosts = await fetchSortedFeedPosts(params.page, params.sort);
  console.log(feedPosts?.length);

  if (feedPosts) return <PostPreviews posts={feedPosts} />;
}

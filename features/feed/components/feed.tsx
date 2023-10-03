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
      <FeedPosts params={params} />
    </>
  );
}

import { PostPreviews } from '@/features/posts/components/post-previews';

import { NoPostsFound } from '@/components/fallbacks';
import { fetchSortedHomePosts } from '@/features/homepage/api/fetch-sorted-home-posts';

export const dynamic = 'force-dynamic';

type SpacePostsProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export default async function HomePosts({ params }: SpacePostsProps) {
  const posts = await fetchSortedHomePosts(params.page, params.sort);

  if (posts && posts.length > 0) {
    return <PostPreviews posts={posts} />;
  }
  if (posts.length === 0 || !posts) return <NoPostsFound />;
}

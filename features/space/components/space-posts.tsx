import { PostPreviews } from '@/features/posts/components/post-previews';
import { getSortedPosts } from '../api/get-space-posts';
import { NoPostsFound } from '@/components/fallbacks';

export const dynamic = 'force-dynamic';

type SpacePostsProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export default async function SpacePosts({ params }: SpacePostsProps) {
  const posts = await getSortedPosts(params.spaceId, params.page, params.sort);

  if (posts && posts.length > 0) {
    return <PostPreviews posts={posts} />;
  }
  if (posts.length === 0 || !posts) return <NoPostsFound />;
}

import { Posts } from '@/features/posts/components/posts';
import { getSortedPosts } from '@/features/space/api/get-sorted-posts';

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

  if (posts) {
    return <Posts posts={posts} />;
  }
}

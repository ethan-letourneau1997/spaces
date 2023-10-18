import { Text } from '@mantine/core';
import { Database } from '@/lib/database';
import { PostPreviewHandler } from './post-preview-handler';

export const dynamic = 'force-dynamic';

type PostsProps = {
  posts: Database['public']['Views']['detailed_post']['Row'][];
};

export async function PostPreviews({ posts }: PostsProps) {
  if (posts) {
    return (
      <div className="flex flex-col gap-2 ">
        {posts.map((post) => (
          <PostPreviewHandler key={post.id} post={post} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) return <Text>No posts found</Text>;
}

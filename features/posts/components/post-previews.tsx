import { Stack } from '@mantine/core';
import { Database } from '@/lib/database';
import { PostPreview } from './post-preview';

export const dynamic = 'force-dynamic';

type PostsProps = {
  posts: Database['public']['Views']['detailed_post']['Row'][];
};

export async function PostPreviews({ posts }: PostsProps) {
  if (posts) {
    return (
      <>
        <Stack>
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </Stack>
      </>
    );
  }
}

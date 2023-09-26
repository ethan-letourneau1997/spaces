import { Stack } from '@mantine/core';
import { Database } from '@/lib/database';
import { Post } from './post';

export const dynamic = 'force-dynamic';

type PostsProps = {
  posts: Database['public']['Views']['detailed_post']['Row'][];
};

export async function Posts({ posts }: PostsProps) {
  if (posts) {
    return (
      <>
        <Stack>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Stack>
      </>
    );
  }
}

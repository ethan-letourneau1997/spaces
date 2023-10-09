import { Stack } from '@mantine/core';
import { Database } from '@/lib/database';

import { PostVotesHandler } from './post-votes-handler';

export const dynamic = 'force-dynamic';

type PostsProps = {
  posts: Database['public']['Views']['detailed_post']['Row'][];
};

export async function PostPreviews({ posts }: PostsProps) {
  if (posts) {
    return (
      <Stack gap="xs" mt="sm">
        {posts.map((post) => (
          <PostVotesHandler key={post.id} post={post} />
        ))}
      </Stack>
    );
  }
}

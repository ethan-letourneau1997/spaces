'use client';

import { Box, Group, Text } from '@mantine/core';
import { Database } from '@/lib/database';
import { SidebarPostPreview } from './sidebar-post-preview';

type LatestFromFeedProps = {
  posts: Database['public']['Views']['detailed_post']['Row'][];
};

export function LatestFromFeed({ posts }: LatestFromFeedProps) {
  return (
    <Box mt="md">
      <Text fw={600}>The latest from your Feed</Text>

      <Group gap="xs" mt="xs">
        {posts.map((post) => (
          <SidebarPostPreview key={post.id} post={post} />
        ))}
      </Group>
    </Box>
  );
}

import { Box, Group, Divider, Text } from '@mantine/core';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '@/utils/get-time-since-now';

type CommentRootPostProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function CommentRootPost({ post }: CommentRootPostProps) {
  return (
    <Box>
      <Group gap={0}>
        <Text fw={700} size="sm">
          {post.username}
        </Text>
        &nbsp;-&nbsp;<Text size="sm">{getTimeSinceNow(post.created_at, true)}</Text>
      </Group>
      <Text maw="95%" truncate>
        {post.title}
      </Text>
      <Divider my="sm" />
    </Box>
  );
}

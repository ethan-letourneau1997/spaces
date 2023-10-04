import { Group, Text, Anchor, Divider } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { DEFAULT_SORT } from '@/lib/constants';

type CommentRootPostProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function CommentRootPost({ post }: CommentRootPostProps) {
  return (
    <>
      <Group gap={0}>
        <Text fw={600} size="sm">
          {post.title}
        </Text>
        <Text size="sm">&nbsp;-</Text>
        <Anchor
          component={Link}
          href={`/spaces/${post.id}/${post.community_name}/${DEFAULT_SORT}`}
          size="sm"
        >
          &nbsp;{post.community_name}
        </Anchor>
      </Group>
      <Divider size="xs" mt="xs" />
    </>
  );
}

'use client';

import { Anchor, AspectRatio, Card, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { PostThumbnail } from '@/features/post-thumbnail';
import { DEFAULT_SORT } from '@/lib/constants';

type SidebarPostPreviewProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function SidebarPostPreview({ post }: SidebarPostPreviewProps) {
  return (
    <Card py="xs" w="100%">
      <Group gap={0}>
        <Text size="xs">posted by&nbsp;</Text>
        <Anchor
          component={Link}
          href={`/profile/${post.username}/posts/${DEFAULT_SORT}`}
          size="xs"
          c="gray.3"
          fw={500}
        >
          {post.username}
        </Anchor>
        <Text size="xs">&nbsp;in&nbsp;</Text>{' '}
        <Anchor
          component={Link}
          href={`/spaces/${post.posted_in}/${post.community_name}/${DEFAULT_SORT}`}
          size="xs"
          c="gray.3"
          fw={500}
        >
          {post.community_name}
        </Anchor>
      </Group>
      <Anchor
        component={Link}
        href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
        mt={3}
        className="!text-sm !no-underline"
        c="gray.2"
      >
        {post.title}
      </Anchor>
      {post.type !== 'text' && (
        <div className="mt-2">
          <AspectRatio ratio={3 / 1.2}>
            <PostThumbnail post={post} />
          </AspectRatio>
        </div>
      )}
    </Card>
  );
}

'use client';

import { Anchor, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '../../../utils/get-time-since-now';
import { DEFAULT_SORT } from '@/lib/constants';

type PostPreviewHeaderProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostPreviewHeader({ post }: PostPreviewHeaderProps) {
  return (
    <div>
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
        <Text size="xs">&nbsp;-&nbsp;</Text>
        <Text mr={10} size="xs">
          {getTimeSinceNow(post.created_at, true)}
        </Text>
      </Group>
      <Link
        className="font-bold no-underline text-gray-3"
        href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
      >
        {post.title}
      </Link>
    </div>
  );
}

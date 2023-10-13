'use client';

import { Anchor, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '../../../utils/get-time-since-now';
import { DEFAULT_SORT } from '@/lib/constants';
import { PostAvatar } from './post-avatar';

type PostHeaderProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <Group gap={0}>
      <PostAvatar userId={post.created_by} />
      <Anchor
        ml={7}
        component={Link}
        href={`/profile/${post.username}/posts/${DEFAULT_SORT}`}
        size="sm"
        c="gray.3"
        fw={500}
      >
        {post.username}
      </Anchor>
      <Text size="sm">&nbsp;in&nbsp;</Text>{' '}
      <Anchor
        component={Link}
        href={`/spaces/${post.posted_in}/${post.community_name}/${DEFAULT_SORT}`}
        size="sm"
        c="gray.3"
        fw={500}
      >
        {post.community_name}
      </Anchor>
      <Text size="sm">&nbsp;-&nbsp;</Text>
      <Text size="sm">{getTimeSinceNow(post.created_at, true)}</Text>
    </Group>
  );
}

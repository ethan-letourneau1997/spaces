'use client';

import { Anchor, Card, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ProfileSort } from '@/features/profile-sort';

export function ProfileHeader() {
  const params = useParams();
  const pathname = usePathname();

  const commentsOrPosts = pathname.includes('/comments') ? 'comments' : 'posts';

  return (
    <Card>
      <Flex justify="space-between">
        <Group>
          <Anchor
            c={`${params.sort === 'new' ? 'indigo.5' : 'gray.3'}`}
            underline={`${params.sort === 'new' ? 'always' : 'hover'}`}
            component={Link}
            href={`/profile/${params.username}/${commentsOrPosts}/new/1`}
          >
            New
          </Anchor>
          <Anchor
            c={`${params.sort === 'old' ? 'indigo.5' : 'gray.3'}`}
            underline={`${params.sort === 'old' ? 'always' : 'hover'}`}
            component={Link}
            href={`/profile/${params.username}/${commentsOrPosts}/old/1`}
          >
            Old
          </Anchor>
          <Anchor
            c={`${params.sort === 'top' ? 'indigo.5' : 'gray.3'}`}
            underline={`${params.sort === 'top' ? 'always' : 'hover'}`}
            component={Link}
            href={`/profile/${params.username}/${commentsOrPosts}/top/1`}
          >
            Top
          </Anchor>
        </Group>
        <ProfileSort />
      </Flex>
    </Card>
  );
}

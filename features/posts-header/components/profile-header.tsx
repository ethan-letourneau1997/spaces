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
            className="!no-underline tracking-wide"
            fw={500}
            c={`${params.sort === 'new' ? 'orange.5' : 'gray.3'}`}
            component={Link}
            href={`/profile/${params.username}/${commentsOrPosts}/new/1`}
          >
            New
          </Anchor>
          <Anchor
            className="!no-underline tracking-wide"
            fw={500}
            c={`${params.sort === 'old' ? 'orange.5' : 'gray.3'}`}
            component={Link}
            href={`/profile/${params.username}/${commentsOrPosts}/old/1`}
          >
            Old
          </Anchor>
          <Anchor
            className="!no-underline tracking-wide"
            fw={500}
            c={`${params.sort === 'top' ? 'orange.5' : 'gray.3'}`}
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

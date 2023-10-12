'use client';

import { Anchor, Card, Group } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function FeedPostsHeader() {
  const params = useParams();

  return (
    <Card>
      <Group>
        <Anchor
          className="!no-underline tracking-wide"
          fw={500}
          c={`${params.sort === 'new' ? 'orange.5' : 'gray.3'}`}
          component={Link}
          href="/feed/new/1"
        >
          New
        </Anchor>
        <Anchor
          className="!no-underline tracking-wide"
          fw={500}
          c={`${params.sort === 'old' ? 'orange.5' : 'gray.3'}`}
          component={Link}
          href="/feed/old/1"
        >
          Old
        </Anchor>
        <Anchor
          className="!no-underline tracking-wide"
          fw={500}
          c={`${params.sort === 'top' ? 'orange.5' : 'gray.3'}`}
          component={Link}
          href="/feed/top/1"
        >
          Top
        </Anchor>
      </Group>
    </Card>
  );
}

'use client';

import { Anchor, Card, Group } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function ProfileCommentsHeader() {
  const params = useParams();
  return (
    <Card>
      <Group>
        <Anchor
          c={`${params.sort === 'new' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'new' ? 'always' : 'hover'}`}
          component={Link}
          href={`/profile/${params.username}/comments/new/1`}
        >
          New
        </Anchor>
        <Anchor
          c={`${params.sort === 'old' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'old' ? 'always' : 'hover'}`}
          component={Link}
          href={`/profile/${params.username}/comments/old/1`}
        >
          Old
        </Anchor>
        <Anchor
          c={`${params.sort === 'top' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'top' ? 'always' : 'hover'}`}
          component={Link}
          href={`/profile/${params.username}/comments/top/1`}
        >
          Top
        </Anchor>
      </Group>
    </Card>
  );
}

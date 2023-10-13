'use client';

import { Anchor, Card, Group, Input } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function SpacePageHeader() {
  const params = useParams();

  if (!params.postId) {
    return (
      <Card withBorder>
        <div className="flex gap-5">
          <Group>
            <Anchor
              className="!no-underline tracking-wide"
              fw={500}
              c={`${params.sort === 'new' ? 'orange.5' : 'gray.3'}`}
              component={Link}
              href={`/spaces/${params.spaceId}/${params.spaceName}/new/1`}
            >
              New
            </Anchor>
            <Anchor
              className="!no-underline tracking-wide"
              fw={500}
              c={`${params.sort === 'old' ? 'orange.5' : 'gray.3'}`}
              component={Link}
              href={`/spaces/${params.spaceId}/${params.spaceName}/old/1`}
            >
              Old
            </Anchor>
            <Anchor
              className="!no-underline tracking-wide"
              fw={500}
              c={`${params.sort === 'top' ? 'orange.5' : 'gray.3'}`}
              component={Link}
              href={`/spaces/${params.spaceId}/${params.spaceName}/top/1`}
            >
              Top
            </Anchor>
          </Group>
          <Input component="button" className="flex-1 " pointer>
            <Input.Placeholder>Create Post</Input.Placeholder>
          </Input>
        </div>
      </Card>
    );
  }
}

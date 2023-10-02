import { Anchor, Card, Group } from '@mantine/core';
import Link from 'next/link';

type PostsHeaderProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export function FeedHeader({ params }: PostsHeaderProps) {
  return (
    <Card>
      <Group>
        <Anchor
          c={`${params.sort === 'new' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'new' ? 'always' : 'hover'}`}
          component={Link}
          href="/feed/new/1"
        >
          New
        </Anchor>
        <Anchor
          c={`${params.sort === 'old' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'old' ? 'always' : 'hover'}`}
          component={Link}
          href="/feed/old/1"
        >
          Old
        </Anchor>
        <Anchor
          c={`${params.sort === 'top' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'top' ? 'always' : 'hover'}`}
          component={Link}
          href="/feed/top/1"
        >
          Top
        </Anchor>
      </Group>
    </Card>
  );
}

import { Anchor, Card, Group } from '@mantine/core';
import Link from 'next/link';

type SpacePostsHeaderProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export function SpacePostsHeader({ params }: SpacePostsHeaderProps) {
  return (
    <Card>
      <Group>
        <Anchor
          c={`${params.sort === 'new' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'new' ? 'always' : 'hover'}`}
          component={Link}
          href={`/spaces/${params.spaceId}/${params.spaceName}/new/1`}
        >
          New
        </Anchor>
        <Anchor
          c={`${params.sort === 'old' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'old' ? 'always' : 'hover'}`}
          component={Link}
          href={`/spaces/${params.spaceId}/${params.spaceName}/old/1`}
        >
          Old
        </Anchor>
        <Anchor
          c={`${params.sort === 'top' ? 'indigo.5' : 'gray.3'}`}
          underline={`${params.sort === 'top' ? 'always' : 'hover'}`}
          component={Link}
          href={`/spaces/${params.spaceId}/${params.spaceName}/top/1`}
        >
          Top
        </Anchor>
      </Group>
    </Card>
  );
}

import { Anchor, Card, Group } from '@mantine/core';
import Link from 'next/link';
import { NewPostButton } from './new-post-button';

type PostsHeaderProps = {
  newLink: string;
  oldLink: string;
  topLink: string;
  sort: string;
  children?: React.ReactNode;
  newPostButton?: boolean;
};

export function PostsHeader({
  newLink,
  oldLink,
  topLink,
  sort,
  children,
  newPostButton = true,
}: PostsHeaderProps) {
  return (
    <Card className="!bg-dark-6.5" withBorder mb="sm">
      <div className="flex justify-between gap-7">
        <Group>
          <Anchor
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow' }}
            className="!no-underline tracking-wide"
            fw={600}
            size="lg"
            // c={`${sort === 'new' ? 'orange.5' : 'gray.3'}`}
            component={Link}
            href={newLink}
          >
            New
          </Anchor>
          <Anchor
            className="!no-underline tracking-wide"
            fw={500}
            size="lg"
            c={`${sort === 'old' ? 'orange.5' : 'gray.5'}`}
            component={Link}
            href={oldLink}
          >
            Old
          </Anchor>
          <Anchor
            className="!no-underline tracking-wide"
            fw={500}
            size="lg"
            c={`${sort === 'top' ? 'orange.5' : 'gray.5'}`}
            component={Link}
            href={topLink}
          >
            Top
          </Anchor>
        </Group>
        {newPostButton && <NewPostButton />}
        {children}
      </div>
    </Card>
  );
}

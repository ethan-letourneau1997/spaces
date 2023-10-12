'use client';

import { Anchor, Group, Stack } from '@mantine/core';
import Link from 'next/link';
import { CiStar } from 'react-icons/ci';
import { Database } from '@/lib/database';
import { DEFAULT_SORT } from '@/lib/constants';
import { FeedSpaceAvatar } from './feed-space-avatar';

type SidebarSpacesProps = {
  spaces: Database['public']['Tables']['community']['Row'][];
};

export function SidebarSpaces({ spaces }: SidebarSpacesProps) {
  return (
    <Stack gap="md" mt="xs">
      {spaces.map((space) => (
        <Group key={space.id} justify="space-between">
          <Group key={space.id} gap="xs">
            <FeedSpaceAvatar spaceId={space.id} />
            <Anchor
              href={`/spaces/${space.id}/${space.name}/${DEFAULT_SORT}`}
              component={Link}
              c="gray.4"
            >
              {space.display_name}
            </Anchor>
          </Group>
          <CiStar className="text-gray-6" size={20} />
        </Group>
      ))}
    </Stack>
  );
}

'use client';

import { Anchor, Stack } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { DEFAULT_SORT } from '@/lib/constants';

type SidebarSpacesProps = {
  spaces: Database['public']['Tables']['community']['Row'][];
};

export function SidebarSpaces({ spaces }: SidebarSpacesProps) {
  return (
    <Stack gap="xs">
      {spaces.map((space) => (
        <Anchor
          key={space.id}
          component={Link}
          href={`/spaces/${space.id}/${space.name}/${DEFAULT_SORT}`}
        >
          {space.display_name}
        </Anchor>
      ))}
    </Stack>
  );
}

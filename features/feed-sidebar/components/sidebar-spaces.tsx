'use client';

import { Anchor, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { DEFAULT_SORT } from '@/lib/constants';

type SidebarSpacesProps = {
  spaces: Database['public']['Tables']['community']['Row'][];
};

export function SidebarSpaces({ spaces }: SidebarSpacesProps) {
  return (
    <>
      <Text>My Spaces</Text>
      <Stack gap="xs" mt="xs">
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
    </>
  );
}

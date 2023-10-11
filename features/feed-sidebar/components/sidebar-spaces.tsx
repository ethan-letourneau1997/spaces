'use client';

import { Paper, SimpleGrid } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { DEFAULT_SORT } from '@/lib/constants';

type SidebarSpacesProps = {
  spaces: Database['public']['Tables']['community']['Row'][];
};

export function SidebarSpaces({ spaces }: SidebarSpacesProps) {
  return (
    <>
      <SimpleGrid cols={2} spacing="xs" pt="xs">
        {spaces.map((space) => (
          <Paper
            href={`/spaces/${space.id}/${space.name}/${DEFAULT_SORT}`}
            component={Link}
            py={8}
            px="sm"
            bg="transparent"
            withBorder
            c="gray.4"
            ta="center"
          >
            {space.display_name}
          </Paper>
        ))}
      </SimpleGrid>
    </>
  );
}

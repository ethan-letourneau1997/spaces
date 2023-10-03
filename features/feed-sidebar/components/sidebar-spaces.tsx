'use client';

import { Box, Stack } from '@mantine/core';
import { Database } from '@/lib/database';

type SidebarSpacesProps = {
  spaces: Database['public']['Tables']['community']['Row'][];
};

export function SidebarSpaces({ spaces }: SidebarSpacesProps) {
  return (
    <Stack gap="xs">
      {spaces.map((space) => (
        <Box key={space.id}>{space.name}</Box>
      ))}
    </Stack>
  );
}

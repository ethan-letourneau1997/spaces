'use client';

import { List } from '@mantine/core';
import { Database } from '@/lib/database';

type SidebarSpacesProps = {
  spaces: Database['public']['Tables']['community']['Row'][];
};

export function SidebarSpaces({ spaces }: SidebarSpacesProps) {
  return (
    <List>
      {spaces.map((space) => (
        <List.Item key={space.id}>{space.name}</List.Item>
      ))}
    </List>
  );
}

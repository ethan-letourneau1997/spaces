'use client';

import { Title, Text, Divider } from '@mantine/core';
import { SidebarWrapper } from '@/features/sidebar-wrapper';

export function SavedPostsSidebar() {
  return (
    <SidebarWrapper>
      <Title ta="center" c="gray.3" order={2}>
        Saved Posts
      </Title>
      <Divider mb="xs" mt={5} />
      <Text ta="center">Posts you have saved for later.</Text>
    </SidebarWrapper>
  );
}

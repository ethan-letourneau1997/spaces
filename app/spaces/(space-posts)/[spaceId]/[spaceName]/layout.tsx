import { Box, Flex, Space } from '@mantine/core';

import { SpaceSidebar } from '@/features/space-sidebar';
import '@mantine/core/styles.css';
import { SpacePostsHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <Flex gap="md">
      <SpacePostsHeader />
      <Space h="md" />
      <Box w="100%">{children}</Box>
      <Box miw="300px">
        <SpaceSidebar />
      </Box>
    </Flex>
  );
}

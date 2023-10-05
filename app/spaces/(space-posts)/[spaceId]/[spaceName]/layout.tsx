import { Box, Flex, Space } from '@mantine/core';

import { SpaceSidebar } from '@/features/space-sidebar';
import '@mantine/core/styles.css';
import { SpacePostsHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <Flex gap="md">
      <Box w="100%">
        <SpacePostsHeader />
        <Space h="md" />
        {children}
      </Box>
      <Box miw="300px">
        <SpaceSidebar />
      </Box>
    </Flex>
  );
}

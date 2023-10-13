import { Box, Flex } from '@mantine/core';

import { SpaceSidebar } from '@/features/space-sidebar';
import '@mantine/core/styles.css';
import { SpacePostsHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <Flex gap="md" className="mt-0 sm:mt-3">
      <Box w="100%">
        <SpacePostsHeader />
        {children}
      </Box>
      <SpaceSidebar />
    </Flex>
  );
}

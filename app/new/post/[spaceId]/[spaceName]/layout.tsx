import { Box, Flex } from '@mantine/core';

import { SpaceSidebar } from '@/features/space-sidebar';
import '@mantine/core/styles.css';

export const dynamic = 'force-dynamic';

export default function NewSpacePostLayout({ children }: { children: any }) {
  return (
    <Flex gap="md">
      <Box w="100%">{children}</Box>
      <SpaceSidebar />
    </Flex>
  );
}

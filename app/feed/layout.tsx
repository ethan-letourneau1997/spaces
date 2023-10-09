import { Box, Flex } from '@mantine/core';
import { FeedSidebar } from '@/features/feed-sidebar';

export const dynamic = 'force-dynamic';

export default function FeedLayout({ children }: { children: any }) {
  return (
    <>
      <Flex gap="md">
        <Box w="100%">{children}</Box>
        <FeedSidebar />
      </Flex>
    </>
  );
}

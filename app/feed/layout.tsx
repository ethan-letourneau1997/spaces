import { Box, Flex } from '@mantine/core';
import { Suspense } from 'react';
import { FeedSidebar } from '@/features/feed-sidebar';

export const dynamic = 'force-dynamic';

export default function FeedLayout({ children }: { children: any }) {
  return (
    <>
      <Flex gap="md">
        <Box w="100%">{children}</Box>
        <Suspense fallback={<div>loading..</div>}>
          <FeedSidebar />
        </Suspense>
      </Flex>
    </>
  );
}

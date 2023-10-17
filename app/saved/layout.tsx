import { Box, Flex } from '@mantine/core';
import { SavedPostsSidebar } from '@/features/saved-posts';

export const dynamic = 'force-dynamic';

export default function SavedPostLaout({ children }: { children: any }) {
  return (
    <>
      <Flex gap="md">
        <Box w="100%">{children}</Box>
        <SavedPostsSidebar />
      </Flex>
    </>
  );
}

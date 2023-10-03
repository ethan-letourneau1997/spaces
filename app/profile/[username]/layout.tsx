import { Box, Flex, Space } from '@mantine/core';

import '@mantine/core/styles.css';

import { ProfileSidebar } from '@/features/profile-sidebar';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <Flex gap="md">
      <Space h="md" />
      <Box w="100%">{children}</Box>
      <Box miw="300px">
        <ProfileSidebar />
      </Box>
    </Flex>
  );
}

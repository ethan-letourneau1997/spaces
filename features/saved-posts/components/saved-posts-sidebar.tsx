'use client';

import { Title, Text, Divider, Box, Flex } from '@mantine/core';
import useSWR from 'swr';
import { PiSignpostFill } from 'react-icons/pi';
import { SidebarWrapper } from '@/features/sidebar-wrapper';
import { fetchUserSavedCount } from '../api/fetch-user-saved-count';

export function SavedPostsSidebar() {
  const { data: savedCount } = useSWR('savedCount', async () => {
    const count = await fetchUserSavedCount();
    return count;
  });
  return (
    <SidebarWrapper>
      <Title ta="center" c="gray.3" order={2}>
        Saved Posts
      </Title>
      <div className="text-sm text-center text-gray-5">Posts you have saved for later.</div>
      <Divider mb="xs" mt={5} />

      <Box ta="center">
        <Flex align="center" gap="xs" justify="center">
          <PiSignpostFill />
          <Text>{savedCount || 0}</Text>
        </Flex>
        <span className="text-center text-gray-3 ">Posts Saved</span>
      </Box>
    </SidebarWrapper>
  );
}

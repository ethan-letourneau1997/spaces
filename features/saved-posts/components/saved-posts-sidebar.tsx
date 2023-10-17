'use client';

import { Title, Divider, Box, Flex } from '@mantine/core';
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
      <div className="mb-2 text-sm text-center text-gray-5">Posts you have saved for later.</div>
      <Divider mb="xs" />
      <Box ta="center">
        <Flex align="center" gap="xs" justify="center">
          <PiSignpostFill size={20} />
          <span className="text-lg font-semibold">{savedCount || 0}</span>
        </Flex>
        <span className="text-center text-gray-3 ">Posts Saved</span>
      </Box>
    </SidebarWrapper>
  );
}

import { Box, Flex } from '@mantine/core';

import { ProfileSidebar } from '@/features/profile-sidebar';
import { ProfileHeader } from './profile-header';
import { ProfilePagination } from './profile-pagination';

export const dynamic = 'force-dynamic';

export default function ProfileLayout({ children }: { children: any }) {
  return (
    <Flex gap="md">
      <Box w="100%">
        <ProfileHeader />
        {children}
        <ProfilePagination />
      </Box>

      <ProfileSidebar />
    </Flex>
  );
}

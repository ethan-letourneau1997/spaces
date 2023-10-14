import { Box, Flex } from '@mantine/core';
import { HomePagination } from '@/features/pagination/components/home-pagination';
import { HomePostsHeader } from '@/features/posts-header';
import { HomeSidebar } from '@/features/home-sidebar';

export const dynamic = 'force-dynamic';

export default function PostsLayout({ children }: { children: any }) {
  return (
    <>
      <Flex gap="md">
        <Box w="100%">
          <HomePostsHeader />
          {children}
          <HomePagination />
        </Box>
        <HomeSidebar />
      </Flex>
    </>
  );
}

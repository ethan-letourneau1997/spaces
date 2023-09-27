import { Flex } from '@mantine/core';
import { PostPagination } from '@/features/post-pagination';
import { SpaceSidebar } from '@/features/space-sidebar';
import '@mantine/core/styles.css';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <Flex gap="md">
      <div>
        {children}
        <PostPagination />
      </div>
      <SpaceSidebar />
    </Flex>
  );
}

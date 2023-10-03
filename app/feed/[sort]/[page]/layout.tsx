import { Space } from '@mantine/core';
import { FeedPagination } from '@/features/pagination';
import { FeedPostsHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <>
      <FeedPostsHeader />
      <Space h="md" />
      {children}
      <FeedPagination />
    </>
  );
}

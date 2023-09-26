import { PostPagination } from '@/features/post-pagination';
import '@mantine/core/styles.css';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <>
      {children}
      <PostPagination />
    </>
  );
}

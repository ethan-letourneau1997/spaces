import { FeedPagination } from '@/features/pagination';

export const dynamic = 'force-dynamic';

export default function SpaceLayout({ children }: { children: any }) {
  return (
    <>
      {children}
      <FeedPagination />
    </>
  );
}

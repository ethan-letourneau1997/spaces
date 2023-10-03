import { ProfilePostPagination } from '@/features/pagination';
import { ProfilePostsHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function ProfilePostLayout({ children }: { children: any }) {
  return (
    <>
      <ProfilePostsHeader />
      {children}
      <ProfilePostPagination />
    </>
  );
}

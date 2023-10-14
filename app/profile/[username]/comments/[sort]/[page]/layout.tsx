import { ProfileCommentPagination } from '@/features/pagination';
import { ProfileContentHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function ProfilePostLayout({ children }: { children: any }) {
  return (
    <>
      <ProfileContentHeader />
      {children}
      <ProfileCommentPagination />
    </>
  );
}

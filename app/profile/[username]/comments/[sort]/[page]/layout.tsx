import { ProfileCommentPagination } from '@/features/pagination';
import { ProfileCommentsHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function ProfilePostLayout({ children }: { children: any }) {
  return (
    <>
      <ProfileCommentsHeader />
      {children}
      <ProfileCommentPagination />
    </>
  );
}

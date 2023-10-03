import { ProfileCommentPagination } from '@/features/pagination';

export const dynamic = 'force-dynamic';

export default function ProfilePostLayout({ children }: { children: any }) {
  return (
    <>
      {children}
      <ProfileCommentPagination />
    </>
  );
}

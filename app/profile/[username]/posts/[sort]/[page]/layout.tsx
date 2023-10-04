import { ProfilePostPagination } from '@/features/pagination';
import { ProfileHeader } from '@/features/posts-header';

export const dynamic = 'force-dynamic';

export default function ProfilePostLayout({ children }: { children: any }) {
  return (
    <>
      <ProfileHeader />
      {children}
      <ProfilePostPagination />
    </>
  );
}

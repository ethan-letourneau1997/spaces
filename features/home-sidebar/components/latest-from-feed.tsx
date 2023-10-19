import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { fetchLatestFromFeed } from '../api/fetch-latest-from-feed';
import { SidebarPostPreviews } from '@/features/sidebar-post-previews';
import { DEFAULT_SORT } from '@/lib/constants';

type LatestFromFeedProps = {
  userId: string;
};

export async function LatestFromFeed({ userId }: LatestFromFeedProps) {
  const latestPosts = await fetchLatestFromFeed(userId);
  const header = (
    <Link
      href={`/feed/${DEFAULT_SORT}`}
      className="flex items-center mb-3 -mt-1 text-xs font-semibold gap-0.5 text-gray-4 no-underline group hover:text-white"
    >
      <span className="">Posts From Your Feed</span>
      <FiChevronRight />
    </Link>
  );

  return (
    <div className="mt-3">
      <SidebarPostPreviews posts={latestPosts} header={header} />
    </div>
  );
}

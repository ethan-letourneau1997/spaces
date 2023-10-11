import { Suspense } from 'react';

import { PostPreviews } from '@/features/posts';
import { fetchSortedProfilePosts } from '../api/fetch-sorted-profile-posts';
import { PostsSkeleton } from '@/components/PostsSkeleton';
import { NoPostsFound } from '@/components/fallbacks';

type ProfilePostsProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export async function ProfilePosts({ params }: ProfilePostsProps) {
  const { page, sort, username } = params;
  const profilePosts = await fetchSortedProfilePosts(page, sort, username);

  if (profilePosts && profilePosts.length > 0) {
    return (
      <Suspense fallback={<PostsSkeleton />}>
        <PostPreviews posts={profilePosts} />
      </Suspense>
    );
  }
  if (profilePosts.length === 0 || !profilePosts) return <NoPostsFound />;
}

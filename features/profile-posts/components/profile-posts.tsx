import { Suspense } from 'react';
import { PostPreviews } from '@/features/posts';
import { fetchSortedProfilePosts } from '../api/fetch-sorted-profile-posts';
import { PostsSkeleton } from '@/components/PostsSkeleton';

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

  if (profilePosts) {
    return (
      <Suspense fallback={<PostsSkeleton />}>
        <PostPreviews posts={profilePosts} />
      </Suspense>
    );
  }
}

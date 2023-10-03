import { PostPreviews } from '@/features/posts';
import { fetchSortedProfilePosts } from '../api/fetch-sorted-profile-posts';

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
  console.log(profilePosts);

  if (profilePosts) return <PostPreviews posts={profilePosts} />;
}

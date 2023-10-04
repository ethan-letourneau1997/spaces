import { Box } from '@mantine/core';
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

  if (profilePosts) {
    return (
      <Box mt="sm">
        <PostPreviews posts={profilePosts} />
      </Box>
    );
  }
}

import { Stack } from '@mantine/core';
import { fetchSortedProfileComments } from '../api/fetch-sorted-profile-comments';
import { Database } from '@/lib/database';

type ProfileCommentProps = {
  comment: Database['public']['Tables']['comment']['Row'];
};

export async function ProfileComment({ comment }: ProfileCommentProps) {
  return <div>{comment.content}</div>;
}

type ProfilePostsProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export async function ProfileComments({ params }: ProfilePostsProps) {
  const { page, sort, username } = params;
  const profileComments = await fetchSortedProfileComments(username, sort, page);

  if (profileComments) {
    return (
      <Stack>
        {profileComments.map((comment) => (
          <ProfileComment key={comment.id} comment={comment} />
        ))}
      </Stack>
    );
  }
}

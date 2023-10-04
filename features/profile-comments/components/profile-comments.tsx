import { Stack } from '@mantine/core';
import { fetchSortedProfileComments } from '../api/fetch-sorted-profile-comments';

import { ProfileComment } from './profile-comment';

type ProfileCommentsProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export async function ProfileComments({ params }: ProfileCommentsProps) {
  const { page, sort, username } = params;
  const profileComments = await fetchSortedProfileComments(username, sort, page);

  if (profileComments) {
    return (
      <Stack mt="md">
        {profileComments.map((comment) => (
          <ProfileComment key={comment.id} comment={comment} username={username} />
        ))}
      </Stack>
    );
  }
}

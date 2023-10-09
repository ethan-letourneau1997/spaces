'use client';

import { Box, Flex, Text } from '@mantine/core';
import { PiSignpostFill } from 'react-icons/pi';
import useSWR from 'swr';
import { fetchProfilePostCount } from '../api/fetch-profile-post-count';
import { postCountPlaceholder } from './profile-sidebar-placeholders';

type ProfilePostCountProps = {
  userId: string;
};

export function ProfilePostCount({ userId }: ProfilePostCountProps) {
  const { data: postCount } = useSWR('commentCount', async () => {
    const count = await fetchProfilePostCount(userId);
    return count;
  });

  if (postCount) {
    return (
      <Box>
        <Flex align="center" gap="xs" justify="center">
          <PiSignpostFill />
          <Text>{postCount}</Text>
        </Flex>
        <Text ta="center">Posts</Text>
      </Box>
    );
  }

  return postCountPlaceholder;
}

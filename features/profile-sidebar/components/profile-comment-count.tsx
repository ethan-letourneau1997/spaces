'use client';

import { Box, Flex, Text } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';
import useSWR from 'swr';
import { fetchProfileCommentCount } from '../api/fetch-profile-comment-count';
import { CommentCountPlaceholder } from './profile-sidebar-placeholders';

type ProfileCommentCountProps = {
  userId: string;
};

export function ProfileCommentCount({ userId }: ProfileCommentCountProps) {
  const { data: commentCount } = useSWR('commentCount', async () => {
    const count = await fetchProfileCommentCount(userId);
    return count;
  });

  if (commentCount) {
    return (
      <Box>
        <Flex align="center" gap="xs" justify="center">
          <FaCommentAlt />
          <Text>{commentCount}</Text>
        </Flex>
        <Text ta="center">Comments</Text>
      </Box>
    );
  }

  return <CommentCountPlaceholder />;
}

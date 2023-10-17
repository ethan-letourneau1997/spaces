'use client';

import { Box, Flex, Text } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';
import useSWR from 'swr';
import Link from 'next/link';
import { fetchProfileCommentCount } from '../api/fetch-profile-comment-count';
import { CommentCountPlaceholder } from './profile-sidebar-placeholders';
import { Database } from '@/lib/database';
import { DEFAULT_SORT } from '@/lib/constants';

type ProfileCommentCountProps = {
  profile: Database['public']['Tables']['public_profile']['Row'];
};

export function ProfileCommentCount({ profile }: ProfileCommentCountProps) {
  const { data: commentCount } = useSWR('commentCount', async () => {
    const count = await fetchProfileCommentCount(profile.id);
    return count;
  });

  if (commentCount) {
    return (
      <Box ta="center">
        <Flex align="center" gap="xs" justify="center">
          <FaCommentAlt />
          <Text>{commentCount}</Text>
        </Flex>
        <Link
          className="text-center no-underline text-gray-3 hover:underline"
          href={`/profile/${profile.username}/comments/${DEFAULT_SORT}`}
        >
          Comments
        </Link>
      </Box>
    );
  }

  return <CommentCountPlaceholder />;
}

'use client';

import { Box, Flex, Text } from '@mantine/core';
import { PiSignpostFill } from 'react-icons/pi';
import useSWR from 'swr';
import Link from 'next/link';
import { fetchProfilePostCount } from '../api/fetch-profile-post-count';
import { PostCountPlaceholder } from './profile-sidebar-placeholders';
import { Database } from '@/lib/database';
import { DEFAULT_SORT } from '@/lib/constants';

type ProfilePostCountProps = {
  profile: Database['public']['Tables']['public_profile']['Row'];
};

export function ProfilePostCount({ profile }: ProfilePostCountProps) {
  const { data: postCount } = useSWR('commentCount', async () => {
    const count = await fetchProfilePostCount(profile.id);
    return count;
  });

  if (postCount) {
    return (
      <Box ta="center">
        <Flex align="center" gap="xs" justify="center">
          <PiSignpostFill />
          <Text>{postCount}</Text>
        </Flex>
        <Link
          className="text-center no-underline text-gray-3 hover:underline"
          href={`/profile/${profile.username}/posts/${DEFAULT_SORT}`}
        >
          Posts
        </Link>
      </Box>
    );
  }

  return <PostCountPlaceholder />;
}

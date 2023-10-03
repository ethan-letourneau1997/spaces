'use client';

import useSWR from 'swr';

import { useParams } from 'next/navigation';
import { Box, Divider, Flex, SimpleGrid, Text } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';
import { PiSignpostFill } from 'react-icons/pi';
import { fetchProfileByUsername } from '@/utils/fetch-profile-by-username';
import { fetchProfileCommentCount } from '../api/fetch-profile-comment-count';
import { fetchProfilePostCount } from '../api/fetch-profile-post-count';

export function ProfileSidebarDetails() {
  const params = useParams();
  const { data: profile } = useSWR('profile', async () => {
    const userProfile = await fetchProfileByUsername(params.username);
    return userProfile;
  });

  // eslint-disable-next-line consistent-return
  const { data: commentCount } = useSWR('commentCount', async () => {
    if (profile) {
      const count = await fetchProfileCommentCount(profile.id);
      return count;
    }
  });

  // eslint-disable-next-line consistent-return
  const { data: postCount } = useSWR('postCount', async () => {
    if (profile) {
      const count = await fetchProfilePostCount(profile.id);
      return count;
    }
  });

  if (commentCount && postCount) {
    return (
      <>
        <Text ta="center">{profile.biography}</Text>
        <Divider my="sm" />
        <SimpleGrid cols={2}>
          <Box>
            <Flex align="center" gap="xs" justify="center">
              <PiSignpostFill />
              <Text>{postCount}</Text>
            </Flex>
            <Text ta="center">Posts</Text>
          </Box>
          <Box>
            <Flex align="center" gap="xs" justify="center">
              <FaCommentAlt />
              <Text>{commentCount}</Text>
            </Flex>
            <Text ta="center">Comments</Text>
          </Box>
        </SimpleGrid>
      </>
    );
  }
}

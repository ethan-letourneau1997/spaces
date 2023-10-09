'use client';

import { Divider, SimpleGrid, Text } from '@mantine/core';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { ProfilePostCount } from './profile-post-count';
import { ProfileCommentCount } from './profile-comment-count';
import { fetchProfileByUsername } from '@/utils/fetch-profile-by-username';

export function ProfileSidebarDetails() {
  const params = useParams();

  // eslint-disable-next-line consistent-return
  const { data: profile } = useSWR('profile', async () => {
    if (params.username) {
      const userProfile = await fetchProfileByUsername(params.username as string);
      return userProfile;
    }
  });
  if (profile) {
    return (
      <>
        <Text ta="center">{profile.biography}</Text>
        <Divider my="sm" />
        <SimpleGrid cols={2}>
          <ProfilePostCount userId={profile.id} />
          <ProfileCommentCount userId={profile.id} />
        </SimpleGrid>
      </>
    );
  }
}

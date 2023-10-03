'use client';

import useSWR from 'swr';

import { useParams } from 'next/navigation';
import { Avatar, Center } from '@mantine/core';

import { fetchProfileByUsername } from '@/utils/fetch-profile-by-username';

import { fetchAvatar } from '@/utils/fetch-avatar';

export function ProfileAvatar() {
  const params = useParams();
  const { data: profile } = useSWR('profile', async () => {
    const userProfile = await fetchProfileByUsername(params.username);
    return userProfile;
  });

  // eslint-disable-next-line consistent-return
  const { data: avatarUrl } = useSWR('avatarUrl', async () => {
    if (profile) {
      const userAvatar = await fetchAvatar(profile.id);
      return userAvatar.path;
    }
  });

  if (avatarUrl) {
    return (
      <Center>
        <Avatar src={avatarUrl} alt="it's me" size="lg" />
      </Center>
    );
  }
}

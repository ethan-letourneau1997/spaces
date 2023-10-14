'use client';

import useSWR from 'swr';

import { Avatar, Center, Skeleton } from '@mantine/core';
import { useParams } from 'next/navigation';
import { IoPlanetOutline } from 'react-icons/io5';
import { fetchSpaceAvatar } from '@/utils/fetch-space-avatar';
import { avatarPlaceholder } from './space-sidebar-placeholders';

// TODO uncomment avatar

export function SpaceAvatar() {
  const params = useParams();

  // eslint-disable-next-line consistent-return
  const { data: avatarUrl } = useSWR('avatarUrl', async () => {
    const avatar = await fetchSpaceAvatar(params.spaceId as string);
    if (avatar) {
      return avatar.path;
    }
    return null;
  });

  if (avatarUrl) {
    return (
      <Center>
        <Avatar src={avatarUrl} size="lg" radius="sm">
          <Skeleton circle h={56} w={56} />
        </Avatar>
      </Center>
    );
  }

  if (avatarUrl === null) {
    return (
      <Center>
        <Avatar size="lg">
          <IoPlanetOutline />
        </Avatar>
      </Center>
    );
  }

  return avatarPlaceholder;
}

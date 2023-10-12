'use client';

import { Avatar, Center, Skeleton } from '@mantine/core';
import { IoPlanetOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { fetchSpaceAvatar } from '@/utils/fetch-space-avatar';

// TODO uncomment avatar

type FeedSpaceAvatarProps = {
  spaceId: number;
};

export function FeedSpaceAvatar({ spaceId }: FeedSpaceAvatarProps) {
  // eslint-disable-next-line consistent-return
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getSpaceAvatar() {
      const avatar = await fetchSpaceAvatar(spaceId);
      if (avatar) {
        setAvatarUrl(avatar.path);
      }
      return null;
    }

    getSpaceAvatar();
  }, [spaceId]);

  if (avatarUrl) {
    return (
      <Center>
        <Avatar src={avatarUrl} size="sm">
          <Skeleton circle h={26} w={26} />
        </Avatar>
      </Center>
    );
  }

  if (avatarUrl === null) {
    return (
      <Center>
        <Avatar bg="dark.6" size="sm">
          <IoPlanetOutline />
        </Avatar>
      </Center>
    );
  }

  return (
    <Center>
      <Skeleton circle h={26} w={26} />
    </Center>
  );
}

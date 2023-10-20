'use client';

import useSWR from 'swr';
import { Avatar, Center } from '@mantine/core';
import { useParams } from 'next/navigation';
import { IoPlanetOutline } from 'react-icons/io5';
import Image from 'next/image';
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
      <div className="w-[56px] h-[56px] relative mx-auto">
        <Image
          className="rounded-full"
          src={avatarUrl}
          alt="img name"
          layout="fill"
          objectFit="cover"
        />
      </div>
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

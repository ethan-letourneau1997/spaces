'use client';

import Image from 'next/image';
import useSWR from 'swr';
import { Skeleton } from '@mantine/core';
import { fetchAvatar } from '@/utils/fetch-avatar';

type PostAvatarProps = {
  userId: string;
};

export function PostAvatar({ userId }: PostAvatarProps) {
  const { data: avatar } = useSWR('avatar', async () => {
    const userAvatar = await fetchAvatar(userId);
    return userAvatar;
  });

  if (avatar) {
    return (
      <div className="w-[28px] h-[28px] relative ">
        <Image
          className="rounded-full"
          src={avatar.path}
          alt="img name"
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }

  return <Skeleton circle w={28} h={28} />;
}

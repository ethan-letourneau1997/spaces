'use client';

import Image from 'next/image';
import useSWR from 'swr';
import { fetchAvatar } from '@/utils/fetch-avatar';

type PostAvatarProps = {
  userId: string;
};

export function PostAvatar({ userId }: PostAvatarProps) {
  const { data: avatar } = useSWR('avatar', async () => {
    const userAvatar = await fetchAvatar(userId);
    return userAvatar;
  });

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

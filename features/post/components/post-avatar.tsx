'use client';

import { Avatar } from '@mantine/core';

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

  if (avatar) {
    return <Avatar size="sm" src={avatar.path} placeholder="UA" />;
  }
}

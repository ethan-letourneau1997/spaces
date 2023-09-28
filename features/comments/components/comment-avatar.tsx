'use client';

import { Avatar } from '@mantine/core';

import useSWR from 'swr';

import { fetchAvatar } from '@/utils/fetch-avatar';

type CommentAvatarProps = {
  userId: string;
};

export function CommentAvatar({ userId }: CommentAvatarProps) {
  const { data: avatar } = useSWR('avatar', async () => {
    const userAvatar = await fetchAvatar(userId);
    return userAvatar;
  });

  if (avatar) return <Avatar size="sm" src={avatar.path} />;
}

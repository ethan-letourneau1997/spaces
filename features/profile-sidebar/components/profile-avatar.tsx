'use client';

import useSWR from 'swr';

import { Center, Skeleton } from '@mantine/core';
import { useParams } from 'next/navigation';
import { fetchAvatar } from '@/utils/fetch-avatar';
import { AvatarPlaceholder } from './profile-sidebar-placeholders';

// TODO uncomment avatar

type ProfileAvatarProps = {
  userId: string;
};

export function ProfileAvatar({ userId }: ProfileAvatarProps) {
  const params = useParams();
  // eslint-disable-next-line consistent-return
  const { data: avatarUrl } = useSWR('avatarUrl', async () => {
    if (params.username) {
      const userAvatar = await fetchAvatar(userId);
      return userAvatar.path;
    }
  });

  if (avatarUrl) {
    return (
      <Center>
        {/* <Avatar src={avatarUrl} size="lg"> */}
        <Skeleton circle h={56} w={56} />
        {/* </Avatar> */}
      </Center>
    );
  }

  return <AvatarPlaceholder />;
}

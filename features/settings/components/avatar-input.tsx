'use client';

import { Avatar, Group, Input } from '@mantine/core';
import { ProfileAvatarModal } from './profile-avatar-modal';
import { Database } from '@/lib/database';

type AvatarInputProps = {
  userId: string;
  avatar?: Database['public']['Tables']['profile_avatar']['Row'];
};

export function AvatarInput({ userId, avatar }: AvatarInputProps) {
  return (
    <>
      <Input.Wrapper label="Avatar" description="Your avatar / profile picture">
        <Group mt="md">
          <Avatar size="xl" src={avatar?.path} alt="it's me" />
          <ProfileAvatarModal userId={userId} profileAvatar={avatar} />
        </Group>
      </Input.Wrapper>
    </>
  );
}

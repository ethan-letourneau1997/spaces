'use client';

import { Image, Input, Box } from '@mantine/core';
import { Database } from '@/lib/database';
import { NewAvatarModal } from './new-avatar-modal';

type DisplayAvatarProps = {
  avatar?:
    | Database['public']['Tables']['community_avatar']['Row']
    | Database['public']['Tables']['profile_avatar']['Row'];
  id: string;
};

export function DisplayAvatar({ avatar, id }: DisplayAvatarProps) {
  return (
    <Box>
      <Input.Wrapper mt="md" label="Avatar" description="An avatar representing the space" />
      <Image radius="sm" mt="xs" h={200} w={200} fit="cover" src={avatar.path} />
      <NewAvatarModal id={id} avatar={avatar} />
    </Box>
  );
}

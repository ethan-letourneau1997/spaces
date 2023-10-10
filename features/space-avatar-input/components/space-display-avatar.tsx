'use client';

import { Image, Input, Box } from '@mantine/core';
import { Database } from '@/lib/database';
import { NewAvatarModal } from './new-avatar-modal';

type SpaceSettingsAvatarProps = {
  avatar: Database['public']['Tables']['community_avatar']['Row'];
  spaceId: string;
};

export function SpaceDisplayAvatar({ avatar, spaceId }: SpaceSettingsAvatarProps) {
  return (
    <Box>
      <Input.Wrapper mt="md" label="Avatar" description="An avatar representing the space" />
      <Image radius="sm" mt="xs" h={200} w={200} fit="cover" src={avatar.path} />
      <NewAvatarModal spaceId={spaceId} avatar={avatar} />
    </Box>
  );
}

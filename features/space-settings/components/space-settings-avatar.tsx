'use client';

import { Avatar, Box, Input } from '@mantine/core';
import { IoPlanetOutline } from 'react-icons/io5';
import { SpaceAvatarInput } from '@/features/space-avatar-input';
import { Database } from '@/lib/database';

type SpaceSettingsAvatarProps = {
  avatar: Database['public']['Tables']['community_avatar']['Row'];
  spaceId: string;
};

export function SpaceSettingsAvatar({ avatar, spaceId }: SpaceSettingsAvatarProps) {
  return (
    <Box>
      {avatar ? (
        <Input.Wrapper label="Avatar" description="An avatar representing the space">
          <Avatar src={avatar.path} mt="xs" size="lg" />
        </Input.Wrapper>
      ) : (
        <Input.Wrapper label="Avatar" description="An avatar representing the space">
          <Avatar size="lg" mt="xs">
            <IoPlanetOutline />
          </Avatar>
        </Input.Wrapper>
      )}
      <SpaceAvatarInput spaceId={spaceId} avatar={avatar} />
    </Box>
  );
}

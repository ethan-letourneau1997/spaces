'use client';

import { Avatar, Input } from '@mantine/core';
import { IoPlanetOutline } from 'react-icons/io5';

type SpaceSettingsAvatarProps = {
  path: string | null;
};

export function SpaceSettingsAvatar({ path }: SpaceSettingsAvatarProps) {
  if (path) {
    return <Avatar src={path} size="lg" />;
  }

  return (
    <Input.Wrapper label="Avatar" description="An avatar representing the space">
      <Avatar size="lg" mt="xs">
        <IoPlanetOutline />
      </Avatar>
    </Input.Wrapper>
  );
}

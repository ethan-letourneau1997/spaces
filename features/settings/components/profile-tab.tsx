'use client';

import { Space, Title } from '@mantine/core';
import { Database } from '@/lib/database';
import { UsernameInput } from './username-input';
import { BioInput } from './bio-input';
import { AvatarInput } from './avatar-input';

type ProfileTabProps = {
  profile: Database['public']['Tables']['public_profile']['Row'];
  avatar?: Database['public']['Tables']['profile_avatar']['Row'];
};

export function ProfileTab({ profile, avatar }: ProfileTabProps) {
  if (profile) {
    return (
      <>
        <Title order={1} size="h3" mt="md">
          Profile Settings
        </Title>
        <Space h="md" />
        <UsernameInput username={profile.username} />
        <BioInput profile={profile} />
        <AvatarInput avatar={avatar} userId={profile.id} />
      </>
    );
  }
}

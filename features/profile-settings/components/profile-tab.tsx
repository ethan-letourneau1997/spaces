'use client';

import { Card } from '@mantine/core';
import { Database } from '@/lib/database';
import { UsernameInput } from './username-input';
import { BioInput } from './bio-input';
import { AvatarInput } from '@/features/avatar-input';

type ProfileTabProps = {
  profile: Database['public']['Tables']['public_profile']['Row'];
  avatar?: Database['public']['Tables']['profile_avatar']['Row'];
};

export function ProfileTab({ profile, avatar }: ProfileTabProps) {
  if (profile) {
    return (
      <Card>
        <UsernameInput username={profile.username} />
        <BioInput profile={profile} />
        <AvatarInput avatar={avatar} id={profile.id} />
      </Card>
    );
  }
}

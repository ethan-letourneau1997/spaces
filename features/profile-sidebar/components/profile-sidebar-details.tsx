'use client';

import { Divider, SimpleGrid, Text } from '@mantine/core';
import useSWR from 'swr';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';
import { ProfilePostCount } from './profile-post-count';
import { ProfileCommentCount } from './profile-comment-count';

export function ProfileSidebarDetails() {
  const params = useParams();
  const supabase = createClientComponentClient();
  // eslint-disable-next-line consistent-return
  const { data: profile } = useSWR('profile', async () => {
    if (params.username) {
      const { data: public_profile } = await supabase
        .from('public_profile')
        .select()
        .eq('username', params.username)
        .single();
      return public_profile;
    }
  });
  if (profile) {
    return (
      <>
        <Text ta="center">{profile.biography}</Text>
        <Divider my="sm" />
        <SimpleGrid cols={2}>
          <ProfilePostCount userId={profile.id} />
          <ProfileCommentCount userId={profile.id} />
        </SimpleGrid>
      </>
    );
  }
}

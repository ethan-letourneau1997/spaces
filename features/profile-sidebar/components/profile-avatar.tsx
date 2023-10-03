'use client';

import useSWR from 'swr';

import { Avatar, Center } from '@mantine/core';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { fetchAvatar } from '@/utils/fetch-avatar';

export function ProfileAvatar() {
  const params = useParams();
  const supabase = createClientComponentClient();
  // eslint-disable-next-line consistent-return
  const { data: avatarUrl } = useSWR('avatarUrl', async () => {
    if (params.username) {
      const { data: public_profile } = await supabase
        .from('public_profile')
        .select()
        .eq('username', params.username)
        .single();

      if (public_profile) {
        const userAvatar = await fetchAvatar(public_profile.id);
        return userAvatar.path;
      }
    }
  });

  if (avatarUrl) {
    return (
      <Center>
        <Avatar src={avatarUrl} alt="it's me" size="lg" />
      </Center>
    );
  }
}

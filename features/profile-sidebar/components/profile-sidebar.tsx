'use client';

import { useParams } from 'next/navigation';
import { Title, Text, Divider, SimpleGrid } from '@mantine/core';
import useSWR from 'swr';
import { ProfileAvatar } from './profile-avatar';
import { SidebarWrapper } from '@/features/sidebar-wrapper';
import { ProfilePostCount } from './profile-post-count';
import { ProfileCommentCount } from './profile-comment-count';
import { fetchProfileByUsername } from '@/utils/fetch-profile-by-username';
import { ProfileSidebarSkeleton } from './profile-sidebar-placeholders';

export function ProfileSidebar() {
  const params = useParams();

  // eslint-disable-next-line consistent-return
  const { data: profile } = useSWR('profile', async () => {
    if (params.username) {
      const userProfile = await fetchProfileByUsername(params.username as string);
      return userProfile;
    }
  });

  if (profile) {
    return (
      <SidebarWrapper>
        <ProfileAvatar userId={profile.id} />
        <Title order={1} size="h4" ta="center" mt="md">
          {params.username}
        </Title>
        <Text ta="center">{profile.biography}</Text>
        <Divider my="sm" />
        <SimpleGrid cols={2}>
          <ProfilePostCount profile={profile} />
          <ProfileCommentCount profile={profile} />
        </SimpleGrid>
      </SidebarWrapper>
    );
  }
  return (
    <SidebarWrapper>
      <ProfileSidebarSkeleton />
    </SidebarWrapper>
  );
}

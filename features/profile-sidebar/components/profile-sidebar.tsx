'use client';

import { useParams } from 'next/navigation';
import { Title } from '@mantine/core';
import { ProfileSidebarDetails } from './profile-sidebar-details';
import { ProfileAvatar } from './profile-avatar';
import { SidebarWrapper } from '@/features/sidebar-wrapper';

export function ProfileSidebar() {
  const params = useParams();

  return (
    <SidebarWrapper>
      <ProfileAvatar />
      <Title order={1} size="h4" ta="center" mt="md">
        {params.username}
      </Title>
      <ProfileSidebarDetails />
    </SidebarWrapper>
  );
}

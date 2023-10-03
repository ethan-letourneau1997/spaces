'use client';

import { useParams } from 'next/navigation';
import { Card, Title } from '@mantine/core';
import { ProfileSidebarDetails } from './profile-sidebar-details';
import { ProfileAvatar } from './profile-avatar';

export async function ProfileSidebar() {
  const params = useParams();

  return (
    <Card miw="300px" maw="300px" h="fit-content">
      <ProfileAvatar />
      <Title order={1} size="h4" ta="center" mt="md">
        {params.username}
      </Title>
      <ProfileSidebarDetails />
    </Card>
  );
}

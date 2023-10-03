'use client';

import { Title } from '@mantine/core';
import { useParams } from 'next/navigation';

export function ProfileSidebarUsername() {
  const params = useParams();
  const { username } = params;
  return (
    <Title order={1} size="h4" ta="center" mt="md">
      {username}
    </Title>
  );
}

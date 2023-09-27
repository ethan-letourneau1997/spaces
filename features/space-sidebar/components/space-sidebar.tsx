'use client';

import { Card, Center, Title, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { SpaceSidebarSubscription } from './space-sidebar-subscription';

export function SpaceSidebar() {
  const params = useParams();
  const supabase = createClientComponentClient();

  const { data: space } = useSWR('space', async () => {
    const { data: community } = await supabase
      .from('community')
      .select()
      .eq('id', params.spaceId)
      .single();
    return community;
  });

  if (space) {
    return (
      <Card miw="300px" maw="300px" h="fit-content">
        <Center>
          <Title order={2}>{params.spaceName}</Title>
        </Center>
        <Text size="sm">{space.description}</Text>
        <SpaceSidebarSubscription spaceId={params.spaceId} />
      </Card>
    );
  }
}

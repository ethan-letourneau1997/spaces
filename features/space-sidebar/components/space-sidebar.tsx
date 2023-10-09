'use client';

import { Center, Title, Text } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { SpaceSidebarSubscription } from './space-sidebar-subscription';
import { SidebarWrapper } from '@/features/sidebar-wrapper';

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
      <SidebarWrapper>
        <Center>
          <Title order={2}>{params.spaceName}</Title>
        </Center>
        <Text size="sm">{space.description}</Text>
        <SpaceSidebarSubscription
          spaceId={params.spaceId as string}
          spaceName={params.spaceName as string}
        />
      </SidebarWrapper>
    );
  }
}

'use client';

import { Center, Title, Text, Divider } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { SpaceSidebarSubscription } from './space-sidebar-subscription';
import { SidebarWrapper } from '@/features/sidebar-wrapper';
import { SpaceAvatar } from './space-avatar';
import { spaceSidebarPlaceholder } from './space-sidebar-placeholders';

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
          <Title order={2}>{space.display_name}</Title>
        </Center>
        <SpaceAvatar />
        <Text mt="md" size="sm">
          {space.description}
        </Text>
        <Divider my="md" />
        <SpaceSidebarSubscription
          spaceId={params.spaceId as string}
          spaceName={params.spaceName as string}
        />
      </SidebarWrapper>
    );
  }

  return spaceSidebarPlaceholder;
}

'use client';

import { Center, Title, Text, Divider, Anchor, Space } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
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
          <Anchor
            className="!no-underline "
            component={Link}
            href={`/space/${params.spaceId}/${params.spaceName}`}
          >
            <Title c="gray.3" order={2}>
              {space.name}
            </Title>
          </Anchor>
        </Center>
        <Space h="xs" />
        {/* <SpaceAvatar /> */}
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

  return <SidebarWrapper>{spaceSidebarPlaceholder}</SidebarWrapper>;
}

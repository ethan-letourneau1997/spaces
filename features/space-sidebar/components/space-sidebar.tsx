'use client';

import { Card, Center, Title, Text, Group } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { FaUserAstronaut } from 'react-icons/fa';

type SpaceSubscriberCountProps = {
  spaceId: string;
};

export function SpaceSubscriberCount({ spaceId }: SpaceSubscriberCountProps) {
  const supabase = createClientComponentClient();

  const { data: subscriberCount } = useSWR('subscriberCount', async () => {
    const { count } = await supabase
      .from('user_community')
      .select('*', { count: 'exact', head: true })
      .eq('community_id', spaceId);

    if (count) return count;
    return 0;
  });

  if (subscriberCount) {
    return (
      <Group gap="xs">
        <FaUserAstronaut className="text-sm" />
        {subscriberCount}
      </Group>
    );
  }
}

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
        <SpaceSubscriberCount spaceId={params.spaceId} />
      </Card>
    );
  }
}

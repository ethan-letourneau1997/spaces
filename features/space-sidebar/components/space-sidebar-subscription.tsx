'use client';

import { Button, Group } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { FaUserAstronaut } from 'react-icons/fa';
import { useEffect, useState } from 'react';

type SpaceSidebarSubscriptionProps = {
  spaceId: string;
};

export function SpaceSidebarSubscription({ spaceId }: SpaceSidebarSubscriptionProps) {
  const supabase = createClientComponentClient();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    async function fetchSubscriberCount() {
      const { count } = await supabase
        .from('user_community')
        .select('*', { count: 'exact', head: true })
        .eq('community_id', spaceId);
      if (count) {
        setSubscriberCount(count);
      }
    }

    async function checkUserSubscribed() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) return;

      const { data: user_community } = await supabase
        .from('user_community')
        .select()
        .match({ user_id: data.session.user.id, community_id: spaceId })
        .single();

      if (user_community) {
        setUserSubscribed(true);
      } else {
        setUserSubscribed(false);
      }
    }

    checkUserSubscribed();
    fetchSubscriberCount();
  }, [userSubscribed]);

  async function handleSubscribe() {
    await supabase.from('user_community').insert({ community_id: spaceId });
    setUserSubscribed(true);
    setSubscriberCount(subscriberCount + 1);
  }

  async function handleUnsubscribe() {
    await supabase.from('user_community').delete().match({ community_id: spaceId });
    setUserSubscribed(false);
    setSubscriberCount(subscriberCount - 1);
  }

  return (
    <div>
      <Group gap="xs">
        <FaUserAstronaut className="text-sm" />
        {subscriberCount}
        {subscriberCount === 0 && <>0</>}
      </Group>

      {userSubscribed === true && <Button onClick={handleUnsubscribe}>Unsubscribe</Button>}
      {userSubscribed === false && <Button onClick={handleSubscribe}>Subscribe</Button>}
    </div>
  );
}

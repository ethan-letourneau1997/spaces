'use client';

import { Button, Group } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { FaUserAstronaut } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { fetchSubscriberCount } from '@/utils/fetch-subscriber-count';
import { checkUserSubscription } from '@/utils/check-user-subscription';

type SpaceSidebarSubscriptionProps = {
  spaceId: string;
};

export function SpaceSidebarSubscription({ spaceId }: SpaceSidebarSubscriptionProps) {
  const supabase = createClientComponentClient();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  async function getSubscriberCount() {
    const count = await fetchSubscriberCount(spaceId);
    setSubscriberCount(count);
  }

  async function isUserSubscribed() {
    const userSubscription = await checkUserSubscription(spaceId);
    setUserSubscribed(userSubscription);
  }

  useEffect(() => {
    getSubscriberCount();
    isUserSubscribed();
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

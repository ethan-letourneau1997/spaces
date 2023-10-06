'use client';

import { Button, Group } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { FaUserAstronaut } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { fetchSubscriberCount } from '@/utils/fetch-subscriber-count';
import { checkUserSubscription } from '@/utils/check-user-subscription';

type SpaceSidebarSubscriptionProps = {
  spaceId: string;
  spaceName: string;
};

export function SpaceSidebarSubscription({ spaceId, spaceName }: SpaceSidebarSubscriptionProps) {
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
    notifications.show({
      title: 'Subscribed',
      message: `You are now subscribed to ${spaceName}.`,
    });
  }

  async function handleUnsubscribe() {
    await supabase.from('user_community').delete().match({ community_id: spaceId });
    setUserSubscribed(false);
    setSubscriberCount(subscriberCount - 1);
    notifications.show({
      title: 'Unsubscribed',
      message: `You are no longer subscribed to ${spaceName}.`,
    });
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

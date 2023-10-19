'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchLatestFromFeed(userId: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: user_subscriptions } = await supabase
    .from('user_community')
    .select('*, community_id(*)')
    .eq('user_id', userId);

  const communityIds = user_subscriptions?.map((sub) => sub.community_id.id);

  const { data: posts } = await supabase
    .from('detailed_post')
    .select()
    .in('posted_in', communityIds)
    .order('created_at', { ascending: false })
    .limit(5);
  return posts;
}

'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function checkUserSubscription(spaceId: number | string) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) return false;

  const { data: user_community } = await supabase
    .from('user_community')
    .select()
    .match({ user_id: data.session.user.id, community_id: spaceId });

  if (user_community && user_community.length > 0) {
    return true;
  }
  return false;
}

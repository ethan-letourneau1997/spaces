'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function createSubscription(spaceId: number | string) {
  const supabase = createServerActionClient({ cookies });

  await supabase.from('user_community').insert({ community_id: spaceId });
}

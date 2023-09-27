'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function deleteSubscription(spaceId: number | string) {
  const supabase = createServerActionClient({ cookies });

  await supabase.from('user_community').delete().match({ community_id: spaceId });
}

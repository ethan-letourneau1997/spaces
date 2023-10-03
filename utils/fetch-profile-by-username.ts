'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchProfileByUsername(username: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: public_profile } = await supabase
    .from('public_profile')
    .select()
    .eq('username', username)
    .single();

  return public_profile;
}

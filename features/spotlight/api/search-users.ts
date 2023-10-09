'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function searchUsers(searchString: string) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) return false;

  const { data: users } = await supabase
    .from('public_profile')
    .select()
    .ilike('username', `%${searchString}%`)
    .limit(7);

  return users;
}

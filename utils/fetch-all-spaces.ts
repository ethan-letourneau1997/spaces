'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchAllSpaces() {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) return false;

  const { data: user_community } = await supabase
    .from('community')
    .select()
    .order('name', { ascending: true });

  return user_community;
}

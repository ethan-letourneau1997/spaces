'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function searchSpaces(searchString: string) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) return false;

  const { data: spaces } = await supabase
    .from('community')
    .select()
    .ilike('name', `%${searchString}%`)
    .limit(7);

  return spaces;
}

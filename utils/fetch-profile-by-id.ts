'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchProfileById(id: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: public_profile } = await supabase
    .from('public_profile')
    .select()
    .eq('id', id)
    .single();

  return public_profile;
}

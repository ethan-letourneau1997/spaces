'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchSpaceById(id: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: space } = await supabase.from('community').select().eq('id', id).single();

  return space;
}

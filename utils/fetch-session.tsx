'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchSession() {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();
  return data;
}

'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchProfilePostCount(userId: string) {
  const supabase = createServerActionClient({ cookies });

  try {
    const { count } = await supabase
      .from('post')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', userId);

    return count;
  } catch (e) {
    return 0;
  }
}

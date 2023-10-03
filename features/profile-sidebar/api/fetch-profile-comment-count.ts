'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchProfileCommentCount(userId: string) {
  const supabase = createServerActionClient({ cookies });

  try {
    const { count } = await supabase
      .from('comment')
      .select('*', { count: 'exact', head: true })
      .eq('posted_by', userId);

    return count;
  } catch (e) {
    return 0;
  }
}

'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchPostCommentCount(postId: number | string | null) {
  const supabase = createServerActionClient({ cookies });

  const { count } = await supabase
    .from('comment')
    .select('*', { count: 'exact', head: true })
    .eq('root_post', postId);
  return count;
}

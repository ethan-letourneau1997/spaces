'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchHomePosts() {
  const supabase = createServerActionClient({ cookies });

  const { data: posts } = await supabase
    .from('detailed_post')
    .select()
    .order('created_at', { ascending: false })
    .limit(10);

  return posts;
}

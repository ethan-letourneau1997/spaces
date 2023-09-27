'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchDetailedPostById(postId: number | string | null) {
  const supabase = createServerActionClient({ cookies });

  const { data: root_post } = await supabase
    .from('detailed_post')
    .select()
    .eq('id', postId)
    .single();
  return root_post;
}

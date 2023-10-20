'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchChainComments(postId: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: comments } = await supabase
    .from('comment_with_votes')
    .select()
    .eq('root_post', postId)
    .order('created_at', { ascending: true });

  return comments;
}

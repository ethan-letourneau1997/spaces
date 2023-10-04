'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchCommentById(commentId: number | string | null) {
  const supabase = createServerActionClient({ cookies });

  const { data: comment } = await supabase
    .from('comment_details')
    .select()
    .eq('id', commentId)
    .single();
  return comment;
}

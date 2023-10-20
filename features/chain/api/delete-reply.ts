'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function deleteReply(
  comment: Database['public']['Views']['comment_with_votes']['Row'],
  pathname: string
) {
  const supabase = createServerActionClient({ cookies });

  // delete comment from database
  await supabase.from('comment').delete().eq('id', comment.id);

  revalidatePath(pathname);
}

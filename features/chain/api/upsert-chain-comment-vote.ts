'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function upsertChainCommentVote(
  comment: Database['public']['Views']['comment_details']['Row'],
  pathname: string,
  remove?: boolean
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const vote = remove ? 0 : 1;

  if (data.session) {
    await supabase
      .from('comment_vote')
      .upsert({ user_id: data.session.user.id, comment_id: comment.id, vote });

    revalidatePath(pathname);
    // revalidatePath(`/subscriptions/`);
  }
}

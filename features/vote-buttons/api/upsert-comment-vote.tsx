'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function upsertCommentVote(
  comment: Database['public']['Views']['comment_details']['Row'],
  vote: number
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const { data: post } = await supabase.from('post').select().eq('id', comment.root_post).single();

  const { data: community } = await supabase
    .from('community')
    .select()
    .eq('id', post.posted_in)
    .single();

  if (data.session) {
    await supabase
      .from('comment_vote')
      .upsert({ user_id: data.session.user.id, comment_id: comment.id, vote });

    revalidatePath(`/spaces/${community.id}/${community.name}/post/${comment.root_post}`);
    // revalidatePath(`/subscriptions/`);
  }
}

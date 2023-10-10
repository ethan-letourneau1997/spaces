'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function upsertPostVote(
  post:
    | Database['public']['Views']['post_preview']['Row']
    | Database['public']['Views']['detailed_post']['Row'],
  vote: number
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const { data: community } = await supabase
    .from('community')
    .select()
    .eq('id', post.posted_in)
    .single();

  if (data.session) {
    await supabase
      .from('post_vote')
      .upsert({ user_id: data.session.user.id, post_id: post.id, vote });

    // revalidatePath(`/subscriptions/`);
  }
  revalidatePath(`/spaces/${community.id}/${community.name}/post/${post.id}`);
}

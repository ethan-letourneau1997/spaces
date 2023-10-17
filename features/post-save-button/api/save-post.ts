'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function savePost(post: Database['public']['Views']['detailed_post']['Row']) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    await supabase.from('post_save').insert({ post_id: post.id, user_id: data.session.user.id });
    revalidatePath(`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`);
    revalidatePath(`/saved/${post.posted_in}/${post.community_name}/post/${post.id}`);
    revalidatePath(`/saved/${post.posted_in}/${post.community_name}`);
  }
}

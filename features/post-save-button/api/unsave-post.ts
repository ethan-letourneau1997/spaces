'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function unsavePost(post: Database['public']['Views']['detailed_post']['Row']) {
  const supabase = createServerActionClient({ cookies });

  await supabase.from('post_save').delete().match({ post_id: post.id });
  revalidatePath(`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`);
  revalidatePath(`/saved/${post.posted_in}/${post.community_name}/post/${post.id}`);
}

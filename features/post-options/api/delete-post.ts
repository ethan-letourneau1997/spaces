'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function deletePost(
  post:
    | Database['public']['Views']['post_preview']['Row']
    | Database['public']['Views']['detailed_post']['Row'],
  spaceId: string,
  spaceName: string
) {
  const supabase = createServerActionClient({ cookies });

  // delete post from database
  await supabase.from('post').delete().eq('id', post.id);

  revalidatePath(`/spaces/${spaceId}/${spaceName}/post/${post.id}`);
}

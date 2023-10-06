'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/database';

export async function updateTextPost(
  post: Database['public']['Tables']['post']['Row'],
  spaceName: string,
  newContent: string
) {
  const supabase = createServerActionClient({ cookies });

  await supabase.from('post').update({ content: newContent }).eq('id', post.id).select();

  revalidatePath(`/spaces/${post.posted_in}/${spaceName}/post/${post.id}`);
  redirect(`/spaces/${post.posted_in}/${spaceName}/post/${post.id}`);
}

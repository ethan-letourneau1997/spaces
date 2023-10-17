'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function checkUserSave(postId: number | string) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) return false;

  const { data: post_save } = await supabase
    .from('post_save')
    .select()
    .match({ user_id: data.session.user.id, post_id: postId });

  if (post_save && post_save.length > 0) {
    return true;
  }
  return false;
}

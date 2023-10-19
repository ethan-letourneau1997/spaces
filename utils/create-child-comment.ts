'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';

export async function createChildComment(
  parentComment: string | number,
  postId: string | number | null,
  content: string,
  pathname: string
) {
  const supabase = createServerActionClient({ cookies });

  await supabase
    .from('comment')
    .insert({ content, root_post: postId, parent_comment: parentComment });

  revalidatePath(pathname);
}

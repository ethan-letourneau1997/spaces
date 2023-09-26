import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function fetchPostImagePreview(postId: number | null) {
  const supabase = createServerComponentClient({ cookies });

  const { data: post_image } = await supabase
    .from('post_image')
    .select()
    .eq('post_id', postId)
    .limit(1)
    .single();
  return post_image;
}

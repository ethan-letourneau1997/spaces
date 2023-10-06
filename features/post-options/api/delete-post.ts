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

  // if image post, delete images from storage
  if (post.type === 'image') {
    const { data: post_images } = await supabase.from('post_image').select().eq('post_id', post.id);

    if (post_images) {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of post_images) {
        // eslint-disable-next-line no-await-in-loop
        await supabase.storage.from('images').remove([`public/${file.filename}`]);
      }
    }
  }

  // delete post from database
  await supabase.from('post').delete().eq('id', post.id);

  revalidatePath(`/spaces/${spaceId}/${spaceName}/post/${post.id}`);
}

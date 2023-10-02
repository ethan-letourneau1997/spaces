'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function upsertImageCaption(
  spaceId: string,
  spaceName: string,
  image: Database['public']['Tables']['post_image']['Row'],
  newCaption: string
) {
  const supabase = createServerActionClient({ cookies });

  await supabase.from('post_image').update({ caption: newCaption }).eq('id', image.id).select();

  revalidatePath(`/spaces/${spaceId}/${spaceName}/post/new/${image.post_id}/captions`);
}

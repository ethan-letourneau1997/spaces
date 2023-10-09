'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function upsertSpaceDescription(
  space: Database['public']['Tables']['community']['Row'],
  description: string
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    try {
      await supabase
        .from('community')
        .upsert({
          id: space.id,
          name: space.name,
          description,
        })
        .select();
      revalidatePath(`/spaces/${space.id}/${space.name}/settings`);
    } catch (e) {
      /* empty */
    }
  }
}

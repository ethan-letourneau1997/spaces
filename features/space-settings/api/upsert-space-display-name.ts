'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function upsertSpaceDisplayName(
  space: Database['public']['Tables']['community']['Row'],
  displayName: string
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
          description: space.description,
          display_name: displayName,
        })
        .select();
      revalidatePath(`/spaces/${space.id}/${space.name}/admin/settings`);
    } catch (e) {
      /* empty */
    }
  }
}

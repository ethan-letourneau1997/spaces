'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

export async function upsertUserBio(
  user: Database['public']['Tables']['public_profile']['Row'],
  bio: string
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    await supabase
      .from('public_profile')
      .upsert({
        id: user.id,
        username: user.username,
        biography: bio,
      })
      .select();
    revalidatePath('/profile');
  }
}

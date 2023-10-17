'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchUserSavedCount() {
  const supabase = createServerActionClient({ cookies });

  try {
    const { data } = await supabase.auth.getSession();

    const { count } = await supabase
      .from('post_save')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', data.session.user.id);

    return count;
  } catch (e) {
    return 0;
  }
}

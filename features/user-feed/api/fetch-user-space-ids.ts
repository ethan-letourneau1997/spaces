'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchUserSpaceIds() {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    const { data: user_spaces } = await supabase
      .from('user_community')
      .select('*, community_id(*)')
      .eq('user_id', data.session.user.id);

    if (user_spaces) {
      const sortedSpaces = user_spaces.sort((a, b) =>
        a.community_id.name.localeCompare(b.community_id.name)
      );

      const filteredSpaces = sortedSpaces.map((space) => space.community_id.id);
      return filteredSpaces;
    }
  }

  return [];
}

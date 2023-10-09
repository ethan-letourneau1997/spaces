'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { DEFAULT_SORT } from '@/lib/constants';

export async function fetchAdminSpace(spaceId: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: space } = await supabase.from('community').select().eq('id', spaceId).single();
  const { data } = await supabase.auth.getSession();

  if (space && data.session) {
    if (space.created_by === data.session?.user.id) {
      return space;
    }
    redirect(`/spaces/${space.id}/${space.name}/${DEFAULT_SORT}`);
  }

  redirect(`/spaces/${space.id}/${space.name}/${DEFAULT_SORT}`);

  return space;
}

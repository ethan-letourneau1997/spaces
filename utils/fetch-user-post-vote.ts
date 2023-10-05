'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchUserPostVote(postId: number | null) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    const { data: user_vote } = await supabase
      .from('post_vote')
      .select()
      .match({ user_id: data.session?.user.id, post_id: postId })
      .single();

    if (user_vote) {
      return user_vote.vote;
    }

    return 0;
  }

  return 0;
}

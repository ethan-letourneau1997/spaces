'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchSpaceVoteCount(spaceId: number | string | null) {
  const supabase = createServerActionClient({ cookies });

  const { data: post_with_votes } = await supabase
    .from('post_with_votes')
    .select()
    .eq('posted_in', spaceId);

  if (!post_with_votes) return 0;
  const voteArray = post_with_votes?.map((vote) => vote.total_votes);
  const totalVotes = voteArray?.reduce((a, b) => a! + b!, 0);

  if (totalVotes) return totalVotes;

  return 0;
}

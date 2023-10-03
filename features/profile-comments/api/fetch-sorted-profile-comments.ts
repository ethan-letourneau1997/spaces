'use server';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function fetchSortedProfileComments(
  username: string,
  sortBy: 'top' | 'new' | 'old',
  page: string
) {
  const supabase = createServerComponentClient({ cookies });

  const currentPage = parseInt(page, 10);
  const postsPerPage = 10;
  const lowerLimit = (currentPage - 1) * postsPerPage;
  const upperLimit = lowerLimit + postsPerPage - 1;

  async function getSortedComments() {
    const { data: user } = await supabase
      .from('public_profile')
      .select()
      .eq('username', username)
      .single();

    if (sortBy === 'new') {
      const { data: posts } = await supabase
        .from('comment')
        .select()
        .eq('posted_by', user.id)
        .order('created_at', { ascending: false })
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === 'old') {
      const { data: posts } = await supabase
        .from('comment')
        .select()
        .eq('posted_by', user.id)
        .order('created_at', { ascending: true })
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === 'top') {
      const { data: posts } = await supabase
        .from('comment_with_votes')
        .select()
        .eq('posted_by', user.id)
        .order('total_votes', { ascending: false })
        .range(lowerLimit, upperLimit);

      return posts;
    }
    return [];
  }
  const posts = await getSortedComments();

  return posts || [];
}

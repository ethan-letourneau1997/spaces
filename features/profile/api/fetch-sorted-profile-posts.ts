'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function fetchSortedProfilePosts(
  userId: number,
  sortBy: 'top' | 'new' | 'old',
  page: string
) {
  const supabase = createServerActionClient({ cookies });

  const currentPage = parseInt(page, 10);
  const postsPerPage = 10;
  const lowerLimit = (currentPage - 1) * postsPerPage;
  const upperLimit = lowerLimit + postsPerPage - 1;

  async function getSortedPosts() {
    if (sortBy === 'new') {
      const { data: posts } = await supabase
        .from('detailed_post')
        .select()
        .eq('created_by', userId)
        .order('created_at', { ascending: false })
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === 'old') {
      const { data: posts } = await supabase
        .from('detailed_post')
        .select()
        .eq('created_by', userId)
        .order('created_at', { ascending: true })
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === 'top') {
      const { data: posts } = await supabase
        .from('post_with_votes')
        .select()
        .eq('created_by', userId)
        .order('total_votes', { ascending: false })
        .range(lowerLimit, upperLimit);

      return posts;
    }
    return [];
  }
  const posts = await getSortedPosts();

  return posts || [];
}

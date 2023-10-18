import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function fetchSortedSavedPosts(
  // userId: string,
  userId: string,
  sortBy: 'top' | 'new' | 'old',
  page: string
) {
  const supabase = createServerComponentClient({ cookies });

  const currentPage = parseInt(page, 10);
  const postsPerPage = 10;
  const lowerLimit = (currentPage - 1) * postsPerPage;
  const upperLimit = lowerLimit + postsPerPage - 1;

  async function getSortedPosts() {
    const { data: user_saved } = await supabase.from('post_save').select().eq('user_id', userId);

    const postIds = user_saved ? user_saved.map((saved) => saved.post_id) : null;

    if (sortBy === 'new' && postIds) {
      const { data: posts } = await supabase
        .from('detailed_post')
        .select()
        .in('id', postIds)
        .order('created_at', { ascending: false })
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === 'old' && postIds) {
      const { data: posts } = await supabase
        .from('detailed_post')
        .select()
        .in('id', postIds)
        .order('created_at', { ascending: true })
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === 'top' && postIds) {
      const { data: posts } = await supabase
        .from('post_with_votes')
        .select()
        .in('id', postIds)
        .order('total_votes', { ascending: false })
        .range(lowerLimit, upperLimit);

      return posts;
    }
    return [];
  }
  const posts = await getSortedPosts();

  return posts || [];
}

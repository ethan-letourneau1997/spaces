import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function fetchSortedVotedPosts(
  userId: string,
  type: string,
  sortBy: 'top' | 'new' | 'old',
  page: string
) {
  const supabase = createServerComponentClient({ cookies });

  const currentPage = parseInt(page, 10);
  const postsPerPage = 10;
  const lowerLimit = (currentPage - 1) * postsPerPage;
  const upperLimit = lowerLimit + postsPerPage - 1;

  const vote = type === 'upvoted' ? 1 : -1;
  async function getSortedPosts() {
    const { data: voted_posts } = await supabase
      .from('post_vote')
      .select()
      .match({ user_id: userId, vote });

    const postIds = voted_posts?.map((voted) => voted.post_id);

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

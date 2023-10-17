import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PostPreviews } from '@/features/posts';

export async function SavedPosts() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  const { data: saved_posts } = await supabase
    .from('user_saved_post')
    .select()
    .eq('user_id', data.session.user.id);

  if (saved_posts) {
    return <PostPreviews posts={saved_posts} />;
  }
}

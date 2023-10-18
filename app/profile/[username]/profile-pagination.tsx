'use client';

import { Center, Pagination } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';

export function ProfilePagination() {
  const supabase = createClientComponentClient();
  const params = useParams();

  const { username, page, sort, type } = params;

  const currentPage = page ? parseInt(page as string, 10) : 1;
  const router = useRouter();

  const [pagesCount, setPagesCount] = useState(0);

  async function getVotePagesCount() {
    const { data } = await supabase.auth.getSession();

    const voteType = params.type === 'upvoted' ? 1 : -1;

    const { count } = await supabase
      .from('post_vote')
      .select('*', { count: 'exact', head: true })
      .match({ user_id: data.session.user.id, vote: voteType });

    const pages = Math.ceil(count / 10);

    setPagesCount(pages);
  }

  async function getSavedPagesCount() {
    const { data } = await supabase.auth.getSession();

    const { count } = await supabase
      .from('post_save')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', data.session.user.id);

    const pages = Math.ceil(count / 10);

    setPagesCount(pages);
  }

  async function getPostsPagesCount() {
    const { data } = await supabase.auth.getSession();

    const { count } = await supabase
      .from('post')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', data.session.user.id);

    const pages = Math.ceil(count / 10);

    setPagesCount(pages);
  }

  async function getCommentsPagesCount() {
    const { data } = await supabase.auth.getSession();

    const { count } = await supabase
      .from('comment')
      .select('*', { count: 'exact', head: true })
      .eq('posted_by', data.session.user.id);

    const pages = Math.ceil(count / 10);

    setPagesCount(pages);
  }

  useEffect(() => {
    switch (type) {
      case 'upvoted':
        getVotePagesCount();
        break;
      case 'downvoted':
        getVotePagesCount();
        break;
      case 'saved':
        getSavedPagesCount();
        break;
      case 'posts':
        getPostsPagesCount();
        break;
      case 'comments':
        getCommentsPagesCount();
        break;
    }
  }, [params]);

  const handlePageChange = (newPage: SetStateAction<number>) => {
    // setActivePage(newPage);
    router.push(`/profile/${username}/${type}/${sort}/${newPage}`);
  };

  if (pagesCount && pagesCount > 1) {
    return (
      <Center mt="lg">
        <Pagination
          total={pagesCount}
          onChange={handlePageChange}
          siblings={1}
          value={currentPage}
        />
      </Center>
    );
  }
}

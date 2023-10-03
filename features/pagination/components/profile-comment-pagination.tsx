'use client';

import { Center, Pagination } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import useSWR from 'swr';

export function ProfileCommentPagination() {
  const supabase = createClientComponentClient();
  const params = useParams();

  const { username } = params;
  const { page } = params;
  const { sort } = params;

  const currentPage = page ? parseInt(page, 10) : 1;
  const router = useRouter();

  const { data: pageCount } = useSWR('pageCount', async () => {
    const { data: user } = await supabase
      .from('public_profile')
      .select()
      .eq('username', username)
      .single();
    const { count } = await supabase
      .from('comment')
      .select('*', { count: 'exact', head: true })
      .eq('posted_by', user.id);
    if (count) {
      return Math.ceil(count / 10);
    }
    return null;
  });
  const handlePageChange = (newPage: SetStateAction<number>) => {
    // setActivePage(newPage);
    router.push(`/profile/${username}/comments/${sort}/${newPage}`);
  };

  if (pageCount && pageCount > 1) {
    return (
      <Center mt="lg">
        <Pagination
          total={pageCount}
          onChange={handlePageChange}
          siblings={1}
          value={currentPage}
        />
      </Center>
    );
  }
}

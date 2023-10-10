'use client';

import { Center, Pagination } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import useSWR from 'swr';

export function FeedPagination() {
  const supabase = createClientComponentClient();
  const params = useParams();

  const { page } = params;
  const { sort } = params;

  const currentPage = page ? parseInt(page as string, 10) : 1;
  const router = useRouter();

  const { data: pageCount } = useSWR('pageCount', async () => {
    const { data } = await supabase.auth.getSession();

    const { data: user_subscriptions } = await supabase
      .from('user_community')
      .select('*, community_id(*)')
      .eq('user_id', data.session?.user.id);

    const communityIds = user_subscriptions?.map((sub) => sub.community_id.id);

    if (communityIds) {
      const { count } = await supabase
        .from('post')
        .select('*', { count: 'exact', head: true })
        .in('posted_in', communityIds);

      if (count) {
        const pages = Math.ceil(count / 10);
        return pages;
      }
    }

    return null;
  });
  const handlePageChange = (newPage: SetStateAction<number>) => {
    // setActivePage(newPage);
    router.push(`/feed/${sort}/${newPage}`);
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

'use client';

import { Center, Pagination } from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import useSWR from 'swr';

export function PostPagination() {
  const supabase = createClientComponentClient();
  const params = useParams();

  const { spaceId, spaceName, page, sort } = params;

  const currentPage = page ? parseInt(page as string, 10) : 1;
  const router = useRouter();

  const { data: pageCount } = useSWR('pageCount', async () => {
    if (spaceId === undefined) {
      return null;
    }
    const { count } = await supabase
      .from('post')
      .select('*', { count: 'exact', head: true })
      .eq('posted_in', spaceId);
    if (count) {
      return Math.ceil(count / 10);
    }
    return null;
  });
  const handlePageChange = (newPage: SetStateAction<number>) => {
    // setActivePage(newPage);
    router.push(`/spaces/${spaceId}/${spaceName}/${sort}/${newPage}`);
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

'use client';

import { Select } from '@mantine/core';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { DEFAULT_SORT } from '@/lib/constants';

export function ProfileSort() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleValueChange(value: string) {
    router.push(`/profile/${params.username}/${value}/${DEFAULT_SORT}`);
  }

  const [value] = useState(pathname.includes('/comments') ? 'comments' : 'posts');
  return <Select w={130} value={value} onChange={handleValueChange} data={['comments', 'posts']} />;
}

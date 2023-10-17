'use client';

import { useParams, usePathname } from 'next/navigation';
import { Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function MobileHeaderContent() {
  const pathname = usePathname();
  const params = useParams();

  const supabase = createClientComponentClient();

  const [headerText, setHeaderText] = useState('');

  async function getSpacename() {
    const { data: space } = await supabase
      .from('community')
      .select()
      .eq('id', params.spaceId)
      .single();

    if (space) {
      setHeaderText(space.display_name);
    }
  }

  useEffect(() => {
    if (pathname === '/saved') {
      setHeaderText('Saved Posts');
    }

    if (pathname === '/settings') {
      setHeaderText('Settings');
    }

    if (pathname.includes('/feed/')) {
      setHeaderText('Feed');
    }

    if (params.spaceName) {
      getSpacename();
    }

    if (params.username) {
      setHeaderText(params.username as string);
    }
  }, [pathname, params]);

  return (
    <div className=" pr-[40px] grow  md:hidden ">
      <Title order={1} size="h3" ta="center" m={0} mt={3} p={0}>
        {headerText}
      </Title>
    </div>
  );
}

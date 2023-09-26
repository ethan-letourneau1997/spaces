'use client';

import { Center, Image, Skeleton } from '@mantine/core';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { HiOutlineLink } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Database } from '@/lib/database';

type LinkPostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function LinkPostThumbnail({ post }: LinkPostThumbnailProps) {
  const supabase = createClientComponentClient();

  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    async function getThumbnailUrl() {
      const { data } = await supabase.from('link_preview').select().eq('id', post.id).single();
      if (data) {
        setPreviewUrl(data.url);
      } else {
        setPreviewUrl(null);
      }
    }
    getThumbnailUrl();
  }, [post]);

  if (previewUrl) return <Image fit="cover" h="100%" radius="md" src={previewUrl || '#'} />;
  if (previewUrl === null) {
    return (
      <Center h="100%" bg="gray">
        <HiOutlineLink size={20} />
      </Center>
    );
  }

  return <Skeleton w="100%" h="100%" />;
}

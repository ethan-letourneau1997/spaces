'use client';

import { Image, Skeleton } from '@mantine/core';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useEffect, useState } from 'react';
import { Database } from '@/lib/database';

type ImagePostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function ImagePostThumbnail({ post }: ImagePostThumbnailProps) {
  const supabase = createClientComponentClient();

  const [firstImageUrl, setFirstImageUrl] = useState<
    Database['public']['Tables']['link_preview']['Row'] | null | undefined
  >(undefined);

  useEffect(() => {
    async function getThumbnailUrl() {
      const { data: first_image } = await supabase
        .from('post_image')
        .select()
        .eq('post_id', post.id)
        .limit(1)
        .single();
      if (first_image) {
        setFirstImageUrl(first_image.url);
      }
    }
    getThumbnailUrl();
  }, [post]);

  if (firstImageUrl) return <Image fit="cover" h="100%" radius="md" src={firstImageUrl || '#'} />;

  return <Skeleton w="100%" h="100%" />;
}

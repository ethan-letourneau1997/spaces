'use client';

import { Anchor, BackgroundImage, Skeleton } from '@mantine/core';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Database } from '@/lib/database';

type ImagePostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function ImagePostThumbnail({ post }: ImagePostThumbnailProps) {
  const supabase = createClientComponentClient();

  const [firstImageUrl, setFirstImageUrl] = useState<string | null>(null); // Declare firstImageUrl as a string

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

  if (firstImageUrl) {
    const linkToPost = `/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`;
    return (
      <Anchor component={Link} href={linkToPost}>
        <BackgroundImage h="100%" src={firstImageUrl} radius="sm" />
      </Anchor>
    );
  }

  return <Skeleton w="100%" h="100%" />;
}

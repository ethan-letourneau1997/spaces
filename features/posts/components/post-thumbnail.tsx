'use client';

import { Center, Image, Skeleton } from '@mantine/core';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { HiOutlineLink } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Database } from '@/lib/database';

function TextPostThumbnail() {
  return (
    <Center h="100%" bg="gray">
      <BsLayoutTextSidebarReverse size={20} />
    </Center>
  );
}

type LinkPostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

function LinkPostThumbnail({ post }: LinkPostThumbnailProps) {
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

type ImagePostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

function ImagePostThumbnail({ post }: ImagePostThumbnailProps) {
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

type PostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostThumbnail({ post }: PostThumbnailProps) {
  if (post.type === 'text') {
    return <TextPostThumbnail />;
  }

  if (post.type === 'link') {
    return <LinkPostThumbnail post={post} />;
  }

  if (post.type === 'image') {
    return <ImagePostThumbnail post={post} />;
  }
}

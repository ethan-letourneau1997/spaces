'use client';

import { Anchor, BackgroundImage, Center, Paper, Skeleton } from '@mantine/core';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { HiOutlineLink } from 'react-icons/hi';
import { Suspense, useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { ThumbnailSkeleton } from '@/components/fallbacks';

type LinkPostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function LinkPostThumbnail({ post }: LinkPostThumbnailProps) {
  const supabase = createClientComponentClient();

  const [linkPreview, setLinkPreview] = useState<
    Database['public']['Tables']['link_preview']['Row'] | undefined | null
  >(undefined);

  useEffect(() => {
    async function getThumbnailUrl() {
      const { data } = await supabase.from('link_preview').select().eq('id', post.id).single();
      if (data) {
        setLinkPreview(data);
      } else {
        setLinkPreview(null);
      }
    }
    getThumbnailUrl();
  }, [post]);

  if (linkPreview) {
    return (
      <Suspense fallback={<ThumbnailSkeleton />}>
        <BackgroundImage h="100%" src={linkPreview.url} radius="sm">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={post.content}
            className="flex items-end w-full h-full no-underline hover:underline text-gray-3"
          >
            <div className="flex items-center justify-end w-full px-1.5 font-semibold opacity-80 bg-dark-6 text-xs truncate">
              {linkPreview.website}&nbsp;
              <FiExternalLink size={13} className=" mb-0.5" />
            </div>
          </Link>
        </BackgroundImage>
      </Suspense>
    );
  }
  if (linkPreview === null) {
    return (
      <Paper radius="sm" h="100%" bg="gray">
        <Anchor
          h="100%"
          w="100%"
          c="dark.0"
          target="_blank"
          rel="noopener noreferrer"
          href={post.content}
          component={Link}
        >
          <Center h="100%">
            <HiOutlineLink size={20} />
          </Center>
        </Anchor>
      </Paper>
    );
  }

  return <Skeleton w="100%" h="100%" />;
}

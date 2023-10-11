'use client';

import { Anchor, BackgroundImage, Center, Flex, Paper, Skeleton } from '@mantine/core';

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
          <Flex align="flex-end" h="100%">
            <Anchor
              truncate
              c="gray.3"
              target="_blank"
              rel="noopener noreferrer"
              component={Link}
              href={post.content}
              px={5}
              ta="end"
              bg="dark.6"
              opacity={0.8}
              w="100%"
              size="xs"
              fw={600}
            >
              {linkPreview.website}&nbsp;
              <FiExternalLink size={13} className="inline mb-1" />
            </Anchor>
          </Flex>
        </BackgroundImage>
      </Suspense>
    );
  }
  if (linkPreview === null) {
    return (
      <Paper radius="sm" h="100%" bg="gray">
        <Center h="100%">
          <HiOutlineLink size={20} />
        </Center>
      </Paper>
    );
  }

  return <Skeleton w="100%" h="100%" />;
}

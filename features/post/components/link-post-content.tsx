'use client';

import { Anchor, AspectRatio, BackgroundImage, Center, Flex, Image, Skeleton } from '@mantine/core';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { HiOutlineLink } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Database } from '@/lib/database';

type LinkPostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function LinkPostContent({ post }: LinkPostContentProps) {
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

  if (previewUrl) {
    return (
      <AspectRatio ratio={3 / 1.3}>
        <Flex align="flex-start">
          <Anchor
            py={3}
            bg="dark.7"
            c="dark.0"
            href={post.content!}
            rel="noreferrer"
            target="blank"
            style={{ zIndex: 10 }}
            truncate
          >
            {post.content}
          </Anchor>
        </Flex>

        <BackgroundImage radius="md" src={previewUrl || '#'} />
      </AspectRatio>
    );
  }

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

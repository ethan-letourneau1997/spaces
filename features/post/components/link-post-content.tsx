'use client';

import { Anchor, AspectRatio, BackgroundImage, Center, Flex, Image, Skeleton } from '@mantine/core';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { HiOutlineLink } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Database } from '@/lib/database';

type LinkPostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function LinkPostContent({ post }: LinkPostContentProps) {
  const supabase = createClientComponentClient();

  const [preview, setPreview] = useState<
    Database['public']['Tables']['link_preview']['Row'] | null | undefined
  >(undefined);

  useEffect(() => {
    async function getThumbnailUrl() {
      const { data } = await supabase.from('link_preview').select().eq('id', post.id).single();
      if (data) {
        setPreview(data);
      } else {
        setPreview(null);
      }
    }
    getThumbnailUrl();
  }, [post]);

  if (preview) {
    return (
      <AspectRatio ratio={3 / 1.3}>
        <Flex align="flex-end">
          <Anchor
            w="100%"
            opacity={0.7}
            py={3}
            bg="dark.7"
            c="dark.0"
            href={post.content!}
            rel="noreferrer"
            target="blank"
            style={{ zIndex: 10 }}
            truncate
            size="sm"
          >
            <FiExternalLink size={13} className="inline mb-0.5" />
            &nbsp;
            {preview.website}&nbsp;-&nbsp;{post.content}
          </Anchor>
        </Flex>

        <BackgroundImage radius="md" src={preview.url || '#'} />
      </AspectRatio>
    );
  }

  if (preview) return <Image fit="cover" h="100%" radius="md" src={preview || '#'} />;

  if (preview === null) {
    return (
      <Center h="100%" bg="gray">
        <HiOutlineLink size={20} />
      </Center>
    );
  }

  return <Skeleton w="100%" h="100%" />;
}

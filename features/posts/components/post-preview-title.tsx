'use client';

import { Anchor, Box, em } from '@mantine/core';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { Database } from '@/lib/database';

type PostPreviewTitleProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostPreviewTitle({ post }: PostPreviewTitleProps) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <div>
      <Box mt={2}>
        <Anchor
          c="gray.2"
          fw={600}
          size={isMobile ? 'sm' : 'md'}
          component={Link}
          href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
        >
          {post.title}
        </Anchor>
      </Box>
    </div>
  );
}

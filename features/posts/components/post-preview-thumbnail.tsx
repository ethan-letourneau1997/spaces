'use client';

import { AspectRatio, Box } from '@mantine/core';
import { Suspense } from 'react';
import { Database } from '@/lib/database';
import { PostThumbnail } from '@/features/post-thumbnail';

type PostPreviewThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostPreviewThumbnail({ post }: PostPreviewThumbnailProps) {
  return (
    <div
      className={`${
        post.type !== 'text' ? 'h-40' : 'hidden sm:block'
      } col-span-12 sm:col-span-2 sm:h-auto `}
    >
      <Suspense fallback={<></>}>
        <div className="flex items-center w-full h-full ">
          <Box className="hidden w-full sm:block" maw={115}>
            <AspectRatio ratio={3 / 2.2}>
              <PostThumbnail post={post} />
            </AspectRatio>
          </Box>
        </div>
      </Suspense>
      <Suspense fallback={<></>}>
        <Box className="w-full h-full sm:hidden">
          <PostThumbnail post={post} />
        </Box>
      </Suspense>
    </div>
  );
}

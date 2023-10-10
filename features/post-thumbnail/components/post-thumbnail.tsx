'use client';

import { Suspense } from 'react';
import { Database } from '@/lib/database';
import { TextPostThumbnail } from './text-post-thumbnail';
import { ImagePostThumbnail } from './image-post-thumbnail';
import { LinkPostThumbnail } from './link-post-thumbnail';
import { ThumbnailSkeleton } from '@/components/fallbacks';

type PostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostThumbnail({ post }: PostThumbnailProps) {
  if (post.type === 'text') {
    return <TextPostThumbnail />;
  }

  if (post.type === 'link') {
    return (
      <Suspense fallback={<ThumbnailSkeleton />}>
        <LinkPostThumbnail post={post} />
      </Suspense>
    );
  }

  // TODO Delete
  // if (post.type === 'image') {
  //   return <TextPostThumbnail />;
  // }

  if (post.type === 'image') {
    return (
      <Suspense fallback={<ThumbnailSkeleton />}>
        <ImagePostThumbnail post={post} />
      </Suspense>
    );
  }
}

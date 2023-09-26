'use client';

import { Database } from '@/lib/database';
import { TextPostThumbnail } from './text-post-thumbnail';
import { ImagePostThumbnail } from './image-post-thumbnail';
import { LinkPostThumbnail } from './link-post-thumbnail';

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

'use client';

import { Database } from '@/lib/database';
import { RenderHTML } from '@/components/render-hmtl';

type TextPostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function TextPostContent({ post }: TextPostContentProps) {
  if (post.type === 'text') {
    return <RenderHTML content={post.content} />;
  }
}

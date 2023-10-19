'use client';

import { Database } from '@/lib/database';

type TextPostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function ChainPostContent({ post }: TextPostContentProps) {
  return <div>{post.content}</div>;
}

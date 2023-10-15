'use client';

import Link from 'next/link';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '../../../utils/get-time-since-now';
import { DEFAULT_SORT } from '@/lib/constants';
import { PostAvatar } from './post-avatar';
import { PostOptions } from '@/features/post-options';

type PostHeaderProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PostAvatar userId={post.created_by} />
        <div>
          <Link
            className="text-sm font-medium no-underline hover:underline text-gray-3"
            href={`/profile/${post.username}/posts/${DEFAULT_SORT}`}
          >
            {post.username}
          </Link>
          <span className="text-sm">&nbsp;in&nbsp;</span>
          <Link
            className="text-sm font-medium no-underline hover:underline text-gray-3"
            href={`/spaces/${post.posted_in}/${post.community_name}/${DEFAULT_SORT}`}
          >
            {post.community_name}
          </Link>
          <span className="text-sm">&nbsp;-&nbsp;</span>
          <span className="text-sm">{getTimeSinceNow(post.created_at, true)}</span>
        </div>
      </div>
      <PostOptions post={post} />
    </div>
  );
}

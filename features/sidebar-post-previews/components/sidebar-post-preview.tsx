'use client';

import { AspectRatio } from '@mantine/core';
import Link from 'next/link';
import { PostThumbnail } from '@/features/post-thumbnail';
import { Database } from '@/lib/database';
import { SidebarPostCommentCount } from './sidebar-post-comment-count';
import { SidebarPostVoteCount } from './sidebar-post-vote-count';

type SidebarPostPreviewsProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function SidebarPostPreview({ post }: SidebarPostPreviewsProps) {
  return (
    <div className="flex gap-3">
      <div className="min-w-[65px] col-span-3">
        <AspectRatio ratio={3 / 2.5}>
          <PostThumbnail post={post} />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-between grow">
        <Link
          href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
          className="text-sm font-semibold no-underline line-clamp-2 text-gray-4 hover:underline"
        >
          {post.title}
        </Link>
        <div className="flex items-center gap-2.5 mt-1.5">
          <SidebarPostCommentCount postId={post.id} />
          <SidebarPostVoteCount postId={post.id} />
        </div>
      </div>
    </div>
  );
}

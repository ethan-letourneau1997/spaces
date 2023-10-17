'use client';

import { Anchor } from '@mantine/core';
import Link from 'next/link';
import { PostOptions } from '@/features/post-options';
import { Database } from '@/lib/database';
import { VoteButtons } from '@/features/vote-handler';
import { PostCommentCount } from '@/components/post-comment-count';
import { PostSaveButton } from '@/features/post-save-button';

type PostPreviewFooterProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  postVotes: number;
  userVote: number;
  commentCount: number;
  saved: boolean;
};

export function PostPreviewFooter({
  post,
  postVotes,
  userVote,
  commentCount,
  saved,
}: PostPreviewFooterProps) {
  return (
    <div className="flex items-center gap-3 mt-4 sm:mt-2">
      <div className="block sm:hidden">
        <VoteButtons horizontal post={post} totalVotes={postVotes} userVote={userVote} />
      </div>
      <Anchor
        component={Link}
        href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
        className="!no-underline "
      >
        <PostCommentCount count={commentCount} small />
      </Anchor>
      <PostSaveButton post={post} small saved={saved} />
      <PostOptions post={post} />
    </div>
  );
}

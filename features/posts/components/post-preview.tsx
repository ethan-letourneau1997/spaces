'use client';

import { Card } from '@mantine/core';
import { Database } from '@/lib/database';
import { VoteButtons } from '@/features/vote-handler';
import { PostPreviewHeader } from './post-preview-header';
import { PostPreviewThumbnail } from './post-preview-thumbnail';
import { PostPreviewFooter } from './post-preview-footer';

type PostPreviewProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  postVotes: number;
  userVote: number;
  commentCount: number;
};

export function PostPreview({ post, postVotes, userVote, commentCount }: PostPreviewProps) {
  return (
    <Card mt="sm" withBorder className="hover:!border-gray-7">
      <div className="grid grid-cols-12 gap-3">
        <PostPreviewThumbnail post={post} />
        <div className="flex flex-col justify-between col-span-12 sm:col-span-9">
          <PostPreviewHeader post={post} />
          <PostPreviewFooter
            post={post}
            postVotes={postVotes}
            userVote={userVote}
            commentCount={commentCount}
          />
        </div>
        <div className="items-center justify-end hidden col-span-1 sm:flex">
          <VoteButtons post={post} totalVotes={postVotes} userVote={userVote} />
        </div>
      </div>
    </Card>
  );
}

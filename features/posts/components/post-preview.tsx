'use client';

import { AspectRatio, Card } from '@mantine/core';
import { Database } from '@/lib/database';
import { VoteButtons } from '@/features/vote-handler';
import { PostPreviewHeader } from './post-preview-header';
import { PostPreviewFooter } from './post-preview-footer';
import { PostThumbnail } from '@/features/post-thumbnail';

type PostPreviewProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  postVotes: number;
  userVote: number;
  commentCount: number;
};

export function PostPreview({ post, postVotes, userVote, commentCount }: PostPreviewProps) {
  return (
    <Card mt="sm" withBorder className="hover:!border-gray-7">
      {post.type !== 'text' && (
        <div className="block w-full mb-2 sm:hidden h-[200px] ">
          <PostThumbnail post={post} />
        </div>
      )}

      <div className="flex">
        <div className="max-w-[115px] w-full hidden sm:block">
          <AspectRatio ratio={3 / 2.2}>
            <PostThumbnail post={post} />
          </AspectRatio>
        </div>
        <div className="flex flex-col justify-between grow sm:px-2.5">
          <PostPreviewHeader post={post} />
          <PostPreviewFooter
            post={post}
            postVotes={postVotes}
            userVote={userVote}
            commentCount={commentCount}
          />
        </div>
        <div className="items-center justify-end hidden sm:flex ">
          <VoteButtons post={post} totalVotes={postVotes} userVote={userVote} />
        </div>
      </div>
    </Card>
  );
}

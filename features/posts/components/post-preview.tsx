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
  saved: boolean;
};

export function PostPreview({ post, postVotes, userVote, commentCount, saved }: PostPreviewProps) {
  return (
    <Card withBorder className="hover:!border-gray-7 !bg-dark-6.5">
      {post.type !== 'text' && (
        <div className="block w-full mb-2 sm:hidden h-[200px]">
          <PostThumbnail post={post} />
        </div>
      )}

      <div className="flex sm:gap-4">
        <div className="max-w-[115px] w-full hidden sm:block ">
          <AspectRatio ratio={3 / 2.3}>
            <PostThumbnail post={post} />
          </AspectRatio>
        </div>
        <div className="flex flex-col justify-between grow">
          <PostPreviewHeader post={post} />
          <PostPreviewFooter
            post={post}
            postVotes={postVotes}
            userVote={userVote}
            commentCount={commentCount}
            saved={saved}
          />
        </div>
        <div className="items-center justify-end hidden sm:flex ">
          <VoteButtons post={post} totalVotes={postVotes} userVote={userVote} />
        </div>
      </div>
    </Card>
  );
}

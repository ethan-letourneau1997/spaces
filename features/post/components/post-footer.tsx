'use client';

import { Group } from '@mantine/core';

import { Database } from '@/lib/database';
import { PostVoteButtons } from '@/features/post-votes/components/post-vote-buttons';
import { PostOptions } from '@/features/post-options';

type PostFooterProps = {
  postVotes: number;
  userVote: number;
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostFooter({ postVotes, userVote, post }: PostFooterProps) {
  return (
    <Group>
      <PostVoteButtons horizontal postVotes={postVotes || 0} userVote={userVote || 0} post={post} />
      <PostOptions post={post} />
    </Group>
  );
}

'use client';

import { ActionIcon, Group, Text } from '@mantine/core';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { Database } from '@/lib/database';
import { PostOptions } from '@/features/post-options';
import { VoteHandler } from '@/features/vote-handler';

type PostFooterProps = {
  postVotes: number;
  userVote: number;
  post: Database['public']['Views']['detailed_post']['Row'];
  commentCount?: number;
};

export function PostFooter({ postVotes, userVote, post, commentCount }: PostFooterProps) {
  return (
    <Group gap={3} align="center" mt="xs">
      <VoteHandler horizontal totalVotes={postVotes || 0} userVote={userVote || 0} post={post} />
      <Group gap={1} align="center">
        <ActionIcon pt={2} color="dark.1" variant="transparent" aria-label="Settings">
          <LiaCommentAltSolid size={18} />
        </ActionIcon>
        <Text size="sm" fw={600} c="dark.1">
          {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
        </Text>
      </Group>
      <PostOptions post={post} />
    </Group>
  );
}

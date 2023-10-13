'use client';

import { Box, Group, Text } from '@mantine/core';

import { Database } from '@/lib/database';

import { getTimeSinceNow } from '../../../utils/get-time-since-now';
import { CommentAvatar } from './comment-avatar';

type CommentHeaderProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
};

export function CommentHeader({ comment }: CommentHeaderProps) {
  return (
    <>
      <Group gap={0} ml={9} mt="md">
        <Box h={26} w={26}>
          <CommentAvatar userId={comment.posted_by!} />
        </Box>
        <Text className="!text-sm !sm:text-base" ml="xs">
          {comment.posted_by_username}
        </Text>
        &nbsp;-&nbsp;
        <Text className="!text-sm !sm:text-base">{getTimeSinceNow(comment.created_at, true)}</Text>
      </Group>
    </>
  );
}

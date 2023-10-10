import { ActionIcon, Group, Text } from '@mantine/core';

import { LiaCommentAltSolid } from 'react-icons/lia';
import { PostOptions } from '@/features/post-options';
import { Database } from '@/lib/database';

import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';

type PostPreviewFooterProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function PostPreviewFooter({ post }: PostPreviewFooterProps) {
  //   const commentCount = await fetchPostCommentCount(post.id);
  const commentCount = await fetchPostCommentCount(post.id);

  return (
    <Group gap={4} align="center">
      <Group gap={1} align="center">
        <ActionIcon pt={2} color="dark.1" variant="transparent" aria-label="Settings">
          <LiaCommentAltSolid size={18} />
        </ActionIcon>
        <Text size="sm">
          {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
        </Text>
      </Group>

      <PostOptions post={post} />
    </Group>
  );
}

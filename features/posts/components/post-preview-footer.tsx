import { ActionIcon, Text } from '@mantine/core';

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
    <div>
      <div>
        <ActionIcon pt={2} color="dark.1" variant="transparent" aria-label="Settings">
          <LiaCommentAltSolid size={18} />
        </ActionIcon>
        <Text size="xs" fw={600} c="dark.1">
          {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
        </Text>
      </div>
      <PostOptions post={post} />
      test
    </div>
  );
}

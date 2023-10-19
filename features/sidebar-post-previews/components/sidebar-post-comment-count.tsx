'use client';

import { useEffect, useState } from 'react';
import { UnstyledButton, Text } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';
import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';

type SidebarPostCommentCountProps = {
  postId: string | number;
};

export function SidebarPostCommentCount({ postId }: SidebarPostCommentCountProps) {
  const [commentCount, setCommentCount] = useState<number | null>(null);
  async function fetchCommentCount() {
    const numberOfComments = await fetchPostCommentCount(postId);
    setCommentCount(numberOfComments);
  }
  useEffect(() => {
    fetchCommentCount();
  }, [postId]);

  const small = true;

  return (
    <div className="flex items-center gap-1 ">
      <UnstyledButton className="flex items-center" c="gray.6" pt={1}>
        <FaCommentAlt size={small ? 12 : 14} />
      </UnstyledButton>

      <Text size={small ? 'xs' : 'sm'} c="gray.6" fw={500} className="text-sm ">
        {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
      </Text>
    </div>
  );
}

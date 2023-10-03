'use client';

import useSWR from 'swr';
import { Box, Flex, Text } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type ProfileCommentCountProps = {
  userId: string;
};

export function ProfileCommentCount({ userId }: ProfileCommentCountProps) {
  const supabase = createClientComponentClient();
  // eslint-disable-next-line consistent-return
  const { data: commentCount } = useSWR('commentCount', async () => {
    const { count } = await supabase
      .from('comment')
      .select('*', { count: 'exact', head: true })
      .eq('posted_by', userId);
    return count;
  });

  if (commentCount) {
    return (
      <Box>
        <Flex align="center" gap="xs" justify="center">
          <FaCommentAlt />
          <Text>{commentCount}</Text>
        </Flex>
        <Text ta="center">Comments</Text>
      </Box>
    );
  }
}

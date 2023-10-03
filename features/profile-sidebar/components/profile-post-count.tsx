'use client';

import useSWR from 'swr';
import { Box, Flex, Text } from '@mantine/core';
import { PiSignpostFill } from 'react-icons/pi';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type ProfilePostCountProps = {
  userId: string;
};

export function ProfilePostCount({ userId }: ProfilePostCountProps) {
  const supabase = createClientComponentClient();
  // eslint-disable-next-line consistent-return
  const { data: postCount } = useSWR('postCount', async () => {
    const { count } = await supabase
      .from('post')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', userId);
    return count;
  });

  if (postCount) {
    return (
      <Box>
        <Flex align="center" gap="xs" justify="center">
          <PiSignpostFill />
          <Text>{postCount}</Text>
        </Flex>
        <Text ta="center">Posts</Text>
      </Box>
    );
  }
}

import { Anchor, Center, Paper } from '@mantine/core';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import Link from 'next/link';
import { Database } from '@/lib/database';

type TextPostThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function TextPostThumbnail({ post }: TextPostThumbnailProps) {
  const linkToPost = `/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`;
  return (
    <Paper radius="sm" h="100%" bg="gray">
      <Anchor h="100%" w="100%" c="dark.0" href={linkToPost} component={Link}>
        <Center h="100%">
          <BsLayoutTextSidebarReverse size={20} />
        </Center>
      </Anchor>
    </Paper>
  );
}

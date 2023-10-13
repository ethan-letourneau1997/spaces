'use client';

import { Box, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RootCommentInput } from '@/features/root-comment-input';
import { Database } from '@/lib/database';

type RootCommentModalProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function RootCommentModal({ post }: RootCommentModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box hiddenFrom="sm">
      <Drawer position="bottom" opened={opened} onClose={close} title="Reply to Post">
        <RootCommentInput closeInput={close} post={post} />
      </Drawer>
      <Button variant="subtle" onClick={open}>
        Reply
      </Button>
    </Box>
  );
}

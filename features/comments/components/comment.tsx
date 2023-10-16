'use client';

import { useDisclosure, useHover } from '@mantine/hooks';
import { ActionIcon, Box, Collapse, Flex, Group, Stack, Text } from '@mantine/core';

import { MdExpandMore } from 'react-icons/md';
import classes from '../styles/Comment.module.css';
import { Database } from '@/lib/database';

import { getTimeSinceNow } from '../../../utils/get-time-since-now';
import { CommentAvatar } from './comment-avatar';
import { RenderHTML } from '@/components/render-hmtl';

type CommentProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  children: React.ReactNode;
};

export function Comment({ comment, children }: CommentProps) {
  const [opened, { toggle }] = useDisclosure(true);
  const { hovered, ref } = useHover();

  return (
    <>
      <Group gap={0} ml={9} mt="md">
        {!opened && (
          <ActionIcon color="gray.4" variant="transparent" aria-label="Settings">
            <MdExpandMore size={20} onClick={toggle} />
          </ActionIcon>
        )}
        <Box h={26} w={26}>
          <CommentAvatar userId={comment.posted_by!} />
        </Box>
        <Text className="!text-sm !sm:text-base" ml="xs">
          {comment.posted_by_username}
        </Text>
        &nbsp;-&nbsp;
        <Text className="!text-sm !sm:text-base">{getTimeSinceNow(comment.created_at, true)}</Text>
      </Group>
      <Flex ml="md" mt="sm" className={classes.comment}>
        <Stack justify="center" gap={1}>
          <Flex
            ref={ref}
            style={{ flexGrow: 1, cursor: 'pointer' }}
            mx="auto"
            px={4}
            onClick={toggle}
          >
            {hovered ? <Box w={1.5} h="100%" bg="gray.4" /> : <Box w={1.5} h="100%" bg="gray.8" />}
          </Flex>
        </Stack>

        <Collapse in={opened} px="sm">
          {/* <div
            className="text-sm sm:text-base"
            id="CommentContent"
            dangerouslySetInnerHTML={{ __html: comment.content || '' }}
          /> */}
          <RenderHTML className="!text-sm sm:!text-base !text-gray-1" content={comment.content} />
          {children}
        </Collapse>
      </Flex>
    </>
  );
}

'use client';

import { ActionIcon, Button, Group, Menu, Modal, Text } from '@mantine/core';

import { SlOptions } from 'react-icons/sl';
import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import useSWR from 'swr';
import { Database } from '@/lib/database';
import { deleteComment } from '../api/delete-comment';
import { fetchSession } from '@/utils/fetch-session';

type CommentOptionsProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
};

export function CommentOptions({ comment }: CommentOptionsProps) {
  const params = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();

  async function HandleCommentDelete() {
    startTransition(async () => {
      await deleteComment(comment, params.spaceId as string, params.spaceName as string);
      close();
      notifications.show({
        title: 'Comment Deleted',
        message: 'Your comment has been deleted!',
      });
    });
  }

  const { data: isCreator } = useSWR('isCreator', async () => {
    const data = await fetchSession();
    if (data.session && data.session.user.id === comment.posted_by) {
      return true;
    }
    return false;
  });

  if (isCreator) {
    return (
      <>
        <Modal opened={opened} onClose={close} title="Delete Comment">
          <Text>Are you sure you want to delete this comment?</Text>
          <Group mt="md">
            <Button onClick={close} variant="outline" color="gray">
              Cancel
            </Button>
            <Button loading={isPending} onClick={HandleCommentDelete} variant="filled" color="red">
              Delete
            </Button>
          </Group>
        </Modal>

        <Menu shadow="md">
          <Menu.Target>
            <ActionIcon variant="transparent" aria-label="Settings">
              <SlOptions />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={open} leftSection={<AiFillDelete />}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    );
  }
}

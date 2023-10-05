'use client';

import { ActionIcon, Button, Group, Menu, Modal, Text } from '@mantine/core';

import { SlOptions } from 'react-icons/sl';
import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import { Database } from '@/lib/database';
import { deleteComment } from '../api/delete-comment';

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

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Comment">
        <Text>Are you sure you want to delete this comment?</Text>
        <Group>
          <Button onClick={close} variant="subtle" color="gray">
            Cancel
          </Button>
          <Button loading={isPending} onClick={HandleCommentDelete} variant="filled" color="red">
            Yes, Delete
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

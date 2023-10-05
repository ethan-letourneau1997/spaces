'use client';

import { ActionIcon, Button, Group, Menu, Modal, Text } from '@mantine/core';

import { SlOptions } from 'react-icons/sl';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useParams, usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { deletePost } from '../api/delete-post';

type PostOptionsProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostOptions({ post }: PostOptionsProps) {
  const params = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const editPath = `${pathname}/edit?type=${post.type}`;

  async function HandleCommentDelete() {
    startTransition(async () => {
      await deletePost(post, params.spaceId as string, params.spaceName as string);
      close();
      notifications.show({
        title: 'Post Deleted',
        message: 'Your post has been deleted!',
      });
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Comment">
        <Text>Are you sure you want to delete this post?</Text>
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
          <Menu.Item component={Link} href={editPath} leftSection={<AiFillEdit />}>
            Edit
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

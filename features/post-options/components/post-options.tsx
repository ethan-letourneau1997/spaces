'use client';

import { Box, Button, Group, Menu, Modal, Text, UnstyledButton } from '@mantine/core';

import { SlOptions } from 'react-icons/sl';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useParams, usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import useSWR from 'swr';

import { Database } from '@/lib/database';
import { fetchSession } from '@/utils/fetch-session';
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

  const { data: isCreator } = useSWR('isCreator', async () => {
    const data = await fetchSession();
    if (data.session && data.session.user.id === post.created_by) {
      return true;
    }
    return false;
  });

  if (isCreator) {
    return (
      <>
        <Menu shadow="md">
          <Menu.Target>
            <UnstyledButton className="!flex !items-end " color="dark.1" aria-label="Post Options">
              <SlOptions size={15} className="text-dark-2" />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={open} leftSection={<AiFillDelete />}>
              Delete
            </Menu.Item>
            {post.type !== 'link' && (
              <Menu.Item component={Link} href={editPath} leftSection={<AiFillEdit />}>
                Edit
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>

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
      </>
    );
  }
  return <Box h={28} w={28} />;
}

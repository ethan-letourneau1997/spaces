'use client';

import { BsThreeDots } from 'react-icons/bs';
import { ActionIcon, Button, Menu, Modal, SimpleGrid } from '@mantine/core';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useDisclosure } from '@mantine/hooks';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import { Database } from '@/lib/database';
import { deleteReply } from '../api/delete-reply';

type ReplyOptionsProps = {
  comment: Database['public']['Views']['comment_with_votes']['Row'];
};

export function ReplyOptions({ comment }: ReplyOptionsProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  async function handleDeleteReply() {
    startTransition(async () => {
      await deleteReply(comment, pathname);
      close();
      notifications.show({
        title: 'Success',
        message: 'Your reply had been deleted!',
      });
    });
  }

  const supabase = createClientComponentClient();

  const { data: createdByUser } = useSWR(`${comment.id}`, async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session && data.session.user.id === comment.posted_by) {
      return true;
    }
    return false;
  });

  if (createdByUser) {
    return (
      <div>
        <Menu shadow="md">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray" aria-label="Options">
              <BsThreeDots />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item component="button" onClick={open}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Modal opened={opened} onClose={close} title="Delete">
          <div className="text-center ">Are you sure you want to delete this reply?</div>
          <SimpleGrid cols={2} mt="md">
            <Button onClick={close} variant="outline" fullWidth>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteReply}
              loading={isPending}
              variant="filled"
              color="red.6"
              fw={700}
              fullWidth
            >
              Delete
            </Button>
          </SimpleGrid>
        </Modal>
      </div>
    );
  }

  return <></>;
}

'use client';

import { BsThreeDots } from 'react-icons/bs';
import { ActionIcon, Menu } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { Database } from '@/lib/database';
import { deleteReply } from '../api/delete-reply';

type ReplyOptionsProps = {
  comment: Database['public']['Views']['comment_with_votes']['Row'];
};

export async function ReplyOptions({ comment }: ReplyOptionsProps) {
  const pathname = usePathname();
  async function handleDeleteReply() {
    await deleteReply(comment, pathname);
  }

  return (
    <div>
      <Menu shadow="md">
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray" aria-label="Options">
            <BsThreeDots />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item component="button" onClick={handleDeleteReply}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

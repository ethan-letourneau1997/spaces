'use client';

import { ActionIcon, Menu } from '@mantine/core';

import { SlOptions } from 'react-icons/sl';
import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import { Database } from '@/lib/database';
import { deleteComment } from '../api/delete-comment';

type CommentOptionsProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
};

export function CommentOptions({ comment }: CommentOptionsProps) {
  const params = useParams();

  async function HandleCommentDelete() {
    await deleteComment(comment, params.spaceId as string, params.spaceName as string);
  }

  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <ActionIcon variant="transparent" aria-label="Settings">
            <SlOptions />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={HandleCommentDelete} leftSection={<AiFillDelete />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

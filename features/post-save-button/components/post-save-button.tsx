'use client';

import { UnstyledButton } from '@mantine/core';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { experimental_useOptimistic as useOptimistic } from 'react';

import { Database } from '@/lib/database';
import { savePost } from '../api/save-post';
import { unsavePost } from '../api/unsave-post';

type PostSaveButtonProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  small?: boolean;
  saved?: boolean;
};

export function PostSaveButton({ post, small, saved }: PostSaveButtonProps) {
  const [optimisticPostSaved, setOptimisticPostSaved] = useOptimistic<boolean>(saved);

  async function handleSavePost() {
    await savePost(post);
    setOptimisticPostSaved(true);
  }

  async function handleRemoveSave() {
    setOptimisticPostSaved(false);
    await unsavePost(post);
  }
  if (optimisticPostSaved) {
    return (
      <UnstyledButton
        onClick={handleRemoveSave}
        className={`${small ? '!text-xs' : '!text-sm'} hover:!text-dark-0 flex items-center gap-1`}
        py={2}
        fw={700}
        c="dark.2"
      >
        <BsBookmarkFill size={small ? 12 : 16} className=" text-orange-5" />
        Unsave
      </UnstyledButton>
    );
  }

  if (!optimisticPostSaved) {
    return (
      <UnstyledButton
        onClick={handleSavePost}
        className={`${small ? '!text-xs' : '!text-sm'} hover:!text-dark-0 flex items-center gap-1`}
        py={2}
        fw={700}
        c="dark.2"
      >
        <BsBookmark size={small ? 12 : 16} />
        Save
      </UnstyledButton>
    );
  }
}

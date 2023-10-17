'use client';

import { UnstyledButton } from '@mantine/core';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react';
import { usePathname } from 'next/navigation';
import { Database } from '@/lib/database';
import { savePost } from '../api/save-post';
import { checkUserSave } from '../api/check-user-save';
import { unsavePost } from '../api/unsave-post';

type PostSaveButtonProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  small?: boolean;
};

export function PostSaveButton({ post, small }: PostSaveButtonProps) {
  const pathname = usePathname();

  const [optimisticPostSaved, setOptimisticPostSaved] = useOptimistic<boolean>(
    pathname === '/saved'
  );

  async function checkSave() {
    const isPostSaved = await checkUserSave(post.id);
    setOptimisticPostSaved(isPostSaved);
  }

  useEffect(() => {
    checkSave();
  }, [post]);

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

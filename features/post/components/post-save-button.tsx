'use client';

import { UnstyledButton } from '@mantine/core';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Database } from '@/lib/database';
import { savePost } from './api/save-post';
import { unsavePost } from './api/unsave-post';
import { checkUserSave } from './api/check-user-save';

type PostSaveButtonProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostSaveButton({ post }: PostSaveButtonProps) {
  const [saved, setSaved] = useState(false);

  async function handleSavePost() {
    await savePost(post);
  }

  async function checkSave() {
    const isPostSaved = await checkUserSave(post.id);
    setSaved(isPostSaved);
  }

  useEffect(() => {
    checkSave();
  }, [post]);

  async function handleRemoveSave() {
    await unsavePost(post);
  }
  if (saved) {
    return (
      <UnstyledButton
        onClick={handleRemoveSave}
        className="!text-sm hover:!text-dark-0 flex items-center gap-1"
        py={2}
        fw={700}
        c="dark.2"
      >
        <BsBookmarkFill className=" text-orange-5" />
        Save
      </UnstyledButton>
    );
  }

  if (!saved) {
    return (
      <UnstyledButton
        onClick={handleSavePost}
        className="!text-sm hover:!text-dark-0 flex items-center gap-1"
        py={2}
        fw={700}
        c="dark.2"
      >
        <BsBookmark />
        Save
      </UnstyledButton>
    );
  }
}

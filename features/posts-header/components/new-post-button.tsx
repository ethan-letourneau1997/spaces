'use client';

import { Avatar, Input } from '@mantine/core';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { fetchSession } from '@/utils/fetch-session';
import { fetchAvatar } from '@/utils/fetch-avatar';

type NewPostButtonAvatarProps = {
  userId: string;
};

export function NewPostButtonAvatar({ userId }: NewPostButtonAvatarProps) {
  const { data: avatarPath } = useSWR('avatarPath', async () => {
    const avatar = await fetchAvatar(userId);
    if (avatar) {
      return avatar.path;
    }
    return null;
  });

  if (avatarPath) return <Avatar src={avatarPath} />;
}

export function NewPostButton() {
  const params = useParams();
  const router = useRouter();

  function handleNavigateToCreate() {
    if (params.spaceId && params.spaceName) {
      router.push(`/new/post/${params.spaceId}/${params.spaceName}`);
    }
    router.push('/new/post');
  }

  const { data: userId } = useSWR('userId', async () => {
    const data = await fetchSession();
    if (data.session) {
      return data.session.user.id;
    }
    return null;
  });
  if (userId) {
    return (
      <div className="flex flex-1 gap-3">
        <Input
          classNames={
            {
              //   input: '!bg-dark-4',
            }
          }
          className="flex-1"
          component="button"
          onClick={handleNavigateToCreate}
          pointer
        >
          <Input.Placeholder>Create Post</Input.Placeholder>
        </Input>
      </div>
    );
  }
}

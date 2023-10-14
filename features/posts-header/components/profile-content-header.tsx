'use client';

import { useParams, usePathname } from 'next/navigation';
import { ProfileSort } from '@/features/profile-sort';
import { PostsHeader } from './posts-header';

export function ProfileContentHeader() {
  const params = useParams();
  const pathname = usePathname();

  const commentsOrPosts = pathname.includes('/comments') ? 'comments' : 'posts';

  return (
    <PostsHeader
      newLink={`/profile/${params.username}/${commentsOrPosts}/new/1`}
      oldLink={`/profile/${params.username}/${commentsOrPosts}/old/1`}
      topLink={`/profile/${params.username}/${commentsOrPosts}/top/1`}
      sort={params.sort as string}
      newPostButton={false}
    >
      <ProfileSort />
    </PostsHeader>
  );
}

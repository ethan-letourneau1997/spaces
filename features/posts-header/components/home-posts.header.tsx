'use client';

import { useParams } from 'next/navigation';
import { PostsHeader } from './posts-header';

export function HomePostsHeader() {
  const params = useParams();

  return (
    <PostsHeader
      newLink="/home/new/1"
      oldLink="/home/old/1"
      topLink="/home/top/1"
      sort={params.sort as string}
    />
  );
}

'use client';

import { useParams } from 'next/navigation';
import { PostsHeader } from './posts-header';

export function FeedPostsHeader() {
  const params = useParams();

  return (
    <PostsHeader
      newLink="/feed/new/1"
      oldLink="/feed/old/1"
      topLink="/feed/top/1"
      sort={params.sort as string}
    />
  );
}

'use client';

import { useParams } from 'next/navigation';
import { PostsHeader } from './posts-header';

export function SpacePostsHeader() {
  const params = useParams();

  if (!params.postId) {
    return (
      <PostsHeader
        newLink={`/spaces/${params.spaceId}/${params.spaceName}/new/1`}
        oldLink={`/spaces/${params.spaceId}/${params.spaceName}/old/1`}
        topLink={`/spaces/${params.spaceId}/${params.spaceName}/top/1`}
        sort={params.sort as string}
      />
    );
  }
}

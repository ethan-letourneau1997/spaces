import { Space as SpaceComponent } from '@mantine/core';
import { PostsHeader } from '@/features/posts-header';
import SpacePosts from './space-posts';

type SpaceProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export async function Space({ params }: SpaceProps) {
  return (
    <div>
      <p>
        {params.spaceName} - {params.spaceId}
      </p>
      <PostsHeader params={params} />
      <SpaceComponent h="md" />
      <SpacePosts params={params} />
    </div>
  );
}

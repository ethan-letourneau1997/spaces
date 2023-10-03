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
  return <SpacePosts params={params} />;
}

import { ChainComments } from './chain-comments';

type ChainProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
    postId: string;
  };
};

export async function Chain({ params }: ChainProps) {
  const { postId } = params;

  return (
    <>
      <ChainComments postId={postId} />
    </>
  );
}

import { ChainReplies } from './chain-replies';
import { RootInput } from './root-input';

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
      <ChainReplies postId={postId} /> <RootInput />
    </>
  );
}

import { fetchChainComments } from '../api/fetch-chain-comments';
import { ChainCommentsHandler } from './chain-comments-handler';

type ChainCommentsProps = {
  postId: string;
};

export async function ChainComments({ postId }: ChainCommentsProps) {
  const comments = await fetchChainComments(postId);
  async function filterComments() {
    if (comments) {
      const rootComments = comments.filter((comment) => comment.parent_comment === null);

      return rootComments;
    }
    return [];
  }

  const rootComments = await filterComments();

  if (comments) {
    return (
      <>
        <ChainCommentsHandler allComments={comments} rootComments={rootComments} />
      </>
    );
  }
}

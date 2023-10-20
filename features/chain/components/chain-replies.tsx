import { fetchChainComments } from '../api/fetch-chain-comments';
import { Reply } from './reply';

type ChainRepliesProps = {
  postId: string;
};

export async function ChainReplies({ postId }: ChainRepliesProps) {
  const allComments = await fetchChainComments(postId);
  async function filterComments() {
    if (allComments) {
      const rootComments = allComments.filter((comment) => comment.parent_comment === null);

      return rootComments;
    }
    return [];
  }

  const rootComments = await filterComments();

  return (
    <>
      {rootComments.map((comment) => (
        <Reply comment={comment} key={comment.id} allComments={allComments} />
      ))}
    </>
  );
}

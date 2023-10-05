import { Database } from '@/lib/database';
import { fetchUserCommentVote } from '@/utils/fetch-user-comment-vote';
import { CommentFooter } from './comment-footer';
import { fetchCommentVotes } from '@/utils/fetch-comment-votes';

type CommentFooterHandlerProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
};

export async function CommentFooterHandler({ comment }: CommentFooterHandlerProps) {
  const userVote = await fetchUserCommentVote(comment.id!);
  const totalVotes = await fetchCommentVotes(comment.id);
  if (userVote !== undefined && totalVotes !== undefined) {
    return (
      <>
        <CommentFooter userVote={userVote} totalVotes={totalVotes} comment={comment} />
      </>
    );
  }
}

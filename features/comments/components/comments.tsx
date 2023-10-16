import { fetchPostComments } from '@/utils/fetch-post-comments';
import { Comment } from './comment';
import { Database } from '@/lib/database';
import { CommentFooterHandler } from './comment-footer-handler';
import { RootCommentInput } from '@/features/root-comment-input';
import { fetchDetailedPostById } from '@/utils/fetch-detailed-post-by-id';

async function ChildComments({
  commentId,
  allComments,
  params,
}: {
  commentId: number;
  allComments: Database['public']['Views']['comment_details']['Row'][] | [];
  params: { spaceName: string; spaceId: string; postId: string };
}) {
  // const childComments = allComments?.filter((c) => c.parent_comment === commentId);
  const childComments = (
    allComments as Database['public']['Views']['comment_details']['Row'][]
  )?.filter((c) => c.parent_comment === commentId);

  return (
    <div>
      {childComments?.map((childComment) => (
        <div key={childComment.id}>
          <Comment comment={childComment}>
            <CommentFooterHandler comment={childComment} />
            <ChildComments commentId={childComment.id!} allComments={allComments} params={params} />
          </Comment>
        </div>
      ))}
    </div>
  );
}

type CommentsProps = {
  params: { spaceName: string; spaceId: string; postId: string };
};

export async function Comments({ params }: CommentsProps) {
  const comments = await fetchPostComments(params.postId);
  async function filterComments() {
    if (comments) {
      const rootComments = comments.filter((comment) => comment.parent_comment === null);

      return rootComments;
    }
    return [];
  }

  const rootComments = await filterComments();

  if (comments && comments.length > 0) {
    return (
      <div>
        {rootComments?.map((rootComment) => (
          <Comment key={rootComment.id} comment={rootComment}>
            <CommentFooterHandler comment={rootComment} />
            <ChildComments commentId={rootComment.id} allComments={comments} params={params} />
          </Comment>
        ))}
      </div>
    );
  }

  if (comments && comments.length === 0) {
    const post = await fetchDetailedPostById(params.postId);
    return (
      <div className="px-4 py-2">
        <div className="mb-2 ">Be the first to reply!</div>
        <RootCommentInput post={post} />
      </div>
    );
  }
}

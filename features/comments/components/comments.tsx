import { Card } from '@mantine/core';
import { fetchPostComments } from '@/utils/fetch-post-comments';
import { Comment } from './comment';
import { Database } from '@/lib/database';

async function ChildComments({
  commentId,
  allComments,
  params,
}: {
  commentId: number;
  allComments: Database['public']['Views']['comment_details']['Row'][] | [];
  params: { spaceName: string; spaceId: string; postId: string };
}) {
  const childComments = allComments?.filter((c) => c.parent_comment === commentId);

  return (
    <div>
      {childComments?.map((childComment) => (
        <div key={childComment.id}>
          <Comment comment={childComment} params={params}>
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
      <Card>
        {rootComments?.map((rootComment) => (
          <Comment key={rootComment.id} comment={rootComment} params={params}>
            <ChildComments commentId={rootComment.id} allComments={comments} params={params} />
          </Comment>
        ))}
      </Card>
    );
  }

  if (comments && comments.length === 0) {
    return <span>No comments yet</span>;
  }
}
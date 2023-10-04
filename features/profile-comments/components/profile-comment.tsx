import { Card } from '@mantine/core';
import { Database } from '@/lib/database';
import { fetchCommentById } from '@/utils/fetch-comment-by-id ';

import { fetchDetailedPostById } from '@/utils/fetch-detailed-post-by-id';
import { CommentRootPost } from './comment-root-post';
import { ParentCommentPreview } from './parent-comment-preview';
import { CommentPreview } from './comment-preview';

type ProfileCommentProps = {
  comment: Database['public']['Tables']['comment']['Row'];
  username: string;
};

export async function ProfileComment({ comment, username }: ProfileCommentProps) {
  const rootPost = await fetchDetailedPostById(comment.root_post);

  const parentComment = comment.parent_comment
    ? await fetchCommentById(comment.parent_comment)
    : null;

  if (rootPost) {
    return (
      <Card pr="xl">
        <CommentRootPost post={rootPost} />
        {parentComment ? (
          <ParentCommentPreview comment={parentComment}>
            <CommentPreview comment={comment} username={username} />
          </ParentCommentPreview>
        ) : (
          <CommentPreview comment={comment} username={username} />
        )}
      </Card>
    );
  }
}

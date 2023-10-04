import { Card } from '@mantine/core';
import { Database } from '@/lib/database';
import { fetchCommentById } from '@/utils/fetch-comment-by-id ';

import { fetchDetailedPostById } from '@/utils/fetch-detailed-post-by-id';
import { CommentRootPost } from './comment-root-post';
import { ParentComment } from './parent-comment';
import { ProfileComment } from './profile-comment';

type CommentPreviewProps = {
  comment: Database['public']['Tables']['comment']['Row'];
  username: string;
};

export async function CommentPreview({ comment, username }: CommentPreviewProps) {
  const rootPost = await fetchDetailedPostById(comment.root_post);

  const parentComment = comment.parent_comment
    ? await fetchCommentById(comment.parent_comment)
    : null;

  if (rootPost) {
    return (
      <Card>
        <CommentRootPost post={rootPost} />
        {parentComment ? (
          <ParentComment comment={parentComment}>
            <ProfileComment comment={comment} username={username} />
          </ParentComment>
        ) : (
          <ProfileComment comment={comment} username={username} />
        )}
      </Card>
    );
  }
}

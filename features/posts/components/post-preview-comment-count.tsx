import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';

type PostPreviewCommentCountProps = {
  postId: number | string;
};

export async function PostPreviewCommentCount({ postId }: PostPreviewCommentCountProps) {
  const commentCount = await fetchPostCommentCount(postId);
  return <div>{commentCount} comments</div>;
}

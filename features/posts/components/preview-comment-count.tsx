import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';

type PreviewCommentCountProps = {
  postId: number | string;
};

export async function PreviewCommentCount({ postId }: PreviewCommentCountProps) {
  const commentCount = await fetchPostCommentCount(postId);
  if (commentCount) return <div>{commentCount} comments</div>;
}

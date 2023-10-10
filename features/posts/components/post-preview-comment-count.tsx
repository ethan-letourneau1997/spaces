import useSWR from 'swr';
import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';

type PostPreviewCommentCountProps = {
  postId: number | string;
};

export function PostPreviewCommentCount({ postId }: PostPreviewCommentCountProps) {
  const { data: commentCount } = useSWR('commentCount', async () => {
    const count = await fetchPostCommentCount(postId);
    return count;
  });
  return <div>{commentCount} comments</div>;
}

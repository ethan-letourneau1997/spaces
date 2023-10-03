import { Database } from '@/lib/database';

type ProfileCommentProps = {
  comment: Database['public']['Tables']['comment']['Row'];
};

export async function ProfileComment({ comment }: ProfileCommentProps) {
  return <div>{comment.content}</div>;
}

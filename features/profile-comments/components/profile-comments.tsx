import { fetchSortedProfileComments } from '../api/fetch-sorted-profile-comments';
import { Database } from '@/lib/database';

type ProfilePostsProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export async function ProfileComments({ params }: ProfilePostsProps) {
  const { page, sort, username } = params;
  const profileComments = await fetchSortedProfileComments(username, sort, page);

  console.log(profileComments);

  return <div>hello profile comments.</div>;
}

type ProfileCommentProps = {
  comment: Database['public']['Tables']['comment']['Row'];
};

export async function ProfileComment({ comment }: ProfileCommentProps) {
  return <div>{comment.content}</div>;
}

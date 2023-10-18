import { PostPreviews } from '@/features/posts';
import { fetchSortedVotedPosts } from '../api/fetch-sorted-voted-posts';
import { fetchSortedSavedPosts } from '../api/fetch-sorted-saved-posts';
import { fetchProfileByUsername } from '@/utils/fetch-profile-by-username';
import { fetchSortedProfilePosts } from '../api/fetch-sorted-profile-posts';
import { fetchSortedProfileComments } from '../api/fetch-sorted-profile-comments';
import { CommentPreviews } from '@/features/comment-previews';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    type: string;
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export async function Profile({ params }: SpacePageProps) {
  const { username, type, sort, page } = params;

  async function fetchPosts() {
    const profile = await fetchProfileByUsername(username);

    let result; // Declare a variable to store the result

    switch (type) {
      case 'upvoted': {
        const upvotedPosts = await fetchSortedVotedPosts(profile.id, type, sort, page);
        result = upvotedPosts;
        break;
      }
      case 'downvoted': {
        const downvotedPosts = await fetchSortedVotedPosts(profile.id, type, sort, page);
        result = downvotedPosts;
        break;
      }
      case 'saved': {
        const savedPosts = await fetchSortedSavedPosts(profile.id, sort, page);
        result = savedPosts;
        break;
      }
      case 'posts': {
        const createdPosts = await fetchSortedProfilePosts(profile.id, sort, page);
        result = createdPosts;
        break;
      }
      case 'comments': {
        const createdPosts = await fetchSortedProfileComments(profile.id, sort, page);
        result = createdPosts;
        break;
      }
      default:
      // Handle default case or provide a default value for `result`.
    }

    return result;
  }

  const postsOrComments = await fetchPosts();

  if (type === 'comments' && postsOrComments) {
    return <CommentPreviews comments={postsOrComments} username={username} />;
  }
  if (type !== 'comments' && postsOrComments) {
    return <PostPreviews posts={postsOrComments} />;
  }
}

import { Card, Title, Text, Space } from '@mantine/core';

import { fetchDetailedPostById } from '@/utils/fetch-detailed-post-by-id';
import { PostContent } from './post-content';
import { Comments } from '@/features/comments';
import { RootCommentInput } from '@/features/root-comment-input';

import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';
import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { PostFooter } from './post-footer';

type PostProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
    postId: string;
  };
};

export async function Post({ params }: PostProps) {
  const post = await fetchDetailedPostById(params.postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  const userVote = await fetchUserPostVote(post.id);
  const postVotes = await fetchPostVotes(post.id);

  if (post) {
    return (
      <>
        <Card>
          <Text>
            Posted by {post.username} in {post.community_name}
          </Text>
          <Title order={1} size="h3">
            {post.title}
          </Title>
          <Space h="md" />
          <PostContent post={post} />
          <PostFooter postVotes={postVotes || 0} userVote={userVote || 0} post={post} />
        </Card>
        <Space h="sm" />
        <RootCommentInput post={post} />
        <Space h="lg" />
        <Comments params={params} />
      </>
    );
  }
}

import { Card, Title, Text, Space } from '@mantine/core';

import { fetchDetailedPostById } from '@/utils/fetch-detailed-post-by-id';
import { PostContent } from './post-content';
import { Comments } from '@/features/comments';
import { RootCommentInput } from '@/features/root-comment-input';

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
        </Card>
        <Space h="sm" />
        <RootCommentInput post={post} />
        <Space h="lg" />
        <Comments params={params} />
      </>
    );
  }
}

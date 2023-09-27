import { Card, Title, Text } from '@mantine/core';

import { fetchDetailedPostById } from '@/utils/fetch-detailed-post-by-id';
import { PostContent } from './post-content';

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

  console.log(post);

  if (post) {
    return (
      <Card>
        <Text>
          Posted by {post.username} in {post.community_name}
        </Text>
        <Title order={1} size="h3">
          {post.title}
        </Title>
        <PostContent post={post} />
      </Card>
    );
  }
}

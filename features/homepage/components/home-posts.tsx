import { Container } from '@mantine/core';
import { PostPreviews } from '@/features/posts';
import { fetchHomePosts } from '../api/fetch-home-posts';

export async function HomePosts() {
  const posts = await fetchHomePosts();
  if (posts) {
    return (
      <Container>
        <PostPreviews posts={posts} />
      </Container>
    );
  }
}

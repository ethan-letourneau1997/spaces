'use client';

import { Anchor, Card, Grid } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';

import { PostThumbnail } from '@/features/post-thumbnail';
import { PostVotes } from '@/features/post-votes';

type PostsProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostPreview({ post }: PostsProps) {
  return (
    <Card>
      <Grid>
        <Grid.Col span={2}>
          <PostThumbnail post={post} />
        </Grid.Col>
        <Grid.Col span={9}>
          <div>
            posted by {post.username} in {post.community_name}
          </div>
          <Anchor
            component={Link}
            href={`spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
          >
            {post.title}
          </Anchor>
        </Grid.Col>
        <Grid.Col span={1}>
          <PostVotes postId={post.id} />
        </Grid.Col>
      </Grid>
    </Card>
  );
}

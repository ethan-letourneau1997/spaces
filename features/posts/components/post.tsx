'use client';

import { Card, Grid } from '@mantine/core';

import { Database } from '@/lib/database';

import { PostVotes } from './post-votes';
import { PostThumbnail } from './post-thumbnail';

type PostsProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function Post({ post }: PostsProps) {
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
          <div>{post.title}</div>
        </Grid.Col>
        <Grid.Col span={1}>
          <PostVotes postId={post.id} />
        </Grid.Col>
      </Grid>
    </Card>
  );
}

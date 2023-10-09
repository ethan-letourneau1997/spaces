'use client';

import { Anchor, Card, Text, Grid, Stack } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';

import { PostThumbnail } from '@/features/post-thumbnail';
import { PostVoteButtons } from '@/features/post-votes';

type PostsProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  postVotes: number;
  userVote: number;
  commentCount: number;
};

export function PostPreview({ post, postVotes, userVote, commentCount }: PostsProps) {
  return (
    <Card>
      <Grid>
        <Grid.Col span={2}>
          <PostThumbnail post={post} />
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack align="stretch" justify="space-between" gap={0} h="100%">
            <div>
              <div>
                posted by {post.username} in {post.community_name}
              </div>
              <Anchor
                component={Link}
                href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
              >
                {post.title}
              </Anchor>
            </div>
            <Text>{commentCount} comments</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          <PostVoteButtons post={post} postVotes={postVotes} userVote={userVote} />
        </Grid.Col>
      </Grid>
    </Card>
  );
}

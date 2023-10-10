'use client';

import { Anchor, Card, Text, Grid, Stack, Group } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';
import { Database } from '@/lib/database';

import { PostThumbnail } from '@/features/post-thumbnail';
import { PostOptions } from '@/features/post-options';
import { ThumbnailSkeleton } from '@/components/fallbacks';

type PostPreviewCardProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  commentCount: number;
  postVotesSection: JSX.Element;
};

export function PostPreviewCard({ post, commentCount, postVotesSection }: PostPreviewCardProps) {
  return (
    <Card mt="sm">
      <Grid>
        <Grid.Col span={2}>
          <Suspense fallback={<ThumbnailSkeleton />}>
            <PostThumbnail post={post} />
          </Suspense>
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
            <Group gap="xs" align="center">
              <Text size="sm">
                {commentCount} comment{commentCount === 1 ? '' : 's'}
              </Text>
              <PostOptions post={post} />
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>{postVotesSection}</Grid.Col>
      </Grid>
    </Card>
  );
}

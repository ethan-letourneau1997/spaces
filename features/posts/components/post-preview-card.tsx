'use client';

import { Anchor, Card, Grid, Stack } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';
import { Database } from '@/lib/database';

import { PostThumbnail } from '@/features/post-thumbnail';

type PostPreviewCardProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  postVotesSection: JSX.Element;
  postPreviewFooter: JSX.Element;
};

export function PostPreviewCard({
  post,
  postPreviewFooter,
  postVotesSection,
}: PostPreviewCardProps) {
  return (
    <Card mt="sm">
      <Grid>
        <Grid.Col span={2}>
          <Suspense fallback={<></>}>
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
            {postPreviewFooter}
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>{postVotesSection}</Grid.Col>
      </Grid>
    </Card>
  );
}

'use client';

import { Card, Flex, Grid, Stack } from '@mantine/core';
import { Suspense } from 'react';
import { Database } from '@/lib/database';

import { PostThumbnail } from '@/features/post-thumbnail';
import { PostPreviewHeader } from './post-preview-header';
import { PostPreviewTitle } from './post-preview-title';

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
              <PostPreviewHeader post={post} />
              <PostPreviewTitle post={post} />
            </div>
            {postPreviewFooter}
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          <Flex justify="flex-end">{postVotesSection}</Flex>
        </Grid.Col>
      </Grid>
    </Card>
  );
}

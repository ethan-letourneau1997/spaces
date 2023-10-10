'use client';

import { Anchor, Box, Card, Grid, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';
import { Database } from '@/lib/database';

import { PostThumbnail } from '@/features/post-thumbnail';
import { getTimeSinceNow } from '../../../utils/get-time-since-now';

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
              <Group gap={0}>
                <Text size="xs">posted by&nbsp;</Text>
                <Anchor size="xs" c="gray.3" fw={500}>
                  {post.username}
                </Anchor>
                <Text size="xs">&nbsp;in&nbsp;</Text>{' '}
                <Anchor size="xs" c="gray.3" fw={500}>
                  {post.community_name}
                </Anchor>
                <Text size="xs">&nbsp;-&nbsp;</Text>
                <Text size="xs">{getTimeSinceNow(post.created_at, true)}</Text>
              </Group>
              <Box mt={2}>
                <Anchor
                  c="gray.2"
                  fw={600}
                  // size="18px"
                  component={Link}
                  href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
                >
                  {post.title}
                </Anchor>
              </Box>
            </div>
            {postPreviewFooter}
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>{postVotesSection}</Grid.Col>
      </Grid>
    </Card>
  );
}

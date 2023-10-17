'use client';

import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
} from '@mantine/core';
import { Suspense } from 'react';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { Database } from '@/lib/database';

import { PostThumbnail } from '@/features/post-thumbnail';
import { PostPreviewHeader } from './post-preview-header';
import { PostPreviewTitle } from './post-preview-title';
import { VoteButtons } from '@/features/vote-handler';
import { PostOptions } from '@/features/post-options';

type PostPreviewCardProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  postVotes: number;
  userVote: number;
  commentCount: number;
};

export function PostPreviewCard({ post, postVotes, userVote, commentCount }: PostPreviewCardProps) {
  return (
    <>
      {/* Desktop View  */}
      <Card mt="sm" visibleFrom="xs">
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
              <Group gap={4} align="center">
                <Group gap={1} align="center">
                  <ActionIcon pt={2} color="dark.1" variant="transparent" aria-label="Settings">
                    <LiaCommentAltSolid size={18} />
                  </ActionIcon>
                  <Text size="xs" fw={600} c="dark.1">
                    {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
                  </Text>
                </Group>
                <PostOptions post={post} />
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Flex justify="flex-end">
              <VoteButtons post={post} totalVotes={postVotes} userVote={userVote} />
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
      {/* Mobile View  */}
      <Card hiddenFrom="xs" mt="sm" p="sm">
        {post.type !== 'text' && (
          <Box h={150} w="100%" mb="xs">
            <Suspense fallback={<></>}>
              <PostThumbnail post={post} />
            </Suspense>
          </Box>
        )}

        <div>
          <PostPreviewHeader post={post} />
          <PostPreviewTitle post={post} />
        </div>
        {post.type === 'text' && (
          <TypographyStylesProvider c="gray.6" p={0} mb={0}>
            <div
              style={{ maxHeight: 50, overflow: 'hidden' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </TypographyStylesProvider>
        )}
        <Group gap={4} align="center" mt="xs">
          <VoteButtons horizontal post={post} totalVotes={postVotes} userVote={userVote} />
          <Group gap={1} align="center">
            <ActionIcon pt={2} color="dark.1" variant="transparent" aria-label="Settings">
              <LiaCommentAltSolid size={18} />
            </ActionIcon>
            <Text size="xs" fw={600} c="dark.1">
              {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
            </Text>
          </Group>
          <PostOptions post={post} />
        </Group>
      </Card>
    </>
  );
}

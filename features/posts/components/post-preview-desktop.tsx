'use client';

import { ActionIcon, Anchor, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import { LiaCommentAltSolid } from 'react-icons/lia';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { PostThumbnail } from '@/features/post-thumbnail';
import { VoteHandler } from '@/features/vote-handler';
import { PostOptions } from '@/features/post-options';
import { DEFAULT_SORT } from '@/lib/constants';
import { getTimeSinceNow } from '@/utils/get-time-since-now';

type PostPreviewDesktopProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
  postVotes: number;
  userVote: number;
  commentCount: number;
};

export function PostPreviewDesktop({
  post,
  postVotes,
  userVote,
  commentCount,
}: PostPreviewDesktopProps) {
  return (
    <Card mt="sm">
      <div className="grid grid-cols-12 gap-3">
        <div
          className={`${
            post.type !== 'text' ? 'h-40' : 'hidden sm:block'
          } col-span-12 sm:col-span-2 sm:h-auto`}
        >
          <Suspense fallback={<></>}>
            <PostThumbnail post={post} />
          </Suspense>
        </div>
        <div className="col-span-12 sm:col-span-9">
          <Stack align="stretch" justify="space-between" gap={0} h="100%">
            <div>
              <Group gap={0}>
                <Text size="xs">posted by&nbsp;</Text>
                <Anchor
                  component={Link}
                  href={`/profile/${post.username}/posts/${DEFAULT_SORT}`}
                  size="xs"
                  c="gray.3"
                  fw={500}
                >
                  {post.username}
                </Anchor>
                <Text size="xs">&nbsp;in&nbsp;</Text>{' '}
                <Anchor
                  component={Link}
                  href={`/spaces/${post.posted_in}/${post.community_name}/${DEFAULT_SORT}`}
                  size="xs"
                  c="gray.3"
                  fw={500}
                >
                  {post.community_name}
                </Anchor>
                <Text size="xs">&nbsp;-&nbsp;</Text>
                <Text size="xs">{getTimeSinceNow(post.created_at, true)}</Text>
              </Group>
              <div>
                <Link
                  className="font-bold"
                  href={`/spaces/${post.posted_in}/${post.community_name}/post/${post.id}`}
                >
                  {post.title}
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="block -ml-2 sm:hidden">
                <VoteHandler horizontal post={post} totalVotes={postVotes} userVote={userVote} />
              </div>

              <ActionIcon pt={2} color="dark.1" variant="transparent" aria-label="Settings">
                <LiaCommentAltSolid size={18} />
              </ActionIcon>
              <Text size="xs" fw={600} c="dark.1">
                {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
              </Text>

              <PostOptions post={post} />
            </div>
          </Stack>
        </div>
        <div className="hidden col-span-1 sm:block">
          <Flex justify="flex-end">
            <VoteHandler post={post} totalVotes={postVotes} userVote={userVote} />
          </Flex>
        </div>
      </div>
    </Card>
  );
}

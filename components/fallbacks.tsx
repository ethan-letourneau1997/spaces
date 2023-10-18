'use client';

import { ActionIcon, Box, Card, Flex, Group, Skeleton, Stack, Tabs, Text } from '@mantine/core';
import { IconBook, IconLink, IconPhoto } from '@tabler/icons-react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

export function PostSkeleton() {
  return (
    <Card>
      <Stack>
        <Stack gap="sm" w="70%">
          <Flex align="center" gap="md">
            <Skeleton circle w={45} h={45} />
            <Skeleton h={20} />
          </Flex>
          <Skeleton h={25} />
        </Stack>
        <Skeleton mt="md" h={20} />
        <Skeleton h={20} />
        <Skeleton h={20} />
        <Skeleton h={20} />
        <Skeleton h={20} />
        <Skeleton w="30%" h={15} />
      </Stack>
    </Card>
  );
}

export function CommentSkeleton() {
  return (
    <Stack>
      <Flex align="center" gap="md" w="40%">
        <Skeleton circle h={30} w={35} />
        <Skeleton h={15} />
      </Flex>
      <Skeleton h={15} />
      <Skeleton h={15} />
      <Skeleton h={15} />
      <Skeleton w="30%" h={15} />
    </Stack>
  );
}

type CommentsSkeletonProps = {
  children?: React.ReactNode;
};

export function CommentsSkeleton({ children }: CommentsSkeletonProps) {
  return (
    <Card>
      {children}
      <Stack>
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </Stack>
    </Card>
  );
}

export function PostPageSkeleton() {
  return (
    <Stack>
      <PostSkeleton />
      <CommentsSkeleton />
    </Stack>
  );
}

export function ThumbnailSkeleton() {
  return <Skeleton h="100%" />;
}

type VoteButtonsFallbackProps = {
  horizontal?: boolean;
};

export function VoteButtonsFallback({ horizontal }: VoteButtonsFallbackProps) {
  return (
    <Flex direction={horizontal ? 'row' : 'column'} align="center" justify="center" gap={2}>
      <ActionIcon variant="transparent" color="gray">
        <BiUpvote />
      </ActionIcon>
      <Text>0</Text>
      <ActionIcon variant="transparent" color="gray">
        <BiDownvote />
      </ActionIcon>
    </Flex>
  );
}

export function PostPreviewFooterFallback() {
  return (
    <Group gap="xs" align="center">
      <Text size="xs" fw={600} c="dark.1">
        0 comments
      </Text>
      <Box h={28} w={28} />
    </Group>
  );
}

export function NoPostsFound() {
  return (
    <Box pt="lg">
      <Text c="gray.6" ta="center">
        No posts found
      </Text>
    </Box>
  );
}

export function NewPostFormPlaceholder() {
  return (
    <Card>
      <Tabs defaultValue="text">
        <Tabs.List grow>
          <Tabs.Tab value="text" leftSection={<IconBook />}>
            Text
          </Tabs.Tab>
          <Tabs.Tab value="link" leftSection={<IconLink />}>
            Link
          </Tabs.Tab>
          <Tabs.Tab value="images" leftSection={<IconPhoto />}>
            Images
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Stack mt="md">
        <Skeleton h={36} />
        <Skeleton h={36} />
        <Skeleton h={350} />
      </Stack>
    </Card>
  );
}

export function PostPreviewsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
      <Skeleton height={122} />
    </div>
  );
}

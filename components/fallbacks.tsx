'use client';

import { Card, Flex, Skeleton, Space, Stack } from '@mantine/core';

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
      <CommentsSkeleton>
        <Skeleton h={184} />
        <Space h="lg" />
      </CommentsSkeleton>
    </Stack>
  );
}

export function ThumbnailSkeleton() {
  return <Skeleton h="100%" />;
}

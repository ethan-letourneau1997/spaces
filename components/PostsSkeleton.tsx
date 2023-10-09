import { Skeleton, Stack } from '@mantine/core';

export function PostsSkeleton() {
  return (
    <Stack mt="sm" gap="xs">
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
      <Skeleton height={100} mt={6} />
    </Stack>
  );
}

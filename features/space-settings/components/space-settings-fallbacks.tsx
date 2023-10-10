import { Card, Skeleton } from '@mantine/core';

export const SpaceSettingsFallback = (
  <Card>
    <Skeleton h={30} mt={50} />
    <Skeleton mt={50} h={70} />
    <Skeleton mt={50} h={200} w={200} />
  </Card>
);

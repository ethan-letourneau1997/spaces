import { Divider, Skeleton, Center, Flex } from '@mantine/core';

export const spaceSidebarPlaceholder = (
  <Flex justify="center" direction="column">
    <Center>
      <Skeleton circle h={56} w={56} />
    </Center>
    <Skeleton circle h={16} mt="md" />
    <Skeleton circle h={16} mt="md" />
    <Divider my="md" />
    <Skeleton circle h={16} />
  </Flex>
);

export const avatarPlaceholder = (
  <Center>
    <Skeleton circle h={56} w={56} />
  </Center>
);

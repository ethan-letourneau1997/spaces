import { Divider, Skeleton, Center, Card } from '@mantine/core';

export const spaceSidebarPlaceholder = (
  <Card className="hidden-md" miw="300px" maw="300px" h="fit-content">
    <Center>
      <Skeleton circle h={56} w={56} />
    </Center>
    <Skeleton circle h={16} mt="md" />
    <Skeleton circle h={16} mt="md" />
    <Divider my="md" />
    <Skeleton circle h={16} />
  </Card>
);

export const avatarPlaceholder = (
  <Center>
    <Skeleton circle h={56} w={56} />
  </Center>
);

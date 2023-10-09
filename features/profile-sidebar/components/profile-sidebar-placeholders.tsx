import { Text, Divider, SimpleGrid, Skeleton, Center, Box, Flex, Card } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';
import { PiSignpostFill } from 'react-icons/pi';

export const ProfileSidebarPlaceholder = (
  <Card className="hidden-md" miw="300px" maw="300px" h="fit-content">
    <div>
      <Center>
        <Skeleton circle h={56} w={56} />
      </Center>
      <Skeleton circle h={20} mt="md" />
      <Skeleton circle h={16} mt="md" />
      <Divider mb="sm" mt="md" />
      <SimpleGrid cols={2}>
        <Box>
          <Flex align="center" gap="xs" justify="center">
            <PiSignpostFill />
            <Text>0</Text>
          </Flex>
          <Text ta="center">Posts</Text>
        </Box>
        <Box>
          <Flex align="center" gap="xs" justify="center">
            <FaCommentAlt />
            <Text>0</Text>
          </Flex>
          <Text ta="center">Comments</Text>
        </Box>
      </SimpleGrid>
    </div>
  </Card>
);

export const commentCountPlaceholder = (
  <Box>
    <Flex align="center" gap="xs" justify="center">
      <FaCommentAlt />
      <Text>0</Text>
    </Flex>
    <Text ta="center">Comments</Text>
  </Box>
);

export const postCountPlaceholder = (
  <Box>
    <Flex align="center" gap="xs" justify="center">
      <PiSignpostFill />
      <Text>0</Text>
    </Flex>
    <Text ta="center">Posts</Text>
  </Box>
);

export const avatarPlaceholder = (
  <Center>
    <Skeleton circle h={56} w={56} />
  </Center>
);

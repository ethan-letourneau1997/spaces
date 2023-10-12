import { Text, Divider, SimpleGrid, Skeleton, Center, Box, Flex } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';
import { PiSignpostFill } from 'react-icons/pi';

export function ProfileSidebarSkeleton() {
  return (
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
  );
}

export function CommentCountPlaceholder() {
  return (
    <Box>
      <Flex align="center" gap="xs" justify="center">
        <FaCommentAlt />
        <Text>0</Text>
      </Flex>
      <Text ta="center">Comments</Text>
    </Box>
  );
}

export function PostCountPlaceholder() {
  return (
    <Box>
      <Flex align="center" gap="xs" justify="center">
        <PiSignpostFill />
        <Text>0</Text>
      </Flex>
      <Text ta="center">Posts</Text>
    </Box>
  );
}

export function AvatarPlaceholder() {
  return (
    <Center>
      <Skeleton circle h={56} w={56} />
    </Center>
  );
}

import { Center, Paper } from '@mantine/core';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';

export function TextPostThumbnail() {
  return (
    <Paper radius="sm" h="100%" bg="gray">
      <Center h="100%">
        <BsLayoutTextSidebarReverse size={20} />
      </Center>
    </Paper>
  );
}

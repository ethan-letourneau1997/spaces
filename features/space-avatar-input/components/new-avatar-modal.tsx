import { Text, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { SpaceAvatarHandler } from './space-avatar-handler';
import { Database } from '@/lib/database';

type NewAvatarModalProps = {
  spaceId: string;
  avatar?: Database['public']['Tables']['community_avatar']['Row'];
};

export function NewAvatarModal({ spaceId, avatar }: NewAvatarModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Upload Avatar">
        <SpaceAvatarHandler closeModal={close} avatar={avatar} spaceId={spaceId} />
      </Modal>
      <Button
        onClick={open}
        size="xs"
        style={{ borderWidth: '.5px' }}
        variant="outline"
        color="dark.2"
        mt="sm"
        w={200}
      >
        <Text size="sm">Upload New</Text>
      </Button>
    </>
  );
}

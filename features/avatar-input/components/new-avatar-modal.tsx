import { Text, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { AvatarInputHandler } from './avatar-input-handler';
import { Database } from '@/lib/database';

type NewAvatarModalProps = {
  id: string;
  avatar?:
    | Database['public']['Tables']['community_avatar']['Row']
    | Database['public']['Tables']['profile_avatar']['Row'];
};

export function NewAvatarModal({ id, avatar }: NewAvatarModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Upload Avatar">
        <AvatarInputHandler closeModal={close} avatar={avatar} id={id} />
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

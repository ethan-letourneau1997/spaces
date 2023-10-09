'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';
import { UploadSpaceAvatar } from './upload-space-avatar';
import { Database } from '@/lib/database';

type SpaceAvatarInputProps = {
  avatar?: Database['public']['Tables']['community_avatar']['Row'];
  spaceId: string | number;
};

export function SpaceAvatarInput({ avatar, spaceId }: SpaceAvatarInputProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <UploadSpaceAvatar avatar={avatar} userId={spaceId} close={close} />
      </Modal>
      <Button mt="xs" onClick={open} variant="subtle" size="xs" px={0}>
        Change Avatar
      </Button>
    </>
  );
}

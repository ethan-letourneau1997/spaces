'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';
import { UploadProfileAvatar } from './upload-profile-avatar';
import { Database } from '@/lib/database';

type ProfileAvatarUModalProps = {
  profileAvatar?: Database['public']['Tables']['profile_avatar']['Row'];
  userId: string | number;
};

export function ProfileAvatarModal({ profileAvatar, userId }: ProfileAvatarUModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <UploadProfileAvatar profileAvatar={profileAvatar} userId={userId} close={close} />
      </Modal>
      <Button onClick={open} variant="subtle" size="xs">
        Change Avatar
      </Button>
    </>
  );
}

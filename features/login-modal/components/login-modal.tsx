'use client';

import { Modal, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LoginTabs } from './login-tabs';

export function LoginModal() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Body>
            <LoginTabs />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <UnstyledButton onClick={open}>Login</UnstyledButton>
    </>
  );
}

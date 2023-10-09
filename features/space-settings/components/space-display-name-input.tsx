'use client';

import { Button, Flex, TextInput } from '@mantine/core';

import { notifications } from '@mantine/notifications';
import { useState, useTransition } from 'react';
import { Database } from '@/lib/database';
import { upsertSpaceDisplayName } from '../api/upsert-space-display-name';

type SpaceDisplayNameInputProps = {
  space: Database['public']['Tables']['community']['Row'];
};

export function SpaceDisplayNameInput({ space }: SpaceDisplayNameInputProps) {
  const [displayName, setDisplayName] = useState(space.display_name);
  const [isPending, startTransition] = useTransition();

  async function handleUpdate() {
    startTransition(async () => {
      try {
        await upsertSpaceDisplayName(space, displayName);
        notifications.show({
          title: 'Display Name Updated',
          message: 'The space display name has been updated',
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'An error occurred while updating the display name',
        });
      }
    });
  }
  return (
    <form action={handleUpdate}>
      <Flex gap="sm">
        <TextInput
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          name="displayName"
          mt="lg"
          label="Display Name"
          description="The publicly visible name"
          maw={400}
          w="100%"
        />

        <Flex align="flex-end">
          <Button
            loading={isPending}
            h={35}
            mt="xs"
            size="xs"
            color="gray"
            variant="outline"
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

'use client';

import { Button, Flex, TextInput, Text } from '@mantine/core';

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
          w="85%"
        />

        <Flex align="flex-end" w="15%">
          <Button
            display={displayName === space.display_name ? 'none' : ''}
            loading={isPending}
            h={35}
            mt="xs"
            size="xs"
            color="dark.2"
            variant="outline"
            type="submit"
            style={{ borderWidth: '.5px' }}
          >
            <Text size="sm">Update</Text>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

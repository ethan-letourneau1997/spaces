'use client';

import { Button, Flex, Textarea, Text } from '@mantine/core';

import { notifications } from '@mantine/notifications';
import { useState, useTransition } from 'react';
import { Database } from '@/lib/database';
import { upsertSpaceDescription } from '../api/upsert-space-description';

type SpaceDescriptionInputProps = {
  space: Database['public']['Tables']['community']['Row'];
};

export function SpaceDescriptionInput({ space }: SpaceDescriptionInputProps) {
  const [description, setDescription] = useState(space.description);
  const [isPending, startTransition] = useTransition();

  async function handleUpdate() {
    startTransition(async () => {
      try {
        await upsertSpaceDescription(space, description);
        notifications.show({
          title: 'Description Updated',
          message: 'The space description has been updated',
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'An error occurred while updating the description',
        });
      }
    });
  }
  return (
    <form action={handleUpdate}>
      <Flex gap="sm">
        <Textarea
          mt="lg"
          name="description"
          label="Description"
          description="A brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          w="85%"
        />

        <Flex align="flex-end" w="15%">
          <Button
            display={description === space.description ? 'none' : ''}
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

'use client';

import { Button, Flex, Textarea } from '@mantine/core';

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
          w="100%"
        />

        <Flex align="flex-end" display={description === space.description ? 'none' : ''}>
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

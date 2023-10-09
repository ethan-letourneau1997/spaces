'use client';

import { Box, Button, Flex, Textarea } from '@mantine/core';
import { useState, useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import { upsertUserBio } from '../api/upsert-user-bio';
import { Database } from '@/lib/database';

type BioInputProps = {
  profile: Database['public']['Tables']['public_profile']['Row'];
};

export function BioInput({ profile }: BioInputProps) {
  const [value, setValue] = useState(profile.biography);
  const [isPending, startTransition] = useTransition();

  async function handleUpdateBio() {
    startTransition(async () => {
      try {
        await upsertUserBio(profile, value);
        notifications.show({
          title: 'Success',
          message: 'Your bio has been updated',
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Something went wrong',
        });
      }
    });
  }

  return (
    <Box w={300}>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        label="Biography"
        description="A short description of yourself"
      />
      <Flex
        className={profile.biography === value ? 'hidden-element' : 'block'}
        justify="flex-end"
        mt="sm"
      >
        <Button loading={isPending} onClick={handleUpdateBio} size="xs">
          Save
        </Button>
      </Flex>
    </Box>
  );
}

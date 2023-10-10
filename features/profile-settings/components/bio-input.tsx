'use client';

import { Button, Flex, Textarea, Text } from '@mantine/core';
import { useState, useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import { upsertUserBio } from '../api/upsert-user-bio';
import { Database } from '@/lib/database';

type BioInputProps = {
  profile: Database['public']['Tables']['public_profile']['Row'];
};

export function BioInput({ profile }: BioInputProps) {
  const [bio, setBio] = useState(profile.biography);
  const [isPending, startTransition] = useTransition();

  async function handleUpdateBio() {
    startTransition(async () => {
      try {
        await upsertUserBio(profile, bio);
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
    <form action={handleUpdateBio}>
      <Flex gap="sm">
        <Textarea
          mt="lg"
          name="description"
          label="Description"
          description="A brief description"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          w="85%"
        />

        <Flex align="flex-end" w="15%">
          <Button
            display={bio === profile.biography ? 'none' : ''}
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

'use client';

import { Button, Flex, TextInput, Text } from '@mantine/core';
import { useState } from 'react';

type UsernameInputProps = {
  username: string;
};

export function UsernameInput({ username }: UsernameInputProps) {
  const [name, setName] = useState(username);

  return (
    <>
      <form>
        <Flex gap="sm">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="displayName"
            mt="lg"
            label="Display Name"
            description="The publicly visible name"
            w="85%"
          />

          <Flex align="flex-end" w="15%">
            <Button
              display={name === username ? 'none' : ''}
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
    </>
  );
}

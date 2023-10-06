'use client';

import { Box, Button, Flex, TextInput } from '@mantine/core';
import { useState } from 'react';

type UsernameInputProps = {
  username: string;
};

export function UsernameInput({ username }: UsernameInputProps) {
  const [value, setValue] = useState(username);

  return (
    <Box w={300}>
      <TextInput
        disabled
        w={300}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        label="Username"
        description="The name that will be displayed to other users"
      />
      <Flex className={username === value ? 'hidden-element' : 'block'} justify="flex-end" mt="sm">
        <Button size="xs">Save</Button>
      </Flex>
    </Box>
  );
}

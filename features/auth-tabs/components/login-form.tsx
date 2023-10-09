import { Button, Flex, TextInput } from '@mantine/core';

export function LoginForm() {
  return (
    <form action="/auth/login" method="post">
      <TextInput label="email" placeholder="jim123@email.com" name="email" mt="md" />
      <TextInput mt="md" label="password" name="password" />
      <Flex mt="md" justify="flex-end">
        <Button type="submit" variant="filled">
          Sign In
        </Button>
      </Flex>
    </form>
  );
}

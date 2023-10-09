import { Button, Flex, TextInput } from '@mantine/core';

export function SignUpForm() {
  return (
    <form action="/auth/sign-up" method="post">
      <TextInput label="email" placeholder="jim123@email.com" name="email" mt="md" />
      <TextInput mt="md" label="password" name="password" />
      <Flex mt="md" justify="flex-end">
        <Button type="submit" variant="filled">
          Sign Up
        </Button>
      </Flex>
    </form>
  );
}

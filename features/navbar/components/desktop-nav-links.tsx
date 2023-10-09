import { UnstyledButton, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Link from 'next/link';

import { DEFAULT_SORT } from '@/lib/constants';

export function HomeLink() {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton component={Link} href="/">
      <Text ref={ref} variant={hovered ? 'gradient' : ''} gradient={{ from: 'pink', to: 'yellow' }}>
        Home
      </Text>
    </UnstyledButton>
  );
}

export function FeedLink() {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton component={Link} href={`/feed/${DEFAULT_SORT}`}>
      <Text ref={ref} variant={hovered ? 'gradient' : ''} gradient={{ from: 'pink', to: 'yellow' }}>
        Feed
      </Text>
    </UnstyledButton>
  );
}

export function ProfileLink({ username }: { username: string }) {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton component={Link} href={`/profile/${username}/posts/${DEFAULT_SORT}`}>
      <Text ref={ref} variant={hovered ? 'gradient' : ''} gradient={{ from: 'pink', to: 'yellow' }}>
        Profile
      </Text>
    </UnstyledButton>
  );
}

export function SettingsLink() {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton component={Link} href="/settings">
      <Text ref={ref} variant={hovered ? 'gradient' : ''} gradient={{ from: 'pink', to: 'yellow' }}>
        Settings
      </Text>
    </UnstyledButton>
  );
}

export function LogoutLink() {
  const { hovered, ref } = useHover();
  return (
    <form action="/auth/sign-out" method="post">
      <UnstyledButton type="submit">
        <Text
          ref={ref}
          variant={hovered ? 'gradient' : ''}
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Logout
        </Text>
      </UnstyledButton>
    </form>
  );
}

export function LoginLink() {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton component={Link} href="/login">
      <Text ref={ref} variant={hovered ? 'gradient' : ''} gradient={{ from: 'pink', to: 'yellow' }}>
        Login
      </Text>
    </UnstyledButton>
  );
}

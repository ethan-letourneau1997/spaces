'use client';

import { Group, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import classes from './MobileNavbar.module.css';
import { DEFAULT_SORT } from '@/lib/constants';

type DesktopNavbarProps = {
  username: string | null;
};

export function DesktopNavbar({ username }: DesktopNavbarProps) {
  return (
    <Group ml="xl" visibleFrom="sm">
      <UnstyledButton component={Link} href="/" className={classes.control}>
        Home
      </UnstyledButton>
      <UnstyledButton component={Link} href={`/feed/${DEFAULT_SORT}`} className={classes.control}>
        Feed
      </UnstyledButton>

      {username ? (
        <>
          <UnstyledButton
            component={Link}
            href={`/profile/${username}/posts/${DEFAULT_SORT}`}
            className={classes.control}
          >
            Profile
          </UnstyledButton>
          <UnstyledButton component={Link} href="/settings" className={classes.control}>
            Settings
          </UnstyledButton>
          <form action="/auth/sign-out" method="post">
            <UnstyledButton className={classes.control} type="submit">
              Logout
            </UnstyledButton>
          </form>
        </>
      ) : (
        <UnstyledButton component={Link} href="/login" className={classes.control}>
          Login
        </UnstyledButton>
      )}
    </Group>
  );
}

'use client';

import { AppShell, UnstyledButton } from '@mantine/core';

import Link from 'next/link';
import classes from './MobileNavbar.module.css';
import { DEFAULT_SORT } from '@/lib/constants';

type MobileNavbarProps = {
  username: string | null;
};

export function MobileNavbar({ username }: MobileNavbarProps) {
  return (
    <AppShell.Navbar py="md" px={4}>
      <UnstyledButton component={Link} href="/" className={classes.control}>
        Home
      </UnstyledButton>
      <UnstyledButton component={Link} href={`/feed/${DEFAULT_SORT}`} className={classes.control}>
        Feed
      </UnstyledButton>

      {username && (
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
        </>
      )}
    </AppShell.Navbar>
  );
}

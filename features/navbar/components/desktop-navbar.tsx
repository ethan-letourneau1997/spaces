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
    <Group ml="xl" gap={0} visibleFrom="sm">
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
    </Group>
  );
}

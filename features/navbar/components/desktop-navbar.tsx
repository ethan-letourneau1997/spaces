'use client';

import { Group } from '@mantine/core';
import {
  FeedLink,
  HomeLink,
  LoginLink,
  LogoutLink,
  ProfileLink,
  SettingsLink,
} from './desktop-nav-links';

type DesktopNavbarProps = {
  username: string | null;
};

export function DesktopNavbar({ username }: DesktopNavbarProps) {
  return (
    <Group gap="xl" ml="xl" preventGrowOverflow visibleFrom="sm">
      <HomeLink />
      {username ? (
        <>
          <FeedLink />
          <ProfileLink username={username} />
          <SettingsLink />
          <LogoutLink />
        </>
      ) : (
        <LoginLink />
      )}
    </Group>
  );
}

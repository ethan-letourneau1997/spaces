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
import { Spotlight } from '@/features/spotlight';

type DesktopNavbarProps = {
  username: string | null;
};

export function DesktopNavbar({ username }: DesktopNavbarProps) {
  return (
    <Group gap="xl" ml="xl" preventGrowOverflow visibleFrom="md">
      <Spotlight />
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

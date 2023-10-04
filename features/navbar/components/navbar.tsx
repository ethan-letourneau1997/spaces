'use client';

import { AppShell, Burger, Group } from '@mantine/core';

import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';

import useSWR from 'swr';
import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';
import { fetchSession } from '@/utils/fetch-session';
import { fetchProfileById } from '@/utils/fetch-profile-by-id';

type NavbarProps = {
  children: React.ReactNode;
};

export function Navbar({ children }: NavbarProps) {
  const [opened, { toggle }] = useDisclosure();
  const { data: username } = useSWR('username', async () => {
    const data = await fetchSession();
    if (data.session) {
      const profile = await fetchProfileById(data.session.user.id);
      return profile.username;
    }
    return null;
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <MantineLogo size={30} />
            <DesktopNavbar username={username} />
          </Group>
        </Group>
      </AppShell.Header>

      <MobileNavbar username={username} />

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

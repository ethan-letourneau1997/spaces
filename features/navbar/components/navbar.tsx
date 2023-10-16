'use client';

import { Anchor, AppShell, Burger, Flex, Group } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import useSWR from 'swr';
import { FaUserAstronaut } from 'react-icons/fa';
import Link from 'next/link';
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
      bg="dark.9"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      // padding="md"
      className="!sm:px-4 py-0 sm:py-4"
    >
      <AppShell.Header bg="dark.9">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Group px="md" justify="space-between" style={{ flex: 1 }}>
            <Group gap="xs">
              <Flex c="pink.8">
                <FaUserAstronaut size={26} />
              </Flex>
              <Anchor
                className="!no-underline"
                component={Link}
                href="/"
                size="30px"
                fw={600}
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Spaces
              </Anchor>
            </Group>
            <DesktopNavbar username={username} />
          </Group>
        </Group>
      </AppShell.Header>
      <MobileNavbar username={username} />
      <AppShell.Main mih="">{children}</AppShell.Main>
    </AppShell>
  );
}

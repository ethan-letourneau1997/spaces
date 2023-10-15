'use client';

import { Group, Menu, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { FeedLink, HomeLink } from './desktop-nav-links';
import { Spotlight } from '@/features/spotlight';
import { DEFAULT_SORT } from '@/lib/constants';
import { LoginModal } from '@/features/login-modal';

type DesktopNavbarProps = {
  username: string | null;
};

export function DesktopNavbar({ username }: DesktopNavbarProps) {
  return (
    <Group gap="md" ml="xl" preventGrowOverflow visibleFrom="md">
      <Spotlight />
      <HomeLink />
      {username ? (
        <>
          <FeedLink />
          <Menu shadow="md" trigger="hover">
            <Menu.Target>
              <Group gap={2}>
                <UnstyledButton>{username}</UnstyledButton>
                <IconChevronDown className="text-gray-6" size={20} />
              </Group>
            </Menu.Target>
            <Menu.Dropdown w={120}>
              <Menu.Item href={`/profile/${username}/posts/${DEFAULT_SORT}`} component={Link}>
                Profile
              </Menu.Item>
              <Menu.Item component={Link} href="/settings">
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item c="red.5">
                <form action="/auth/sign-out" method="post">
                  <UnstyledButton className="!text-sm " type="submit">
                    Logout
                  </UnstyledButton>
                </form>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </>
      ) : (
        <LoginModal />
      )}
    </Group>
  );
}

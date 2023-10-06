'use client';

import { Tabs } from '@mantine/core';
import { useRouter } from 'next/navigation';

type SettingsTabsProps = {
  page: 'profile' | 'admin' | 'privacy';
};

export function SettingsTabs({ page }: SettingsTabsProps) {
  const router = useRouter();
  return (
    <Tabs value={page} onChange={(value) => router.push(`/settings?page=${value}`)}>
      <Tabs.List>
        <Tabs.Tab value="profile">Profile</Tabs.Tab>
        <Tabs.Tab value="admin">Admin</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">profile tab content</Tabs.Panel>

      <Tabs.Panel value="admin">admin tab content</Tabs.Panel>

      <Tabs.Panel value="settings">settings tab content</Tabs.Panel>
    </Tabs>
  );
}

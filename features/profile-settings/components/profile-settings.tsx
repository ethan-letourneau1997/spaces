'use client';

import { Card, Container, Tabs, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ProfileTab } from './profile-tab';
import { AdminTab } from './admin-tab';
import { Database } from '@/lib/database';

type SettingsProps = {
  page: 'string';
  profile: Database['public']['Tables']['public_profile']['Row'];
  avatar?: Database['public']['Tables']['profile_avatar']['Row'];
};

export function ProfileSettings({ page, profile, avatar }: SettingsProps) {
  const router = useRouter();
  return (
    <Container size="sm">
      <Card p="lg">
        <Title mt="sm" ta="center" size="h2" order={1}>
          {profile.username}
        </Title>
        <Tabs
          defaultValue="profile"
          value={page}
          onChange={(value) => router.push(`/settings?page=${value}`)}
        >
          <Tabs.List grow>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="admin">Admin</Tabs.Tab>
            <Tabs.Tab value="privacy">Privacy</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="profile">
            <ProfileTab avatar={avatar} profile={profile} />
          </Tabs.Panel>
          <Tabs.Panel value="admin">
            <AdminTab />
          </Tabs.Panel>
          <Tabs.Panel value="privacy">privacy tab content</Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
}

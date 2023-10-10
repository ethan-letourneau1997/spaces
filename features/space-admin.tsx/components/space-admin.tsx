'use client';

import { Card, Container, Tabs } from '@mantine/core';

import { useRouter } from 'next/navigation';
import { Database } from '@/lib/database';

type SpaceAdminProps = {
  space: Database['public']['Tables']['community']['Row'];
  tabContent: JSX.Element;
  tab: string;
};

export function SpaceAdmin({ tab, space, tabContent }: SpaceAdminProps) {
  const router = useRouter();

  const prefetchValue = tab === 'settings' ? 'metrics' : 'settings';

  router.prefetch(`/spaces/${space.id}/${space.name}/admin/${prefetchValue}`);

  return (
    <Container size="sm">
      <Card>
        <Tabs
          value={tab}
          onChange={(value) => router.push(`/spaces/${space.id}/${space.name}/admin/${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
            <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="settings">{tabContent}</Tabs.Panel>
          <Tabs.Panel value="metrics">{tabContent}</Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
}

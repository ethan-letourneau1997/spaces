'use client';

import { Card, Container, Tabs, Title } from '@mantine/core';

import { useRouter } from 'next/navigation';

type SpaceAdminProps = {
  spaceName: string;
  spaceId: string;
  tabContent: JSX.Element;
  tab: string;
};

export function SpaceAdmin({ tab, spaceName, spaceId, tabContent }: SpaceAdminProps) {
  const router = useRouter();

  // const prefetchValue = tab === 'settings' ? 'metrics' : 'settings';

  // router.prefetch(`/spaces/${spaceId}/${spaceName}/admin/${prefetchValue}`);

  return (
    <Container size="sm">
      <Card>
        <Title mt="sm" ta="center" size="h2" order={1}>
          {spaceName}
        </Title>
        <Tabs
          value={tab}
          onChange={(value) => router.push(`/spaces/${spaceId}/${spaceName}/admin/${value}`)}
        >
          <Tabs.List grow>
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

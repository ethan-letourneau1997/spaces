'use client';

import { Anchor, Card, Container, Tabs } from '@mantine/core';
import Link from 'next/link';

import { Database } from '@/lib/database';
import classes from './space-admin.module.css';

type SpaceAdminProps = {
  space: Database['public']['Tables']['community']['Row'];
  tabContent: JSX.Element;
  tab: string;
};

export function SpaceAdmin({ tab, space, tabContent }: SpaceAdminProps) {
  return (
    <Container size="sm">
      <Card>
        <Tabs defaultValue="profile" value={tab}>
          <Tabs.List>
            <Tabs.Tab value="settings">
              <Anchor
                classNames={{
                  root: classes.tabAnchor,
                }}
                c="gray.0"
                component={Link}
                href={`/spaces/${space.id}/${space.name}/admin/settings`}
              >
                Settings
              </Anchor>
            </Tabs.Tab>
            <Tabs.Tab value="metrics">
              <Anchor
                classNames={{
                  root: classes.tabAnchor,
                }}
                c="gray.0"
                component={Link}
                href={`/spaces/${space.id}/${space.name}/admin/metrics`}
              >
                Metrics
              </Anchor>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="settings">{tabContent}</Tabs.Panel>
          <Tabs.Panel value="metrics">{tabContent}</Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
}

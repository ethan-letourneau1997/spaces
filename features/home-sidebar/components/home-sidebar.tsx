import { Title, Text, Anchor, Group } from '@mantine/core';
import Link from 'next/link';
import { SidebarWrapper } from '@/features/sidebar-wrapper';
import { fetchSession } from '@/utils/fetch-session';

import { LoggedInSidebar } from './logged-in-sidebar';

export async function HomeSidebar() {
  const data = await fetchSession();

  if (data.session) {
    return <LoggedInSidebar userId={data.session.user.id} />;
  }
  return (
    <>
      <SidebarWrapper>
        <Title ta="center">
          Welcome to&nbsp;
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Spaces
          </Text>
        </Title>
        <Group gap={0} mt="md">
          <Text>Want to&nbsp;</Text>
          <Text fw={700}>Vote</Text>
          <Text>,&nbsp;</Text>
          <Text fw={700}>Post</Text>
          <Text>, or&nbsp;</Text>
          <Text fw={700}>Comment?</Text>
        </Group>
        <div className="flex">
          <Anchor href="/login?tab=sign-in" component={Link}>
            Login&nbsp;
          </Anchor>
          <Text>or&nbsp;</Text>
          <Anchor href="/login?tab=sign-up" component={Link}>
            Sign up
          </Anchor>
        </div>
      </SidebarWrapper>
    </>
  );
}

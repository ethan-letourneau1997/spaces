import { Title, Text } from '@mantine/core';
import { SidebarWrapper } from '@/features/sidebar-wrapper';
import { fetchProfileById } from '@/utils/fetch-profile-by-id';
import { LatestFromFeed } from './latest-from-feed';

type LoggedInSidebarProps = {
  userId: string;
};

export async function LoggedInSidebar({ userId }: LoggedInSidebarProps) {
  const public_profile = await fetchProfileById(userId);

  return (
    <>
      <SidebarWrapper>
        <Title size="h2" ta="center">
          Welcome to&nbsp;
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Spaces
          </Text>
          <Text inherit>{public_profile.username}</Text>
        </Title>
      </SidebarWrapper>

      <LatestFromFeed userId={userId} />
    </>
  );
}

import { Title, Text, SimpleGrid } from '@mantine/core';
import Link from 'next/link';
import { SidebarWrapper } from '@/features/sidebar-wrapper';
import { fetchProfileById } from '@/utils/fetch-profile-by-id';
import { fetchLatestFromFeed } from '../api/fetch-latest-from-feed';
import { LatestFromFeed } from './latest-from-feed';
import { DEFAULT_SORT } from '@/lib/constants';

type LoggedInSidebarProps = {
  userId: string;
};

export async function LoggedInSidebar({ userId }: LoggedInSidebarProps) {
  const public_profile = await fetchProfileById(userId);
  const latestPosts = await fetchLatestFromFeed(userId);

  return (
    <SidebarWrapper>
      <Title ta="center">
        Welcome to&nbsp;
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Spaces
        </Text>
        <Text inherit>{public_profile.username}</Text>
      </Title>
      <SimpleGrid cols={2} mt="md">
        <Link
          className="py-1.5 text-sm font-semibold text-center border rounded-sm border-gray-6 text-gray-6 hover:bg-dark-5"
          href={`/profile/${public_profile.username}/posts/${DEFAULT_SORT}`}
        >
          My Feed
        </Link>
        <Link
          className="py-1.5 text-sm font-semibold text-center border rounded-sm border-gray-6 text-gray-6 hover:bg-dark-5"
          href={`/profile/${public_profile.username}/posts/${DEFAULT_SORT}`}
        >
          My Profile
        </Link>
      </SimpleGrid>
      {latestPosts && <LatestFromFeed posts={latestPosts} />}
    </SidebarWrapper>
  );
}

import { fetchUserSpaces } from '@/features/feed/api/fetch-user-spaces';
import { SidebarWrapper } from '@/features/sidebar-wrapper';
import { SidebarSpaces } from './sidebar-spaces';
import { FeedSidebarHeader } from './feed-sidebar-header';

export async function FeedSidebar() {
  const userSpaces = await fetchUserSpaces();

  if (userSpaces) {
    return (
      <SidebarWrapper>
        <FeedSidebarHeader />
        <SidebarSpaces spaces={userSpaces} />
      </SidebarWrapper>
    );
  }
  return <SidebarWrapper miw="250px">loading...</SidebarWrapper>;
}

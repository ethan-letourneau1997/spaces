import { fetchUserSpaces } from '@/features/feed/api/fetch-user-spaces';
import { SidebarWrapper } from '@/features/sidebar-wrapper';

import { ProfileSidebarHeader } from './profile-sidebar-header';
import { ProfileSidebarDetails } from './profile-sidebar-details';

export async function ProfileSidebar() {
  const userSpaces = await fetchUserSpaces();

  if (userSpaces) {
    return (
      <SidebarWrapper>
        <ProfileSidebarHeader />
        <ProfileSidebarDetails />
      </SidebarWrapper>
    );
  }
}

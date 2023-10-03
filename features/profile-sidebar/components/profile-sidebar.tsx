import { fetchUserSpaces } from '@/features/feed/api/fetch-user-spaces';
import { SidebarWrapper } from '@/features/sidebar-wrapper';

import { ProfileSidebarDetails } from './profile-sidebar-details';
import { ProfileAvatar } from './profile-avatar';
import { ProfileSidebarUsername } from './profile-sidebar-username';

export async function ProfileSidebar() {
  const userSpaces = await fetchUserSpaces();

  if (userSpaces) {
    return (
      <SidebarWrapper>
        <ProfileAvatar />
        <ProfileSidebarUsername />
        <ProfileSidebarDetails />
      </SidebarWrapper>
    );
  }
}

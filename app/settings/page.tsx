import { redirect } from 'next/navigation';
import { ProfileSettings } from '@/features/profile-settings/components/profile-settings';
import { fetchAvatar } from '@/utils/fetch-avatar';
import { fetchProfileById } from '@/utils/fetch-profile-by-id';
import { fetchSession } from '@/utils/fetch-session';

export const dynamic = 'force-dynamic';

type SettingsPageProps = {
  searchParams: {
    page: 'string';
  };
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const data = await fetchSession();
  if (!data.session) redirect('/login');

  async function fetchProfile() {
    if (data.session) {
      const public_profile = await fetchProfileById(data.session.user.id);
      return public_profile;
    }
    return null;
  }

  async function fetchUserAvatar() {
    if (data.session) {
      const avatar = await fetchAvatar(data.session.user.id);
      return avatar;
    }
    return null;
  }

  const profile = await fetchProfile();
  const avatar = await fetchUserAvatar();

  return <ProfileSettings page={searchParams.page} profile={profile} avatar={avatar} />;
}

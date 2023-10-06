import { Settings } from '@/features/settings';

export const dynamic = 'force-dynamic';

type SettingsPageProps = {
  searchParams: {
    page: 'profile' | 'admin' | 'privacy';
  };
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  return <Settings page={searchParams.page} />;
}

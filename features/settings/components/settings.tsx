import { SettingsTabs } from './settings-tabs';

type SettingsProps = {
  page: 'profile' | 'admin' | 'privacy';
};

export async function Settings({ page }: SettingsProps) {
  return <SettingsTabs page={page} />;
}

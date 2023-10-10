import { Card } from '@mantine/core';

import { Suspense } from 'react';
import { SpaceDescriptionInput } from './space-description-input';
import { SpaceDisplayNameInput } from './space-display-name-input';
import { fetchAdminSpace } from '@/utils/fetch-admin-space';
import { SpaceSettingsFallback } from './space-settings-fallbacks';
import { fetchSpaceAvatar } from '@/utils/fetch-space-avatar';
import { AvatarInput } from '@/features/avatar-input';

type SpaceSettingsProps = {
  spaceId: string;
};

export async function SpaceSettings({ spaceId }: SpaceSettingsProps) {
  const space = await fetchAdminSpace(spaceId);
  const avatar = await fetchSpaceAvatar(spaceId);

  if (space) {
    return (
      <Suspense fallback={SpaceSettingsFallback}>
        <Card>
          <SpaceDisplayNameInput space={space} />
          <SpaceDescriptionInput space={space} />
          <AvatarInput avatar={avatar} id={spaceId} />
        </Card>
      </Suspense>
    );
  }
}

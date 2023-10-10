import { Card } from '@mantine/core';

import { Suspense } from 'react';
import { SpaceDescriptionInput } from './space-description-input';
import { SpaceDisplayNameInput } from './space-display-name-input';
import { fetchAdminSpace } from '@/utils/fetch-admin-space';
import { fetchSpaceAvatar } from '@/utils/fetch-space-avatar';

import { SpaceDisplayAvatar } from './space-display-avatar';
import { SpaceAvatarHandler } from './space-avatar-handler';
import { SpaceSettingsFallback } from './space-settings-fallbacks';

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

          {avatar ? (
            <SpaceDisplayAvatar spaceId={spaceId} avatar={avatar} />
          ) : (
            <SpaceAvatarHandler spaceId={spaceId} avatar={avatar} />
          )}
        </Card>
      </Suspense>
    );
  }
}

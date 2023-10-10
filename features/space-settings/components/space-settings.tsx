import { Box, Card, Title } from '@mantine/core';

import { SpaceDescriptionInput } from './space-description-input';
import { SpaceDisplayNameInput } from './space-display-name-input';
import { Database } from '@/lib/database';
import { SpaceSettingsAvatar } from './space-settings-avatar';

type SpaceSettingsProps = {
  space: Database['public']['Tables']['community']['Row'];
  avatar?: Database['public']['Tables']['community_avatar']['Row'];
};

export function SpaceSettings({ space, avatar }: SpaceSettingsProps) {
  if (space) {
    return (
      <Card>
        <Title size="h3" order={1}>
          {space.display_name} Settings
        </Title>
        <SpaceDisplayNameInput space={space} />
        <SpaceDescriptionInput space={space} />

        <Box mt="lg">
          <SpaceSettingsAvatar spaceId={space.id} avatar={avatar} />{' '}
        </Box>
      </Card>
    );
  }
}

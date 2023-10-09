import { Box, Card, Title } from '@mantine/core';
import { fetchSpaceById } from '@/utils/fetch-space-by-id';
import { SpaceSettingsAvatarHandler } from './space-settings-avatar-handler';

import { SpaceDescriptionInput } from './space-description-input';
import { SpaceDisplayNameInput } from './space-display-name-input';

type SpaceSettingsProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export async function SpaceSettings({ params }: SpaceSettingsProps) {
  const space = await fetchSpaceById(params.spaceId);

  if (space) {
    return (
      <Card>
        <Title size="h3" order={1}>
          {params.spaceName} Settings
        </Title>
        {/* <TextInput
          mt="lg"
          label="Display Name"
          description="The publicly visible name"
          value={space.display_name}
          maw={400}
        /> */}
        {/* <DisplayNameInput space={space} /> */}
        <SpaceDisplayNameInput space={space} />
        {/* <Textarea
          mt="lg"
          label="Description"
          description="A brief description"
          value={space.description}
          maw={400}
        /> */}
        {/* <SpaceBioInput space={space} /> */}
        <SpaceDescriptionInput space={space} />

        <Box mt="lg">
          <SpaceSettingsAvatarHandler spaceId={space.id} />
        </Box>
      </Card>
    );
  }
}

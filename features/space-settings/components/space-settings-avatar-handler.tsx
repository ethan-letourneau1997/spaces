import { fetchSpaceAvatar } from '@/utils/fetch-space-avatar';
import { SpaceSettingsAvatar } from './space-settings-avatar';

type SpaceSettingsAvatarHandlerProps = {
  spaceId: string;
};

export async function SpaceSettingsAvatarHandler({ spaceId }: SpaceSettingsAvatarHandlerProps) {
  const avatar = await fetchSpaceAvatar(spaceId as string);

  return <SpaceSettingsAvatar spaceId={spaceId} avatar={avatar || null} />;
}

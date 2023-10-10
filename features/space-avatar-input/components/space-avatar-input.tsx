import { SpaceDisplayAvatar } from './space-display-avatar';
import { SpaceAvatarHandler } from './space-avatar-handler';
import { Database } from '@/lib/database';

type SpaceAvatarInputProps = {
  spaceId: string;
  avatar?: Database['public']['Tables']['community_avatar']['Row'];
};

export function SpaceAvatarInput({ spaceId, avatar }: SpaceAvatarInputProps) {
  return (
    <>
      {avatar ? (
        <SpaceDisplayAvatar spaceId={spaceId} avatar={avatar} />
      ) : (
        <SpaceAvatarHandler spaceId={spaceId} avatar={avatar} />
      )}
    </>
  );
}

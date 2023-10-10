import { DisplayAvatar } from './display-avatar';
import { AvatarInputHandler } from './avatar-input-handler';
import { Database } from '@/lib/database';

type AvatarInputProps = {
  id: string;
  avatar?:
    | Database['public']['Tables']['community_avatar']['Row']
    | Database['public']['Tables']['profile_avatar']['Row'];
};

export function AvatarInput({ id, avatar }: AvatarInputProps) {
  return (
    <>
      {avatar ? (
        <DisplayAvatar id={id} avatar={avatar} />
      ) : (
        <AvatarInputHandler id={id} avatar={avatar} />
      )}
    </>
  );
}

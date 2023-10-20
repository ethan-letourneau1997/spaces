import Image from 'next/image';
import { Skeleton } from '@mantine/core';
import { fetchAvatar } from '@/utils/fetch-avatar';

type ReplyAvatarProps = {
  userId: string;
};

export async function ReplyAvatar({ userId }: ReplyAvatarProps) {
  const userAvatar = await fetchAvatar(userId);

  if (userAvatar) {
    return (
      <div className="w-[28px] h-[28px] relative ">
        <Image
          className="rounded-full"
          src={userAvatar.path}
          alt="img name"
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }

  return <Skeleton circle w={28} h={28} />;
}

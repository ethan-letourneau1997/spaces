'use client';

import { useState, useTransition } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { Button, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';
import { notifications } from '@mantine/notifications';
import { Database } from '@/lib/database';
import { AvatarDropzone } from './avatar-dropzone';
import { upsertSpaceAvatar } from '../../space-settings/api/upsert-space-avatar';
import { upsertProfileAvatar } from '../api/upsert-profile-avatar';

type AvatarInputHandlerProps = {
  avatar?:
    | Database['public']['Tables']['community_avatar']['Row']
    | Database['public']['Tables']['profile_avatar']['Row'];
  id: string;
  closeModal?: () => void;
};

export function AvatarInputHandler({ avatar, id, closeModal }: AvatarInputHandlerProps) {
  const [newAvatar, setNewAvatar] = useState<FileWithPath | null>(null);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const previousImage = avatar ? avatar.file_name : null;

  const uploadDisabled = !newAvatar;

  const handleAvatarUpload = async () => {
    startTransition(async () => {
      // const previousImage = avatar ? avatar.file_name : null;
      if (newAvatar) {
        const filename = uuidv4();

        // upload image to storage
        const { data: image } = await supabase.storage
          .from('images')
          .upload(`/public/${filename}`, newAvatar, {
            cacheControl: '3600',
            upsert: false,
          });

        if (image) {
          // get image information form storage
          const { data: publicUrl } = await supabase.storage
            .from('images')
            .getPublicUrl(`${image.path}`);

          if (publicUrl) {
            if (pathname.includes('/admin')) {
              await upsertSpaceAvatar(id, publicUrl.publicUrl, filename, pathname);
            }
            if (!pathname.includes('/admin')) {
              await upsertProfileAvatar(id, publicUrl.publicUrl, filename);
            }

            if (previousImage) {
              await supabase.storage.from('images').remove([`public/${previousImage}`]);
            }

            notifications.show({
              title: 'Success',
              message: 'Your avatar has been updated',
            });

            if (closeModal) {
              closeModal();
            }
          }
        }
      }
    });
  };

  return (
    <>
      <AvatarDropzone setImage={setNewAvatar} />
      <Button
        disabled={uploadDisabled}
        loading={isPending}
        onClick={handleAvatarUpload}
        variant="outline"
        color="gray.5"
        size="xs"
        mt="sm"
        w={200}
      >
        <Text size="sm">Upload</Text>
      </Button>
    </>
  );
}

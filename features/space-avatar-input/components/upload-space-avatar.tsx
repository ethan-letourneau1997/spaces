'use client';

import 'cropperjs/dist/cropper.css';

import { ChangeEvent, useState, useTransition } from 'react';

import Cropper from 'react-cropper';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';

import { Button, Input } from '@mantine/core';
import { upsertSpaceAvatar } from '../api/upsert-space-avatar';
import { Database } from '@/lib/database';

type UploadSpaceAvatarProps = {
  userId: string | number;
  avatar?: Database['public']['Tables']['community_avatar']['Row'];
  close: () => void;
};

export function UploadSpaceAvatar({ userId, avatar, close }: UploadSpaceAvatarProps) {
  const [image, setImage] = useState<string | null>(null);
  const [cropper, setCropper] = useState<Cropper>();
  const [isPending, startTransition] = useTransition();

  const supabase = createClientComponentClient();

  const setNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getCropData = async () => {
    startTransition(async () => {
      const previousImage = avatar ? avatar.file_name : null;
      if (cropper) {
        const file = await fetch(cropper.getCroppedCanvas().toDataURL())
          .then((res) => res.blob())
          .then((blob) => new File([blob], 'newAvatar.png', { type: 'image/png' }));
        if (file) {
          const filename = uuidv4();

          // upload image to storage
          const { data, error } = await supabase.storage
            .from('images')
            .upload(`/public/${filename}`, file, {
              cacheControl: '3600',
              upsert: false,
            });
          if (data) {
            // get image information form storage
            const { data: publicUrl } = await supabase.storage
              .from('images')
              .getPublicUrl(`${data.path}`);

            if (publicUrl) {
              upsertSpaceAvatar(userId, publicUrl.publicUrl, filename);

              if (previousImage) {
                await supabase.storage.from('images').remove([`public/${previousImage}`]);
              }

              // close modal when done
              close();
            }
          }
          if (error) {
            console.log(error);
          }
        }
      }
    });
  };

  return (
    <div>
      <div className="grid w-full max-w-sm items-center  gap-1.5">
        <Input
          id="picture"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={setNewImage}
        />
      </div>

      {image && (
        <>
          <div className="flex justify-center max-w-full mt-5">
            <Cropper
              aspectRatio={1}
              src={image}
              style={{ height: 350, width: 350 }}
              initialAspectRatio={4 / 4}
              minCropBoxHeight={100}
              minCropBoxWidth={100}
              guides={false}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </div>
          <div className="flex justify-center mt-5">
            <Button loading={isPending} onClick={getCropData}>
              Save Avatar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import { Group, Input, Text, rem, Image, Box, Stack, Center } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { useState } from 'react';
import { useDidUpdate } from '@mantine/hooks';

type AvatarDropzoneProps = {
  setImage: (image: FileWithPath) => void;
};

export function AvatarDropzone({ setImage }: AvatarDropzoneProps) {
  const [avatarPreviews, setAvatarPreviews] = useState<FileWithPath[]>([]);

  function handleImageDrop() {
    setImage(avatarPreviews[0]);
  }

  useDidUpdate(() => handleImageDrop(), [avatarPreviews]);

  const previews = avatarPreviews.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Image
        h={200}
        w={200}
        fit="cover"
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  return (
    <Box>
      <Input.Wrapper label="Avatar" description="An avatar representing the space" />
      <Dropzone
        h={200}
        w={200}
        maxFiles={1}
        p={0}
        mt="xs"
        onDrop={setAvatarPreviews}
        onReject={(files) => console.log('rejected files', files)}
        accept={IMAGE_MIME_TYPE}
      >
        <Group h={200} justify="center" style={{ pointerEvents: 'none' }}>
          {previews.length === 0 ? (
            <Stack>
              <Center>
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(40),
                      height: rem(40),
                      color: 'var(--mantine-color-blue-6)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(40),
                      height: rem(40),
                      color: 'var(--mantine-color-red-6)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(40),
                      height: rem(40),
                      color: 'var(--mantine-color-dimmed)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
              </Center>

              <Text ta="center" size="sm" inline>
                Drag avatar image here or click to select files
              </Text>
            </Stack>
          ) : (
            <Box>{previews}</Box>
          )}
        </Group>
      </Dropzone>
    </Box>
  );
}

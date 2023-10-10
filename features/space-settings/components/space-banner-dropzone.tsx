'use client';

import { Grid, Group, Input, Text, rem, Image, Box, Flex } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { useState } from 'react';
import { useElementSize } from '@mantine/hooks';

export function SpaceBannerDropzone(props: Partial<DropzoneProps>) {
  const [avatarPreviews, setAvatarPreviews] = useState<FileWithPath[]>([]);
  const { ref, width } = useElementSize();

  console.log(avatarPreviews[0]);

  const previews = avatarPreviews.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Image
        h={width}
        w={width}
        fit="cover"
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  return (
    <Grid.Col ref={ref} span={8}>
      <Flex h="100%" direction="column">
        <Input.Wrapper mt="md" label="Banner" description="An banner representing the space" />
        <Dropzone
          style={{ flexGrow: 1 }}
          maxFiles={1}
          p={0}
          mt="xs"
          onDrop={setAvatarPreviews}
          onReject={(files) => console.log('rejected files', files)}
          accept={IMAGE_MIME_TYPE}
          {...props}
        >
          <Group justify="center" style={{ pointerEvents: 'none' }}>
            {previews.length === 0 ? (
              <>
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: 'var(--mantine-color-blue-6)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-red-6)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: 'var(--mantine-color-dimmed)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
                <Text size="sm" inline>
                  Drag avatar image here or click to select files
                </Text>
              </>
            ) : (
              <Box>{previews}</Box>
            )}
          </Group>
        </Dropzone>
      </Flex>
    </Grid.Col>
  );
}

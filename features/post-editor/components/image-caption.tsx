import { Box, Button, Flex, Textarea } from '@mantine/core';
import { useState } from 'react';
import { Database } from '@/lib/database';
import { upsertImageCaption } from '../api/upsert-image-caption';

type ImageCaptionProps = {
  image: Database['public']['Tables']['post_image']['Row'];
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    postId: string;
  };
};

export default function ImageCaption({ params, image }: ImageCaptionProps) {
  const [caption, setCaption] = useState(image.caption || '');

  async function handleUpsertCaption() {
    await upsertImageCaption(params.spaceId, params.spaceName, image, caption);
  }

  return (
    <Box mx="auto" maw="50%">
      <Textarea
        label="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        mt="md"
      />
      <Flex mt="sm" justify="flex-end">
        <Button onClick={handleUpsertCaption}>Update</Button>
      </Flex>
    </Box>
  );
}

'use client';

import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { AspectRatio, BackgroundImage, Card } from '@mantine/core';

import { Database } from '@/lib/database';
import ImageCaption from './image-caption';

type ImageEditorCaptionsProps = {
  images: Database['public']['Tables']['post_image']['Row'][];
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    postId: string;
  };
};

export function ImageCaptionEditor({ images, params }: ImageEditorCaptionsProps) {
  if (images) {
    return (
      <Card>
        <Carousel withIndicators height={500}>
          {images?.map((image: Database['public']['Tables']['post_image']['Row']) => (
            <Carousel.Slide key={image.id}>
              <AspectRatio ratio={2 / 3} mah={300} maw="90%" mx="auto">
                <BackgroundImage
                  src={image.url}
                  radius="sm"
                  style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                />
                {/* <Image radius="md" h="auto" fit="contain" maw="100%" src={image.url} /> */}
              </AspectRatio>
              <ImageCaption image={image} params={params} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card>
    );
  }
}

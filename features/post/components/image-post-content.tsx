'use client';

import useSWR from 'swr';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { AspectRatio, BackgroundImage } from '@mantine/core';
import { Database } from '@/lib/database';
import { fetchPostImages } from '@/utils/fetch-post-images';

type ImagePostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function ImagePostContent({ post }: ImagePostContentProps) {
  const { data: images } = useSWR('images', async () => {
    const postImages = await fetchPostImages(post.id);
    return postImages;
  });

  //TODO Add captions back in

  if (images) {
    return (
      <Carousel>
        {images?.map((image: Database['public']['Tables']['post_image']['Row']) => (
          <Carousel.Slide key={image.id}>
            <AspectRatio ratio={3 / 2} bg="dark.8">
              <BackgroundImage
                style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                src={image.url}
              />
            </AspectRatio>
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  }
}

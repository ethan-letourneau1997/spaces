'use client';

import useSWR from 'swr';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Text, Image, Center } from '@mantine/core';
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

  if (images) {
    return (
      <Carousel withIndicators height={500}>
        {images?.map((image: Database['public']['Tables']['post_image']['Row']) => (
          <Carousel.Slide key={image.id}>
            <Image radius="md" h={400} src={image.url} fit="contain" />
            <Center h={70}>
              <Text>{image.caption}</Text>
            </Center>
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  }
}

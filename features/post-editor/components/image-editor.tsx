import { fetchPostImages } from '@/utils/fetch-post-images';

import { ImageCaptionEditor } from './image-caption-editor';

type PostEditorProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    postId: string;
  };
};

export async function ImageEditor({ params }: PostEditorProps) {
  const postImages = await fetchPostImages(params.postId);

  return <ImageCaptionEditor images={postImages!} params={params} />;
}

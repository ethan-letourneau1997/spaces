import { fetchPostImages } from '@/utils/fetch-post-images';

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
  console.log(postImages);
  return (
    <div>
      <p>hello image post {params.postId}.</p>
    </div>
  );
}

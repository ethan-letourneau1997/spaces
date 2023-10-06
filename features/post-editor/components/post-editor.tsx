import { ImageEditor } from './image-editor';
import { TextPostEditor } from './text-post-editor';

type PostEditorProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    postId: string;
  };
  type: string;
};

export async function PostEditor({ params, type }: PostEditorProps) {
  if (type === 'text') {
    return <TextPostEditor params={params} />;
  }
  if (type === 'image') {
    return (
      <div>
        <ImageEditor params={params} />
      </div>
    );
  }
}

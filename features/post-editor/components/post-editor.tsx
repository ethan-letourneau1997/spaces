import { ImageEditor } from './image-editor';

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
  if (type === 'image') {
    return (
      <div>
        <ImageEditor params={params} />
      </div>
    );
  }
}

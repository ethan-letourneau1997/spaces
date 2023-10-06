import { fetchPostById } from '@/utils/fetch-post-by-id';
import { TextPostEditHandler } from './text-post-edit-handler';

type TextPostEditorProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    postId: string;
  };
};

export async function TextPostEditor({ params }: TextPostEditorProps) {
  const post = await fetchPostById(params.postId);

  if (post) {
    return (
      <>
        <div>{post.title}</div>
        <TextPostEditHandler post={post} />
      </>
    );
  }
}

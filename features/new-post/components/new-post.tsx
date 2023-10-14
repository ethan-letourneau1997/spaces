import { fetchAllSpaces } from '@/utils/fetch-all-spaces';
import { NewPostForm } from './new-post-form';

type NewPostProps = {
  spaceId?: string;
};

export async function NewPost({ spaceId }: NewPostProps) {
  const spaces = await fetchAllSpaces();

  if (spaces) {
    return <NewPostForm spaces={spaces} spaceId={spaceId} />;
  }
}

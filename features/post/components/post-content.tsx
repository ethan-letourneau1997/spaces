import { Database } from '@/lib/database';
import { TextPostContent } from './text-post-content';

type PostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostContent({ post }: PostContentProps) {
  if (post.type === 'text') {
    return <TextPostContent post={post} />;
  }
}

import { Database } from '@/lib/database';

type PostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostContent({ post }: PostContentProps) {
  if (post.type === 'text') {
    return <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />;
  }
}

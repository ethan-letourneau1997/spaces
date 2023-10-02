import { Database } from '@/lib/database';

type TextPostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function TextPostContent({ post }: TextPostContentProps) {
  if (post.type === 'text') {
    return <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />;
  }
}

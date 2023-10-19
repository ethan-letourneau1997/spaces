import { Database } from '@/lib/database';
import { TextPostContent } from './text-post-content';
import { ImagePostContent } from './image-post-content';
import { LinkPostContent } from './link-post-content';
import { ChainPostContent } from './chain-post-content';

type PostContentProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostContent({ post }: PostContentProps) {
  if (post.type === 'text') {
    return <TextPostContent post={post} />;
  }
  if (post.type === 'image') {
    return <ImagePostContent post={post} />;
  }
  if (post.type === 'link') {
    return <LinkPostContent post={post} />;
  }
  if (post.type === 'chain') {
    return <ChainPostContent post={post} />;
  }
}

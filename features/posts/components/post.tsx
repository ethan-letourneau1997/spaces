import { Card } from '@mantine/core';

import { Database } from '@/lib/database';

export const dynamic = 'force-dynamic';

type PostsProps = {
  post: Database['public']['Tables']['post']['Row'];
};

export default async function Post({ post }: PostsProps) {
  return <Card key={post.id}>{post.title}</Card>;
}

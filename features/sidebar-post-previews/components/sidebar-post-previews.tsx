'use client';

import { Card, Divider } from '@mantine/core';
import { Database } from '@/lib/database';
import { SidebarPostPreview } from './sidebar-post-preview';

type SidebarPostPreviewsProps = {
  posts: Database['public']['Views']['detailed_post']['Row'][];
  header?: JSX.Element;
};

export function SidebarPostPreviews({ posts, header }: SidebarPostPreviewsProps) {
  if (posts) {
    return (
      <Card withBorder className="!bg-dark-6.5">
        {header}
        <div className="flex flex-col gap-2">
          {posts.map((post, index) => (
            <>
              <SidebarPostPreview post={post} key={post.id} />
              {index < posts.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </Card>
    );
  }
}

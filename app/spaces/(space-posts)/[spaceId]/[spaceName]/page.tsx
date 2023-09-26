import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Card, Stack } from '@mantine/core';
import { Space } from '@/features/space';
import Posts from '@/features/posts/components/posts';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: posts } = await supabase
    .from('post')
    .select()
    .eq('posted_in', params.spaceId)
    .order('created_at', { ascending: false });

  if (posts) {
    return (
      <>
        <Space spaceId={params.spaceId} spaceName={params.spaceName} />
        <Posts posts={posts} />
      </>
    );
  }
}

import { Stack } from '@mantine/core';
import { Suspense } from 'react';
import { PostsSkeleton } from '@/components/PostsSkeleton';
import { ProfileComment } from '@/features/comment-previews/components/profile-comment';
import { Database } from '@/lib/database';

type ProfileCommentsProps = {
  profileComments: Database['public']['Tables']['comment']['Row'][];

  username: string;
};

export async function ProfileComments({ username, profileComments }: ProfileCommentsProps) {
  if (profileComments) {
    return (
      <Suspense fallback={<PostsSkeleton />}>
        <Stack mt="md">
          {profileComments.map((comment) => (
            <ProfileComment key={comment.id} comment={comment} username={username} />
          ))}
        </Stack>
      </Suspense>
    );
  }
}

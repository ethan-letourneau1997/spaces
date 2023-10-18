import { Stack } from '@mantine/core';
import { Suspense } from 'react';
import { PostsSkeleton } from '@/components/PostsSkeleton';
import { ProfileComment } from '@/features/comment-previews/components/profile-comment';
import { Database } from '@/lib/database';

type CommentPreviewsProps = {
  comments: Database['public']['Tables']['comment']['Row'][];

  username: string;
};

export async function CommentPreviews({ username, comments }: CommentPreviewsProps) {
  if (comments) {
    return (
      <Suspense fallback={<PostsSkeleton />}>
        <Stack>
          {comments.map((comment) => (
            <ProfileComment key={comment.id} comment={comment} username={username} />
          ))}
        </Stack>
      </Suspense>
    );
  }
}

import { Card, Title, Space, Stack } from '@mantine/core';

import Link from 'next/link';
import { Suspense } from 'react';
import { fetchDetailedPostById } from '@/utils/fetch-detailed-post-by-id';
import { PostContent } from './post-content';
import { Comments } from '@/features/comments';

import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';
import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { PostFooter } from './post-footer';
import { DEFAULT_SORT } from '@/lib/constants';
import { CommentsSkeleton } from '@/components/fallbacks';
import { PostHeader } from './post-header';
import { fetchPostCommentCount } from '@/utils/fetch-post-comment-count';

type PostProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
    postId: string;
  };
};

export async function Post({ params }: PostProps) {
  const post = await fetchDetailedPostById(params.postId);

  if (!post) {
    return (
      <div>
        Post not found. Return to&nbsp;
        <Link href={`/spaces/${params.spaceId}/${params.spaceName}${DEFAULT_SORT}`}>
          {params.spaceName}
        </Link>
        &nbsp;or see whats new in your <Link href="/feed">feed</Link>.
      </div>
    );
  }

  const userVote = await fetchUserPostVote(post.id);
  const postVotes = await fetchPostVotes(post.id);
  const postCommentCount = await fetchPostCommentCount(post.id);

  if (post) {
    return (
      <Stack>
        <Card className="!bg-dark-6.5" withBorder>
          <PostHeader post={post} />
          <Title mt={8} order={1} size="h3">
            {post.title}
          </Title>
          <Space h="md" />
          <PostContent post={post} />
          <PostFooter
            commentCount={postCommentCount}
            postVotes={postVotes || 0}
            userVote={userVote || 0}
            post={post}
          />
        </Card>
        <Card bg="!bg-dark-6.5" className="!p-1 !sm:p-4 !pb-3" withBorder>
          <Suspense fallback={<CommentsSkeleton />}>
            <Comments params={params} />
          </Suspense>
        </Card>
      </Stack>
    );
  }
}

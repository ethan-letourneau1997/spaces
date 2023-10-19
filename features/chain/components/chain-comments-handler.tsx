'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import { Card } from '@mantine/core';
import { Database } from '@/lib/database';

import { ChainComment } from './chain-comment';
import { ChainRootInput } from './chain-root-input';

type ChainHandlerProps = {
  rootComments: Database['public']['Views']['comment_details']['Row'][];
  allComments: Database['public']['Views']['comment_details']['Row'][];
};

export function ChainCommentsHandler({ rootComments, allComments }: ChainHandlerProps) {
  const [optimisticRootComments, setOptimisticRootComments] =
    useOptimistic<Database['public']['Views']['comment_details']['Row'][]>(rootComments);

  return (
    <>
      {optimisticRootComments.map((comment) => (
        <ChainComment comment={comment} key={comment.id} allComments={allComments} />
      ))}
      <Card className="!bg-dark-6.5" withBorder>
        <ChainRootInput comments={optimisticRootComments} setComments={setOptimisticRootComments} />
      </Card>
    </>
  );
}

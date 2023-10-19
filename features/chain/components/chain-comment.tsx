'use client';

import { Card, Divider, Skeleton, Timeline } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Database } from '@/lib/database';
import { formatLongDate } from '../api/format-long-date';
import { ChainCommentFooter } from './chain-reply-footer';

type ChainCommentProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  allComments: Database['public']['Views']['comment_details']['Row'][];
};

export function ChainComment({ comment, allComments }: ChainCommentProps) {
  const [childComments, setChildComments] = useState<
    Database['public']['Views']['comment_details']['Row'][]
  >([]);

  useEffect(() => {
    const filteredChildComments = (
      allComments as Database['public']['Views']['comment_details']['Row'][]
    )?.filter((c) => c.parent_comment === comment.id);

    setChildComments(filteredChildComments);
  }, [allComments]);

  return (
    <Card px={0} pb={0} className="!bg-dark-6.5" withBorder>
      <div className="px-4 mb-3 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton circle h={30} w={30} />
          <div className="text-sm ">
            <span className="font-semibold">{comment.posted_by_username}</span>
            <span>&nbsp;on {formatLongDate(comment.created_at)}</span>
          </div>
        </div>
        <div
          className="w-full text-sm prose dark:prose-invert "
          dangerouslySetInnerHTML={{ __html: comment.content || '' }}
        />
      </div>
      {childComments.length > 0 && (
        <div className="px-4 py-4 bg-dark-7">
          <Timeline bulletSize={24}>
            {childComments.map((childComment) => (
              <Timeline.Item
                key={childComment.id}
                title={
                  <div className="text-sm ">
                    <span className="font-semibold">{childComment.posted_by_username}</span>
                    <span>&nbsp;on {formatLongDate(childComment.created_at)}</span>
                  </div>
                }
                bullet={<Skeleton circle h={22} w={22} />}
              >
                <div
                  className="w-full text-sm prose dark:prose-invert "
                  dangerouslySetInnerHTML={{ __html: childComment.content || '' }}
                />
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      )}
      <Divider className=" !border-dark-4" />
      <ChainCommentFooter
        comment={comment}
        childComments={childComments}
        setChildComments={setChildComments}
      />
    </Card>
  );
}

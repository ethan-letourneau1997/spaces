import { Database } from '@/lib/database';

import { Card } from '@/components/ui/card';
import { ChildReply } from './child-reply';
import { ReplyInput } from './reply-input';
import { ReplyBody } from './reply-body';

type ReplyProps = {
  comment: Database['public']['Views']['comment_with_votes']['Row'];
  allComments: Database['public']['Views']['comment_with_votes']['Row'][];
};

export async function Reply({ comment, allComments }: ReplyProps) {
  const childComments = (
    allComments as Database['public']['Views']['comment_with_votes']['Row'][]
  )?.filter((c) => c.parent_comment === comment.id);

  return (
    <Card className="pt-4 ">
      <div className="px-4 mb-3 space-y-3">
        <ReplyBody comment={comment} />
      </div>
      {childComments.length > 0 && (
        <div className="pt-4 pl-[31px] pr-4 bg-dark-7 border-y border-dark-4 max-w-[100vw]">
          <ol className="relative border-l-2 border-gray-200 dark:border-dark-5">
            {childComments.map((childComment) => (
              <ChildReply childComment={childComment} key={childComment.id} />
            ))}
          </ol>
        </div>
      )}
      <ReplyInput comment={comment} />
    </Card>
  );
}

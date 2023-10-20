import { Database } from '@/lib/database';
import { formatLongDate } from '../api/format-long-date';
import { ReplyAvatar } from './reply-avatar';
import { Card } from '@/components/ui/card';
import { ReplyVoteButton } from './reply-vote-buton';
import { fetchUserCommentVote } from '@/utils/fetch-user-comment-vote';
import { ChildReply } from './child-reply';
import { ReplyInput } from './reply-input';
import { ReplyOptions } from './reply-options';

type ReplyProps = {
  comment: Database['public']['Views']['comment_with_votes']['Row'];
  allComments: Database['public']['Views']['comment_with_votes']['Row'][];
};

export async function Reply({ comment, allComments }: ReplyProps) {
  const childComments = (
    allComments as Database['public']['Views']['comment_with_votes']['Row'][]
  )?.filter((c) => c.parent_comment === comment.id);

  const userVote = await fetchUserCommentVote(comment.id);

  return (
    <Card className="pt-4 ">
      <div className="px-4 mb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ReplyAvatar userId={comment.posted_by} />
            <div className="text-sm ">
              <span className="font-semibold">{comment.posted_by_username}</span>
              <span>&nbsp;on {formatLongDate(comment.created_at)}</span>
            </div>
          </div>
          <ReplyOptions comment={comment} />
        </div>
        <div
          className="w-full text-sm prose dark:prose-invert "
          dangerouslySetInnerHTML={{ __html: comment.content || '' }}
        />
        <ReplyVoteButton userVote={userVote} comment={comment} />
      </div>
      {childComments.length > 0 && (
        <div className="pt-4 px-[31px] bg-dark-7 border-y border-dark-4 max-w-[100vw]">
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

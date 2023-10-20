import { Database } from '@/lib/database';
import { formatLongDate } from '../api/format-long-date';
import { ReplyAvatar } from './reply-avatar';
import { fetchUserCommentVote } from '@/utils/fetch-user-comment-vote';
import { ReplyVoteButton } from './reply-vote-buton';
import { ReplyOptions } from './reply-options';

type ChildReplyProps = {
  childComment: Database['public']['Views']['comment_with_votes']['Row'];
};

export async function ChildReply({ childComment }: ChildReplyProps) {
  const userVote = await fetchUserCommentVote(childComment.id);

  return (
    <li key={childComment.id} className="pb-10 ml-6">
      <span className="absolute flex items-center justify-center rounded-full -left-4 ">
        <ReplyAvatar userId={childComment.posted_by} />
      </span>
      <div className="flex items-center justify-between mb-1">
        <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          <div className="flex items-center gap-2">
            <div className="text-sm ">
              <span className="font-semibold">{childComment.posted_by_username}</span>
              <span>&nbsp;on {formatLongDate(childComment.created_at)}</span>
            </div>
          </div>
        </h3>
        <ReplyOptions comment={childComment} />
      </div>
      <div
        className="w-full text-sm prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: childComment.content || '' }}
      />
      <ReplyVoteButton userVote={userVote} comment={childComment} />
    </li>
  );
}

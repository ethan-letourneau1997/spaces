import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database';
import { formatLongDate } from '../api/format-long-date';
import { ReplyAvatar } from './reply-avatar';
import { ReplyVoteButton } from './reply-vote-buton';
import { fetchUserCommentVote } from '@/utils/fetch-user-comment-vote';
import { ReplyOptions } from './reply-options';
import { DEFAULT_SORT } from '@/lib/constants';

type ReplyBodyProps = {
  comment: Database['public']['Views']['comment_with_votes']['Row'];
};

export async function ReplyBody({ comment }: ReplyBodyProps) {
  const userVote = await fetchUserCommentVote(comment.id);

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 dark:text-gray-3">
          <ReplyAvatar userId={comment.posted_by} />
          <div className="text-sm ">
            <Link
              href={`/profile/${comment.posted_by_username}/posts/${DEFAULT_SORT}`}
              className="font-semibold hover:underline dark:text-gray-0"
            >
              {comment.posted_by_username}
            </Link>
            <span>&nbsp;on {formatLongDate(comment.created_at)}</span>
          </div>
        </div>
        {data.session && data.session.user.id === comment.posted_by && (
          <ReplyOptions comment={comment} />
        )}
      </div>
      <div
        className="w-full text-sm prose dark:prose-invert dark:text-gray-0"
        dangerouslySetInnerHTML={{ __html: comment.content || '' }}
      />
      <ReplyVoteButton userVote={userVote} comment={comment} />
    </>
  );
}

import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database';
import { formatLongDate } from '../api/format-long-date';
import { ReplyAvatar } from './reply-avatar';
import { fetchUserCommentVote } from '@/utils/fetch-user-comment-vote';
import { ReplyVoteButton } from './reply-vote-buton';
import { ReplyOptions } from './reply-options';
import { DEFAULT_SORT } from '@/lib/constants';

type ChildReplyProps = {
  childComment: Database['public']['Views']['comment_with_votes']['Row'];
};

export async function ChildReply({ childComment }: ChildReplyProps) {
  const userVote = await fetchUserCommentVote(childComment.id);

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <li key={childComment.id} className="pb-10 ml-6">
      <span className="absolute flex items-center justify-center rounded-full -left-4 ">
        <ReplyAvatar userId={childComment.posted_by} />
      </span>
      <div className="flex items-center justify-between mb-1">
        <h3 className="flex items-center text-lg text-gray-900 dark:text-gray-3">
          <div className="flex items-center gap-2">
            <div className="text-sm ">
              <Link
                href={`/profile/${childComment.posted_by_username}/posts/${DEFAULT_SORT}`}
                className="font-semibold hover:underline dark:text-gray-0"
              >
                {childComment.posted_by_username}
              </Link>
              <span>&nbsp;on {formatLongDate(childComment.created_at)}</span>
            </div>
          </div>
        </h3>
        {data.session && data.session.user.id === childComment.posted_by && (
          <ReplyOptions comment={childComment} />
        )}
      </div>
      <div
        className="w-full text-sm prose dark:prose-invert dark:text-gray-0"
        dangerouslySetInnerHTML={{ __html: childComment.content || '' }}
      />
      <ReplyVoteButton userVote={userVote} comment={childComment} />
    </li>
  );
}

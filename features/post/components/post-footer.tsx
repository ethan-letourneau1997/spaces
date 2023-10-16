'use client';

import { Collapse, UnstyledButton } from '@mantine/core';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { useDisclosure } from '@mantine/hooks';
import { Database } from '@/lib/database';
import { VoteHandler } from '@/features/vote-handler';
import { RootCommentInput, RootCommentModal } from '@/features/root-comment-input';

type PostFooterProps = {
  postVotes: number;
  userVote: number;
  post: Database['public']['Views']['detailed_post']['Row'];
  commentCount?: number;
};

export function PostFooter({ postVotes, userVote, post, commentCount }: PostFooterProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <div className="flex gap-3 mt-2">
        <VoteHandler horizontal totalVotes={postVotes || 0} userVote={userVote || 0} post={post} />
        <div className="flex items-center gap-1 ">
          <UnstyledButton className="flex items-center">
            <LiaCommentAltSolid size={18} />
          </UnstyledButton>

          <span className="text-sm ">
            {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
          </span>
        </div>
        <UnstyledButton className="!text-sm font-semibold" visibleFrom="sm" onClick={toggle}>
          {opened ? 'Cancel' : 'Reply'}
        </UnstyledButton>
        <RootCommentModal post={post} />
      </div>
      <Collapse in={opened} pt="xs">
        <RootCommentInput closeInput={toggle} post={post} />
      </Collapse>
    </>
  );
}

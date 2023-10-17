'use client';

import { Collapse, UnstyledButton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaCommentAlt } from 'react-icons/fa';
import { BsFillReplyFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { RootCommentInput, RootCommentModal } from '@/features/root-comment-input';
import { VoteButtons } from '@/features/vote-handler';
import { Database } from '@/lib/database';
import { PostSaveButton } from '@/features/post-save-button';

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
      <div className="flex gap-4 mt-2 ">
        <VoteButtons horizontal totalVotes={postVotes || 0} userVote={userVote || 0} post={post} />
        <div className="flex items-center gap-1.5 ">
          <UnstyledButton className="flex items-center" c="dark.2" pt={1}>
            <FaCommentAlt size={14} />
          </UnstyledButton>

          <Text size="sm" c="dark.2" fw={700} className="text-sm ">
            {commentCount || 0} comment{commentCount !== 1 || !commentCount ? 's' : ''}
          </Text>
        </div>

        <UnstyledButton
          className="!text-sm hover:!text-dark-0 flex items-center gap-1"
          py={2}
          visibleFrom="sm"
          fw={700}
          c="dark.2"
          onClick={toggle}
        >
          {opened ? <ImCross size={10} /> : <BsFillReplyFill size={18} className="mb-0.5" />}
          {opened ? 'Cancel' : 'Reply'}
        </UnstyledButton>

        <PostSaveButton post={post} />

        <RootCommentModal post={post} />
      </div>
      <Collapse in={opened} pt="xs">
        <RootCommentInput closeInput={toggle} post={post} />
      </Collapse>
    </>
  );
}

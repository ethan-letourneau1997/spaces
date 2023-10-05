'use client';

import { Button, Text, Collapse, Box, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Database } from '@/lib/database';
import { ChildCommentInput } from '@/features/child-comment-input';
import { CommentVoteButtons } from '@/features/comment-votes/components/comment-vote-buttons';

type CommentFooterProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  userVote: number;
  totalVotes: number;
};

export function CommentFooter({ comment, userVote, totalVotes }: CommentFooterProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <Group>
        <CommentVoteButtons
          userVote={userVote}
          commentVotes={totalVotes}
          comment={comment}
          horizontal
        />
        <Button variant="subtle" onClick={toggle}>
          {opened ? 'Cancel' : 'Reply'}
        </Button>
      </Group>

      <Collapse transitionDuration={0} in={opened}>
        <Text>
          <ChildCommentInput handleClose={toggle} parentComment={comment} />
        </Text>
      </Collapse>
    </Box>
  );
}

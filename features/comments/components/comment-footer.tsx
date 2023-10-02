import { Button, Text, Collapse, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Database } from '@/lib/database';
import { ChildCommentInput } from '@/features/child-comment-input';

type CommentFooterProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
};

export function CommentFooter({ comment }: CommentFooterProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <Button variant="subtle" onClick={toggle}>
        {opened ? 'Cancel' : 'Reply'}
      </Button>

      <Collapse transitionDuration={0} in={opened}>
        <Text>
          <ChildCommentInput handleClose={toggle} parentComment={comment} />
        </Text>
      </Collapse>
    </Box>
  );
}

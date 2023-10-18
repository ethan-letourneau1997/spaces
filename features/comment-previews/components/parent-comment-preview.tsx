import { Anchor, Box, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '@/utils/get-time-since-now';
import { RenderHtml } from '@/components/RenderHtml';
import { DEFAULT_SORT } from '@/lib/constants';

type ParentCommentPreviewProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  children: React.ReactNode;
};

export function ParentCommentPreview({ comment, children }: ParentCommentPreviewProps) {
  return (
    <Box mt="sm" pl="xl" style={{ borderLeft: '1px dashed #5c5f66' }}>
      <Group gap={0}>
        <Anchor
          component={Link}
          href={`/profile/${comment.posted_by}/${comment.posted_by_username}/${DEFAULT_SORT}`}
          size="sm"
        >
          {comment.posted_by_username}
        </Anchor>
        &nbsp;-&nbsp;<Text size="sm">{getTimeSinceNow(comment.created_at, true)}</Text>
      </Group>
      <RenderHtml content={comment.content} />
      {children}
    </Box>
  );
}

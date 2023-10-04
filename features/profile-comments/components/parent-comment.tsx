import { Box, Divider, Group, Text } from '@mantine/core';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '@/utils/get-time-since-now';
import { RenderHtml } from '@/components/RenderHtml';

type ParentCommentProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  children: React.ReactNode;
};

export function ParentComment({ comment, children }: ParentCommentProps) {
  return (
    <Group gap="sm">
      <Divider size="sm" orientation="vertical" variant="dashed" />
      <Box ml="md" style={{ flexGrow: 1 }}>
        <Group gap={0}>
          <Text fw={700} size="sm">
            {comment.posted_by_username}
          </Text>
          &nbsp;-&nbsp;<Text size="sm">{getTimeSinceNow(comment.created_at, true)}</Text>
        </Group>
        <RenderHtml content={comment.content} />
        {children}
      </Box>
    </Group>
  );
}

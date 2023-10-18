import { Group, Paper, Text, Box } from '@mantine/core';
import { RenderHtml } from '@/components/RenderHtml';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '@/utils/get-time-since-now';

type CommentPreviewProps = {
  comment: Database['public']['Tables']['comment']['Row'];
  username: string;
};

export function CommentPreview({ comment, username }: CommentPreviewProps) {
  return (
    <Box pl="lg" style={{ borderLeft: '1px dashed #5c5f66' }} mt="sm">
      <Paper px="sm" py="sm" style={{ flexGrow: 1 }}>
        <Group gap={0}>
          <Text fw={600} size="sm">
            {username}
          </Text>
          &nbsp;-&nbsp;<Text size="sm">{getTimeSinceNow(comment.created_at, true)}</Text>
        </Group>
        <RenderHtml content={comment.content} />
      </Paper>
    </Box>
  );
}

import { Group, Divider, Paper, Text } from '@mantine/core';
import { RenderHtml } from '@/components/RenderHtml';
import { Database } from '@/lib/database';
import { getTimeSinceNow } from '@/utils/get-time-since-now';

type ProfileCommentProps = {
  comment: Database['public']['Tables']['comment']['Row'];
  username: string;
};

export function ProfileComment({ comment, username }: ProfileCommentProps) {
  return (
    <Group gap="sm">
      <Divider size="sm" orientation="vertical" variant="dashed" />
      <Paper px="sm" py="sm" style={{ flexGrow: 1 }}>
        <Group gap={0}>
          <Text fw={700} size="sm">
            {username}
          </Text>
          &nbsp;-&nbsp;<Text size="sm">{getTimeSinceNow(comment.created_at, true)}</Text>
        </Group>
        <RenderHtml content={comment.content} />
      </Paper>
    </Group>
  );
}

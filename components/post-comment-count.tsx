import { UnstyledButton, Text } from '@mantine/core';
import { FaCommentAlt } from 'react-icons/fa';

type PostCommentCountProps = {
  count: number | null;
  small?: boolean;
};

export function PostCommentCount({ count, small }: PostCommentCountProps) {
  return (
    <div className="flex items-center gap-1.5 ">
      <UnstyledButton className="flex items-center" c="dark.2" pt={1}>
        <FaCommentAlt size={small ? 12 : 14} />
      </UnstyledButton>

      <Text size={small ? 'xs' : 'sm'} c="dark.2" fw={700} className="text-sm ">
        {count || 0} comment{count !== 1 || !count ? 's' : ''}
      </Text>
    </div>
  );
}

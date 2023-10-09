'use client';

import { Anchor, Stack, Text, Loader } from '@mantine/core';
import Link from 'next/link';
import classes from './spotlight.module.css';
import { DEFAULT_SORT } from '@/lib/constants';
import { Database } from '@/lib/database';

type UserItemsProps = {
  users: Database['public']['Tables']['public_profile']['Row'][];
  handleNavigate: () => void;
  loading: boolean;
};

export function UserItems({ users, handleNavigate, loading }: UserItemsProps) {
  return (
    <Stack gap={0} px={5} mt="xs">
      {users.map((user) => (
        <Anchor
          px={22}
          c="gray.4"
          py="xs"
          onClick={handleNavigate}
          href={`/profile/${user.username}/posts/${DEFAULT_SORT}`}
          component={Link}
          key={user.id}
          classNames={{
            root: classes.spotlightItem,
          }}
        >
          {user.username}
        </Anchor>
      ))}
      {users.length === 0 && !loading && (
        <Text size="sm" c="dark.1" px={22}>
          No Users found
        </Text>
      )}
      {loading && <Loader px={22} mx="auto" size="sm" color="blue" />}
    </Stack>
  );
}

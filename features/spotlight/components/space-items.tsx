'use client';

import { Anchor, Stack, Text, Loader } from '@mantine/core';
import Link from 'next/link';
import classes from './spotlight.module.css';
import { DEFAULT_SORT } from '@/lib/constants';
import { Database } from '@/lib/database';

type SpaceItemsProps = {
  spaces: Database['public']['Tables']['community']['Row'][];
  handleNavigate: () => void;
  loading: boolean;
};

export function SpaceItems({ spaces, handleNavigate, loading }: SpaceItemsProps) {
  return (
    <Stack gap={0} px={5} mt="xs">
      {spaces.map((space) => (
        <Anchor
          px={22}
          py="xs"
          c="gray.4"
          key={space.id}
          component={Link}
          onClick={handleNavigate}
          href={`/spaces/${space.id}/${space.name}/${DEFAULT_SORT}`}
          classNames={{
            root: classes.spotlightItem,
          }}
        >
          {space.display_name}
          <Text truncate c="dimmed" style={{ fontSize: '12px', lineHeight: '14px' }}>
            {space.description}
          </Text>
        </Anchor>
      ))}
      {spaces.length === 0 && !loading && (
        <Text size="sm" c="dark.1" px={22}>
          No spaces found
        </Text>
      )}
      {loading && <Loader px={22} mx="auto" size="sm" color="blue" />}
    </Stack>
  );
}

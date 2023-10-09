'use client';

import useSWR from 'swr';
import { ActionIcon, Grid, Group, Text, Tooltip } from '@mantine/core';
import { BsFillGearFill } from 'react-icons/bs';
import Link from 'next/link';
import { fetchUserAdminSpaces } from '../api/fetch-user-admin-spaces';

export function AdminTab() {
  const { data: adminSpaces } = useSWR('adminSpaces', async () => {
    const spaces = await fetchUserAdminSpaces();
    return spaces;
  });

  if (adminSpaces) {
    return (
      <Grid mt="md">
        {adminSpaces.map((space) => (
          <Grid.Col span={6} key={space.id}>
            <Group>
              <Tooltip label={`Manage ${space.name}`}>
                <ActionIcon
                  href={`/spaces/${space.id}/${space.name}/settings`}
                  component={Link}
                  bg="transparent"
                >
                  <BsFillGearFill />
                </ActionIcon>
              </Tooltip>
              {space.display_name}
            </Group>
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  return <Text>You are not the admin of any Spaces</Text>;
}

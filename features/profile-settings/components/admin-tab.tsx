'use client';

import useSWR from 'swr';
import { Grid, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { fetchUserAdminSpaces } from '../api/fetch-user-admin-spaces';
import classes from './profile-settings.module.css';

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
            <Paper
              classNames={{
                root: classes.adminCard,
              }}
              bg="dark.6"
              withBorder
              p="md"
              component={Link}
              c="dark.0"
              href={`/spaces/${space.id}/${space.name}/admin/settings`}
            >
              {space.display_name}
              {/* <Tooltip label={`Manage ${space.name}`}>
                  <Group gap={5}>
                    <ActionIcon bg="transparent">
                      <BsFillGearFill />
                    </ActionIcon>
                    <Text>{space.display_name}</Text>
                  </Group>
                </Tooltip> */}
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  return <Text>You are not the admin of any Spaces</Text>;
}

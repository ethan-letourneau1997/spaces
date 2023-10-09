'use client';

import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  TextInput,
  Divider,
  Anchor,
  Stack,
  Select,
  Flex,
  Input,
  Text,
  Loader,
} from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import classes from './spotlight.module.css';
import { DEFAULT_SORT } from '@/lib/constants';

export function Spotlight() {
  const [opened, { open, close }] = useDisclosure(false);

  const [spaces, setSpaces] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState('Spaces');
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  async function fetchSpaces() {
    setLoading(true);
    if (selected === 'Spaces') {
      const { data } = await supabase
        .from('community')
        .select()
        .ilike('name', `%${search}%`)
        .limit(7);
      setSpaces(data);
    }

    if (selected === 'Users') {
      const { data } = await supabase
        .from('public_profile')
        .select()
        .ilike('username', `%${search}%`)
        .limit(7);
      setUsers(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSpaces();
  }, [search, selected]);

  return (
    <>
      <Input leftSection={<BiSearch />} w={200} onClick={open} component="button" pointer>
        Search..
      </Input>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Body px={0}>
            <Flex px="xs">
              <TextInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="md"
                classNames={{
                  root: classes.spotlightRoot,
                  input: classes.spotlightInput,
                }}
                leftSection={<BiSearch />}
                placeholder="Search..."
              />
              <Select
                classNames={{
                  input: classes.selectInput,
                }}
                w={100}
                data={['Spaces', 'Users']}
                value={selected}
                onChange={setSelected}
              />
            </Flex>
            <Divider />
            {selected === 'Spaces' && (
              <Stack gap={0} px={5} mt="xs">
                {spaces.map((space) => (
                  <Anchor
                    px={22}
                    c="gray.4"
                    py="xs"
                    href={`/spaces/${space.id}/${space.name}/${DEFAULT_SORT}`}
                    component={Link}
                    key={space.id}
                    classNames={{
                      root: classes.spotlightItem,
                    }}
                  >
                    {space.name}
                  </Anchor>
                ))}
                {spaces.length === 0 && !loading && (
                  <Text size="sm" c="dark.1" px={22}>
                    No spaces found
                  </Text>
                )}
                {loading && <Loader px={22} mx="auto" size="sm" color="blue" />}
              </Stack>
            )}
            {selected === 'Users' && (
              <Stack gap={0} px={5} mt="xs">
                {users.map((user) => (
                  <Anchor
                    px={22}
                    c="gray.4"
                    py="xs"
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
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

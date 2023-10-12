'use client';

import { useDisclosure } from '@mantine/hooks';
import { Modal, Divider, Input } from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import { Database } from '@/lib/database';
import { searchSpaces } from '../api/search-spaces';
import { searchUsers } from '../api/search-users';
import { SpaceItems } from './space-items';
import { UserItems } from './user-items';
import { SpotlightSearchInput } from './spotllight-search-input';

export function Spotlight() {
  const [opened, { open, close }] = useDisclosure(false);

  const [spaces, setSpaces] = useState<Database['public']['Tables']['community']['Row'][]>([]);
  const [users, setUsers] = useState<Database['public']['Tables']['public_profile']['Row'][]>([]);
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState('Spaces');
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    if (selected === 'Spaces') {
      const spaceResults = await searchSpaces(search);
      setSpaces(spaceResults || []);
      setLoading(false);
    }

    if (selected === 'Users') {
      const userResults = await searchUsers(search);
      setUsers(userResults || []);
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [search, selected]);

  function handleNavigate() {
    close();
    setSearch('');
    setSelected('Spaces');
    fetchData();
  }

  return (
    <>
      <Input leftSection={<BiSearch />} w={250} onClick={open} component="button" pointer>
        Search..
      </Input>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Body px={0}>
            <SpotlightSearchInput
              search={search}
              setSearch={setSearch}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />
            {selected === 'Spaces' && (
              <SpaceItems spaces={spaces} handleNavigate={handleNavigate} loading={loading} />
            )}
            {selected === 'Users' && (
              <UserItems users={users} handleNavigate={handleNavigate} loading={loading} />
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

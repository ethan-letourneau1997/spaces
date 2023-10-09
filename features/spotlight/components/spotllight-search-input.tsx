import { Flex, Select, TextInput } from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import classes from './spotlight.module.css';

type SpotlightSearchInputProps = {
  search: string;
  setSearch: (search: string) => void;
  selected: string;
  setSelected: (selected: string) => void;
};

export function SpotlightSearchInput({
  search,
  setSearch,
  selected,
  setSelected,
}: SpotlightSearchInputProps) {
  return (
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
        c="dark.1"
        w={100}
        data={['Spaces', 'Users']}
        value={selected}
        onChange={setSelected}
        classNames={{
          input: classes.selectInput,
        }}
      />
    </Flex>
  );
}

import { Input, Select } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/database';

type CommunitySelectProps = {
  spaceId?: string;
  spaces: Database['public']['Tables']['community']['Row'][] | [];
};

export function CommunitySelect({ spaceId, spaces }: CommunitySelectProps) {
  const [selected, setSelected] = useState<string | null>(spaceId || null);
  const router = useRouter();

  // Map the spaceNames array to extract option labels and values
  const options = spaces
    ? spaces.map((space) => ({ label: space.name, value: space.id.toString() }))
    : [];

  // Callback to handle option selection
  const handleSelectChange = (value: string | null) => {
    setSelected(value);
    if (value && spaces) {
      const selectedSpace = (spaces as Database['public']['Tables']['community']['Row'][])?.find(
        (space) => space.id.toString() === value
      );
      if (selectedSpace) {
        router.push(`/new/post/${selectedSpace.id}/${selectedSpace.name}`);
      }
    }
  };

  if (options) {
    return (
      <div>
        <Select
          value={selected}
          onChange={handleSelectChange}
          label="Space"
          placeholder="Pick value"
          data={options}
          searchable
        />
        {!selected && (
          <Input.Error c="red.6" size="md" mt="xs">
            Choose a space before proceeding!
          </Input.Error>
        )}
      </div>
    );
  }
}

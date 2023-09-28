'use client';

import { TextInput } from '@mantine/core';

type TitleInputProps = {
  title: string;
  setTitle: (title: string) => void;
};

export function TitleInput({ title, setTitle }: TitleInputProps) {
  return (
    <TextInput
      value={title}
      onChange={(event) => setTitle(event.currentTarget.value)}
      label="Post Title"
    />
  );
}

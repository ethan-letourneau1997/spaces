'use client';

import { TextInput } from '@mantine/core';

type LinkInputProps = {
  link: string;
  setLink: (title: string) => void;
};

export function LinkInput({ link, setLink }: LinkInputProps) {
  return (
    <TextInput value={link} onChange={(event) => setLink(event.currentTarget.value)} label="Link" />
  );
}

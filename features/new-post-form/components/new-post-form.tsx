'use client';

import { Card, Stack, Tabs, TextInput } from '@mantine/core';
import { IconBook, IconPhoto, IconLink } from '@tabler/icons-react';
import { useState } from 'react';
import { FilePondFile } from 'filepond';
import { TextEditor } from '@/features/text-editor';
import { ImageDropzone } from '@/features/image-dropzone';

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

type LinkInputProps = {
  link: string;
  setLink: (title: string) => void;
};

export function LinkInput({ link, setLink }: LinkInputProps) {
  return (
    <TextInput
      value={link}
      onChange={(event) => setLink(event.currentTarget.value)}
      label="Post Title"
    />
  );
}

export function NewPostForm() {
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('test');
  const [link, setLink] = useState('');
  const [images, setImages] = useState<FilePondFile[]>([]);

  console.log(images);

  return (
    <Card>
      <Tabs defaultValue="text">
        <Tabs.List>
          <Tabs.Tab value="text" leftSection={<IconBook />}>
            Text
          </Tabs.Tab>
          <Tabs.Tab value="link" leftSection={<IconLink />}>
            Link
          </Tabs.Tab>
          <Tabs.Tab value="images" leftSection={<IconPhoto />}>
            Images
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel pt="lg" value="text">
          <Stack>
            <TitleInput title={title} setTitle={setTitle} />
            <TextEditor content={textContent} setContent={setTextContent} />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="link">
          <Stack>
            <TitleInput title={title} setTitle={setTitle} />
            <LinkInput link={link} setLink={setLink} />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel pt="lg" value="images">
          <Stack>
            <TitleInput title={title} setTitle={setTitle} />
            <ImageDropzone files={images} setFiles={setImages} />
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

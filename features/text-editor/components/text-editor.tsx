'use client';

import '@mantine/tiptap/styles.css';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Box, Group } from '@mantine/core';

type TextEditorProps = {
  content: string;
  setContent: (content: string) => void;
  mih?: string;
  buttons?: JSX.Element;
};

export function TextEditor({ content, setContent, buttons }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  editor?.on('update', () => {
    const updatedHTML = editor?.getHTML();
    setContent(updatedHTML);
  });

  return (
    <Box bg="dark.7">
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar display="flex" style={{ gap: 15 }} sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough className="!hidden sm:!flex" />
            <RichTextEditor.Code className="!hidden sm:!flex" />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup className="!hidden sm:!flex">
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup className="!hidden sm:!flex">
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className="md:!min-h-[140px] !min-h-[140px]" />
        <Group justify="flex-end" py="xs" px="xs">
          {buttons}
        </Group>
      </RichTextEditor>
    </Box>
  );
}

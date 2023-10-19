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
import { Box, Group, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';

type TextEditorProps = {
  content: string;
  setContent: (content: string) => void;
  mih?: string;
  buttons?: JSX.Element;
};

export function TextEditor({ content, setContent, mih, buttons }: TextEditorProps) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

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

  useEffect(() => {}, [content]);

  editor?.on('update', () => {
    const updatedHTML = editor?.getHTML();
    setContent(updatedHTML);
  });

  return (
    <Box bg="dark.7">
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar
          display="flex"
          style={{ gap: 15 }}
          sticky
          // stickyOffset={60}
        >
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            {!isMobile && (
              <>
                <RichTextEditor.Strikethrough />
                {/* <RichTextEditor.ClearFormatting /> */}
                {/* <RichTextEditor.Highlight /> */}
                <RichTextEditor.Code />
              </>
            )}
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
          {!isMobile && (
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>
          )}
          {!isMobile && (
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>
          )}
          {/* {!isMobile && (
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          )} */}
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content mih={mih || isMobile ? '100px' : '30vh'} />
        <Group justify="flex-end" py="xs" px="xs">
          {buttons}
        </Group>
      </RichTextEditor>
    </Box>
  );
}

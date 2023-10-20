'use client';

import { useState, useTransition } from 'react';
import { Button, Card, Box, Group } from '@mantine/core';
import { useParams, usePathname } from 'next/navigation';
import { useEditor } from '@tiptap/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import { createRootComment } from '@/utils/create-root-comment';

export function RootInput() {
  const pathname = usePathname();
  const params = useParams();

  const { postId } = params;
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

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

  async function handleCreateComment() {
    startTransition(async () => {
      createRootComment(postId as string, content, pathname);
      setContent('');
      editor.commands.clearContent(true);
    });
  }

  return (
    <Card>
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
          <RichTextEditor.Content mih={130} />
          <Group justify="flex-end" py="xs" px="xs">
            <Button loading={isPending} onClick={handleCreateComment} variant="outline">
              Reply
            </Button>
          </Group>
        </RichTextEditor>
      </Box>
    </Card>
  );
}

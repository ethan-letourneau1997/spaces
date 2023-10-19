'use client';

import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { TextEditor } from '@/features/text-editor';
import { createRootComment } from '@/utils/create-root-comment';
import { fetchProfileById } from '@/utils/fetch-profile-by-id';
import { Database } from '@/lib/database';

type ChainRootInputProps = {
  comments: Database['public']['Views']['comment_details']['Row'][];
  setComments: (comments: any) => void;
};

export function ChainRootInput({ comments, setComments }: ChainRootInputProps) {
  const params = useParams();

  const { spaceId, spaceName, postId } = params;
  const [content, setContent] = useState('');
  const [placeholderComment, setPlaceholderComment] = useState({
    content,
    parent_comment: null,
    root_post: postId,
    posted_by_username: '',
    created_at: '',
    posted_by: '',
    id: 1001,
  });

  const supabase = createClientComponentClient();

  async function createPlaceholder() {
    const { data } = await supabase.auth.getSession();
    const profile = await fetchProfileById(data.session?.user.id);
    const currentDate = new Date();
    const isoString = currentDate.toISOString();

    setPlaceholderComment({
      ...placeholderComment, // Keep the existing properties
      posted_by_username: profile.username,
      created_at: isoString,
      posted_by: profile.id,
    });
  }

  useEffect(() => {
    createPlaceholder();
  }, []);

  useEffect(() => {
    setPlaceholderComment({
      ...placeholderComment, // Keep the existing properties
      content,
    });
  }, [content]);

  async function handleCreateComment() {
    setComments([...comments, placeholderComment]);
    createRootComment(
      postId as string,
      content,
      `spaces/${postId}/${spaceName}/${spaceId}/post/${postId}`
    );
    setContent('');
  }

  const buttons = (
    <Button onClick={handleCreateComment} variant="outline">
      Reply
    </Button>
  );

  return <TextEditor content={content} setContent={setContent} mih="200px" buttons={buttons} />;
}

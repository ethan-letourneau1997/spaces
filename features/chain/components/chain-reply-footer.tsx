import { Button, Input } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TextEditor } from '@/features/text-editor';
import { createChildComment } from '@/utils/create-child-comment';
import { Database } from '@/lib/database';
import { fetchProfileById } from '@/utils/fetch-profile-by-id';

type ChainCommentFooterProps = {
  comment: Database['public']['Views']['comment_details']['Row'];
  childComments: Database['public']['Views']['comment_details']['Row'][];
  setChildComments: React.Dispatch<
    React.SetStateAction<Database['public']['Views']['comment_details']['Row'][]>
  >;
};

export function ChainCommentFooter({
  comment,
  setChildComments,
  childComments,
}: ChainCommentFooterProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [content, setContent] = useState('');
  const [placeholderComment, setPlaceholderComment] = useState({
    content,
    parent_comment: comment.id,
    root_post: comment.root_post,
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

  const pathname = usePathname();

  async function handleCreateComment() {
    toggle();
    setChildComments([...childComments, placeholderComment]);
    createChildComment(comment.id, comment.root_post, content, pathname);
  }

  const buttons = (
    <div className="flex gap-2">
      <Button onClick={toggle} variant="subtle" color="red">
        Cancel
      </Button>
      <Button onClick={handleCreateComment} variant="outline">
        Reply
      </Button>
    </div>
  );

  return (
    <div className="px-4 py-2 bg-dark-5">
      {opened ? (
        <TextEditor content={content} setContent={setContent} mih="200px" buttons={buttons} />
      ) : (
        <Input
          styles={{
            input: { backgroundColor: '#1A1B1E' },
          }}
          onClick={toggle}
          component="button"
          pointer
        >
          Write a reply
        </Input>
      )}
    </div>
  );
}

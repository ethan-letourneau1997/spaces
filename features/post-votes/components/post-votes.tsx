'use client';

import useSWR from 'swr';
import { fetchPostVotes } from '@/utils/fetch-post-votes';
import { Database } from '@/lib/database';
import { fetchUserPostVote } from '@/utils/fetch-user-post-vote';
import { PostVoteButtons } from './post-vote-buttons';

type PostVotesProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export function PostVotes({ post }: PostVotesProps) {
  const { data: userVote } = useSWR('userVote', async () => {
    const vote = await fetchUserPostVote(post.id);
    return vote;
  });

  const { data: postVotes } = useSWR('postVotes', async () => {
    const votes = await fetchPostVotes(post.id);
    return votes;
  });

  if (postVotes && userVote) {
    return <PostVoteButtons postVotes={postVotes} userVote={userVote} post={post} />;
  }
}

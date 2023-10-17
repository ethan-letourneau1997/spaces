'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import { UnstyledButton } from '@mantine/core';
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { Database } from '@/lib/database';
import { upsertPostVote } from '../api/upsert-post-vote';
import { upsertCommentVote } from '../api/upsert-comment-vote';

type VoteButtonsProps = {
  totalVotes: number;
  userVote: number;
  post?: Database['public']['Views']['detailed_post']['Row'];
  comment?: Database['public']['Views']['comment_details']['Row'];
  horizontal?: boolean;
};

export function VoteButtons({ totalVotes, userVote, post, comment, horizontal }: VoteButtonsProps) {
  const [optimisticTotalVotes, setOptimisticTotalVotes] = useOptimistic<number>(totalVotes);
  const [optimisticUserVote, setOptimisticUserVote] = useOptimistic<number>(userVote);

  function handleVoteChange(newUserVote: number, newOptomisticVote: number) {
    if (post) {
      upsertPostVote(post, newUserVote);
    }
    if (comment) {
      upsertCommentVote(comment, newUserVote);
    }
    setOptimisticUserVote(newUserVote);
    setOptimisticTotalVotes(optimisticTotalVotes + newOptomisticVote);
  }

  async function handleUpvote() {
    if (optimisticUserVote === 0) {
      handleVoteChange(1, 1);
    }
    if (optimisticUserVote === 1) {
      handleVoteChange(0, -1);
    }
    if (optimisticUserVote === -1) {
      handleVoteChange(1, 2);
    }
  }

  async function handleDownvote() {
    if (optimisticUserVote === 0) {
      handleVoteChange(-1, -1);
    }
    if (optimisticUserVote === 1) {
      handleVoteChange(-1, -2);
    }
    if (optimisticUserVote === -1) {
      handleVoteChange(0, 1);
    }
  }

  return (
    <div
      className={`flex gap-1 ${horizontal ? ' items-center' : 'flex-col gap-2 justify-between'}`}
    >
      <UnstyledButton
        className="flex items-center hover:text-orange-5"
        onClick={handleUpvote}
        color="gray"
      >
        {optimisticUserVote === 1 ? (
          <BiSolidUpvote size={17} className="text-orange-5" />
        ) : (
          <BiUpvote size={17} className="text-dark-2" />
          // <svg
          //   className="w-5 h-5 "
          //   width={300}
          //   height={300}
          //   viewBox="0 0 300 300"
          //   fill="none"
          //   xmlns="http://www.w3.org/2000/svg"
          // >
          //   <path
          //     d="M159.763 29.6875C155 23.75 145 23.75 140.238 29.6875L40.2375 154.688C38.7705 156.528 37.8522 158.744 37.5879 161.083C37.3237 163.421 37.7243 165.787 38.7437 167.908C39.7631 170.029 41.36 171.819 43.3511 173.074C45.3422 174.328 47.6467 174.996 50 175H100V262.5C100 265.815 101.317 268.995 103.661 271.339C106.005 273.683 109.185 275 112.5 275H187.5C190.815 275 193.995 273.683 196.339 271.339C198.683 268.995 200 265.815 200 262.5V175H250C252.353 174.996 254.658 174.328 256.649 173.074C258.64 171.819 260.237 170.029 261.256 167.908C262.276 165.787 262.676 163.421 262.412 161.083C262.148 158.744 261.23 156.528 259.763 154.688L159.763 29.6875ZM187.5 161.083V262.5H112.5V161.083H50L150 38.5L250 161.083H187.5Z"
          //     fill="#A6A7AB"
          //   />
          // </svg>
        )}
      </UnstyledButton>
      {/* <BiUpvote /> */}
      <span className="text-sm ">{optimisticTotalVotes}</span>
      <UnstyledButton
        type="button"
        onClick={handleDownvote}
        className="flex items-center hover:text-orange-5"
      >
        {optimisticUserVote === -1 ? (
          <BiSolidDownvote size={17} className="text-orange-5" />
        ) : (
          <BiDownvote size={17} className="text-dark-2" />
          // <svg
          //   className="w-5 h-5 rotate-180"
          //   width={300}
          //   height={300}
          //   viewBox="0 0 300 300"
          //   fill="none"
          //   xmlns="http://www.w3.org/2000/svg"
          // >
          //   <path
          //     d="M159.763 29.6875C155 23.75 145 23.75 140.238 29.6875L40.2375 154.688C38.7705 156.528 37.8522 158.744 37.5879 161.083C37.3237 163.421 37.7243 165.787 38.7437 167.908C39.7631 170.029 41.36 171.819 43.3511 173.074C45.3422 174.328 47.6467 174.996 50 175H100V262.5C100 265.815 101.317 268.995 103.661 271.339C106.005 273.683 109.185 275 112.5 275H187.5C190.815 275 193.995 273.683 196.339 271.339C198.683 268.995 200 265.815 200 262.5V175H250C252.353 174.996 254.658 174.328 256.649 173.074C258.64 171.819 260.237 170.029 261.256 167.908C262.276 165.787 262.676 163.421 262.412 161.083C262.148 158.744 261.23 156.528 259.763 154.688L159.763 29.6875ZM187.5 161.083V262.5H112.5V161.083H50L150 38.5L250 161.083H187.5Z"
          //     fill="#A6A7AB"
          //   />
          // </svg>
        )}
      </UnstyledButton>
    </div>
  );
}

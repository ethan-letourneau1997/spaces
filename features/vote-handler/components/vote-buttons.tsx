import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { Box } from '@mantine/core';
import classes from './vote-buttons.module.css';

export function UpvoteButton() {
  return (
    <Box className={classes.voteButtonWrapper}>
      <BiUpvote className={classes.voteButton} size={16} />
    </Box>
  );
}

export function UpvotedButton() {
  return <BiSolidUpvote className={classes.votedButton} size={16} />;
}

export function DownvoteButton() {
  return (
    <Box className={classes.voteButtonWrapper}>
      <BiDownvote className={classes.voteButton} size={16} />
    </Box>
  );
}

export function DownvotedButton() {
  return <BiSolidDownvote className={classes.votedButton} size={16} />;
}

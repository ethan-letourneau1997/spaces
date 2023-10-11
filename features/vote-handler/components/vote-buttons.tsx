'use client';

import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { Box, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './vote-buttons.module.css';

export function UpvoteButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Box className={classes.voteButtonWrapper}>
      <BiUpvote className={classes.voteButton} size={isMobile ? 14 : 16} />
    </Box>
  );
}

export function UpvotedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return <BiSolidUpvote className={classes.votedButton} size={isMobile ? 14 : 16} />;
}

export function DownvoteButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Box className={classes.voteButtonWrapper}>
      <BiDownvote className={classes.voteButton} size={isMobile ? 14 : 16} />
    </Box>
  );
}

export function DownvotedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return <BiSolidDownvote className={classes.votedButton} size={isMobile ? 14 : 16} />;
}

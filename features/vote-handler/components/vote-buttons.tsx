'use client';

import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import { Box, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function UpvoteButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Box className="hover:text-yellow-6 text-gray-5">
      <BiUpvote size={isMobile ? 14 : 16} />
    </Box>
  );
}

export function UpvotedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return <BiSolidUpvote className="text-yellow-6" size={isMobile ? 14 : 16} />;
}

export function DownvoteButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Box className="hover:text-yellow-6 text-gray-5">
      <BiDownvote size={isMobile ? 14 : 16} />
    </Box>
  );
}

export function DownvotedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return <BiSolidDownvote className="text-yellow-6" size={isMobile ? 14 : 16} />;
}

'use client';

import { Card, Divider, Paper, SegmentedControl } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { BsGraphUpArrow, BsNewspaper } from 'react-icons/bs';
import { useHover } from '@mantine/hooks';
import { FaRegClock } from 'react-icons/fa';
import { DEFAULT_SORT } from '@/lib/constants';

type SortLinkProps = {
  active: boolean;
  href: string;
  label: string;
  icon: JSX.Element;
};

export function SortLink({ active, href, label, icon }: SortLinkProps) {
  const { hovered, ref } = useHover();

  return (
    <div className="px-1.5" ref={ref}>
      <Link
        className="no-underline text-gray-4  px-1.5 py-0.5 flex items-center gap-2 font-medium"
        href={href}
      >
        {icon}
        {label}
      </Link>
      {active || hovered ? <Divider className=" !border-gray-6" /> : null}
    </div>
  );
}

export function ProfileHeader() {
  const router = useRouter();
  const params = useParams();

  const { username, type, sort, page } = params;

  const [value, setValue] = useState('posts');

  function handleValueChange(e: string) {
    setValue(e);
    router.push(`/profile/${username}/${e.toLowerCase()}/${DEFAULT_SORT}`);
  }

  return (
    <>
      <Paper withBorder bg="transparent" mb="sm">
        <SegmentedControl
          fullWidth
          value={value}
          onChange={handleValueChange}
          data={[
            { label: 'Posts', value: 'posts' },
            { label: 'Comments', value: 'comments' },
            { label: 'Saved', value: 'saved' },
            { label: 'Upvoted', value: 'upvoted' },
            { label: 'Downvoted', value: 'downvoted' },
          ]}
        />
      </Paper>

      <Card className="!bg-dark-6.5" withBorder mb="sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <SortLink
              active={sort === 'new'}
              href={`/profile/${username}/${type}/new/${page}`}
              label="New"
              icon={<BsNewspaper className="text-gray-6" />}
            />
            <SortLink
              active={sort === 'old'}
              href={`/profile/${username}/${type}/old/${page}`}
              label="Old"
              icon={<FaRegClock className="text-gray-6" />}
            />
            <SortLink
              active={sort === 'top'}
              href={`/profile/${username}/${type}/top/${page}`}
              label="Top"
              icon={<BsGraphUpArrow className="text-gray-6" />}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

'use client';

import { Grid } from '@mantine/core';
import { BsSignpostFill } from 'react-icons/bs';
import { FaArrowTrendUp, FaUserAstronaut } from 'react-icons/fa6';
import { MetricCard } from './metric-card';

type SpaceMetricsProps = {
  subscriberCount: number;
  postCount: number;
  totalVotes: number;
};

export function SpaceMetricsGrid({ subscriberCount, postCount, totalVotes }: SpaceMetricsProps) {
  return (
    <Grid mt="xl">
      <Grid.Col span={4}>
        <MetricCard
          value={subscriberCount}
          label="Total subscribers"
          icon={<FaUserAstronaut size={20} />}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <MetricCard value={postCount} label="Total posts" icon={<BsSignpostFill size={20} />} />
      </Grid.Col>

      <Grid.Col span={4}>
        <MetricCard value={totalVotes} label="Total votes" icon={<FaArrowTrendUp size={20} />} />
      </Grid.Col>
    </Grid>
  );
}

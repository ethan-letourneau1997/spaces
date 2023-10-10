'use client';

import { Grid } from '@mantine/core';
import { BsSignpostFill } from 'react-icons/bs';
import { FaUserAstronaut } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { MetricCard } from './metric-card';

export const SpaceMetricsFallback = (
  <Grid mt="xl">
    <Grid.Col span={4}>
      <MetricCard value={0} label="Total subscribers" icon={<FaUserAstronaut size={20} />} />
    </Grid.Col>
    <Grid.Col span={4}>
      <MetricCard value={0} label="Total posts" icon={<BsSignpostFill size={20} />} />
    </Grid.Col>

    <Grid.Col span={4}>
      <MetricCard value={0} label="Total votes" icon={<FaArrowTrendUp size={20} />} />
    </Grid.Col>
  </Grid>
);

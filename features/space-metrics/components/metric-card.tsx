import { Group, Paper, Text } from '@mantine/core';

type MetricCardProps = {
  value: number;
  label: string;
  icon: React.ReactNode;
};

export function MetricCard({ value, label, icon }: MetricCardProps) {
  return (
    <Paper bg="transparent" withBorder p="md">
      <Group justify="center">
        {icon}
        <Text size="xl">{value}</Text>
      </Group>
      <Text ta="center" size="lg">
        {label}
      </Text>
    </Paper>
  );
}

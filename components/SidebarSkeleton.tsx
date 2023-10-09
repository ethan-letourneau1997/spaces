import { Card, Skeleton } from '@mantine/core';

export function SidebarSkeleton() {
  return (
    <Card className="hidden-md" miw="300px" maw="300px" h="fit-content">
      <Skeleton height={200} />
    </Card>
  );
}

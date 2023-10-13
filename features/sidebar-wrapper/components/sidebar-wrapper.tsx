import { Card } from '@mantine/core';

type SidebarWrapperProps = {
  children: React.ReactNode;
  miw?: string;
};

export function SidebarWrapper({ children, miw }: SidebarWrapperProps) {
  return (
    <Card visibleFrom="md" miw={miw || '300px'} maw="300px" h="fit-content" withBorder>
      {children}
    </Card>
  );
}

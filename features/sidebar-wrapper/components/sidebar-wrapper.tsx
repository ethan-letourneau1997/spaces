import { Card } from '@mantine/core';

type SidebarWrapperProps = {
  children: React.ReactNode;
};

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  return (
    <Card miw="300px" maw="300px" h="fit-content">
      {children}
    </Card>
  );
}

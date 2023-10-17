'use client';

import { Card } from '@mantine/core';

type MobilePageHeaderProps = {
  children: JSX.Element;
};

export function MobilePageHeader({ children }: MobilePageHeaderProps) {
  return (
    <Card mb="xs" bg="transparent" className="lg:!hidden">
      {children}
    </Card>
  );
}

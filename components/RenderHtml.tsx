'use client';

import { TypographyStylesProvider } from '@mantine/core';

type RenderHtmlProps = {
  content: string | null;
};

export function RenderHtml({ content }: RenderHtmlProps) {
  return (
    <TypographyStylesProvider pl={0} mb={0}>
      <div dangerouslySetInnerHTML={{ __html: content || '' }} />
    </TypographyStylesProvider>
  );
}

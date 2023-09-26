import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import React from 'react';
import { theme } from '../theme';
import { Navbar } from '@/features/navbar';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Navbar>{children}</Navbar>
        </MantineProvider>
      </body>
    </html>
  );
}

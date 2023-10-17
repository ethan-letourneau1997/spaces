import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../globals.css';

import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { Inter } from 'next/font/google';
import { theme } from '../theme';
import { Navbar } from '@/features/navbar';

export const metadata = {
  title: 'Spaces',
};
export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

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
      <body className={`${inter.className} bg-dark-9`}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          <Navbar>
            <Container className="!px-0 md:!px-4" size="lg">
              {children}
            </Container>
          </Navbar>
        </MantineProvider>
      </body>
    </html>
  );
}

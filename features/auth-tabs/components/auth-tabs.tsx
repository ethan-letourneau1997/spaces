'use client';

import { Card, Container, Tabs } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from './login-form';
import { SignUpForm } from './sign-up-form';

export function AuthTabs() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  return (
    <Container size="xs">
      <Card>
        <Tabs value={tab || 'sign-in'}>
          <Tabs.List grow>
            <Tabs.Tab value="sign-in">Sign In</Tabs.Tab>
            <Tabs.Tab value="sign-up">Sign Up</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="sign-in">
            <LoginForm />
          </Tabs.Panel>
          <Tabs.Panel value="sign-up">
            <SignUpForm />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
}

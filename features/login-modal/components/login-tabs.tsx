'use client';

import { Container, Tabs } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from './login-form';
import { SignUpForm } from './sign-up-form';

export function LoginTabs() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const pathname = usePathname();
  const router = useRouter();

  function navigateToLogin() {
    router.push(`${pathname}?tab=login`);
  }

  function navigateToSignUp() {
    router.push(`${pathname}?tab=signup`);
  }
  return (
    <Container size="xs">
      <Tabs defaultValue={tab || 'login'}>
        <Tabs.List grow>
          <Tabs.Tab onClick={navigateToLogin} value="login">
            Login
          </Tabs.Tab>
          <Tabs.Tab onClick={navigateToSignUp} value="signup">
            Sign Up
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="login">
          <LoginForm />
        </Tabs.Panel>
        <Tabs.Panel value="signup">
          <SignUpForm />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

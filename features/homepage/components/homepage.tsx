import { Center, Container } from '@mantine/core';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Test } from '@/app/test';

export async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const profile = data
    ? await supabase.from('public_profile').select().eq('id', data.session?.user.id).single()
    : null;

  if (profile) {
    return (
      <Container>
        <Center>
          {/* <Text size="lg">
            See what&apos;s <Anchor>hot</Anchor> or start searching!
          </Text> */}
          <p className="text-3xl font-bold text-red-300 underline">Hello world!</p>
          <Test />
        </Center>
      </Container>
    );
  }

  return <div>no user logged in</div>;
}

import { Center, Container } from '@mantine/core';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

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
        </Center>
      </Container>
    );
  }

  return <div>no user logged in</div>;
}

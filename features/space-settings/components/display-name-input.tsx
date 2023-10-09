import { Button, Flex, TextInput } from '@mantine/core';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/database';

type DisplayNameInputProps = {
  space: Database['public']['Tables']['community']['Row'];
};

export function DisplayNameInput({ space }: DisplayNameInputProps) {
  const upsertDisplayName = async (formData: FormData) => {
    'use server';

    const supabase = createServerActionClient({ cookies });
    const { data } = await supabase.auth.getSession();

    const name = formData.get('displayName');
    // Validate the form data and save it to the database
    if (data.session) {
      await supabase
        .from('community')
        .upsert({
          id: space.id,
          name: space.name,
          description: space.description,
          display_name: name,
        })
        .select();
      revalidatePath(`/spaces/${space.id}/${space.name}/settings`);
    }
  };
  return (
    <form action={upsertDisplayName}>
      <Flex gap="sm">
        <TextInput
          name="displayName"
          defaultValue={space.display_name}
          mt="lg"
          label="Display Name"
          description="The publicly visible name"
          maw={400}
          w="100%"
        />

        <Flex align="flex-end">
          <Button h={35} mt="xs" size="xs" color="gray" variant="outline" type="submit">
            Save
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

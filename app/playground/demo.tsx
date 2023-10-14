'use client';

import { useForm } from '@mantine/form';
import { TextInput, Box, Tabs, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export function Demo() {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: { title: '', email: '', age: 0, link: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      title: (value) => (value.length < 5 ? 'Title must have at least 5 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
      link: (value) => {
        // Regular expression to validate URLs
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return urlPattern.test(value)
          ? null
          : 'Invalid URL. link should be formatted like https://www.example.com';
      },
    },
  });

  const handleLinkFormError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: 'Please fill name field', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: 'Please provide a valid email', color: 'red' });
    } else {
      notifications.show({
        message: `title ${form.values.title}, email ${form.values.email}`,
        color: 'red',
      });
    }
  };

  return (
    <Box maw={320} mx="auto">
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <form onSubmit={form.onSubmit(console.log, handleLinkFormError)}>
            <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
            <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
            <Button type="submit" mt="sm">
              Submit
            </Button>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
          <TextInput mt="sm" label="URL" placeholder="link" {...form.getInputProps('link')} />
        </Tabs.Panel>

        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>
      {/* <form onSubmit={form.onSubmit(console.log)}>
        <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
        <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
        <NumberInput
          mt="sm"
          label="Age"
          placeholder="Age"
          min={0}
          max={99}
          {...form.getInputProps('age')}
        />
        <TextInput mt="sm" label="URL" placeholder="link" {...form.getInputProps('link')} />
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form> */}
    </Box>
  );
}

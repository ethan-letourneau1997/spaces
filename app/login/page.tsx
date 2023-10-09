import { AuthTabs } from '@/features/auth-tabs';

export default async function Login() {
  return (
    <AuthTabs />
    // <form action="/auth/login" method="post">
    //   <TextInput
    //     label="email"
    //     description="user email address"
    //     placeholder="jim123@email.com"
    //     name="email"
    //   />
    //   <TextInput label="password" description="user password" name="password" />

    //   <Button variant="filled">Sign In</Button>
    //   <Button formAction="/auth/sign-up" variant="filled">
    //     Sign Up
    //   </Button>
    // </form>
  );
}

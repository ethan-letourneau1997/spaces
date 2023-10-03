type ProfileProps = {
  username: string;
};

export async function Profile({ username }: ProfileProps) {
  return <div>hello {username}</div>;
}

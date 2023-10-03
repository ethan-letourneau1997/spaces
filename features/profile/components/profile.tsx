import { ProfilePosts } from './profile-posts';

type ProfileProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
    username: string;
  };
};

export async function Profile({ params }: ProfileProps) {
  return (
    <div>
      hello {params.username}
      <ProfilePosts params={params} />
    </div>
  );
}

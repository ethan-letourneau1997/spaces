import HomePosts from '@/features/home-posts/components/home-posts';

export const dynamic = 'force-dynamic';

type HomePageProps = {
  params: {
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export default async function HomePage({ params }: HomePageProps) {
  return <HomePosts params={params} />;
}

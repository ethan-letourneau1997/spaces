import { Space } from '@/features/space';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    spaceId: string;
    spaceName: string;
    page: string;
    sort: 'top' | 'new' | 'old';
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  return (
    <>
      <Space params={params} />
    </>
  );
}

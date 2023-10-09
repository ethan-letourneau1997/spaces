import { SpaceSettings } from '@/features/space-settings/iindex';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  return <SpaceSettings params={params} />;
}

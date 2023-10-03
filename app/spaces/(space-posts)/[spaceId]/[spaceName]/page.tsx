import { redirect } from 'next/navigation';
import { DEFAULT_SORT } from '@/lib/constants';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  redirect(`/spaces/${params.spaceId}/${params.spaceName}/${DEFAULT_SORT}`);
}

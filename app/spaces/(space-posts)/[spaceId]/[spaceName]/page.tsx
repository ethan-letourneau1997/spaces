import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type SpacePageProps = {
  params: {
    spaceId: string;
    spaceName: string;
  };
};

export default async function SpacePage({ params }: SpacePageProps) {
  redirect(`/spaces/${params.spaceId}/${params.spaceName}/new/1`);
}

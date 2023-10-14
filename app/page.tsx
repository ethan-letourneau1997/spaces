import { redirect } from 'next/navigation';
import { DEFAULT_SORT } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function Homepage() {
  redirect(`/home/${DEFAULT_SORT}`);
}

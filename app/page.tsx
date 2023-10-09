import { Home } from '@/features/homepage';

import { Welcome } from '../components/Welcome/Welcome';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Home />
    </>
  );
}

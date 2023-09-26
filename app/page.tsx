import { Home } from '@/features/homepage';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

import { Welcome } from '../components/Welcome/Welcome';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Home />
    </>
  );
}

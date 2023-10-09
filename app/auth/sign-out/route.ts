// eslint-disable-next-line import/order
import type { Database } from '@/lib/database';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient<Database>({ cookies });

  await supabase.auth.signOut();

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  });
}

import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/**
 * Auth callback — recebe redirect de:
 *   - confirmação de e-mail (signUp emailRedirectTo)
 *   - recuperação de senha (resetPasswordForEmail redirectTo)
 *   - OAuth provider (Google/futuros)
 *
 * Troca o code por sessão e redireciona para `next` (ou /pais/dashboard).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/pais/dashboard';

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Proxy de proteção de rotas (Next.js 16).
 *
 * Em Next 16+, o arquivo `middleware.ts` foi substituído por `proxy.ts`.
 * Este arquivo roda em cada request para refrescar sessão Supabase e
 * redirecionar usuários não autenticados.
 */

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/cadastro',
  '/recuperar-senha',
  '/auth/callback',
  // (marketing) — público
  '/planos',
  '/sobre',
];

const PAIS_ONLY_ROUTES = [
  '/pais',
  '/consentimento-lgpd',
  '/onboarding',
  // (parent) — spec v1 routes
  '/dashboard',
  '/children',
  '/billing',
  '/settings',
];

const APP_ONLY_ROUTES = [
  // legacy (app) routes
  '/home',
  '/arena',
  '/perfil',
  '/trilha',
  '/aula',
  '/jogo',
  '/quiz',
  '/mentor',
  // (child) — spec v1 routes
  '/inicio',
  '/axis',
  '/chapter',
  '/session',
  '/world',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse = NextResponse.next({ request });
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedRoute =
    PAIS_ONLY_ROUTES.some((r) => pathname.startsWith(r)) ||
    APP_ONLY_ROUTES.some((r) => pathname.startsWith(r));

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};

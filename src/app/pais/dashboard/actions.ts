'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { PERFIL_ATIVO_COOKIE } from '@/lib/perfil-ativo';

/**
 * Define o perfil de criança ativo para a sessão do responsável e
 * redireciona pra área da criança.
 *
 * Validação obrigatória: o perfil precisa pertencer ao responsável
 * autenticado e estar ativo. Em caso contrário, redireciona pra dashboard
 * sem setar cookie.
 */
export async function setPerfilAtivo(formData: FormData) {
  const perfilId = String(formData.get('perfilId') ?? '');
  if (!perfilId) redirect('/pais/dashboard');

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: perfil } = await supabase
    .from('perfis_crianca')
    .select('id')
    .eq('id', perfilId)
    .eq('responsavel_id', user.id)
    .eq('ativo', true)
    .maybeSingle();

  if (!perfil?.id) redirect('/pais/dashboard');

  const cookieStore = await cookies();
  cookieStore.set(PERFIL_ATIVO_COOKIE, String(perfil.id), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });

  redirect('/home');
}

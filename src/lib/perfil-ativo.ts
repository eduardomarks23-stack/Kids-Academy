import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

export const PERFIL_ATIVO_COOKIE = 'perfil_ativo_id';

/**
 * Resolve o perfil de criança ativo para o responsável autenticado.
 *
 * Estratégia:
 *   1. Lê cookie `perfil_ativo_id` setado pelo seletor em /pais/dashboard.
 *   2. Valida que o perfil pertence ao responsável e está ativo.
 *   3. Em qualquer falha, faz fallback pro primeiro perfil ativo do responsável.
 *
 * Retorna `null` se o responsável não tem nenhum perfil ativo (chamador deve
 * redirecionar para /onboarding).
 */
export async function getPerfilAtivoId(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieId = cookieStore.get(PERFIL_ATIVO_COOKIE)?.value;

  if (cookieId) {
    const { data: perfil } = await supabase
      .from('perfis_crianca')
      .select('id')
      .eq('id', cookieId)
      .eq('responsavel_id', userId)
      .eq('ativo', true)
      .maybeSingle();

    if (perfil?.id) return String(perfil.id);
  }

  const { data: primeiro } = await supabase
    .from('perfis_crianca')
    .select('id')
    .eq('responsavel_id', userId)
    .eq('ativo', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return primeiro?.id ? String(primeiro.id) : null;
}

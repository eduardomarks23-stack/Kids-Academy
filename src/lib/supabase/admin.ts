// =============================================================
// Service role client (server-only)
// =============================================================
// NUNCA importar em código que rode no client. Usado apenas em
// route handlers para operações privilegiadas (webhooks, LGPD
// erasure, gravação de progresso server-side, etc.).
// =============================================================

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

export function createAdminSupabaseClient() {
  if (typeof window !== 'undefined') {
    throw new Error(
      'createAdminSupabaseClient() é server-only. Não importar no client.',
    );
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY ausente. Configurar em .env.local (server-only).',
    );
  }
  cachedClient ??= createClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cachedClient;
}

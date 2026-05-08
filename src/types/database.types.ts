/**
 * PLACEHOLDER tipado em loose-mode para permitir uso do supabase-js
 * antes do projeto Supabase real estar configurado.
 *
 * SUBSTITUIR via:
 *   npx supabase gen types typescript --linked > src/types/database.types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type GenericTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      [key: string]: GenericTable;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      // =========================================================
      // Spec v1 tables (English schema) — adicionadas manualmente
      // até regenerar tipos via `supabase gen types` pós-migration.
      // =========================================================
      families: {
        Row: {
          id: string
          owner_id: string
          display_name: string | null
          country_code: string
          locale: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          display_name?: string | null
          country_code?: string
          locale?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          display_name?: string | null
          country_code?: string
          locale?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      worlds: {
        Row: {
          id: string
          slug: string
          display_name: string
          age_min: number
          age_max: number
          description: string | null
          theme_color: string | null
          hit_area_min_px: number
          session_duration_min_seconds: number
          session_duration_max_seconds: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          display_name: string
          age_min: number
          age_max: number
          description?: string | null
          theme_color?: string | null
          hit_area_min_px?: number
          session_duration_min_seconds?: number
          session_duration_max_seconds?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          display_name?: string
          age_min?: number
          age_max?: number
          description?: string | null
          theme_color?: string | null
          hit_area_min_px?: number
          session_duration_min_seconds?: number
          session_duration_max_seconds?: number
          active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      children: {
        Row: {
          id: string
          family_id: string
          display_name: string
          birth_year: number
          avatar_seed: string | null
          active_world_id: string | null
          preferred_voice: string | null
          hand_preference: string | null
          onboarding_completed_at: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          family_id: string
          display_name: string
          birth_year: number
          avatar_seed?: string | null
          active_world_id?: string | null
          preferred_voice?: string | null
          hand_preference?: string | null
          onboarding_completed_at?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          family_id?: string
          display_name?: string
          birth_year?: number
          avatar_seed?: string | null
          active_world_id?: string | null
          preferred_voice?: string | null
          hand_preference?: string | null
          onboarding_completed_at?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      consents: {
        Row: {
          id: string
          child_id: string
          granted_by: string
          granted_at: string
          revoked_at: string | null
          scope: Json
          policy_version: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          child_id: string
          granted_by: string
          granted_at?: string
          revoked_at?: string | null
          scope: Json
          policy_version: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          child_id?: string
          granted_by?: string
          granted_at?: string
          revoked_at?: string | null
          scope?: Json
          policy_version?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      axes: {
        Row: {
          id: string
          world_id: string
          slug: string
          display_name: string
          subtitle: string | null
          icon_name: string | null
          display_order: number
          active: boolean
        }
        Insert: {
          id?: string
          world_id: string
          slug: string
          display_name: string
          subtitle?: string | null
          icon_name?: string | null
          display_order?: number
          active?: boolean
        }
        Update: {
          id?: string
          world_id?: string
          slug?: string
          display_name?: string
          subtitle?: string | null
          icon_name?: string | null
          display_order?: number
          active?: boolean
        }
        Relationships: []
      }
      chapters: {
        Row: {
          id: string
          axis_id: string
          display_name: string
          description: string | null
          display_order: number
          estimated_weeks: number | null
          active: boolean
        }
        Insert: {
          id?: string
          axis_id: string
          display_name: string
          description?: string | null
          display_order: number
          estimated_weeks?: number | null
          active?: boolean
        }
        Update: {
          id?: string
          axis_id?: string
          display_name?: string
          description?: string | null
          display_order?: number
          estimated_weeks?: number | null
          active?: boolean
        }
        Relationships: []
      }
      sessions: {
        Row: {
          id: string
          chapter_id: string
          display_name: string
          learning_objective: string
          display_order: number
          estimated_duration_seconds: number
          active: boolean
        }
        Insert: {
          id?: string
          chapter_id: string
          display_name: string
          learning_objective: string
          display_order: number
          estimated_duration_seconds: number
          active?: boolean
        }
        Update: {
          id?: string
          chapter_id?: string
          display_name?: string
          learning_objective?: string
          display_order?: number
          estimated_duration_seconds?: number
          active?: boolean
        }
        Relationships: []
      }
      atoms: {
        Row: {
          id: string
          session_id: string
          atom_type: string
          engine: string
          config: Json
          display_order: number
          estimated_duration_seconds: number
          success_criteria: Json
          active: boolean
        }
        Insert: {
          id?: string
          session_id: string
          atom_type: string
          engine: string
          config: Json
          display_order: number
          estimated_duration_seconds: number
          success_criteria: Json
          active?: boolean
        }
        Update: {
          id?: string
          session_id?: string
          atom_type?: string
          engine?: string
          config?: Json
          display_order?: number
          estimated_duration_seconds?: number
          success_criteria?: Json
          active?: boolean
        }
        Relationships: []
      }
      concepts: {
        Row: {
          id: string
          axis_id: string
          slug: string
          display_name: string
          bncc_code: string | null
        }
        Insert: {
          id?: string
          axis_id: string
          slug: string
          display_name: string
          bncc_code?: string | null
        }
        Update: {
          id?: string
          axis_id?: string
          slug?: string
          display_name?: string
          bncc_code?: string | null
        }
        Relationships: []
      }
      atom_concepts: {
        Row: { atom_id: string; concept_id: string; weight: number }
        Insert: { atom_id: string; concept_id: string; weight?: number }
        Update: { atom_id?: string; concept_id?: string; weight?: number }
        Relationships: []
      }
      session_progress: {
        Row: {
          id: string
          child_id: string
          session_id: string
          started_at: string
          completed_at: string | null
          total_attempts: number
          success_score: number | null
        }
        Insert: {
          id?: string
          child_id: string
          session_id: string
          started_at?: string
          completed_at?: string | null
          total_attempts?: number
          success_score?: number | null
        }
        Update: {
          id?: string
          child_id?: string
          session_id?: string
          started_at?: string
          completed_at?: string | null
          total_attempts?: number
          success_score?: number | null
        }
        Relationships: []
      }
      atom_attempts: {
        Row: {
          id: string
          child_id: string
          atom_id: string
          session_progress_id: string | null
          started_at: string
          completed_at: string | null
          success: boolean | null
          difficulty_level: number
          result: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          atom_id: string
          session_progress_id?: string | null
          started_at?: string
          completed_at?: string | null
          success?: boolean | null
          difficulty_level?: number
          result?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          atom_id?: string
          session_progress_id?: string | null
          started_at?: string
          completed_at?: string | null
          success?: boolean | null
          difficulty_level?: number
          result?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      repetition_queue: {
        Row: {
          child_id: string
          concept_id: string
          mastery_score: number
          next_review_at: string
          interval_days: number
          last_seen_at: string | null
        }
        Insert: {
          child_id: string
          concept_id: string
          mastery_score?: number
          next_review_at: string
          interval_days?: number
          last_seen_at?: string | null
        }
        Update: {
          child_id?: string
          concept_id?: string
          mastery_score?: number
          next_review_at?: string
          interval_days?: number
          last_seen_at?: string | null
        }
        Relationships: []
      }
      entitlements: {
        Row: {
          id: string
          family_id: string
          product_slug: string
          source: string
          active: boolean
          expires_at: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          family_id: string
          product_slug: string
          source: string
          active?: boolean
          expires_at?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          family_id?: string
          product_slug?: string
          source?: string
          active?: boolean
          expires_at?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          id: number
          occurred_at: string
          actor_id: string | null
          child_id: string | null
          action: string
          entity_table: string
          entity_id: string | null
          diff: Json | null
        }
        Insert: {
          id?: number
          occurred_at?: string
          actor_id?: string | null
          child_id?: string | null
          action: string
          entity_table: string
          entity_id?: string | null
          diff?: Json | null
        }
        Update: {
          id?: number
          occurred_at?: string
          actor_id?: string | null
          child_id?: string | null
          action?: string
          entity_table?: string
          entity_id?: string | null
          diff?: Json | null
        }
        Relationships: []
      }
      child_collectibles: {
        Row: {
          child_id: string
          collectible_slug: string
          acquired_at: string
          source_atom_id: string | null
        }
        Insert: {
          child_id: string
          collectible_slug: string
          acquired_at?: string
          source_atom_id?: string | null
        }
        Update: {
          child_id?: string
          collectible_slug?: string
          acquired_at?: string
          source_atom_id?: string | null
        }
        Relationships: []
      }
      parent_settings: {
        Row: {
          child_id: string
          daily_minutes_limit: number | null
          preferred_voice: string | null
          audio_enabled: boolean
          parental_pin_hash: string | null
          parental_pin_set_at: string | null
          updated_at: string
        }
        Insert: {
          child_id: string
          daily_minutes_limit?: number | null
          preferred_voice?: string | null
          audio_enabled?: boolean
          parental_pin_hash?: string | null
          parental_pin_set_at?: string | null
          updated_at?: string
        }
        Update: {
          child_id?: string
          daily_minutes_limit?: number | null
          preferred_voice?: string | null
          audio_enabled?: boolean
          parental_pin_hash?: string | null
          parental_pin_set_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pending_erasures: {
        Row: {
          id: string
          child_id: string
          scheduled_at: string
          reason: string | null
          executed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          scheduled_at?: string
          reason?: string | null
          executed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          scheduled_at?: string
          reason?: string | null
          executed_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

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
      atom_attempts: {
        Row: {
          atom_id: string
          child_id: string
          completed_at: string | null
          created_at: string
          difficulty_level: number
          id: string
          result: Json | null
          session_progress_id: string | null
          started_at: string
          success: boolean | null
        }
        Insert: {
          atom_id: string
          child_id: string
          completed_at?: string | null
          created_at?: string
          difficulty_level?: number
          id?: string
          result?: Json | null
          session_progress_id?: string | null
          started_at?: string
          success?: boolean | null
        }
        Update: {
          atom_id?: string
          child_id?: string
          completed_at?: string | null
          created_at?: string
          difficulty_level?: number
          id?: string
          result?: Json | null
          session_progress_id?: string | null
          started_at?: string
          success?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "atom_attempts_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atom_attempts_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atom_attempts_session_progress_id_fkey"
            columns: ["session_progress_id"]
            isOneToOne: false
            referencedRelation: "session_progress"
            referencedColumns: ["id"]
          },
        ]
      }
      atom_concepts: {
        Row: {
          atom_id: string
          concept_id: string
          weight: number
        }
        Insert: {
          atom_id: string
          concept_id: string
          weight?: number
        }
        Update: {
          atom_id?: string
          concept_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "atom_concepts_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atom_concepts_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      atoms: {
        Row: {
          active: boolean
          atom_type: string
          config: Json
          display_order: number
          engine: string
          estimated_duration_seconds: number
          id: string
          session_id: string
          success_criteria: Json
        }
        Insert: {
          active?: boolean
          atom_type: string
          config: Json
          display_order: number
          engine: string
          estimated_duration_seconds: number
          id?: string
          session_id: string
          success_criteria: Json
        }
        Update: {
          active?: boolean
          atom_type?: string
          config?: Json
          display_order?: number
          engine?: string
          estimated_duration_seconds?: number
          id?: string
          session_id?: string
          success_criteria?: Json
        }
        Relationships: [
          {
            foreignKeyName: "atoms_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          child_id: string | null
          diff: Json | null
          entity_id: string | null
          entity_table: string
          id: number
          occurred_at: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          child_id?: string | null
          diff?: Json | null
          entity_id?: string | null
          entity_table: string
          id?: number
          occurred_at?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          child_id?: string | null
          diff?: Json | null
          entity_id?: string | null
          entity_table?: string
          id?: number
          occurred_at?: string
        }
        Relationships: []
      }
      axes: {
        Row: {
          active: boolean
          display_name: string
          display_order: number
          icon_name: string | null
          id: string
          slug: string
          subtitle: string | null
          world_id: string
        }
        Insert: {
          active?: boolean
          display_name: string
          display_order?: number
          icon_name?: string | null
          id?: string
          slug: string
          subtitle?: string | null
          world_id: string
        }
        Update: {
          active?: boolean
          display_name?: string
          display_order?: number
          icon_name?: string | null
          id?: string
          slug?: string
          subtitle?: string | null
          world_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "axes_world_id_fkey"
            columns: ["world_id"]
            isOneToOne: false
            referencedRelation: "worlds"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          active: boolean
          axis_id: string
          description: string | null
          display_name: string
          display_order: number
          estimated_weeks: number | null
          id: string
        }
        Insert: {
          active?: boolean
          axis_id: string
          description?: string | null
          display_name: string
          display_order: number
          estimated_weeks?: number | null
          id?: string
        }
        Update: {
          active?: boolean
          axis_id?: string
          description?: string | null
          display_name?: string
          display_order?: number
          estimated_weeks?: number | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_axis_id_fkey"
            columns: ["axis_id"]
            isOneToOne: false
            referencedRelation: "axes"
            referencedColumns: ["id"]
          },
        ]
      }
      child_collectibles: {
        Row: {
          acquired_at: string
          child_id: string
          collectible_slug: string
          source_atom_id: string | null
        }
        Insert: {
          acquired_at?: string
          child_id: string
          collectible_slug: string
          source_atom_id?: string | null
        }
        Update: {
          acquired_at?: string
          child_id?: string
          collectible_slug?: string
          source_atom_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "child_collectibles_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_collectibles_source_atom_id_fkey"
            columns: ["source_atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          active_world_id: string | null
          avatar_seed: string | null
          birth_year: number
          calibration_jsonb: Json | null
          created_at: string
          deleted_at: string | null
          display_name: string
          family_id: string
          hand_preference: string | null
          id: string
          onboarding_completed_at: string | null
          preferred_voice: string | null
          updated_at: string
        }
        Insert: {
          active_world_id?: string | null
          avatar_seed?: string | null
          birth_year: number
          calibration_jsonb?: Json | null
          created_at?: string
          deleted_at?: string | null
          display_name: string
          family_id: string
          hand_preference?: string | null
          id?: string
          onboarding_completed_at?: string | null
          preferred_voice?: string | null
          updated_at?: string
        }
        Update: {
          active_world_id?: string | null
          avatar_seed?: string | null
          birth_year?: number
          calibration_jsonb?: Json | null
          created_at?: string
          deleted_at?: string | null
          display_name?: string
          family_id?: string
          hand_preference?: string | null
          id?: string
          onboarding_completed_at?: string | null
          preferred_voice?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_active_world_id_fkey"
            columns: ["active_world_id"]
            isOneToOne: false
            referencedRelation: "worlds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "children_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      concepts: {
        Row: {
          axis_id: string
          bncc_code: string | null
          display_name: string
          id: string
          slug: string
        }
        Insert: {
          axis_id: string
          bncc_code?: string | null
          display_name: string
          id?: string
          slug: string
        }
        Update: {
          axis_id?: string
          bncc_code?: string | null
          display_name?: string
          id?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "concepts_axis_id_fkey"
            columns: ["axis_id"]
            isOneToOne: false
            referencedRelation: "axes"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          child_id: string
          granted_at: string
          granted_by: string
          id: string
          ip_address: unknown
          policy_version: string
          revoked_at: string | null
          scope: Json
          user_agent: string | null
        }
        Insert: {
          child_id: string
          granted_at?: string
          granted_by: string
          id?: string
          ip_address?: unknown
          policy_version: string
          revoked_at?: string | null
          scope: Json
          user_agent?: string | null
        }
        Update: {
          child_id?: string
          granted_at?: string
          granted_by?: string
          id?: string
          ip_address?: unknown
          policy_version?: string
          revoked_at?: string | null
          scope?: Json
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consents_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      entitlements: {
        Row: {
          active: boolean
          created_at: string
          expires_at: string | null
          family_id: string
          id: string
          metadata: Json | null
          product_slug: string
          source: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          expires_at?: string | null
          family_id: string
          id?: string
          metadata?: Json | null
          product_slug: string
          source: string
        }
        Update: {
          active?: boolean
          created_at?: string
          expires_at?: string | null
          family_id?: string
          id?: string
          metadata?: Json | null
          product_slug?: string
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "entitlements_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      families: {
        Row: {
          country_code: string
          created_at: string
          display_name: string | null
          id: string
          locale: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          country_code?: string
          created_at?: string
          display_name?: string | null
          id?: string
          locale?: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          country_code?: string
          created_at?: string
          display_name?: string | null
          id?: string
          locale?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      parent_settings: {
        Row: {
          audio_enabled: boolean
          child_id: string
          daily_minutes_limit: number | null
          parental_pin_hash: string | null
          parental_pin_set_at: string | null
          preferred_voice: string | null
          updated_at: string
        }
        Insert: {
          audio_enabled?: boolean
          child_id: string
          daily_minutes_limit?: number | null
          parental_pin_hash?: string | null
          parental_pin_set_at?: string | null
          preferred_voice?: string | null
          updated_at?: string
        }
        Update: {
          audio_enabled?: boolean
          child_id?: string
          daily_minutes_limit?: number | null
          parental_pin_hash?: string | null
          parental_pin_set_at?: string | null
          preferred_voice?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_settings_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_erasures: {
        Row: {
          child_id: string
          created_at: string
          executed_at: string | null
          id: string
          reason: string | null
          scheduled_at: string
        }
        Insert: {
          child_id: string
          created_at?: string
          executed_at?: string | null
          id?: string
          reason?: string | null
          scheduled_at?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          executed_at?: string | null
          id?: string
          reason?: string | null
          scheduled_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_erasures_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      repetition_queue: {
        Row: {
          child_id: string
          concept_id: string
          interval_days: number
          last_seen_at: string | null
          mastery_score: number
          next_review_at: string
        }
        Insert: {
          child_id: string
          concept_id: string
          interval_days?: number
          last_seen_at?: string | null
          mastery_score?: number
          next_review_at: string
        }
        Update: {
          child_id?: string
          concept_id?: string
          interval_days?: number
          last_seen_at?: string | null
          mastery_score?: number
          next_review_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "repetition_queue_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repetition_queue_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      session_progress: {
        Row: {
          child_id: string
          completed_at: string | null
          id: string
          session_id: string
          started_at: string
          success_score: number | null
          total_attempts: number
        }
        Insert: {
          child_id: string
          completed_at?: string | null
          id?: string
          session_id: string
          started_at?: string
          success_score?: number | null
          total_attempts?: number
        }
        Update: {
          child_id?: string
          completed_at?: string | null
          id?: string
          session_id?: string
          started_at?: string
          success_score?: number | null
          total_attempts?: number
        }
        Relationships: [
          {
            foreignKeyName: "session_progress_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_progress_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          active: boolean
          chapter_id: string
          display_name: string
          display_order: number
          estimated_duration_seconds: number
          id: string
          learning_objective: string
        }
        Insert: {
          active?: boolean
          chapter_id: string
          display_name: string
          display_order: number
          estimated_duration_seconds: number
          id?: string
          learning_objective: string
        }
        Update: {
          active?: boolean
          chapter_id?: string
          display_name?: string
          display_order?: number
          estimated_duration_seconds?: number
          id?: string
          learning_objective?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      worlds: {
        Row: {
          active: boolean
          age_max: number
          age_min: number
          created_at: string
          description: string | null
          display_name: string
          hit_area_min_px: number
          id: string
          session_duration_max_seconds: number
          session_duration_min_seconds: number
          slug: string
          theme_color: string | null
        }
        Insert: {
          active?: boolean
          age_max: number
          age_min: number
          created_at?: string
          description?: string | null
          display_name: string
          hit_area_min_px?: number
          id?: string
          session_duration_max_seconds?: number
          session_duration_min_seconds?: number
          slug: string
          theme_color?: string | null
        }
        Update: {
          active?: boolean
          age_max?: number
          age_min?: number
          created_at?: string
          description?: string | null
          display_name?: string
          hit_area_min_px?: number
          id?: string
          session_duration_max_seconds?: number
          session_duration_min_seconds?: number
          slug?: string
          theme_color?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_family_id_for_user: { Args: { p_user_id: string }; Returns: string }
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

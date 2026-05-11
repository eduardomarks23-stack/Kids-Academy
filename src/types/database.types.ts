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
      assinaturas: {
        Row: {
          cancelada_em: string | null
          created_at: string
          expira_em: string | null
          id: string
          iniciada_em: string
          plano: Database["public"]["Enums"]["plano_assinatura"]
          plataforma: Database["public"]["Enums"]["plataforma_compra"] | null
          product_id: string | null
          raw_payload: Json | null
          responsavel_id: string
          revenuecat_user_id: string
          status: Database["public"]["Enums"]["status_assinatura"]
          trial_termina_em: string | null
          ultima_renovacao_em: string | null
          updated_at: string
        }
        Insert: {
          cancelada_em?: string | null
          created_at?: string
          expira_em?: string | null
          id?: string
          iniciada_em?: string
          plano?: Database["public"]["Enums"]["plano_assinatura"]
          plataforma?: Database["public"]["Enums"]["plataforma_compra"] | null
          product_id?: string | null
          raw_payload?: Json | null
          responsavel_id: string
          revenuecat_user_id: string
          status?: Database["public"]["Enums"]["status_assinatura"]
          trial_termina_em?: string | null
          ultima_renovacao_em?: string | null
          updated_at?: string
        }
        Update: {
          cancelada_em?: string | null
          created_at?: string
          expira_em?: string | null
          id?: string
          iniciada_em?: string
          plano?: Database["public"]["Enums"]["plano_assinatura"]
          plataforma?: Database["public"]["Enums"]["plataforma_compra"] | null
          product_id?: string | null
          raw_payload?: Json | null
          responsavel_id?: string
          revenuecat_user_id?: string
          status?: Database["public"]["Enums"]["status_assinatura"]
          trial_termina_em?: string | null
          ultima_renovacao_em?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: true
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      assinaturas_eventos: {
        Row: {
          assinatura_id: string | null
          created_at: string
          id: string
          payload: Json
          processado_em: string | null
          responsavel_id: string | null
          tipo_evento: string
        }
        Insert: {
          assinatura_id?: string | null
          created_at?: string
          id?: string
          payload: Json
          processado_em?: string | null
          responsavel_id?: string | null
          tipo_evento: string
        }
        Update: {
          assinatura_id?: string | null
          created_at?: string
          id?: string
          payload?: Json
          processado_em?: string | null
          responsavel_id?: string | null
          tipo_evento?: string
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_eventos_assinatura_id_fkey"
            columns: ["assinatura_id"]
            isOneToOne: false
            referencedRelation: "assinaturas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assinaturas_eventos_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      aulas: {
        Row: {
          ativa: boolean | null
          conteudo: Json
          created_at: string
          duracao_segundos: number | null
          id: string
          nivel_id: string
          ordem: number | null
          tipo: Database["public"]["Enums"]["tipo_aula"]
          titulo: string
          updated_at: string
        }
        Insert: {
          ativa?: boolean | null
          conteudo?: Json
          created_at?: string
          duracao_segundos?: number | null
          id?: string
          nivel_id: string
          ordem?: number | null
          tipo: Database["public"]["Enums"]["tipo_aula"]
          titulo: string
          updated_at?: string
        }
        Update: {
          ativa?: boolean | null
          conteudo?: Json
          created_at?: string
          duracao_segundos?: number | null
          id?: string
          nivel_id?: string
          ordem?: number | null
          tipo?: Database["public"]["Enums"]["tipo_aula"]
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aulas_nivel_id_fkey"
            columns: ["nivel_id"]
            isOneToOne: false
            referencedRelation: "niveis"
            referencedColumns: ["id"]
          },
        ]
      }
      conquistas: {
        Row: {
          ativa: boolean | null
          created_at: string
          criterio: Json
          descricao: string
          icone: string
          id: string
          raridade: Database["public"]["Enums"]["raridade_conquista"] | null
          slug: string
          titulo: string
          xp_recompensa: number | null
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string
          criterio: Json
          descricao: string
          icone: string
          id?: string
          raridade?: Database["public"]["Enums"]["raridade_conquista"] | null
          slug: string
          titulo: string
          xp_recompensa?: number | null
        }
        Update: {
          ativa?: boolean | null
          created_at?: string
          criterio?: Json
          descricao?: string
          icone?: string
          id?: string
          raridade?: Database["public"]["Enums"]["raridade_conquista"] | null
          slug?: string
          titulo?: string
          xp_recompensa?: number | null
        }
        Relationships: []
      }
      conquistas_aluno: {
        Row: {
          conquista_id: string
          ganha_em: string
          id: string
          perfil_crianca_id: string
        }
        Insert: {
          conquista_id: string
          ganha_em?: string
          id?: string
          perfil_crianca_id: string
        }
        Update: {
          conquista_id?: string
          ganha_em?: string
          id?: string
          perfil_crianca_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conquistas_aluno_conquista_id_fkey"
            columns: ["conquista_id"]
            isOneToOne: false
            referencedRelation: "conquistas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conquistas_aluno_perfil_crianca_id_fkey"
            columns: ["perfil_crianca_id"]
            isOneToOne: false
            referencedRelation: "perfis_crianca"
            referencedColumns: ["id"]
          },
        ]
      }
      consentimentos_lgpd: {
        Row: {
          concedido_em: string | null
          created_at: string
          id: string
          ip_origem: unknown
          perfil_crianca_id: string | null
          responsavel_id: string
          revogado_em: string | null
          status: Database["public"]["Enums"]["status_consentimento"]
          texto_versao: string
          tipo: Database["public"]["Enums"]["tipo_consentimento"]
          user_agent: string | null
        }
        Insert: {
          concedido_em?: string | null
          created_at?: string
          id?: string
          ip_origem?: unknown
          perfil_crianca_id?: string | null
          responsavel_id: string
          revogado_em?: string | null
          status: Database["public"]["Enums"]["status_consentimento"]
          texto_versao: string
          tipo: Database["public"]["Enums"]["tipo_consentimento"]
          user_agent?: string | null
        }
        Update: {
          concedido_em?: string | null
          created_at?: string
          id?: string
          ip_origem?: unknown
          perfil_crianca_id?: string | null
          responsavel_id?: string
          revogado_em?: string | null
          status?: Database["public"]["Enums"]["status_consentimento"]
          texto_versao?: string
          tipo?: Database["public"]["Enums"]["tipo_consentimento"]
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consentimentos_lgpd_perfil_crianca_id_fkey"
            columns: ["perfil_crianca_id"]
            isOneToOne: false
            referencedRelation: "perfis_crianca"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consentimentos_lgpd_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos_comportamento: {
        Row: {
          aula_id: string | null
          id: string
          jogo_id: string | null
          perfil_crianca_id: string
          questao_id: string | null
          registrado_em: string
          sessao_id: string | null
          tipo: Database["public"]["Enums"]["tipo_evento_comportamento"]
          valor: Json
        }
        Insert: {
          aula_id?: string | null
          id?: string
          jogo_id?: string | null
          perfil_crianca_id: string
          questao_id?: string | null
          registrado_em?: string
          sessao_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_evento_comportamento"]
          valor: Json
        }
        Update: {
          aula_id?: string | null
          id?: string
          jogo_id?: string | null
          perfil_crianca_id?: string
          questao_id?: string | null
          registrado_em?: string
          sessao_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_evento_comportamento"]
          valor?: Json
        }
        Relationships: [
          {
            foreignKeyName: "eventos_comportamento_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_comportamento_jogo_id_fkey"
            columns: ["jogo_id"]
            isOneToOne: false
            referencedRelation: "jogos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_comportamento_perfil_crianca_id_fkey"
            columns: ["perfil_crianca_id"]
            isOneToOne: false
            referencedRelation: "perfis_crianca"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_comportamento_questao_id_fkey"
            columns: ["questao_id"]
            isOneToOne: false
            referencedRelation: "questoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_comportamento_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          contexto: Json | null
          created_at: string
          id: string
          mensagem: string
          perfil_crianca_id: string | null
          resolvido: boolean | null
          responsavel_id: string | null
          tipo: Database["public"]["Enums"]["tipo_feedback"]
        }
        Insert: {
          contexto?: Json | null
          created_at?: string
          id?: string
          mensagem: string
          perfil_crianca_id?: string | null
          resolvido?: boolean | null
          responsavel_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_feedback"]
        }
        Update: {
          contexto?: Json | null
          created_at?: string
          id?: string
          mensagem?: string
          perfil_crianca_id?: string | null
          resolvido?: boolean | null
          responsavel_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_feedback"]
        }
        Relationships: [
          {
            foreignKeyName: "feedback_perfil_crianca_id_fkey"
            columns: ["perfil_crianca_id"]
            isOneToOne: false
            referencedRelation: "perfis_crianca"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      jogos: {
        Row: {
          ativo: boolean | null
          conceitos: string[]
          config: Json
          created_at: string
          engine: Database["public"]["Enums"]["engine_jogo"]
          id: string
          nivel_id: string | null
          slug: string
          titulo: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          conceitos?: string[]
          config?: Json
          created_at?: string
          engine: Database["public"]["Enums"]["engine_jogo"]
          id?: string
          nivel_id?: string | null
          slug: string
          titulo: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          conceitos?: string[]
          config?: Json
          created_at?: string
          engine?: Database["public"]["Enums"]["engine_jogo"]
          id?: string
          nivel_id?: string | null
          slug?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogos_nivel_id_fkey"
            columns: ["nivel_id"]
            isOneToOne: false
            referencedRelation: "niveis"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_insights: {
        Row: {
          conceitos: string[] | null
          created_at: string
          custo_tokens_in: number | null
          custo_tokens_out: number | null
          expira_em: string | null
          hash_input: string | null
          id: string
          mensagem: string
          modelo_ia: string
          perfil_crianca_id: string
          tipo: string
          titulo: string
          visualizado_em: string | null
        }
        Insert: {
          conceitos?: string[] | null
          created_at?: string
          custo_tokens_in?: number | null
          custo_tokens_out?: number | null
          expira_em?: string | null
          hash_input?: string | null
          id?: string
          mensagem: string
          modelo_ia: string
          perfil_crianca_id: string
          tipo: string
          titulo: string
          visualizado_em?: string | null
        }
        Update: {
          conceitos?: string[] | null
          created_at?: string
          custo_tokens_in?: number | null
          custo_tokens_out?: number | null
          expira_em?: string | null
          hash_input?: string | null
          id?: string
          mensagem?: string
          modelo_ia?: string
          perfil_crianca_id?: string
          tipo?: string
          titulo?: string
          visualizado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_insights_perfil_crianca_id_fkey"
            columns: ["perfil_crianca_id"]
            isOneToOne: false
            referencedRelation: "perfis_crianca"
            referencedColumns: ["id"]
          },
        ]
      }
      niveis: {
        Row: {
          ativo: boolean | null
          created_at: string
          dificuldade: Database["public"]["Enums"]["dificuldade_nivel"]
          id: string
          ordem: number
          titulo: string
          trilha_id: string
          xp_recompensa: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          dificuldade: Database["public"]["Enums"]["dificuldade_nivel"]
          id?: string
          ordem: number
          titulo: string
          trilha_id: string
          xp_recompensa?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          dificuldade?: Database["public"]["Enums"]["dificuldade_nivel"]
          id?: string
          ordem?: number
          titulo?: string
          trilha_id?: string
          xp_recompensa?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "niveis_trilha_id_fkey"
            columns: ["trilha_id"]
            isOneToOne: false
            referencedRelation: "trilhas"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis_crianca: {
        Row: {
          ativo: boolean | null
          avatar_id: string | null
          created_at: string
          data_nascimento: string | null
          id: string
          nome: string
          pin_acesso: string | null
          responsavel_id: string
          serie: Database["public"]["Enums"]["serie_escolar"]
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          avatar_id?: string | null
          created_at?: string
          data_nascimento?: string | null
          id?: string
          nome: string
          pin_acesso?: string | null
          responsavel_id: string
          serie: Database["public"]["Enums"]["serie_escolar"]
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          avatar_id?: string | null
          created_at?: string
          data_nascimento?: string | null
          id?: string
          nome?: string
          pin_acesso?: string | null
          responsavel_id?: string
          serie?: Database["public"]["Enums"]["serie_escolar"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfis_crianca_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      progresso_aluno: {
        Row: {
          aula_id: string | null
          concluido_em: string | null
          id: string
          iniciado_em: string
          jogo_id: string | null
          perfil_crianca_id: string
          score: number | null
          status: Database["public"]["Enums"]["status_progresso"]
          tempo_total_segundos: number | null
          tentativas: number | null
          updated_at: string
        }
        Insert: {
          aula_id?: string | null
          concluido_em?: string | null
          id?: string
          iniciado_em?: string
          jogo_id?: string | null
          perfil_crianca_id: string
          score?: number | null
          status?: Database["public"]["Enums"]["status_progresso"]
          tempo_total_segundos?: number | null
          tentativas?: number | null
          updated_at?: string
        }
        Update: {
          aula_id?: string | null
          concluido_em?: string | null
          id?: string
          iniciado_em?: string
          jogo_id?: string | null
          perfil_crianca_id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["status_progresso"]
          tempo_total_segundos?: number | null
          tentativas?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "progresso_aluno_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progresso_aluno_jogo_id_fkey"
            columns: ["jogo_id"]
            isOneToOne: false
            referencedRelation: "jogos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progresso_aluno_perfil_crianca_id_fkey"
            columns: ["perfil_crianca_id"]
            isOneToOne: false
            referencedRelation: "perfis_crianca"
            referencedColumns: ["id"]
          },
        ]
      }
      questoes: {
        Row: {
          aula_id: string | null
          conceitos: string[] | null
          created_at: string
          embedding: string | null
          enunciado: string
          explicacao: string | null
          id: string
          jogo_id: string | null
          opcoes: Json | null
          resposta_correta: Json
          tipo: Database["public"]["Enums"]["tipo_questao"]
        }
        Insert: {
          aula_id?: string | null
          conceitos?: string[] | null
          created_at?: string
          embedding?: string | null
          enunciado: string
          explicacao?: string | null
          id?: string
          jogo_id?: string | null
          opcoes?: Json | null
          resposta_correta: Json
          tipo: Database["public"]["Enums"]["tipo_questao"]
        }
        Update: {
          aula_id?: string | null
          conceitos?: string[] | null
          created_at?: string
          embedding?: string | null
          enunciado?: string
          explicacao?: string | null
          id?: string
          jogo_id?: string | null
          opcoes?: Json | null
          resposta_correta?: Json
          tipo?: Database["public"]["Enums"]["tipo_questao"]
        }
        Relationships: [
          {
            foreignKeyName: "questoes_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questoes_jogo_id_fkey"
            columns: ["jogo_id"]
            isOneToOne: false
            referencedRelation: "jogos"
            referencedColumns: ["id"]
          },
        ]
      }
      responsaveis: {
        Row: {
          aceitou_termos_em: string | null
          cpf_hash: string | null
          created_at: string
          email: string
          email_verificado_em: string | null
          id: string
          mfa_habilitado: boolean | null
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          aceitou_termos_em?: string | null
          cpf_hash?: string | null
          created_at?: string
          email: string
          email_verificado_em?: string | null
          id: string
          mfa_habilitado?: boolean | null
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          aceitou_termos_em?: string | null
          cpf_hash?: string | null
          created_at?: string
          email?: string
          email_verificado_em?: string | null
          id?: string
          mfa_habilitado?: boolean | null
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sessoes: {
        Row: {
          device_info: Json | null
          duracao_segundos: number | null
          encerrada_em: string | null
          id: string
          iniciada_em: string
          perfil_crianca_id: string
          plataforma: string | null
          versao_app: string | null
        }
        Insert: {
          device_info?: Json | null
          duracao_segundos?: number | null
          encerrada_em?: string | null
          id?: string
          iniciada_em?: string
          perfil_crianca_id: string
          plataforma?: string | null
          versao_app?: string | null
        }
        Update: {
          device_info?: Json | null
          duracao_segundos?: number | null
          encerrada_em?: string | null
          id?: string
          iniciada_em?: string
          perfil_crianca_id?: string
          plataforma?: string | null
          versao_app?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_perfil_crianca_id_fkey"
            columns: ["perfil_crianca_id"]
            isOneToOne: false
            referencedRelation: "perfis_crianca"
            referencedColumns: ["id"]
          },
        ]
      }
      trilhas: {
        Row: {
          ativa: boolean | null
          cor_tema: string | null
          created_at: string
          descricao: string | null
          icone: string | null
          id: string
          idioma: Database["public"]["Enums"]["idioma_conteudo"]
          materia: Database["public"]["Enums"]["materia_bncc"]
          ordem: number | null
          serie: Database["public"]["Enums"]["serie_escolar"]
          slug: string
          titulo: string
          updated_at: string
        }
        Insert: {
          ativa?: boolean | null
          cor_tema?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          idioma?: Database["public"]["Enums"]["idioma_conteudo"]
          materia: Database["public"]["Enums"]["materia_bncc"]
          ordem?: number | null
          serie: Database["public"]["Enums"]["serie_escolar"]
          slug: string
          titulo: string
          updated_at?: string
        }
        Update: {
          ativa?: boolean | null
          cor_tema?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          idioma?: Database["public"]["Enums"]["idioma_conteudo"]
          materia?: Database["public"]["Enums"]["materia_bncc"]
          ordem?: number | null
          serie?: Database["public"]["Enums"]["serie_escolar"]
          slug?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
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
      deletar_dados_crianca: {
        Args: { crianca_id: string }
        Returns: undefined
      }
      pertence_ao_responsavel: {
        Args: { crianca_id: string }
        Returns: boolean
      }
    }
    Enums: {
      dificuldade_nivel: "iniciante" | "intermediario" | "avancado"
      engine_jogo: "react" | "phaser" | "pixi"
      idioma_conteudo: "pt_BR" | "en" | "es"
      materia_bncc:
        | "matematica"
        | "lingua_portuguesa"
        | "ciencias"
        | "historia"
        | "geografia"
        | "arte"
        | "educacao_fisica"
        | "ingles"
      plano_assinatura: "free" | "mensal" | "anual" | "familia"
      plataforma_compra: "google_play" | "apple_store" | "manual"
      raridade_conquista: "comum" | "raro" | "epico" | "lendario"
      serie_escolar:
        | "EI_1"
        | "EI_2"
        | "EI_3"
        | "EF_1"
        | "EF_2"
        | "EF_3"
        | "EF_4"
        | "EF_5"
      status_assinatura:
        | "trial"
        | "ativa"
        | "em_carencia"
        | "cancelada_no_periodo"
        | "expirada"
        | "reembolsada"
      status_consentimento: "concedido" | "revogado" | "pendente"
      status_progresso: "nao_iniciado" | "em_andamento" | "concluido" | "pulado"
      tipo_aula: "video" | "micro_licao" | "leitura" | "audio"
      tipo_consentimento:
        | "cadastro_inicial"
        | "tratamento_dados"
        | "comunicacao_email"
        | "analytics_comportamental"
      tipo_evento_comportamento:
        | "tempo_resposta"
        | "hesitacao"
        | "tentativas_multiplas"
        | "padrao_erro"
        | "engajamento_foco"
        | "velocidade_leitura"
        | "uso_de_dica"
        | "desistencia"
        | "retomada"
        | "conquista_streak"
        | "erro_conceitual"
        | "tempo_total_sessao"
        | "interacao_audio"
        | "replay_solicitado"
        | "feedback_emocional"
      tipo_feedback:
        | "bug"
        | "sugestao"
        | "duvida_pedagogica"
        | "reclamacao"
        | "elogio"
      tipo_questao:
        | "multipla_escolha"
        | "verdadeiro_falso"
        | "arrastar_soltar"
        | "preencher_lacuna"
        | "associar_pares"
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
    Enums: {
      dificuldade_nivel: ["iniciante", "intermediario", "avancado"],
      engine_jogo: ["react", "phaser", "pixi"],
      idioma_conteudo: ["pt_BR", "en", "es"],
      materia_bncc: [
        "matematica",
        "lingua_portuguesa",
        "ciencias",
        "historia",
        "geografia",
        "arte",
        "educacao_fisica",
        "ingles",
      ],
      plano_assinatura: ["free", "mensal", "anual", "familia"],
      plataforma_compra: ["google_play", "apple_store", "manual"],
      raridade_conquista: ["comum", "raro", "epico", "lendario"],
      serie_escolar: [
        "EI_1",
        "EI_2",
        "EI_3",
        "EF_1",
        "EF_2",
        "EF_3",
        "EF_4",
        "EF_5",
      ],
      status_assinatura: [
        "trial",
        "ativa",
        "em_carencia",
        "cancelada_no_periodo",
        "expirada",
        "reembolsada",
      ],
      status_consentimento: ["concedido", "revogado", "pendente"],
      status_progresso: ["nao_iniciado", "em_andamento", "concluido", "pulado"],
      tipo_aula: ["video", "micro_licao", "leitura", "audio"],
      tipo_consentimento: [
        "cadastro_inicial",
        "tratamento_dados",
        "comunicacao_email",
        "analytics_comportamental",
      ],
      tipo_evento_comportamento: [
        "tempo_resposta",
        "hesitacao",
        "tentativas_multiplas",
        "padrao_erro",
        "engajamento_foco",
        "velocidade_leitura",
        "uso_de_dica",
        "desistencia",
        "retomada",
        "conquista_streak",
        "erro_conceitual",
        "tempo_total_sessao",
        "interacao_audio",
        "replay_solicitado",
        "feedback_emocional",
      ],
      tipo_feedback: [
        "bug",
        "sugestao",
        "duvida_pedagogica",
        "reclamacao",
        "elogio",
      ],
      tipo_questao: [
        "multipla_escolha",
        "verdadeiro_falso",
        "arrastar_soltar",
        "preencher_lacuna",
        "associar_pares",
      ],
    },
  },
} as const

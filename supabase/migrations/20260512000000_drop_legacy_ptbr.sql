-- =============================================================
-- Drop schema legacy pt-BR — unificação para inglês (spec v1)
-- =============================================================
-- Sem usuários ainda. Remove a coexistência de schemas pt-BR e
-- inglês, mantendo apenas o canônico do SPEC (families, children,
-- sessions, atoms, etc).
--
-- O que sai:
--   17 tabelas pt-BR + RLS + triggers
--   16 enums
--   Funções pt-BR (handle_new_user pt-BR, deletar_dados_crianca,
--     pertence_ao_responsavel, update_updated_at)
--   Trigger on_auth_user_created (substituído por
--     ensure_family_on_signup no schema inglês)
--
-- O que fica:
--   Schema inglês completo (spec v1 + curiosos collectibles)
-- =============================================================

-- -------------------------------------------------------------
-- Trigger antigo em auth.users (criava registro em responsaveis)
-- -------------------------------------------------------------
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- -------------------------------------------------------------
-- Funções utilitárias pt-BR
-- -------------------------------------------------------------
drop function if exists public.deletar_dados_crianca(uuid);
drop function if exists public.pertence_ao_responsavel(uuid);
drop function if exists public.update_updated_at();

-- -------------------------------------------------------------
-- Tabelas (CASCADE remove RLS, triggers, indexes, FKs)
-- -------------------------------------------------------------
drop table if exists public.feedback cascade;
drop table if exists public.assinaturas_eventos cascade;
drop table if exists public.assinaturas cascade;
drop table if exists public.mentor_insights cascade;
drop table if exists public.conquistas_aluno cascade;
drop table if exists public.conquistas cascade;
drop table if exists public.eventos_comportamento cascade;
drop table if exists public.progresso_aluno cascade;
drop table if exists public.questoes cascade;
drop table if exists public.quiz cascade;
drop table if exists public.jogos cascade;
drop table if exists public.aulas cascade;
drop table if exists public.niveis cascade;
drop table if exists public.trilhas cascade;
drop table if exists public.sessoes cascade;
drop table if exists public.consentimentos_lgpd cascade;
drop table if exists public.perfis_crianca cascade;
drop table if exists public.responsaveis cascade;

-- -------------------------------------------------------------
-- Enums pt-BR
-- -------------------------------------------------------------
drop type if exists public.tipo_feedback;
drop type if exists public.plataforma_compra;
drop type if exists public.status_assinatura;
drop type if exists public.plano_assinatura;
drop type if exists public.raridade_conquista;
drop type if exists public.tipo_evento_comportamento;
drop type if exists public.status_progresso;
drop type if exists public.dificuldade_nivel;
drop type if exists public.tipo_questao;
drop type if exists public.engine_jogo;
drop type if exists public.tipo_aula;
drop type if exists public.idioma_conteudo;
drop type if exists public.materia_bncc;
drop type if exists public.status_consentimento;
drop type if exists public.tipo_consentimento;
drop type if exists public.serie_escolar;

-- -------------------------------------------------------------
-- Validação: contar tabelas restantes
-- -------------------------------------------------------------
do $$
declare
  v_count int;
begin
  select count(*) into v_count
  from information_schema.tables
  where table_schema = 'public'
    and table_name in (
      'responsaveis', 'perfis_crianca', 'sessoes', 'aulas', 'jogos',
      'quiz', 'trilhas', 'niveis', 'questoes', 'progresso_aluno',
      'eventos_comportamento', 'conquistas', 'conquistas_aluno',
      'mentor_insights', 'assinaturas', 'assinaturas_eventos',
      'feedback', 'consentimentos_lgpd'
    );
  if v_count > 0 then
    raise exception 'Tabelas pt-BR ainda presentes: %', v_count;
  end if;
end $$;

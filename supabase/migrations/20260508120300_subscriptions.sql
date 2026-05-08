-- =============================================================
-- Migration 00004 — Assinaturas RevenueCat e feedback
-- =============================================================
-- Sincroniza estado de assinaturas vindas do RevenueCat
-- (Google Play Billing + Apple StoreKit) e captura feedback
-- de alunos e responsáveis.
-- =============================================================

create type plano_assinatura as enum ('free', 'mensal', 'anual', 'familia');

create type status_assinatura as enum (
  'trial',
  'ativa',
  'em_carencia',
  'cancelada_no_periodo',
  'expirada',
  'reembolsada'
);

create type plataforma_compra as enum ('google_play', 'apple_store', 'manual');

create type tipo_feedback as enum (
  'bug',
  'sugestao',
  'duvida_pedagogica',
  'reclamacao',
  'elogio'
);

-- -------------------------------------------------------------
-- TABELA: assinaturas
-- Estado de assinatura por responsável (sincronizado via webhook).
-- -------------------------------------------------------------

create table assinaturas (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references responsaveis(id) on delete cascade,
  revenuecat_user_id text not null,           -- App User ID no RevenueCat
  plano plano_assinatura default 'free' not null,
  status status_assinatura default 'trial' not null,
  plataforma plataforma_compra,
  iniciada_em timestamptz default now() not null,
  expira_em timestamptz,
  cancelada_em timestamptz,
  trial_termina_em timestamptz,
  product_id text,                             -- ex: 'kids_mensal'
  ultima_renovacao_em timestamptz,
  raw_payload jsonb,                           -- payload completo do webhook (auditoria)
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(responsavel_id)
);

create index idx_assinaturas_revenuecat on assinaturas(revenuecat_user_id);
create index idx_assinaturas_status on assinaturas(status);

create trigger update_assinaturas_updated_at
  before update on assinaturas
  for each row execute function update_updated_at();

-- -------------------------------------------------------------
-- TABELA: assinaturas_eventos
-- Histórico imutável de eventos vindos do RevenueCat webhook.
-- -------------------------------------------------------------

create table assinaturas_eventos (
  id uuid primary key default gen_random_uuid(),
  assinatura_id uuid references assinaturas(id) on delete set null,
  responsavel_id uuid references responsaveis(id) on delete set null,
  tipo_evento text not null,                  -- INITIAL_PURCHASE, RENEWAL, CANCELLATION, etc.
  payload jsonb not null,
  processado_em timestamptz,
  created_at timestamptz default now() not null
);

create index idx_assinaturas_eventos_assinatura on assinaturas_eventos(assinatura_id);
create index idx_assinaturas_eventos_tipo on assinaturas_eventos(tipo_evento);

-- -------------------------------------------------------------
-- TABELA: feedback
-- Reports e sugestões. Pode vir do responsável OU da criança.
-- -------------------------------------------------------------

create table feedback (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid references responsaveis(id) on delete cascade,
  perfil_crianca_id uuid references perfis_crianca(id) on delete cascade,
  tipo tipo_feedback not null,
  contexto jsonb,                              -- url, jogo, aula, screenshot ref
  mensagem text not null,
  resolvido boolean default false,
  created_at timestamptz default now() not null,
  constraint feedback_tem_origem check (
    responsavel_id is not null or perfil_crianca_id is not null
  )
);

create index idx_feedback_resolvido on feedback(resolvido) where resolvido = false;
create index idx_feedback_tipo on feedback(tipo);

-- =============================================================
-- Migration 20260511120000 — Spec v1 (English schema)
-- =============================================================
-- Implementa SPEC-NEXUS-KIDS-ACADEMY.md seção 6.
--
-- Coexiste com o schema legado em português (responsaveis,
-- perfis_crianca, etc.) - migração de dados é tarefa separada.
--
-- Tabelas:
--   families, children, consents
--   worlds, axes, chapters, sessions, atoms, concepts, atom_concepts
--   session_progress, atom_attempts, repetition_queue
--   entitlements, audit_log
-- =============================================================

create extension if not exists "pgcrypto";

-- =============================================================
-- IDENTIDADE E AUTORIZAÇÃO
-- =============================================================

create table if not exists families (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  display_name text,
  country_code text not null default 'BR',
  locale text not null default 'pt-BR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists families_owner_id_idx on families(owner_id);

-- worlds antes de children (FK)
create table if not exists worlds (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  age_min smallint not null,
  age_max smallint not null,
  description text,
  theme_color text,
  hit_area_min_px smallint not null default 64,
  session_duration_min_seconds int not null default 300,
  session_duration_max_seconds int not null default 720,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  display_name text not null,
  birth_year smallint not null,
  avatar_seed text,
  active_world_id uuid references worlds(id),
  preferred_voice text,
  hand_preference text check (hand_preference in ('left', 'right') or hand_preference is null),
  onboarding_completed_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists children_family_id_idx on children(family_id) where deleted_at is null;
create index if not exists children_active_world_idx on children(active_world_id) where deleted_at is null;

create table if not exists consents (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  granted_by uuid not null references auth.users(id),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  scope jsonb not null,
  policy_version text not null,
  ip_address inet,
  user_agent text
);

create index if not exists consents_child_id_idx on consents(child_id);

-- =============================================================
-- CATÁLOGO DE CONTEÚDO
-- =============================================================

create table if not exists axes (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references worlds(id),
  slug text not null,
  display_name text not null,
  subtitle text,
  icon_name text,
  display_order smallint not null default 0,
  active boolean not null default true,
  unique(world_id, slug)
);

create index if not exists axes_world_id_idx on axes(world_id);

create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  axis_id uuid not null references axes(id),
  display_name text not null,
  description text,
  display_order smallint not null,
  estimated_weeks smallint default 3,
  active boolean not null default true,
  unique(axis_id, display_order)
);

create index if not exists chapters_axis_id_idx on chapters(axis_id);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id),
  display_name text not null,
  learning_objective text not null,
  display_order smallint not null,
  estimated_duration_seconds int not null,
  active boolean not null default true,
  unique(chapter_id, display_order)
);

create index if not exists sessions_chapter_id_idx on sessions(chapter_id);

create table if not exists atoms (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id),
  atom_type text not null check (atom_type in (
    'presentation', 'recognition', 'discrimination',
    'guided_production', 'free_production', 'application'
  )),
  engine text not null check (engine in ('phaser', 'video', 'audio', 'native_html')),
  config jsonb not null,
  display_order smallint not null,
  estimated_duration_seconds int not null,
  success_criteria jsonb not null,
  active boolean not null default true,
  unique(session_id, display_order)
);

create index if not exists atoms_session_id_idx on atoms(session_id);

-- =============================================================
-- CONCEITOS (spaced repetition)
-- =============================================================

create table if not exists concepts (
  id uuid primary key default gen_random_uuid(),
  axis_id uuid not null references axes(id),
  slug text not null,
  display_name text not null,
  bncc_code text,
  unique(axis_id, slug)
);

create table if not exists atom_concepts (
  atom_id uuid not null references atoms(id) on delete cascade,
  concept_id uuid not null references concepts(id) on delete cascade,
  weight smallint not null default 1,
  primary key (atom_id, concept_id)
);

-- =============================================================
-- PROGRESSO E TELEMETRIA
-- =============================================================

create table if not exists session_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  session_id uuid not null references sessions(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  total_attempts int not null default 0,
  success_score real,
  unique(child_id, session_id)
);

create index if not exists session_progress_child_id_idx on session_progress(child_id);
create index if not exists session_progress_session_id_idx on session_progress(session_id);

create table if not exists atom_attempts (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  atom_id uuid not null references atoms(id),
  session_progress_id uuid references session_progress(id) on delete set null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  success boolean,
  difficulty_level smallint not null default 1 check (difficulty_level between 1 and 3),
  result jsonb,
  created_at timestamptz not null default now()
);

create index if not exists atom_attempts_child_id_idx on atom_attempts(child_id);
create index if not exists atom_attempts_atom_id_idx on atom_attempts(atom_id);

create table if not exists repetition_queue (
  child_id uuid not null references children(id) on delete cascade,
  concept_id uuid not null references concepts(id) on delete cascade,
  mastery_score real not null default 0,
  next_review_at timestamptz not null,
  interval_days smallint not null default 1,
  last_seen_at timestamptz,
  primary key (child_id, concept_id)
);

create index if not exists repetition_queue_due_idx on repetition_queue(child_id, next_review_at);

-- =============================================================
-- ACESSO E BILLING
-- =============================================================

create table if not exists entitlements (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  product_slug text not null,
  source text not null,
  active boolean not null default true,
  expires_at timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists entitlements_family_id_idx on entitlements(family_id) where active = true;
create index if not exists entitlements_product_idx on entitlements(product_slug) where active = true;

-- =============================================================
-- AUDIT (LGPD)
-- =============================================================

create table if not exists audit_log (
  id bigserial primary key,
  occurred_at timestamptz not null default now(),
  actor_id uuid,
  child_id uuid,
  action text not null,
  entity_table text not null,
  entity_id uuid,
  diff jsonb
);

create index if not exists audit_log_child_id_idx on audit_log(child_id, occurred_at desc);
create index if not exists audit_log_action_idx on audit_log(action, occurred_at desc);

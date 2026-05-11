-- =============================================================
-- Mundo dos Curiosos — Collectibles (casinha virtual)
-- =============================================================
-- PROMPT-IMPLEMENTACAO-MUNDO-CURIOSOS Fase 11.
-- Tabela child_collectibles registra os bichinhos/objetos
-- afetivos adquiridos por cada criança ao completar átomos
-- celebrate. Eixo 4 inclui itens com interatividade especial.
-- =============================================================

create table if not exists public.child_collectibles (
  child_id uuid not null references public.children(id) on delete cascade,
  collectible_slug text not null,
  acquired_at timestamptz not null default now(),
  source_atom_id uuid references public.atoms(id),
  primary key (child_id, collectible_slug)
);

create index if not exists child_collectibles_child_id_idx
  on public.child_collectibles(child_id, acquired_at desc);

-- RLS — pai vê colecionáveis dos próprios filhos
alter table public.child_collectibles enable row level security;

create policy "parent reads own children collectibles"
  on public.child_collectibles
  for select
  using (
    child_id in (
      select id from public.children
      where family_id in (
        select id from public.families where owner_id = auth.uid()
      )
      and deleted_at is null
    )
  );

-- Insert via service role (server-side ao completar átomo celebrate).

-- =============================================================
-- Settings parentais — limite de tempo, voz, PIN, audio toggle
-- =============================================================

create table if not exists public.parent_settings (
  child_id uuid primary key references public.children(id) on delete cascade,
  daily_minutes_limit smallint default 30,
  preferred_voice text default 'voice_lola',
  audio_enabled boolean not null default true,
  parental_pin_hash text,
  parental_pin_set_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.parent_settings enable row level security;

create policy "parent reads own children settings"
  on public.parent_settings
  for select
  using (
    child_id in (
      select id from public.children
      where family_id in (
        select id from public.families where owner_id = auth.uid()
      )
    )
  );

create policy "parent writes own children settings"
  on public.parent_settings
  for all
  using (
    child_id in (
      select id from public.children
      where family_id in (
        select id from public.families where owner_id = auth.uid()
      )
    )
  )
  with check (
    child_id in (
      select id from public.children
      where family_id in (
        select id from public.families where owner_id = auth.uid()
      )
    )
  );

create trigger trg_parent_settings_updated_at
  before update on public.parent_settings
  for each row execute function public.set_updated_at();

-- =============================================================
-- Calibração inicial (3 perguntas no onboarding)
-- =============================================================

alter table public.children
  add column if not exists calibration_jsonb jsonb default '{}'::jsonb;

-- =============================================================
-- Pending erasures (LGPD soft → hard delete em 30 dias)
-- =============================================================

create table if not exists public.pending_erasures (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  scheduled_at timestamptz not null default now() + interval '30 days',
  reason text,
  executed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists pending_erasures_scheduled_idx
  on public.pending_erasures(scheduled_at)
  where executed_at is null;

alter table public.pending_erasures enable row level security;
-- Apenas service role lê/escreve; pais não veem fila diretamente.

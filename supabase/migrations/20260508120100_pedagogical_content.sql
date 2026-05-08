-- =============================================================
-- Migration 00002 — Conteúdo pedagógico
-- =============================================================
-- Trilhas (caminhos de aprendizagem por matéria/série),
-- Níveis (etapas dentro da trilha),
-- Aulas (videoaulas, microlições),
-- Jogos (multi-engine: react/phaser/pixi),
-- Questões (banco com pgvector para busca semântica MENTOR).
-- =============================================================

create extension if not exists "vector";

-- -------------------------------------------------------------
-- ENUMS
-- -------------------------------------------------------------

create type materia_bncc as enum (
  'matematica',
  'lingua_portuguesa',
  'ciencias',
  'historia',
  'geografia',
  'arte',
  'educacao_fisica',
  'ingles'
);

create type idioma_conteudo as enum ('pt_BR', 'en', 'es');

create type tipo_aula as enum ('video', 'micro_licao', 'leitura', 'audio');

create type engine_jogo as enum ('react', 'phaser', 'pixi');

create type tipo_questao as enum (
  'multipla_escolha',
  'verdadeiro_falso',
  'arrastar_soltar',
  'preencher_lacuna',
  'associar_pares'
);

create type dificuldade_nivel as enum ('iniciante', 'intermediario', 'avancado');

-- -------------------------------------------------------------
-- TABELA: trilhas
-- -------------------------------------------------------------

create table trilhas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  materia materia_bncc not null,
  serie serie_escolar not null,
  idioma idioma_conteudo default 'pt_BR' not null,
  titulo text not null,
  descricao text,
  cor_tema text default '#6B46C1',
  icone text,
  ordem integer default 0,
  ativa boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_trilhas_materia_serie on trilhas(materia, serie);
create index idx_trilhas_ativa on trilhas(ativa) where ativa = true;

-- -------------------------------------------------------------
-- TABELA: niveis
-- -------------------------------------------------------------

create table niveis (
  id uuid primary key default gen_random_uuid(),
  trilha_id uuid not null references trilhas(id) on delete cascade,
  ordem integer not null,
  titulo text not null,
  dificuldade dificuldade_nivel not null,
  xp_recompensa integer default 100,
  ativo boolean default true,
  created_at timestamptz default now() not null,
  unique(trilha_id, ordem)
);

create index idx_niveis_trilha on niveis(trilha_id);

-- -------------------------------------------------------------
-- TABELA: aulas
-- -------------------------------------------------------------

create table aulas (
  id uuid primary key default gen_random_uuid(),
  nivel_id uuid not null references niveis(id) on delete cascade,
  tipo tipo_aula not null,
  titulo text not null,
  conteudo jsonb not null default '{}'::jsonb,  -- url video, markdown, etc.
  duracao_segundos integer,                     -- esperada (microlição = 360s)
  ordem integer default 0,
  ativa boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_aulas_nivel on aulas(nivel_id);

-- -------------------------------------------------------------
-- TABELA: jogos
-- Cada jogo declara qual engine usa (react/phaser/pixi).
-- -------------------------------------------------------------

create table jogos (
  id uuid primary key default gen_random_uuid(),
  nivel_id uuid references niveis(id) on delete cascade,
  slug text not null unique,                    -- ex: 'pega-fracoes'
  titulo text not null,
  engine engine_jogo not null,
  config jsonb not null default '{}'::jsonb,   -- parâmetros específicos do jogo
  conceitos text[] not null default array[]::text[], -- referências BNCC
  ativo boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_jogos_nivel on jogos(nivel_id);
create index idx_jogos_engine on jogos(engine);

-- -------------------------------------------------------------
-- TABELA: questoes
-- pgvector permite busca semântica para MENTOR.
-- -------------------------------------------------------------

create table questoes (
  id uuid primary key default gen_random_uuid(),
  aula_id uuid references aulas(id) on delete cascade,
  jogo_id uuid references jogos(id) on delete cascade,
  tipo tipo_questao not null,
  enunciado text not null,
  opcoes jsonb,                                -- alternativas (estrutura por tipo)
  resposta_correta jsonb not null,
  explicacao text,                             -- exibida após erro/acerto
  conceitos text[] default array[]::text[],
  embedding vector(1536),                       -- text-embedding-3-small
  created_at timestamptz default now() not null,
  -- Cada questão pertence a aula OU jogo, não os dois ao mesmo tempo
  constraint questoes_aula_xor_jogo check (
    (aula_id is not null and jogo_id is null)
    or (aula_id is null and jogo_id is not null)
  )
);

create index idx_questoes_aula on questoes(aula_id) where aula_id is not null;
create index idx_questoes_jogo on questoes(jogo_id) where jogo_id is not null;
create index idx_questoes_embedding on questoes
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create trigger update_trilhas_updated_at
  before update on trilhas
  for each row execute function update_updated_at();

create trigger update_aulas_updated_at
  before update on aulas
  for each row execute function update_updated_at();

create trigger update_jogos_updated_at
  before update on jogos
  for each row execute function update_updated_at();

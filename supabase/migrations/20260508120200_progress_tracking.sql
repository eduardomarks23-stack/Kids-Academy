-- =============================================================
-- Migration 00003 — Tracking de progresso e comportamento
-- =============================================================
-- Progresso por aula/jogo, eventos comportamentais (15 dimensões
-- para MENTOR IA), conquistas (XP/badges), sessões (auditoria).
-- =============================================================

-- -------------------------------------------------------------
-- ENUMS
-- -------------------------------------------------------------

create type status_progresso as enum (
  'nao_iniciado',
  'em_andamento',
  'concluido',
  'pulado'
);

create type tipo_evento_comportamento as enum (
  'tempo_resposta',           -- 1: tempo gasto em questão (ms)
  'hesitacao',                -- 2: mouse parado >3s
  'tentativas_multiplas',     -- 3: re-submissions na mesma questão
  'padrao_erro',              -- 4: tipo de erro (sistemático/aleatório)
  'engajamento_foco',         -- 5: foco vs distração (window blur/focus)
  'velocidade_leitura',       -- 6: tempo de leitura de enunciado
  'uso_de_dica',              -- 7: solicitou dica/ajuda
  'desistencia',              -- 8: abandonou antes de concluir
  'retomada',                 -- 9: voltou a tentar após erro
  'conquista_streak',         -- 10: acertos consecutivos
  'erro_conceitual',          -- 11: erro conceitual identificado por padrão
  'tempo_total_sessao',       -- 12: duração da sessão de jogo
  'interacao_audio',          -- 13: usou áudio (sim/não)
  'replay_solicitado',        -- 14: pediu para repetir aula/explicação
  'feedback_emocional'        -- 15: reação detectada (frustração/satisfação)
);

create type raridade_conquista as enum ('comum', 'raro', 'epico', 'lendario');

-- -------------------------------------------------------------
-- TABELA: sessoes
-- Cada sessão de uso da criança no app.
-- -------------------------------------------------------------

create table sessoes (
  id uuid primary key default gen_random_uuid(),
  perfil_crianca_id uuid not null references perfis_crianca(id) on delete cascade,
  iniciada_em timestamptz default now() not null,
  encerrada_em timestamptz,
  duracao_segundos integer,
  plataforma text,                            -- 'web', 'android', 'ios'
  versao_app text,
  device_info jsonb default '{}'::jsonb
);

create index idx_sessoes_crianca on sessoes(perfil_crianca_id);
create index idx_sessoes_data on sessoes(iniciada_em desc);

-- -------------------------------------------------------------
-- TABELA: progresso_aluno
-- Progresso por aula/jogo.
-- -------------------------------------------------------------

create table progresso_aluno (
  id uuid primary key default gen_random_uuid(),
  perfil_crianca_id uuid not null references perfis_crianca(id) on delete cascade,
  aula_id uuid references aulas(id) on delete cascade,
  jogo_id uuid references jogos(id) on delete cascade,
  status status_progresso default 'em_andamento' not null,
  score integer default 0,
  tentativas integer default 1,
  tempo_total_segundos integer default 0,
  iniciado_em timestamptz default now() not null,
  concluido_em timestamptz,
  updated_at timestamptz default now() not null,
  constraint progresso_aula_xor_jogo check (
    (aula_id is not null and jogo_id is null)
    or (aula_id is null and jogo_id is not null)
  )
);

create unique index idx_progresso_aluno_aula
  on progresso_aluno(perfil_crianca_id, aula_id)
  where aula_id is not null;

create unique index idx_progresso_aluno_jogo
  on progresso_aluno(perfil_crianca_id, jogo_id)
  where jogo_id is not null;

create trigger update_progresso_updated_at
  before update on progresso_aluno
  for each row execute function update_updated_at();

-- -------------------------------------------------------------
-- TABELA: eventos_comportamento
-- Captura granular para alimentar MENTOR IA.
-- -------------------------------------------------------------

create table eventos_comportamento (
  id uuid primary key default gen_random_uuid(),
  perfil_crianca_id uuid not null references perfis_crianca(id) on delete cascade,
  sessao_id uuid references sessoes(id) on delete cascade,
  jogo_id uuid references jogos(id) on delete set null,
  aula_id uuid references aulas(id) on delete set null,
  questao_id uuid references questoes(id) on delete set null,
  tipo tipo_evento_comportamento not null,
  valor jsonb not null,                        -- estrutura específica por tipo
  registrado_em timestamptz default now() not null
);

create index idx_eventos_crianca_data
  on eventos_comportamento(perfil_crianca_id, registrado_em desc);
create index idx_eventos_sessao on eventos_comportamento(sessao_id);
create index idx_eventos_tipo on eventos_comportamento(tipo);

-- -------------------------------------------------------------
-- TABELA: conquistas (catálogo de badges/troféus)
-- -------------------------------------------------------------

create table conquistas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titulo text not null,
  descricao text not null,
  icone text not null,
  raridade raridade_conquista default 'comum',
  xp_recompensa integer default 50,
  criterio jsonb not null,                     -- regra para conceder
  ativa boolean default true,
  created_at timestamptz default now() not null
);

-- -------------------------------------------------------------
-- TABELA: conquistas_aluno (mapeia quem ganhou o quê)
-- -------------------------------------------------------------

create table conquistas_aluno (
  id uuid primary key default gen_random_uuid(),
  perfil_crianca_id uuid not null references perfis_crianca(id) on delete cascade,
  conquista_id uuid not null references conquistas(id) on delete restrict,
  ganha_em timestamptz default now() not null,
  unique(perfil_crianca_id, conquista_id)
);

create index idx_conquistas_aluno_crianca on conquistas_aluno(perfil_crianca_id);

-- -------------------------------------------------------------
-- TABELA: mentor_insights
-- Insights gerados pelo MENTOR IA (cacheados 24h).
-- -------------------------------------------------------------

create table mentor_insights (
  id uuid primary key default gen_random_uuid(),
  perfil_crianca_id uuid not null references perfis_crianca(id) on delete cascade,
  tipo text not null,                          -- 'forca', 'dificuldade', 'sugestao'
  titulo text not null,
  mensagem text not null,
  conceitos text[] default array[]::text[],
  modelo_ia text not null,                     -- ex: 'claude-haiku-4-5-20251001'
  custo_tokens_in integer,
  custo_tokens_out integer,
  hash_input text,                             -- para deduplicar/cachear
  visualizado_em timestamptz,
  expira_em timestamptz default (now() + interval '24 hours'),
  created_at timestamptz default now() not null
);

create index idx_mentor_insights_crianca
  on mentor_insights(perfil_crianca_id, created_at desc);
create index idx_mentor_insights_hash on mentor_insights(hash_input);

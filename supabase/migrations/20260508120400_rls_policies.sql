-- =============================================================
-- Migration 00005 — Row Level Security (RLS)
-- =============================================================
-- HABILITA RLS em todas as tabelas e cria policies para:
--   - responsável vê APENAS seus dados e dados de SEUS filhos
--   - criança (via auth.uid() do responsável + perfil ativo) vê apenas próprio progresso
--   - service_role bypass tudo (usado por edge functions)
-- =============================================================

-- -------------------------------------------------------------
-- HABILITAR RLS EM TODAS AS TABELAS
-- -------------------------------------------------------------

alter table responsaveis enable row level security;
alter table perfis_crianca enable row level security;
alter table consentimentos_lgpd enable row level security;

alter table trilhas enable row level security;
alter table niveis enable row level security;
alter table aulas enable row level security;
alter table jogos enable row level security;
alter table questoes enable row level security;

alter table sessoes enable row level security;
alter table progresso_aluno enable row level security;
alter table eventos_comportamento enable row level security;
alter table conquistas enable row level security;
alter table conquistas_aluno enable row level security;
alter table mentor_insights enable row level security;

alter table assinaturas enable row level security;
alter table assinaturas_eventos enable row level security;
alter table feedback enable row level security;

-- -------------------------------------------------------------
-- POLICIES: responsaveis
-- Cada usuário só vê e edita o próprio perfil.
-- -------------------------------------------------------------

create policy "responsavel_seleciona_proprio"
  on responsaveis for select
  using (id = auth.uid());

create policy "responsavel_atualiza_proprio"
  on responsaveis for update
  using (id = auth.uid());

-- -------------------------------------------------------------
-- POLICIES: perfis_crianca
-- Responsável vê/edita apenas seus filhos.
-- -------------------------------------------------------------

create policy "responsavel_le_filhos"
  on perfis_crianca for select
  using (responsavel_id = auth.uid());

create policy "responsavel_cria_filhos"
  on perfis_crianca for insert
  with check (responsavel_id = auth.uid());

create policy "responsavel_atualiza_filhos"
  on perfis_crianca for update
  using (responsavel_id = auth.uid());

create policy "responsavel_deleta_filhos"
  on perfis_crianca for delete
  using (responsavel_id = auth.uid());

-- -------------------------------------------------------------
-- POLICIES: consentimentos_lgpd
-- Responsável só vê próprios consentimentos.
-- -------------------------------------------------------------

create policy "responsavel_le_consentimentos"
  on consentimentos_lgpd for select
  using (responsavel_id = auth.uid());

create policy "responsavel_cria_consentimentos"
  on consentimentos_lgpd for insert
  with check (responsavel_id = auth.uid());

create policy "responsavel_revoga_consentimentos"
  on consentimentos_lgpd for update
  using (responsavel_id = auth.uid());

-- -------------------------------------------------------------
-- POLICIES: conteúdo pedagógico (trilhas, niveis, aulas, jogos, questoes)
-- Leitura pública (autenticada). Escrita apenas service_role.
-- -------------------------------------------------------------

create policy "conteudo_publico_trilhas" on trilhas for select using (ativa = true);
create policy "conteudo_publico_niveis" on niveis for select using (ativo = true);
create policy "conteudo_publico_aulas" on aulas for select using (ativa = true);
create policy "conteudo_publico_jogos" on jogos for select using (ativo = true);
create policy "conteudo_publico_questoes" on questoes for select using (true);

-- -------------------------------------------------------------
-- HELPER: pertence_ao_responsavel
-- Verifica se uma criança pertence ao responsável autenticado.
-- -------------------------------------------------------------

create or replace function pertence_ao_responsavel(crianca_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from perfis_crianca
    where id = crianca_id and responsavel_id = auth.uid()
  );
$$;

-- -------------------------------------------------------------
-- POLICIES: progresso_aluno e sessoes
-- Responsável vê progresso de seus filhos. Criança escreve via JWT.
-- -------------------------------------------------------------

create policy "responsavel_le_sessoes_filhos"
  on sessoes for select
  using (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_cria_sessoes_filhos"
  on sessoes for insert
  with check (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_atualiza_sessoes_filhos"
  on sessoes for update
  using (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_le_progresso_filhos"
  on progresso_aluno for select
  using (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_cria_progresso_filhos"
  on progresso_aluno for insert
  with check (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_atualiza_progresso_filhos"
  on progresso_aluno for update
  using (pertence_ao_responsavel(perfil_crianca_id));

-- -------------------------------------------------------------
-- POLICIES: eventos_comportamento, conquistas_aluno, mentor_insights
-- -------------------------------------------------------------

create policy "responsavel_le_eventos_filhos"
  on eventos_comportamento for select
  using (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_cria_eventos_filhos"
  on eventos_comportamento for insert
  with check (pertence_ao_responsavel(perfil_crianca_id));

create policy "conquistas_publicas" on conquistas for select using (ativa = true);

create policy "responsavel_le_conquistas_filhos"
  on conquistas_aluno for select
  using (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_cria_conquistas_filhos"
  on conquistas_aluno for insert
  with check (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_le_insights_filhos"
  on mentor_insights for select
  using (pertence_ao_responsavel(perfil_crianca_id));

create policy "responsavel_atualiza_insights_filhos"
  on mentor_insights for update
  using (pertence_ao_responsavel(perfil_crianca_id));

-- -------------------------------------------------------------
-- POLICIES: assinaturas e feedback
-- -------------------------------------------------------------

create policy "responsavel_le_propria_assinatura"
  on assinaturas for select
  using (responsavel_id = auth.uid());

create policy "responsavel_le_proprios_eventos_assinatura"
  on assinaturas_eventos for select
  using (responsavel_id = auth.uid());

create policy "responsavel_cria_feedback"
  on feedback for insert
  with check (
    responsavel_id = auth.uid()
    or pertence_ao_responsavel(perfil_crianca_id)
  );

create policy "responsavel_le_proprio_feedback"
  on feedback for select
  using (
    responsavel_id = auth.uid()
    or pertence_ao_responsavel(perfil_crianca_id)
  );

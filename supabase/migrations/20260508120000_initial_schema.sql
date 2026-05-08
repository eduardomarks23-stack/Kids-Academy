-- =============================================================
-- Migration 00001 — Schema inicial: usuários, perfis, LGPD
-- =============================================================
-- Cria tabelas de identidade: responsáveis (pais), perfis de
-- criança e registro de consentimento parental LGPD.
--
-- LGPD para menores (Lei 13.709/2018, Art. 14):
--   - Tratamento de dados de crianças requer consentimento
--     específico e em destaque dado por pelo menos um dos pais
--     ou responsável legal.
--   - O responsável pode revogar consentimento e exigir
--     deleção dos dados a qualquer momento (Art. 18).
-- =============================================================

-- Cleanup de estado parcial (caso tenha havido falha em run anterior)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;
drop function if exists public.update_updated_at;
drop function if exists public.deletar_dados_crianca;
drop table if exists public.consentimentos_lgpd cascade;
drop table if exists public.perfis_crianca cascade;
drop table if exists public.responsaveis cascade;
drop type if exists public.status_consentimento;
drop type if exists public.tipo_consentimento;
drop type if exists public.serie_escolar;

create extension if not exists "pgcrypto";

-- -------------------------------------------------------------
-- ENUMS
-- -------------------------------------------------------------

create type serie_escolar as enum (
  'EI_1', 'EI_2', 'EI_3',                    -- Educação Infantil
  'EF_1', 'EF_2', 'EF_3', 'EF_4', 'EF_5'     -- Ensino Fundamental I (1º-5º ano)
);

create type tipo_consentimento as enum (
  'cadastro_inicial',
  'tratamento_dados',
  'comunicacao_email',
  'analytics_comportamental'
);

create type status_consentimento as enum (
  'concedido',
  'revogado',
  'pendente'
);

-- -------------------------------------------------------------
-- TABELA: responsaveis
-- Estende auth.users com perfil de pai/mãe/responsável legal.
-- -------------------------------------------------------------

create table responsaveis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null unique,
  telefone text,
  cpf_hash text,                              -- CPF nunca armazenado em claro
  aceitou_termos_em timestamptz,
  email_verificado_em timestamptz,
  mfa_habilitado boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_responsaveis_email on responsaveis(email);

-- -------------------------------------------------------------
-- TABELA: perfis_crianca
-- Cada criança pertence a um responsável.
-- -------------------------------------------------------------

create table perfis_crianca (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references responsaveis(id) on delete cascade,
  nome text not null,
  data_nascimento date,
  serie serie_escolar not null,
  avatar_id text,                             -- referência a sprite (não URL externa)
  ativo boolean default true,
  pin_acesso text,                            -- hash bcrypt opcional (controle parental)
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  constraint perfis_crianca_idade_valida check (
    data_nascimento is null
    or (data_nascimento <= current_date and data_nascimento >= current_date - interval '14 years')
  )
);

create index idx_perfis_crianca_responsavel on perfis_crianca(responsavel_id);
create index idx_perfis_crianca_ativo on perfis_crianca(ativo) where ativo = true;

-- -------------------------------------------------------------
-- TABELA: consentimentos_lgpd
-- Registro auditável de consentimentos parentais.
-- -------------------------------------------------------------

create table consentimentos_lgpd (
  id uuid primary key default gen_random_uuid(),
  responsavel_id uuid not null references responsaveis(id) on delete cascade,
  perfil_crianca_id uuid references perfis_crianca(id) on delete cascade,
  tipo tipo_consentimento not null,
  status status_consentimento not null,
  texto_versao text not null,                 -- versão do termo aceito (auditoria)
  ip_origem inet,
  user_agent text,
  concedido_em timestamptz,
  revogado_em timestamptz,
  created_at timestamptz default now() not null
);

create index idx_consentimentos_responsavel on consentimentos_lgpd(responsavel_id);
create index idx_consentimentos_crianca on consentimentos_lgpd(perfil_crianca_id);
create index idx_consentimentos_tipo_status on consentimentos_lgpd(tipo, status);

-- -------------------------------------------------------------
-- FUNÇÃO: handle_new_user
-- Trigger ao criar auth.users → cria registro em responsaveis.
-- -------------------------------------------------------------

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.responsaveis (id, email, nome)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- -------------------------------------------------------------
-- FUNÇÃO: update_updated_at
-- Atualiza coluna updated_at automaticamente.
-- -------------------------------------------------------------

create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_responsaveis_updated_at
  before update on responsaveis
  for each row execute function update_updated_at();

create trigger update_perfis_crianca_updated_at
  before update on perfis_crianca
  for each row execute function update_updated_at();

-- -------------------------------------------------------------
-- FUNÇÃO: deletar_dados_crianca
-- Permite ao responsável deletar todos os dados de uma criança
-- (LGPD Art. 18 - direito ao esquecimento).
-- -------------------------------------------------------------

create or replace function deletar_dados_crianca(crianca_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Verifica que o responsável autenticado é o pai da criança
  if not exists (
    select 1 from perfis_crianca
    where id = crianca_id and responsavel_id = auth.uid()
  ) then
    raise exception 'Acesso negado: você não é responsável por esta criança';
  end if;

  -- CASCADE delete remove progresso, sessões, eventos, consentimentos, etc.
  delete from perfis_crianca where id = crianca_id;
end;
$$;

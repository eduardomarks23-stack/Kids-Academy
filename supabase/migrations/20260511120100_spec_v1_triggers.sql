-- =============================================================
-- Migration 20260511120100 — Spec v1 triggers
-- =============================================================
-- Trigger set_updated_at em todas as tabelas com updated_at.
-- Trigger audit_child_data em tabelas com dados de criança.
-- =============================================================

-- -------------------------------------------------------------
-- set_updated_at: atualiza coluna updated_at em UPDATE
-- -------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_families_updated_at on families;
create trigger trg_families_updated_at
  before update on families
  for each row execute function set_updated_at();

drop trigger if exists trg_children_updated_at on children;
create trigger trg_children_updated_at
  before update on children
  for each row execute function set_updated_at();

-- -------------------------------------------------------------
-- audit_child_data: insere em audit_log para tabelas com dados
-- de criança. Usa security definer para garantir gravação.
-- -------------------------------------------------------------

create or replace function public.audit_child_data()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_child_id uuid;
begin
  -- Extrai child_id do registro (NEW ou OLD)
  v_child_id := coalesce(
    (case when tg_op = 'DELETE' then null else (to_jsonb(new) ->> 'child_id')::uuid end),
    (case when tg_op = 'INSERT' then null else (to_jsonb(old) ->> 'child_id')::uuid end)
  );

  -- Para a tabela children, o próprio id é o child_id
  if tg_table_name = 'children' then
    v_child_id := coalesce(
      (case when tg_op = 'DELETE' then null else (to_jsonb(new) ->> 'id')::uuid end),
      (case when tg_op = 'INSERT' then null else (to_jsonb(old) ->> 'id')::uuid end)
    );
  end if;

  insert into audit_log(actor_id, child_id, action, entity_table, entity_id, diff)
  values (
    auth.uid(),
    v_child_id,
    lower(tg_op),
    tg_table_name,
    coalesce(
      (case when tg_op = 'DELETE' then null else (to_jsonb(new) ->> 'id')::uuid end),
      (case when tg_op = 'INSERT' then null else (to_jsonb(old) ->> 'id')::uuid end)
    ),
    jsonb_build_object(
      'before', case when tg_op = 'INSERT' then null else to_jsonb(old) end,
      'after',  case when tg_op = 'DELETE' then null else to_jsonb(new) end
    )
  );
  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_children_audit on children;
create trigger trg_children_audit
  after insert or update or delete on children
  for each row execute function audit_child_data();

drop trigger if exists trg_session_progress_audit on session_progress;
create trigger trg_session_progress_audit
  after insert or update or delete on session_progress
  for each row execute function audit_child_data();

drop trigger if exists trg_atom_attempts_audit on atom_attempts;
create trigger trg_atom_attempts_audit
  after insert or update or delete on atom_attempts
  for each row execute function audit_child_data();

drop trigger if exists trg_consents_audit on consents;
create trigger trg_consents_audit
  after insert or update or delete on consents
  for each row execute function audit_child_data();

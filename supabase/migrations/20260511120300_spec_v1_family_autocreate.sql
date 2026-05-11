-- =============================================================
-- Migration 20260511120300 — Auto-create family on signup
-- =============================================================
-- Trigger handle_new_user existente cria registro em responsaveis
-- (schema legado). Adiciona criação automática de family (schema
-- spec v1) para o mesmo user.
--
-- Família criada com display_name = parte local do email,
-- country_code = 'BR', locale = 'pt-BR' (defaults da spec).
-- =============================================================

create or replace function public.ensure_family_on_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.families (owner_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'family_name',
             split_part(new.email, '@', 1))
  )
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_family on auth.users;
create trigger on_auth_user_created_family
  after insert on auth.users
  for each row execute function ensure_family_on_signup();

-- -------------------------------------------------------------
-- Função: get_family_id_for_user — útil em queries no app
-- -------------------------------------------------------------

create or replace function public.get_family_id_for_user(p_user_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from families where owner_id = p_user_id limit 1;
$$;

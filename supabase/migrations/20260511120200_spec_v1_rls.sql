-- =============================================================
-- Migration 20260511120200 — Spec v1 RLS policies
-- =============================================================
-- SPEC seção 7. Princípio: parent só acessa dados da própria
-- família. Catálogo é leitura pública autenticada. Progresso é
-- gravado server-side via service role.
-- =============================================================

-- -------------------------------------------------------------
-- families
-- -------------------------------------------------------------

alter table families enable row level security;

drop policy if exists "families_owner_select" on families;
create policy "families_owner_select" on families
  for select using (owner_id = auth.uid());

drop policy if exists "families_owner_insert" on families;
create policy "families_owner_insert" on families
  for insert with check (owner_id = auth.uid());

drop policy if exists "families_owner_update" on families;
create policy "families_owner_update" on families
  for update using (owner_id = auth.uid());

-- -------------------------------------------------------------
-- children
-- -------------------------------------------------------------

alter table children enable row level security;

drop policy if exists "children_parent_select" on children;
create policy "children_parent_select" on children
  for select using (
    family_id in (select id from families where owner_id = auth.uid())
    and deleted_at is null
  );

drop policy if exists "children_parent_insert" on children;
create policy "children_parent_insert" on children
  for insert with check (
    family_id in (select id from families where owner_id = auth.uid())
  );

drop policy if exists "children_parent_update" on children;
create policy "children_parent_update" on children
  for update using (
    family_id in (select id from families where owner_id = auth.uid())
  );

-- -------------------------------------------------------------
-- consents
-- -------------------------------------------------------------

alter table consents enable row level security;

drop policy if exists "consents_parent_select" on consents;
create policy "consents_parent_select" on consents
  for select using (
    child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

drop policy if exists "consents_parent_insert" on consents;
create policy "consents_parent_insert" on consents
  for insert with check (
    granted_by = auth.uid()
    and child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

drop policy if exists "consents_parent_update" on consents;
create policy "consents_parent_update" on consents
  for update using (
    granted_by = auth.uid()
    and child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

-- -------------------------------------------------------------
-- session_progress + atom_attempts (leitura por parent)
-- Writes só via service role em route handlers.
-- -------------------------------------------------------------

alter table session_progress enable row level security;

drop policy if exists "session_progress_parent_select" on session_progress;
create policy "session_progress_parent_select" on session_progress
  for select using (
    child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

alter table atom_attempts enable row level security;

drop policy if exists "atom_attempts_parent_select" on atom_attempts;
create policy "atom_attempts_parent_select" on atom_attempts
  for select using (
    child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

alter table repetition_queue enable row level security;

drop policy if exists "repetition_queue_parent_select" on repetition_queue;
create policy "repetition_queue_parent_select" on repetition_queue
  for select using (
    child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

-- -------------------------------------------------------------
-- entitlements (leitura por owner da família)
-- Inserts via service role no webhook RevenueCat.
-- -------------------------------------------------------------

alter table entitlements enable row level security;

drop policy if exists "entitlements_owner_select" on entitlements;
create policy "entitlements_owner_select" on entitlements
  for select using (
    family_id in (select id from families where owner_id = auth.uid())
  );

-- -------------------------------------------------------------
-- CATÁLOGO: leitura pública autenticada
-- (worlds, axes, chapters, sessions, atoms, concepts, atom_concepts)
-- Writes apenas via service role (admin).
-- -------------------------------------------------------------

alter table worlds enable row level security;
drop policy if exists "worlds_read_authenticated" on worlds;
create policy "worlds_read_authenticated" on worlds
  for select using (auth.role() = 'authenticated' and active = true);

alter table axes enable row level security;
drop policy if exists "axes_read_authenticated" on axes;
create policy "axes_read_authenticated" on axes
  for select using (auth.role() = 'authenticated' and active = true);

alter table chapters enable row level security;
drop policy if exists "chapters_read_authenticated" on chapters;
create policy "chapters_read_authenticated" on chapters
  for select using (auth.role() = 'authenticated' and active = true);

alter table sessions enable row level security;
drop policy if exists "sessions_read_authenticated" on sessions;
create policy "sessions_read_authenticated" on sessions
  for select using (auth.role() = 'authenticated' and active = true);

alter table atoms enable row level security;
drop policy if exists "atoms_read_authenticated" on atoms;
create policy "atoms_read_authenticated" on atoms
  for select using (auth.role() = 'authenticated' and active = true);

alter table concepts enable row level security;
drop policy if exists "concepts_read_authenticated" on concepts;
create policy "concepts_read_authenticated" on concepts
  for select using (auth.role() = 'authenticated');

alter table atom_concepts enable row level security;
drop policy if exists "atom_concepts_read_authenticated" on atom_concepts;
create policy "atom_concepts_read_authenticated" on atom_concepts
  for select using (auth.role() = 'authenticated');

-- -------------------------------------------------------------
-- audit_log: parent vê apenas registros das próprias crianças.
-- Inserts SÓ via triggers (security definer).
-- -------------------------------------------------------------

alter table audit_log enable row level security;

drop policy if exists "audit_log_parent_select" on audit_log;
create policy "audit_log_parent_select" on audit_log
  for select using (
    child_id is not null
    and child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

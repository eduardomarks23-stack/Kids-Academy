-- =============================================================
-- Seed extras — Spec v1 (sessões de Números + discriminação)
-- =============================================================
-- Estende o seed base com:
--   - Sessões "Número 1", "Número 2", "Número 3" no eixo Números
--   - Átomo de discrimination na sessão Letra A
--   - Conceitos para números 1-3 e ligações
-- =============================================================

-- -------------------------------------------------------------
-- Conceitos para números 1, 2, 3
-- -------------------------------------------------------------

with a as (
  select x.id from axes x
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros'
)
insert into concepts (axis_id, slug, display_name, bncc_code)
select a.id, 'numero-1', 'Número 1', 'EI03ET07' from a
on conflict (axis_id, slug) do update set display_name = excluded.display_name;

with a as (
  select x.id from axes x
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros'
)
insert into concepts (axis_id, slug, display_name, bncc_code)
select a.id, 'numero-2', 'Número 2', 'EI03ET07' from a
on conflict (axis_id, slug) do update set display_name = excluded.display_name;

with a as (
  select x.id from axes x
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros'
)
insert into concepts (axis_id, slug, display_name, bncc_code)
select a.id, 'numero-3', 'Número 3', 'EI03ET07' from a
on conflict (axis_id, slug) do update set display_name = excluded.display_name;

-- -------------------------------------------------------------
-- Sessões de Números (Capítulo "Os Três Amiguinhos")
-- -------------------------------------------------------------

with c as (
  select ch.id from chapters ch
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros' and ch.display_order = 0
)
insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds)
select c.id, 'Número 1', 'Reconhecer o número 1.', 0, 360 from c
on conflict (chapter_id, display_order) do update set display_name = excluded.display_name;

with c as (
  select ch.id from chapters ch
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros' and ch.display_order = 0
)
insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds)
select c.id, 'Número 2', 'Reconhecer o número 2.', 1, 360 from c
on conflict (chapter_id, display_order) do update set display_name = excluded.display_name;

with c as (
  select ch.id from chapters ch
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros' and ch.display_order = 0
)
insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds)
select c.id, 'Número 3', 'Reconhecer o número 3.', 2, 360 from c
on conflict (chapter_id, display_order) do update set display_name = excluded.display_name;

-- -------------------------------------------------------------
-- Átomo recognition Número 3
-- -------------------------------------------------------------

with s as (
  select se.id from sessions se
  join chapters ch on ch.id = se.chapter_id
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros'
    and ch.display_order = 0 and se.display_order = 2
)
insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria)
select s.id, 'recognition', 'phaser',
  jsonb_build_object(
    'engine', 'phaser',
    'scene', 'number-recognition',
    'assets', jsonb_build_array(),
    'params', jsonb_build_object(
      'targetNumber', 3,
      'distractors', jsonb_build_array(1, 2, 5),
      'rounds', 3,
      'conceptSlug', 'numero-3'
    )
  ),
  0, 120,
  jsonb_build_object('minAccuracy', 0.7, 'maxAttempts', 3)
from s
on conflict (session_id, display_order) do update set config = excluded.config;

-- -------------------------------------------------------------
-- Átomo discrimination na sessão Letra A
-- -------------------------------------------------------------

with s as (
  select se.id from sessions se
  join chapters ch on ch.id = se.chapter_id
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras'
    and ch.display_order = 0 and se.display_order = 0
)
insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria)
select s.id, 'discrimination', 'phaser',
  jsonb_build_object(
    'engine', 'phaser',
    'scene', 'letter-discrimination',
    'assets', jsonb_build_array(),
    'params', jsonb_build_object(
      'targetLetter', 'A',
      'options', jsonb_build_array('A', 'A', 'A', 'O'),
      'rounds', 3
    )
  ),
  2, 100,
  jsonb_build_object('minAccuracy', 0.7, 'maxAttempts', 3)
from s
on conflict (session_id, display_order) do update set config = excluded.config;

-- -------------------------------------------------------------
-- Ligar átomo recognition do número 3 ao conceito numero-3
-- -------------------------------------------------------------

with atom_row as (
  select at.id from atoms at
  join sessions se on se.id = at.session_id
  join chapters ch on ch.id = se.chapter_id
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros'
    and ch.display_order = 0 and se.display_order = 2 and at.display_order = 0
),
concept_row as (
  select c.id from concepts c
  join axes x on x.id = c.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros' and c.slug = 'numero-3'
)
insert into atom_concepts (atom_id, concept_id, weight)
select atom_row.id, concept_row.id, 1 from atom_row, concept_row
on conflict (atom_id, concept_id) do nothing;

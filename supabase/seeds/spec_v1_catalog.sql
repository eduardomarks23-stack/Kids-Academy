-- =============================================================
-- Seed do catálogo — Spec v1 (Mundo dos Exploradores)
-- =============================================================
-- Carrega 1 Mundo + 2 Eixos + 1 Capítulo de exemplo em cada
-- eixo + 2 sessões + átomos. Reapliquável (ON CONFLICT).
--
-- Uso: psql ou supabase db reset --no-clean depois `supabase
-- migration up`, então `psql -f spec_v1_catalog.sql`.
-- =============================================================

-- -------------------------------------------------------------
-- Mundo: Exploradores (5-6 anos)
-- -------------------------------------------------------------

insert into worlds (slug, display_name, age_min, age_max, description, theme_color, hit_area_min_px, session_duration_min_seconds, session_duration_max_seconds)
values (
  'exploradores',
  'Mundo dos Exploradores',
  5, 6,
  'Aventuras curtas com letras e números para crianças de 5 a 6 anos.',
  '#E26B45',
  64, 300, 720
)
on conflict (slug) do update set
  display_name = excluded.display_name,
  description = excluded.description,
  theme_color = excluded.theme_color;

-- -------------------------------------------------------------
-- Eixos: Letras e Números
-- -------------------------------------------------------------

with w as (select id from worlds where slug = 'exploradores')
insert into axes (world_id, slug, display_name, subtitle, icon_name, display_order)
select w.id, 'letras', 'Letras', 'Alfabetização inicial', 'abc', 0 from w
on conflict (world_id, slug) do update set display_name = excluded.display_name;

with w as (select id from worlds where slug = 'exploradores')
insert into axes (world_id, slug, display_name, subtitle, icon_name, display_order)
select w.id, 'numeros', 'Números', 'Matemática inicial', 'numbers', 1 from w
on conflict (world_id, slug) do update set display_name = excluded.display_name;

-- -------------------------------------------------------------
-- Capítulo 1 do eixo Letras: "A Letra Perdida"
-- -------------------------------------------------------------

with a as (
  select x.id from axes x
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras'
)
insert into chapters (axis_id, display_name, description, display_order, estimated_weeks)
select a.id, 'A Letra Perdida', 'A primeira aventura: encontrar a letra A.', 0, 3 from a
on conflict (axis_id, display_order) do update set display_name = excluded.display_name;

-- -------------------------------------------------------------
-- Capítulo 1 do eixo Números: "Os Três Amiguinhos"
-- -------------------------------------------------------------

with a as (
  select x.id from axes x
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'numeros'
)
insert into chapters (axis_id, display_name, description, display_order, estimated_weeks)
select a.id, 'Os Três Amiguinhos', 'Contar de 1 até 3 com bichos da floresta.', 0, 3 from a
on conflict (axis_id, display_order) do update set display_name = excluded.display_name;

-- -------------------------------------------------------------
-- Sessões: Letra A (cap. 1 de Letras)
-- -------------------------------------------------------------

with c as (
  select ch.id from chapters ch
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras' and ch.display_order = 0
)
insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds)
select c.id, 'Letra A', 'Reconhecer a letra A entre outras letras.', 0, 480 from c
on conflict (chapter_id, display_order) do update set display_name = excluded.display_name;

with c as (
  select ch.id from chapters ch
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras' and ch.display_order = 0
)
insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds)
select c.id, 'Som do A', 'Associar a letra A ao som /a/.', 1, 480 from c
on conflict (chapter_id, display_order) do update set display_name = excluded.display_name;

-- -------------------------------------------------------------
-- Átomos da sessão "Letra A"
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
select s.id, 'presentation', 'audio',
  jsonb_build_object(
    'engine', 'audio',
    'url', 'https://placeholder.r2.cloudflare.com/voices/maria/letra-a/apresentacao.mp3',
    'transcript', 'Olá! Eu sou a letra A. Quer me conhecer?'
  ),
  0, 30,
  jsonb_build_object('minDurationSeconds', 20)
from s
on conflict (session_id, display_order) do update set config = excluded.config;

with s as (
  select se.id from sessions se
  join chapters ch on ch.id = se.chapter_id
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras'
    and ch.display_order = 0 and se.display_order = 0
)
insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria)
select s.id, 'recognition', 'phaser',
  jsonb_build_object(
    'engine', 'phaser',
    'scene', 'letter-recognition',
    'assets', jsonb_build_array(),
    'params', jsonb_build_object(
      'targetLetter', 'A',
      'distractors', jsonb_build_array('B', 'O', 'I', 'E'),
      'rounds', 3
    )
  ),
  1, 120,
  jsonb_build_object('minAccuracy', 0.7, 'maxAttempts', 3)
from s
on conflict (session_id, display_order) do update set config = excluded.config;

-- -------------------------------------------------------------
-- Conceitos
-- -------------------------------------------------------------

with a as (
  select x.id from axes x
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras'
)
insert into concepts (axis_id, slug, display_name, bncc_code)
select a.id, 'letra-a', 'Letra A', 'EF01LP01' from a
on conflict (axis_id, slug) do update set display_name = excluded.display_name;

-- Liga átomo recognition ao conceito letra-a
with atom_row as (
  select at.id from atoms at
  join sessions se on se.id = at.session_id
  join chapters ch on ch.id = se.chapter_id
  join axes x on x.id = ch.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras'
    and ch.display_order = 0 and se.display_order = 0 and at.display_order = 1
),
concept_row as (
  select c.id from concepts c
  join axes x on x.id = c.axis_id
  join worlds w on w.id = x.world_id
  where w.slug = 'exploradores' and x.slug = 'letras' and c.slug = 'letra-a'
)
insert into atom_concepts (atom_id, concept_id, weight)
select atom_row.id, concept_row.id, 1 from atom_row, concept_row
on conflict (atom_id, concept_id) do nothing;

-- =============================================================
-- Mundo dos Curiosos — Seed completo (gerado automaticamente)
-- =============================================================
-- Gerado por: scripts/generate-curiosos-seed.ts
-- Conteúdo:
--   1 Mundo + 4 Eixos + 4 Capítulos default + 38 Sessões
--   152 Átomos + ~50 Conceitos + atom_concepts
-- Idempotente: re-executar não duplica.
-- =============================================================

set local search_path to public;

-- -----------------------------------------------------------
-- 1. Mundo
-- -----------------------------------------------------------
insert into worlds (slug, display_name, age_min, age_max, description, theme_color, hit_area_min_px, session_duration_min_seconds, session_duration_max_seconds, active)
values (
  'curiosos',
  'Mundo dos Curiosos',
  3,
  4,
  'O primeiro mundo. Sons, números, cores e afetos com Garuzinho e Lolinha.',
  '#E26B45',
  80,
  180,
  300,
  true
)
on conflict (slug) do update set
  display_name = excluded.display_name,
  age_min = excluded.age_min,
  age_max = excluded.age_max,
  description = excluded.description,
  theme_color = excluded.theme_color,
  hit_area_min_px = excluded.hit_area_min_px,
  session_duration_min_seconds = excluded.session_duration_min_seconds,
  session_duration_max_seconds = excluded.session_duration_max_seconds,
  active = true;

-- Variável local com id do mundo
do $$
declare
  v_world_id uuid;
  v_axis_id uuid;
  v_chapter_id uuid;
  v_session_id uuid;
  v_atom_id uuid;
  v_concept_id uuid;
begin
  select id into v_world_id from worlds where slug = 'curiosos';


  -- ===== Eixo: Sons e Letras =====
  insert into axes (world_id, slug, display_name, subtitle, icon_name, display_order, active)
  values (v_world_id, 'sons-letras', 'Sons e Letras', 'Escutar, brincar de rimar, conhecer vogais', 'music', 1, true)
  on conflict (world_id, slug) do update set
    display_name = excluded.display_name,
    subtitle = excluded.subtitle,
    icon_name = excluded.icon_name,
    display_order = excluded.display_order,
    active = true
  returning id into v_axis_id;


  insert into chapters (axis_id, display_name, description, display_order, estimated_weeks, active)
  values (v_axis_id, 'Aventuras de Sons e Letras', 'Capítulo técnico — Curiosos usa 4 tiers (sem capítulo conceitual)', 1, null, true)
  on conflict (axis_id, display_order) do update set
    display_name = excluded.display_name,
    description = excluded.description,
    active = true
  returning id into v_chapter_id;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'som-corpo', 'Sons do corpo', 'EI02EF02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'palma', 'Palma', 'EI02CG05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'estalo', 'Estalo de língua', 'EI02CG05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'sopro', 'Sopro', 'EI02CG05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'som-objeto', 'Sons de objetos', 'EI02ET01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'escuta-ativa', 'Escuta ativa', 'EI02EF02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'som-animal', 'Sons de animais', 'EI02ET03')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'discriminacao-auditiva', 'Discriminação auditiva', 'EI02EF02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'rima', 'Rima', 'EI02EF09')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'consciencia-fonologica', 'Consciência fonológica', 'EI03EF09')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'letra-a', 'Letra A', 'EI03EF01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'letra-e', 'Letra E', 'EI03EF01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'letra-i', 'Letra I', 'EI03EF01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'letra-o', 'Letra O', 'EI03EF01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'letra-u', 'Letra U', 'EI03EF01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'som-inicial', 'Som inicial de palavras', 'EI03EF09')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'forma-letra', 'Forma visual de letra', 'EI03EF01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Sons do meu corpo', 'Perceber que o corpo produz sons (palma, estalo, sopro)', 1, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Oi! Eu sou a Lolinha!"},{"type":"pause","durationMs":500},{"type":"speech","speaker":"garuzinho","text":"E eu sou o Garuzinho."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"Hoje a gente vai brincar com... SONS!"},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Mas não é qualquer som. É o som que sai do seu corpo."},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"palma"},{"type":"speech","speaker":"lolinha","text":"Olha! UMA PALMA!"},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"estalo"},{"type":"speech","speaker":"garuzinho","text":"Esse é o ESTALO da língua. Tlóc!"},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"sopro"},{"type":"speech","speaker":"lolinha","text":"E esse é o SOPRO! Fffff!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"Vem brincar com a gente?"}],"displayName":"Sons do meu corpo","scene":"listen-screen","assets":[],"params":{"title":"Sons do meu corpo","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-corpo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'palma';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'estalo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sopro';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Agora é a sua vez!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"Toca aqui pra fazer PALMA!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Faz como a gente","prompts":[{"label":"Palma","icon":"✋","sfxKey":"palma"},{"label":"Estalo","icon":"👅","sfxKey":"estalo"},{"label":"Sopro","icon":"💨","sfxKey":"sopro"}],"mode":"sequential"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-corpo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'palma';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'estalo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sopro';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Olha que demais!"},{"type":"pause","durationMs":500},{"type":"speech","speaker":"lolinha","text":"Cada vez que você toca, vira um som!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"garuzinho","text":"Toca em qualquer lugar da tela."}],"scene":"free-tap","assets":[],"params":{"title":"Toque mágico","randomSfx":["palma","estalo","sopro"],"particleColors":["#E26B45","#FCD34D","#A78BFA"],"minTaps":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-corpo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'palma';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'estalo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sopro';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ FEZ SONS COM SEU CORPO!"},{"type":"pause","durationMs":500},{"type":"speech","speaker":"garuzinho","text":"Você foi incrível."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"O Tatuzinho Tatactaque quer morar na sua casinha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"tatuzinho-tatactaque","collectibleDisplayName":"Tatuzinho Tatactaque"},"collectibleSlug":"tatuzinho-tatactaque"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-corpo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Sons da casa', 'Reconhecer sons domésticos comuns', 2, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Essa é a nossa casinha!"},{"type":"speech","speaker":"lolinha","text":"Tem MUITOS sons aqui!"},{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Escuta esse..."},{"type":"sfx","sfxKey":"campainha"},{"type":"speech","speaker":"lolinha","text":"A CAMPAINHA! Din-don!"},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"telefone"},{"type":"speech","speaker":"garuzinho","text":"O TELEFONE. Trim trim."},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"agua"},{"type":"speech","speaker":"lolinha","text":"A ÁGUA da torneira!"},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"porta"},{"type":"speech","speaker":"garuzinho","text":"E a PORTA."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Vem achar esses sons com a gente!"}],"displayName":"Sons da casa","scene":"listen-screen","assets":[],"params":{"title":"Sons da casa","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-objeto';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'escuta-ativa';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Eu vou tocar um som. Você toca no que faz esse som."}],"scene":"binary-choice","assets":[],"params":{"title":"Que som é esse?","rounds":[{"promptSfx":"campainha","options":["campainha","porta"],"answer":"campainha"},{"promptSfx":"agua","options":["agua","telefone"],"answer":"agua"},{"promptSfx":"telefone","options":["telefone","agua"],"answer":"telefone"},{"promptSfx":"porta","options":["porta","campainha"],"answer":"porta"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-objeto';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'escuta-ativa';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Agora você comanda a casinha! Toca em qualquer canto."}],"scene":"free-tap","assets":[],"params":{"title":"A casa toda tocando","randomSfx":["campainha","telefone","agua","porta"],"particleColors":["#FCD34D","#A78BFA","#60A5FA"],"minTaps":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-objeto';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'escuta-ativa';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU TODOS OS SONS!"},{"type":"speech","speaker":"garuzinho","text":"A Campainha Din-Don quer ir pra sua casinha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"campainha-din-don","collectibleDisplayName":"Campainha Din-Don"},"collectibleSlug":"campainha-din-don"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-objeto';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Sons dos animais', 'Identificar sons de animais domésticos', 3, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha quem chegou!"},{"type":"sfx","sfxKey":"cachorro"},{"type":"speech","speaker":"lolinha","text":"O CACHORRO! Au au!"},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"gato"},{"type":"speech","speaker":"garuzinho","text":"O GATO. Miau."},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"vaca"},{"type":"speech","speaker":"lolinha","text":"A VACA! Mu!"},{"type":"pause","durationMs":1000},{"type":"sfx","sfxKey":"galinha"},{"type":"speech","speaker":"garuzinho","text":"E a GALINHA. Có có ri có!"}],"displayName":"Sons dos animais","scene":"listen-screen","assets":[],"params":{"title":"Sons dos animais","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-animal';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'discriminacao-auditiva';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Eu faço o som. Você acha o bichinho."}],"scene":"binary-choice","assets":[],"params":{"title":"Qual bicho faz esse som?","rounds":[{"promptSfx":"cachorro","options":["cachorro","gato"],"answer":"cachorro"},{"promptSfx":"gato","options":["cachorro","gato"],"answer":"gato"},{"promptSfx":"vaca","options":["vaca","galinha"],"answer":"vaca"},{"promptSfx":"galinha","options":["vaca","galinha"],"answer":"galinha"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-animal';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'discriminacao-auditiva';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca pra fazer cada bicho cantar!"}],"scene":"free-tap","assets":[],"params":{"title":"A fazenda toda","randomSfx":["cachorro","gato","vaca","galinha"],"particleColors":["#FCD34D","#E26B45","#34D399"],"minTaps":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-animal';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'discriminacao-auditiva';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONHECE OS BICHOS!"},{"type":"speech","speaker":"garuzinho","text":"A Galinha Có-Có-Ri quer ir com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"galinha-co-co-ri","collectibleDisplayName":"Galinha Có-Có-Ri"},"collectibleSlug":"galinha-co-co-ri"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-animal';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Vai rimar! Nomes', 'Perceber rima usando nomes de pessoas', 4, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Hoje a gente vai rimar!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"Rimar é quando palavra termina IGUAL."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"Ouve: GARU-ZINHO... TATU-ZINHO!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"LO-LINHA... PAU-LINHA!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"As pontinhas TERMINAM IGUAL! Isso é RIMA!"}],"displayName":"Vai rimar! Nomes","scene":"listen-screen","assets":[],"params":{"title":"Vai rimar! Nomes","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'consciencia-fonologica';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Eu falo duas palavras. Você diz se elas rimam."}],"scene":"binary-choice","assets":[],"params":{"title":"Combina ou não combina?","rounds":[{"prompt":"GARUZINHO ... TATUZINHO?","options":["Rima!","Não rima"],"answer":"Rima!"},{"prompt":"LOLINHA ... CASA?","options":["Rima!","Não rima"],"answer":"Não rima"},{"prompt":"PAULINHA ... LOLINHA?","options":["Rima!","Não rima"],"answer":"Rima!"},{"prompt":"MARIA ... BOLA?","options":["Rima!","Não rima"],"answer":"Não rima"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'consciencia-fonologica';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Arrasta cada nome para o seu PAR que RIMA!"}],"scene":"drag-to-snap","assets":[],"params":{"title":"Acha o par que rima","pairs":[{"left":"Lolinha","right":"Paulinha"},{"left":"Garuzinho","right":"Tatuzinho"},{"left":"Maria","right":"Sofia"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'consciencia-fonologica';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ JÁ RIMA!"},{"type":"speech","speaker":"garuzinho","text":"O Passarinho Ri-Ri canta pra você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"passarinho-ri-ri","collectibleDisplayName":"Passarinho Ri-Ri"},"collectibleSlug":"passarinho-ri-ri"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Vai rimar! Bichos', 'Brincar de rimar com nomes de animais', 5, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Hoje os bichos vão rimar!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"PATO... RATO!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"GATO... PATO!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"CAVALO... GALO!"}],"displayName":"Vai rimar! Bichos","scene":"listen-screen","assets":[],"params":{"title":"Vai rimar! Bichos","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'consciencia-fonologica';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-animal';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Liga o bicho com o que rima com ele."}],"scene":"drag-to-snap","assets":[],"params":{"title":"Junta os bichos que rimam","pairs":[{"left":"Pato","right":"Rato"},{"left":"Gato","right":"Pato"},{"left":"Cavalo","right":"Galo"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'consciencia-fonologica';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-animal';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca pra fazer a festa! Cada toque chama um bicho que rima!"}],"scene":"free-tap","assets":[],"params":{"title":"Festa da rima","randomSfx":["gato","cachorro","vaca","galinha"],"particleColors":["#FCD34D","#E26B45"],"minTaps":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'consciencia-fonologica';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-animal';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ RIMA COMO POETA!"},{"type":"speech","speaker":"garuzinho","text":"O Patinho Rimador quer ir com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"patinho-rimador","collectibleDisplayName":"Patinho Rimador"},"collectibleSlug":"patinho-rimador"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'rima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Conheci o A', 'Reconhecer a letra A pela forma e pelo som inicial', 6, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Hoje a gente conhece... A LETRA A!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"AAAAA!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"AVIÃO começa com A!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"garuzinho","text":"ABELHA também."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"ANANÁS! AMOR! ABRAÇO!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"Tudo isso começa com... A."}],"displayName":"Conheci o A","scene":"listen-screen","assets":[],"params":{"title":"Conheci o A","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-a';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em todos os A que ver na tela."}],"scene":"tap-to-target","assets":[],"params":{"title":"Acha a letra A","prompts":[{"label":"A","icon":"A","isTarget":true},{"label":"E","icon":"E","isTarget":false},{"label":"A","icon":"A","isTarget":true},{"label":"I","icon":"I","isTarget":false}],"targetLabel":"A"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-a';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Arrasta as palavras que começam com A para a cesta certa!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cesta do A","items":[{"word":"AVIÃO","startsWith":"A"},{"word":"BOLA","startsWith":"B"},{"word":"ABELHA","startsWith":"A"},{"word":"GATO","startsWith":"G"},{"word":"AMOR","startsWith":"A"}],"buckets":[{"label":"Tem A no começo","accept":"A"},{"label":"Não tem","accept":"OTHER"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-a';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONHECE O A!"},{"type":"speech","speaker":"garuzinho","text":"A Abelhinha A quer morar com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"abelhinha-a","collectibleDisplayName":"Abelhinha A"},"collectibleSlug":"abelhinha-a"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-a';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Conheci o E', 'Reconhecer a letra E pela forma e pelo som inicial', 7, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Agora... A LETRA E!"},{"type":"speech","speaker":"lolinha","text":"EEEE!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"garuzinho","text":"ELEFANTE começa com E."},{"type":"speech","speaker":"lolinha","text":"ESCADA também!"},{"type":"speech","speaker":"garuzinho","text":"ESPELHO. ESTRELA."}],"displayName":"Conheci o E","scene":"listen-screen","assets":[],"params":{"title":"Conheci o E","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-e';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em todos os E."}],"scene":"tap-to-target","assets":[],"params":{"title":"Acha a letra E","prompts":[{"label":"E","icon":"E","isTarget":true},{"label":"A","icon":"A","isTarget":false},{"label":"E","icon":"E","isTarget":true},{"label":"O","icon":"O","isTarget":false}],"targetLabel":"E"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-e';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Cesta do E! Arrasta as que começam com E!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cesta do E","items":[{"word":"ELEFANTE","startsWith":"E"},{"word":"CASA","startsWith":"C"},{"word":"ESCADA","startsWith":"E"},{"word":"BOLA","startsWith":"B"},{"word":"ESTRELA","startsWith":"E"}],"buckets":[{"label":"Tem E no começo","accept":"E"},{"label":"Não tem","accept":"OTHER"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-e';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU O E!"},{"type":"speech","speaker":"garuzinho","text":"O Elefantinho E quer ir com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"elefantinho-e","collectibleDisplayName":"Elefantinho E"},"collectibleSlug":"elefantinho-e"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-e';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Conheci o I', 'Reconhecer a letra I pela forma e pelo som inicial', 8, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha! A LETRA I!"},{"type":"speech","speaker":"lolinha","text":"IIII!"},{"type":"speech","speaker":"garuzinho","text":"IOGURTE começa com I."},{"type":"speech","speaker":"lolinha","text":"ILHA! IGREJA!"}],"displayName":"Conheci o I","scene":"listen-screen","assets":[],"params":{"title":"Conheci o I","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-i';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em todos os I que aparecerem."}],"scene":"tap-to-target","assets":[],"params":{"title":"Acha o I","prompts":[{"label":"I","icon":"I","isTarget":true},{"label":"A","icon":"A","isTarget":false},{"label":"I","icon":"I","isTarget":true},{"label":"U","icon":"U","isTarget":false}],"targetLabel":"I"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-i';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Cesta do I! Vai!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cesta do I","items":[{"word":"IOGURTE","startsWith":"I"},{"word":"TAPETE","startsWith":"T"},{"word":"ILHA","startsWith":"I"},{"word":"BOLA","startsWith":"B"}],"buckets":[{"label":"Tem I no começo","accept":"I"},{"label":"Não tem","accept":"OTHER"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-i';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU O I!"},{"type":"speech","speaker":"garuzinho","text":"A Ilhota I é sua!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"ilhota-i","collectibleDisplayName":"Ilhota I"},"collectibleSlug":"ilhota-i"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-i';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Conheci o O', 'Reconhecer a letra O pela forma e pelo som inicial', 9, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"A LETRA O!"},{"type":"speech","speaker":"lolinha","text":"OOOO!"},{"type":"speech","speaker":"garuzinho","text":"OSSO começa com O."},{"type":"speech","speaker":"lolinha","text":"ÓCULOS! OVO!"}],"displayName":"Conheci o O","scene":"listen-screen","assets":[],"params":{"title":"Conheci o O","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-o';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em todos os O!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Acha o O","prompts":[{"label":"O","icon":"O","isTarget":true},{"label":"I","icon":"I","isTarget":false},{"label":"O","icon":"O","isTarget":true},{"label":"E","icon":"E","isTarget":false}],"targetLabel":"O"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-o';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Cesta do O! Pra cima!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cesta do O","items":[{"word":"OSSO","startsWith":"O"},{"word":"BALA","startsWith":"B"},{"word":"OVO","startsWith":"O"},{"word":"GATO","startsWith":"G"}],"buckets":[{"label":"Tem O no começo","accept":"O"},{"label":"Não tem","accept":"OTHER"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-o';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU O O!"},{"type":"speech","speaker":"garuzinho","text":"O Ovinho O foi com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"ovinho-o","collectibleDisplayName":"Ovinho O"},"collectibleSlug":"ovinho-o"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-o';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Conheci o U', 'Reconhecer a letra U pela forma e pelo som inicial', 10, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Última vogal: A LETRA U!"},{"type":"speech","speaker":"lolinha","text":"UUUU!"},{"type":"speech","speaker":"garuzinho","text":"UVA começa com U."},{"type":"speech","speaker":"lolinha","text":"URSO! UNHA!"}],"displayName":"Conheci o U","scene":"listen-screen","assets":[],"params":{"title":"Conheci o U","axisIndex":1}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-u';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em todos os U!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Acha o U","prompts":[{"label":"U","icon":"U","isTarget":true},{"label":"O","icon":"O","isTarget":false},{"label":"U","icon":"U","isTarget":true},{"label":"I","icon":"I","isTarget":false}],"targetLabel":"U"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-u';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Cesta do U! Vai vai vai!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cesta do U","items":[{"word":"UVA","startsWith":"U"},{"word":"CASA","startsWith":"C"},{"word":"URSO","startsWith":"U"},{"word":"PEIXE","startsWith":"P"}],"buckets":[{"label":"Tem U no começo","accept":"U"},{"label":"Não tem","accept":"OTHER"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-u';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'som-inicial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-letra';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ APRENDEU AS CINCO VOGAIS!"},{"type":"speech","speaker":"garuzinho","text":"A, E, I, O, U. Você é INCRÍVEL!"},{"type":"speech","speaker":"lolinha","text":"O Ursinho U quer comemorar com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"ursinho-u","collectibleDisplayName":"Ursinho U"},"collectibleSlug":"ursinho-u"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'letra-u';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  -- ===== Eixo: Contar e Comparar =====
  insert into axes (world_id, slug, display_name, subtitle, icon_name, display_order, active)
  values (v_world_id, 'contar-comparar', 'Contar e Comparar', 'Um, dois, três... muito, pouco, mais, menos', 'hash', 2, true)
  on conflict (world_id, slug) do update set
    display_name = excluded.display_name,
    subtitle = excluded.subtitle,
    icon_name = excluded.icon_name,
    display_order = excluded.display_order,
    active = true
  returning id into v_axis_id;


  insert into chapters (axis_id, display_name, description, display_order, estimated_weeks, active)
  values (v_axis_id, 'Aventuras de Contar e Comparar', 'Capítulo técnico — Curiosos usa 4 tiers (sem capítulo conceitual)', 1, null, true)
  on conflict (axis_id, display_order) do update set
    display_name = excluded.display_name,
    description = excluded.description,
    active = true
  returning id into v_chapter_id;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'contagem-oral-3', 'Contagem oral até 3', 'EI02ET07')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'contagem-oral-5', 'Contagem oral até 5', 'EI03ET07')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'contagem-oral-10', 'Contagem oral até 10', 'EI03ET07')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'correspondencia-1-1', 'Correspondência um-a-um', 'EI02ET07')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'subitizing', 'Subitizing (percepção rápida)', 'EI03ET08')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'comparacao-quantidade', 'Comparação de quantidade', 'EI03ET08')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'muito-pouco', 'Muito e pouco', 'EI02ET08')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'comparacao-tamanho', 'Comparação de tamanho', 'EI02ET04')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'grande-pequeno', 'Grande e pequeno', 'EI02ET04')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'estado-volume', 'Estado de volume (cheio/vazio)', 'EI03ET04')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'cheio-vazio', 'Cheio e vazio', 'EI03ET04')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'classificacao', 'Classificação por atributo', 'EI02ET05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'igual-diferente', 'Igual e diferente', 'EI02ET05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'sequencia', 'Sequência numérica', 'EI03ET07')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'mais', 'Conjunto com mais', 'EI03ET08')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'menos', 'Conjunto com menos', 'EI03ET08')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Um, dois, três', 'Contar oralmente até três com correspondência a objetos', 1, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha quem chegou pra brincar!"},{"type":"speech","speaker":"garuzinho","text":"UM patinho!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"Dois!"},{"type":"speech","speaker":"garuzinho","text":"DOIS patinhos!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"TRÊS!"},{"type":"speech","speaker":"garuzinho","text":"UM... DOIS... TRÊS!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Quer contar também?"}],"displayName":"Um, dois, três","scene":"listen-screen","assets":[],"params":{"title":"Um, dois, três","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-3';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia-1-1';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Agora você conta!"},{"type":"speech","speaker":"lolinha","text":"Toca em cada patinho!"}],"scene":"count-objects","assets":[],"params":{"title":"Conta os patinhos","totalCount":3,"itemKey":"patinho"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-3';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia-1-1';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Olha! Aparecem coisas novas! Toca pra contar!"}],"scene":"count-objects","assets":[],"params":{"title":"Conta o que aparece","totalCount":3,"itemKey":"mistos","rounds":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-3';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia-1-1';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONTOU ATÉ TRÊS!"},{"type":"speech","speaker":"garuzinho","text":"Um... dois... três. Você conseguiu."},{"type":"speech","speaker":"lolinha","text":"O TRIO PATINHO quer ir pra sua casinha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"trio-patinho","collectibleDisplayName":"Trio Patinho"},"collectibleSlug":"trio-patinho"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-3';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Vamos contar mais', 'Contar oralmente até cinco', 2, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha que descoberta!"},{"type":"speech","speaker":"lolinha","text":"Uma MÃO!"},{"type":"speech","speaker":"garuzinho","text":"Vamos contar os dedinhos? UM!"},{"type":"speech","speaker":"lolinha","text":"DOIS!"},{"type":"speech","speaker":"garuzinho","text":"TRÊS!"},{"type":"speech","speaker":"lolinha","text":"QUATRO!"},{"type":"speech","speaker":"garuzinho","text":"E... CINCO!"},{"type":"speech","speaker":"lolinha","text":"CINCO DEDINHOS!"}],"displayName":"Vamos contar mais","scene":"listen-screen","assets":[],"params":{"title":"Vamos contar mais","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-5';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em cada dedinho pra contar."}],"scene":"count-objects","assets":[],"params":{"title":"Abre os dedinhos","totalCount":5,"itemKey":"dedinho"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-5';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Quantos aparecem? Conta!"}],"scene":"count-objects","assets":[],"params":{"title":"Conta de 1 a 5","totalCount":5,"itemKey":"mistos","rounds":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-5';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONTOU ATÉ CINCO!"},{"type":"speech","speaker":"garuzinho","text":"Cinco dedinhos. Cinco amigos."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"maozinha-do-5","collectibleDisplayName":"Mãozinha do 5"},"collectibleSlug":"maozinha-do-5"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-5';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Muito e pouco', 'Comparar grandes vs pequenos conjuntos (subitizing)', 3, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha esses dois pratos."},{"type":"speech","speaker":"lolinha","text":"Esse aqui tem MUITAS cerejas!"},{"type":"speech","speaker":"garuzinho","text":"E esse tem POUCAS."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"MUITO! POUCO!"}],"displayName":"Muito e pouco","scene":"listen-screen","assets":[],"params":{"title":"Muito e pouco","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'muito-pouco';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Eu pergunto. Você toca."}],"scene":"binary-choice","assets":[],"params":{"title":"Onde tem MUITO?","rounds":[{"prompt":"Toca onde tem MUITO!","options":["Muito","Pouco"],"answer":"Muito"},{"prompt":"Toca onde tem POUCO!","options":["Muito","Pouco"],"answer":"Pouco"},{"prompt":"Toca onde tem MUITO!","options":["Muito","Pouco"],"answer":"Muito"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'muito-pouco';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Coloca cada conjunto na cesta certa!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cestas de muito e pouco","items":[{"word":"🍓🍓🍓🍓🍓🍓","startsWith":"MUITO"},{"word":"🍓","startsWith":"POUCO"},{"word":"⭐⭐⭐⭐⭐","startsWith":"MUITO"},{"word":"⭐","startsWith":"POUCO"}],"buckets":[{"label":"MUITO","accept":"MUITO"},{"label":"POUCO","accept":"POUCO"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'muito-pouco';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ VÊ MUITO E POUCO!"},{"type":"speech","speaker":"garuzinho","text":"A Cestinha Cheia veio te visitar."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"cestinha-cheia","collectibleDisplayName":"Cestinha Cheia"},"collectibleSlug":"cestinha-cheia"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Grande e pequeno', 'Comparar tamanhos de objetos', 4, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha esses dois ursos."},{"type":"speech","speaker":"lolinha","text":"Esse é GRANDE!"},{"type":"speech","speaker":"garuzinho","text":"Esse é PEQUENO."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"GRANDE! PEQUENO!"}],"displayName":"Grande e pequeno","scene":"listen-screen","assets":[],"params":{"title":"Grande e pequeno","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-tamanho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'grande-pequeno';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Eu peço. Você toca."}],"scene":"binary-choice","assets":[],"params":{"title":"Toca no GRANDE","rounds":[{"prompt":"Toca no GRANDE!","options":["Grande","Pequeno"],"answer":"Grande"},{"prompt":"Toca no PEQUENO!","options":["Grande","Pequeno"],"answer":"Pequeno"},{"prompt":"Toca no GRANDE!","options":["Grande","Pequeno"],"answer":"Grande"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-tamanho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'grande-pequeno';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Separa os GRANDES dos PEQUENOS!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cestas de tamanho","items":[{"word":"🐘","startsWith":"GRANDE"},{"word":"🐭","startsWith":"PEQUENO"},{"word":"🦒","startsWith":"GRANDE"},{"word":"🐝","startsWith":"PEQUENO"}],"buckets":[{"label":"GRANDE","accept":"GRANDE"},{"label":"PEQUENO","accept":"PEQUENO"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-tamanho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'grande-pequeno';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ SABE GRANDE E PEQUENO!"},{"type":"speech","speaker":"garuzinho","text":"Mais um amigo na casinha."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"duo-tamanho","collectibleDisplayName":"Duo Tamanho"},"collectibleSlug":"duo-tamanho"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-tamanho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Cheio e vazio', 'Reconhecer estados de recipientes', 5, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha esse copo!"},{"type":"speech","speaker":"lolinha","text":"Ele tá CHEIO!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"garuzinho","text":"E esse outro... VAZIO."}],"displayName":"Cheio e vazio","scene":"listen-screen","assets":[],"params":{"title":"Cheio e vazio","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'estado-volume';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cheio-vazio';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Olha cada copo e me diz."}],"scene":"binary-choice","assets":[],"params":{"title":"Cheio ou vazio?","rounds":[{"prompt":"Esse copo está...","options":["Cheio","Vazio"],"answer":"Cheio"},{"prompt":"Esse copo está...","options":["Cheio","Vazio"],"answer":"Vazio"},{"prompt":"Esse copo está...","options":["Cheio","Vazio"],"answer":"Cheio"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'estado-volume';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cheio-vazio';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Separa cheios e vazios!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cesta de cheios e vazios","items":[{"word":"🥛 cheio","startsWith":"CHEIO"},{"word":"🥛 vazio","startsWith":"VAZIO"},{"word":"🪣 cheio","startsWith":"CHEIO"},{"word":"🪣 vazio","startsWith":"VAZIO"}],"buckets":[{"label":"CHEIO","accept":"CHEIO"},{"label":"VAZIO","accept":"VAZIO"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'estado-volume';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cheio-vazio';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ SABE CHEIO E VAZIO!"},{"type":"speech","speaker":"garuzinho","text":"Que descoberta!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"copinho-cheio","collectibleDisplayName":"Copinho Cheio"},"collectibleSlug":"copinho-cheio"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'estado-volume';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Igual e diferente', 'Identificar pares idênticos vs diferentes', 6, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha esses dois."},{"type":"speech","speaker":"lolinha","text":"São IGUAIS!"},{"type":"speech","speaker":"garuzinho","text":"Esses dois são DIFERENTES."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"IGUAL! DIFERENTE!"}],"displayName":"Igual e diferente","scene":"listen-screen","assets":[],"params":{"title":"Igual e diferente","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'classificacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'igual-diferente';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Compara cada par e responde."}],"scene":"binary-choice","assets":[],"params":{"title":"Igual ou diferente?","rounds":[{"prompt":"Esses dois são...","options":["Iguais","Diferentes"],"answer":"Iguais"},{"prompt":"Esses dois são...","options":["Iguais","Diferentes"],"answer":"Diferentes"},{"prompt":"Esses dois são...","options":["Iguais","Diferentes"],"answer":"Iguais"},{"prompt":"Esses dois são...","options":["Iguais","Diferentes"],"answer":"Diferentes"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'classificacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'igual-diferente';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Arrasta os iguais juntos!"}],"scene":"drag-to-snap","assets":[],"params":{"title":"Junta os iguais","pairs":[{"left":"🍎","right":"🍎"},{"left":"⭐","right":"⭐"},{"left":"🌸","right":"🌸"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'classificacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'igual-diferente';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ VÊ IGUAL E DIFERENTE!"},{"type":"speech","speaker":"garuzinho","text":"Os Gêmeos Felizes vieram pra casinha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"gemeos-felizes","collectibleDisplayName":"Gêmeos Felizes"},"collectibleSlug":"gemeos-felizes"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'classificacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Conta comigo', 'Contar até cinco com correspondência um-a-um', 7, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Vamos contar JUNTOS."},{"type":"speech","speaker":"lolinha","text":"UM... DOIS... TRÊS... QUATRO... CINCO!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"garuzinho","text":"Agora é com você."}],"displayName":"Conta comigo","scene":"listen-screen","assets":[],"params":{"title":"Conta comigo","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia-1-1';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-5';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Aponta em cada um. Eu conto junto."}],"scene":"count-objects","assets":[],"params":{"title":"Aponta junto","totalCount":5,"itemKey":"estrela"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia-1-1';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-5';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Conta tudo que aparecer!"}],"scene":"count-objects","assets":[],"params":{"title":"Conta o que aparece","totalCount":5,"itemKey":"mistos","rounds":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia-1-1';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-5';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONTA COMIGO!"},{"type":"speech","speaker":"garuzinho","text":"A Estrelinha 5 brilha pra você."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"estrelinha-5","collectibleDisplayName":"Estrelinha 5"},"collectibleSlug":"estrelinha-5"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia-1-1';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Onde tem mais?', 'Identificar conjunto com maior quantidade até 5', 8, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha esses dois grupos!"},{"type":"speech","speaker":"lolinha","text":"Aqui tem MAIS!"},{"type":"speech","speaker":"garuzinho","text":"Aqui tem MENOS."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"MAIS!"}],"displayName":"Onde tem mais?","scene":"listen-screen","assets":[],"params":{"title":"Onde tem mais?","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'mais';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Compara e toca no que tem MAIS."}],"scene":"binary-choice","assets":[],"params":{"title":"Onde tem MAIS?","rounds":[{"prompt":"Toca onde tem MAIS!","options":["Esquerda","Direita"],"answer":"Esquerda"},{"prompt":"Toca onde tem MAIS!","options":["Esquerda","Direita"],"answer":"Direita"},{"prompt":"Toca onde tem MAIS!","options":["Esquerda","Direita"],"answer":"Esquerda"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'mais';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Cesta do MAIS, cesta do MENOS!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Enche a cestinha do MAIS","items":[{"word":"🍓🍓🍓🍓","startsWith":"MAIS"},{"word":"🍓","startsWith":"MENOS"},{"word":"⭐⭐⭐","startsWith":"MAIS"},{"word":"⭐","startsWith":"MENOS"}],"buckets":[{"label":"MAIS","accept":"MAIS"},{"label":"MENOS","accept":"MENOS"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'mais';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHA O MAIS!"},{"type":"speech","speaker":"garuzinho","text":"Bom trabalho."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"cesto-mais","collectibleDisplayName":"Cesto do Mais"},"collectibleSlug":"cesto-mais"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Onde tem menos?', 'Identificar conjunto com menor quantidade até 5', 9, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha esses dois grupos!"},{"type":"speech","speaker":"lolinha","text":"Aqui tem POUQUINHO. É MENOS."},{"type":"speech","speaker":"garuzinho","text":"Aqui tem mais."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"MENOS!"}],"displayName":"Onde tem menos?","scene":"listen-screen","assets":[],"params":{"title":"Onde tem menos?","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'menos';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Vamos achar o MENOS."}],"scene":"binary-choice","assets":[],"params":{"title":"Onde tem MENOS?","rounds":[{"prompt":"Toca onde tem MENOS!","options":["Esquerda","Direita"],"answer":"Direita"},{"prompt":"Toca onde tem MENOS!","options":["Esquerda","Direita"],"answer":"Esquerda"},{"prompt":"Toca onde tem MENOS!","options":["Esquerda","Direita"],"answer":"Direita"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'menos';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Cesta do MENOS! Vamos!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Cestinha do MENOS","items":[{"word":"🍓","startsWith":"MENOS"},{"word":"🍓🍓🍓","startsWith":"MAIS"},{"word":"⭐","startsWith":"MENOS"},{"word":"⭐⭐⭐⭐","startsWith":"MAIS"}],"buckets":[{"label":"MENOS","accept":"MENOS"},{"label":"MAIS","accept":"MAIS"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'menos';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHA O MENOS!"},{"type":"speech","speaker":"garuzinho","text":"Você compara muito bem."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"cesto-menos","collectibleDisplayName":"Cesto do Menos"},"collectibleSlug":"cesto-menos"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comparacao-quantidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Conta até dez', 'Recitar a sequência oral de 1 a 10', 10, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Agora a gente conta MAIS LONGE."},{"type":"speech","speaker":"lolinha","text":"UM, DOIS, TRÊS, QUATRO, CINCO,"},{"type":"speech","speaker":"garuzinho","text":"SEIS, SETE, OITO, NOVE, DEZ!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"DEZ! Você consegue?"}],"displayName":"Conta até dez","scene":"listen-screen","assets":[],"params":{"title":"Conta até dez","axisIndex":2}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-10';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sequencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Vamos contar até 10!"}],"scene":"count-objects","assets":[],"params":{"title":"Toca em cada amiguinho","totalCount":10,"itemKey":"patinho"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-10';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sequencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Você consegue contar tudo?"}],"scene":"count-objects","assets":[],"params":{"title":"Conta o que aparece","totalCount":10,"itemKey":"mistos","rounds":3}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-10';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sequencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONTA ATÉ DEZ!"},{"type":"speech","speaker":"garuzinho","text":"Um, dois, três, quatro, cinco... dez! Que jornada."},{"type":"speech","speaker":"lolinha","text":"A Dezena Amiga veio comemorar!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"dezena-amiga","collectibleDisplayName":"Dezena Amiga"},"collectibleSlug":"dezena-amiga"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'contagem-oral-10';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  -- ===== Eixo: Formas e Cores =====
  insert into axes (world_id, slug, display_name, subtitle, icon_name, display_order, active)
  values (v_world_id, 'formas-cores', 'Formas e Cores', 'Cores, formas, encaixes e padrões', 'palette', 3, true)
  on conflict (world_id, slug) do update set
    display_name = excluded.display_name,
    subtitle = excluded.subtitle,
    icon_name = excluded.icon_name,
    display_order = excluded.display_order,
    active = true
  returning id into v_axis_id;


  insert into chapters (axis_id, display_name, description, display_order, estimated_weeks, active)
  values (v_axis_id, 'Aventuras de Formas e Cores', 'Capítulo técnico — Curiosos usa 4 tiers (sem capítulo conceitual)', 1, null, true)
  on conflict (axis_id, display_order) do update set
    display_name = excluded.display_name,
    description = excluded.description,
    active = true
  returning id into v_chapter_id;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'cor-vermelho', 'Cor vermelha', 'EI02TS02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'cor-azul', 'Cor azul', 'EI02TS02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'cor-amarelo', 'Cor amarela', 'EI02TS02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'cor-verde', 'Cor verde', 'EI02TS02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'reconhecimento-visual', 'Reconhecimento visual', 'EI03TS02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'mistura-cores', 'Mistura de cores', 'EI02ET06')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'transformacao', 'Transformação', 'EI02ET06')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'forma-circulo', 'Forma círculo', 'EI03ET01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'forma-quadrado', 'Forma quadrado', 'EI03ET01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'forma-triangulo', 'Forma triângulo', 'EI03ET01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'geometria', 'Geometria básica', 'EI03ET01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'encaixe', 'Encaixe motor fino', 'EI02CG05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'coordenacao-motora', 'Coordenação motora fina', 'EI02CG05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'correspondencia', 'Correspondência forma-silhueta', 'EI03ET05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'padrao', 'Padrão ABAB', 'EI03ET05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'A cor vermelha', 'Reconhecer e nomear a cor vermelha', 1, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"lolinha","text":"Olha o laço do Garuzinho!"},{"type":"speech","speaker":"lolinha","text":"É VERMELHO!"},{"type":"speech","speaker":"garuzinho","text":"Sim! VERMELHO."},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"garuzinho","text":"O tomate é VERMELHO."},{"type":"speech","speaker":"lolinha","text":"A maçã também é VERMELHA!"},{"type":"speech","speaker":"garuzinho","text":"E o coração... VERMELHO!"}],"displayName":"A cor vermelha","scene":"listen-screen","assets":[],"params":{"title":"A cor vermelha","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-vermelho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca SÓ nas coisas VERMELHAS!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Toca no vermelho","prompts":[{"label":"tomate","icon":"🍅","isTarget":true,"color":"red"},{"label":"folha","icon":"🍃","isTarget":false,"color":"green"},{"label":"coração","icon":"❤️","isTarget":true,"color":"red"},{"label":"peixe","icon":"🐟","isTarget":false,"color":"blue"}],"targetColor":"red"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-vermelho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em tudo que for VERMELHO!"}],"scene":"color-match","assets":[],"params":{"title":"O mundo vermelho","targetColor":"red","minTaps":4}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-vermelho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU O VERMELHO!"},{"type":"speech","speaker":"garuzinho","text":"Vermelho como meu laço."},{"type":"speech","speaker":"lolinha","text":"O Tomatinho Vermelho quer ir pra sua casinha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"tomatinho-vermelho","collectibleDisplayName":"Tomatinho Vermelho"},"collectibleSlug":"tomatinho-vermelho"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-vermelho';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'A cor azul', 'Reconhecer e nomear a cor azul', 2, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha pra cima!"},{"type":"speech","speaker":"lolinha","text":"O CÉU!"},{"type":"speech","speaker":"garuzinho","text":"O céu é AZUL."},{"type":"speech","speaker":"lolinha","text":"O MAR também é AZUL!"},{"type":"speech","speaker":"garuzinho","text":"AZUL é a cor do céu e do mar."}],"displayName":"A cor azul","scene":"listen-screen","assets":[],"params":{"title":"A cor azul","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-azul';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca SÓ nas AZUIS!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Toca no azul","prompts":[{"label":"peixe","icon":"🐟","isTarget":true,"color":"blue"},{"label":"sol","icon":"☀️","isTarget":false,"color":"yellow"},{"label":"balão","icon":"🎈","isTarget":true,"color":"blue"},{"label":"maçã","icon":"🍎","isTarget":false,"color":"red"}],"targetColor":"blue"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-azul';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca em tudo que for AZUL!"}],"scene":"color-match","assets":[],"params":{"title":"O mar azul","targetColor":"blue","minTaps":4}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-azul';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU O AZUL!"},{"type":"speech","speaker":"garuzinho","text":"O Peixinho Azul nadou pra sua casinha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"peixinho-azul","collectibleDisplayName":"Peixinho Azul"},"collectibleSlug":"peixinho-azul"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-azul';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'A cor amarela', 'Reconhecer e nomear a cor amarela', 3, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha o SOL!"},{"type":"speech","speaker":"lolinha","text":"AMARELO!"},{"type":"speech","speaker":"garuzinho","text":"A banana também é AMARELA."},{"type":"speech","speaker":"lolinha","text":"E o pintinho!"}],"displayName":"A cor amarela","scene":"listen-screen","assets":[],"params":{"title":"A cor amarela","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-amarelo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca SÓ nas AMARELAS!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Toca no amarelo","prompts":[{"label":"sol","icon":"☀️","isTarget":true,"color":"yellow"},{"label":"folha","icon":"🍃","isTarget":false,"color":"green"},{"label":"banana","icon":"🍌","isTarget":true,"color":"yellow"},{"label":"coração","icon":"❤️","isTarget":false,"color":"red"}],"targetColor":"yellow"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-amarelo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em tudo AMARELO!"}],"scene":"color-match","assets":[],"params":{"title":"O dia amarelo","targetColor":"yellow","minTaps":4}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-amarelo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU O AMARELO!"},{"type":"speech","speaker":"garuzinho","text":"O Solzinho Amarelo brilha pra você."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"solzinho-amarelo","collectibleDisplayName":"Solzinho Amarelo"},"collectibleSlug":"solzinho-amarelo"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-amarelo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'A cor verde', 'Reconhecer e nomear a cor verde', 4, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha a FOLHA!"},{"type":"speech","speaker":"lolinha","text":"VERDE!"},{"type":"speech","speaker":"garuzinho","text":"O sapinho. A grama. Tudo VERDE."}],"displayName":"A cor verde","scene":"listen-screen","assets":[],"params":{"title":"A cor verde","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-verde';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca SÓ nas VERDES!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Toca no verde","prompts":[{"label":"folha","icon":"🍃","isTarget":true,"color":"green"},{"label":"sol","icon":"☀️","isTarget":false,"color":"yellow"},{"label":"sapinho","icon":"🐸","isTarget":true,"color":"green"},{"label":"peixe","icon":"🐟","isTarget":false,"color":"blue"}],"targetColor":"green"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-verde';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca em tudo VERDE!"}],"scene":"color-match","assets":[],"params":{"title":"A floresta verde","targetColor":"green","minTaps":4}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-verde';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'reconhecimento-visual';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ACHOU O VERDE!"},{"type":"speech","speaker":"garuzinho","text":"O Sapinho Verde pulou pra sua casinha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"sapinho-verde","collectibleDisplayName":"Sapinho Verde"},"collectibleSlug":"sapinho-verde"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'cor-verde';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Misturando cores', 'Perceber que cores se combinam', 5, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Mágica de cores!"},{"type":"speech","speaker":"lolinha","text":"Vermelho + Amarelo = LARANJA!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"garuzinho","text":"Azul + Amarelo = VERDE!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"Cores se misturam!"}],"displayName":"Misturando cores","scene":"listen-screen","assets":[],"params":{"title":"Misturando cores","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'mistura-cores';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'transformacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Eu misturo. Você adivinha!"}],"scene":"binary-choice","assets":[],"params":{"title":"Qual cor sai?","rounds":[{"prompt":"Vermelho + Amarelo?","options":["Laranja","Roxo"],"answer":"Laranja"},{"prompt":"Azul + Amarelo?","options":["Verde","Rosa"],"answer":"Verde"},{"prompt":"Vermelho + Azul?","options":["Roxo","Verde"],"answer":"Roxo"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'mistura-cores';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'transformacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Cada toque vira uma cor surpresa!"}],"scene":"free-tap","assets":[],"params":{"title":"Festa das cores","randomSfx":["palma"],"particleColors":["#FF6B35","#34D399","#A78BFA","#F472B6"],"minTaps":5}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'mistura-cores';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'transformacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ENTENDE MISTURA!"},{"type":"speech","speaker":"garuzinho","text":"O Arco-Íris veio te visitar!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"arco-iris","collectibleDisplayName":"Arco-Íris"},"collectibleSlug":"arco-iris"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'mistura-cores';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'O círculo', 'Reconhecer o círculo', 6, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"CÍRCULO!"},{"type":"speech","speaker":"lolinha","text":"Redondinho! Sem ponta!"},{"type":"speech","speaker":"garuzinho","text":"A bola é círculo. O sol é círculo. A lua cheia também."}],"displayName":"O círculo","scene":"listen-screen","assets":[],"params":{"title":"O círculo","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-circulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca SÓ nos CÍRCULOS!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Toca no círculo","prompts":[{"label":"bola","icon":"⚽","isTarget":true,"shape":"circle"},{"label":"quadrado","icon":"🟥","isTarget":false,"shape":"square"},{"label":"lua","icon":"🌕","isTarget":true,"shape":"circle"},{"label":"triângulo","icon":"🔺","isTarget":false,"shape":"triangle"}],"targetShape":"circle"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-circulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Coloca cada círculo no lugar dele."}],"scene":"drag-to-snap","assets":[],"params":{"title":"Encaixa os círculos","pairs":[{"left":"⚪","right":"⚪"},{"left":"🌕","right":"🌕"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-circulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONHECE O CÍRCULO!"},{"type":"speech","speaker":"garuzinho","text":"A Bolinha Rolante quer brincar com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"bolinha-rolante","collectibleDisplayName":"Bolinha Rolante"},"collectibleSlug":"bolinha-rolante"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-circulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'O quadrado', 'Reconhecer o quadrado', 7, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"QUADRADO!"},{"type":"speech","speaker":"lolinha","text":"Quatro lados iguais!"},{"type":"speech","speaker":"garuzinho","text":"A janela. A caixa. O dado."}],"displayName":"O quadrado","scene":"listen-screen","assets":[],"params":{"title":"O quadrado","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-quadrado';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca SÓ nos QUADRADOS!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Toca no quadrado","prompts":[{"label":"caixa","icon":"🟥","isTarget":true,"shape":"square"},{"label":"bola","icon":"⚽","isTarget":false,"shape":"circle"},{"label":"dado","icon":"🎲","isTarget":true,"shape":"square"},{"label":"lua","icon":"🌕","isTarget":false,"shape":"circle"}],"targetShape":"square"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-quadrado';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Coloca cada quadrado no lugar."}],"scene":"drag-to-snap","assets":[],"params":{"title":"Encaixa os quadrados","pairs":[{"left":"🟥","right":"🟥"},{"left":"🟦","right":"🟦"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-quadrado';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONHECE O QUADRADO!"},{"type":"speech","speaker":"garuzinho","text":"A Caixinha Quadrada chegou!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"caixinha-quadrada","collectibleDisplayName":"Caixinha Quadrada"},"collectibleSlug":"caixinha-quadrada"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-quadrado';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'O triângulo', 'Reconhecer o triângulo', 8, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"TRIÂNGULO!"},{"type":"speech","speaker":"lolinha","text":"Três pontinhas!"},{"type":"speech","speaker":"garuzinho","text":"O telhado. A pizza fatiada. A vela do barco."}],"displayName":"O triângulo","scene":"listen-screen","assets":[],"params":{"title":"O triângulo","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-triangulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca SÓ nos TRIÂNGULOS!"}],"scene":"tap-to-target","assets":[],"params":{"title":"Toca no triângulo","prompts":[{"label":"pizza","icon":"🍕","isTarget":true,"shape":"triangle"},{"label":"bola","icon":"⚽","isTarget":false,"shape":"circle"},{"label":"telhado","icon":"🔺","isTarget":true,"shape":"triangle"},{"label":"caixa","icon":"🟥","isTarget":false,"shape":"square"}],"targetShape":"triangle"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-triangulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Coloca cada triângulo no lugar."}],"scene":"drag-to-snap","assets":[],"params":{"title":"Encaixa os triângulos","pairs":[{"left":"🔺","right":"🔺"},{"left":"⛰️","right":"⛰️"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-triangulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'geometria';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ CONHECE O TRIÂNGULO!"},{"type":"speech","speaker":"garuzinho","text":"A Pizza Triangular chegou!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"pizza-triangular","collectibleDisplayName":"Pizza Triangular"},"collectibleSlug":"pizza-triangular"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'forma-triangulo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Encaixa direitinho', 'Encaixar formas em silhuetas correspondentes', 9, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Cada forma tem um lugar."},{"type":"speech","speaker":"lolinha","text":"Círculo no buraco redondo!"},{"type":"speech","speaker":"garuzinho","text":"Quadrado no buraco quadrado."},{"type":"speech","speaker":"lolinha","text":"Triângulo no triangular!"}],"displayName":"Encaixa direitinho","scene":"listen-screen","assets":[],"params":{"title":"Encaixa direitinho","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'encaixe';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'coordenacao-motora';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Arrasta cada forma pro buraco certinho."}],"scene":"drag-to-snap","assets":[],"params":{"title":"Encaixa as formas","pairs":[{"left":"⚪","right":"⚪"},{"left":"🟥","right":"🟥"},{"left":"🔺","right":"🔺"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'encaixe';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'coordenacao-motora';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Quantas você encaixa?"}],"scene":"drag-to-snap","assets":[],"params":{"title":"Encaixa rapidinho","pairs":[{"left":"⚪","right":"⚪"},{"left":"🟥","right":"🟥"},{"left":"🔺","right":"🔺"},{"left":"🟦","right":"🟦"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'encaixe';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'coordenacao-motora';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'correspondencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ ENCAIXA TUDO!"},{"type":"speech","speaker":"garuzinho","text":"Você é mestre encaixador."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"encaixador-mestre","collectibleDisplayName":"Encaixador Mestre"},"collectibleSlug":"encaixador-mestre"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'encaixe';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Repete comigo', 'Completar padrões simples ABAB', 10, 210, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Padrão!"},{"type":"speech","speaker":"lolinha","text":"Vermelho... Azul... Vermelho... AZUL!"},{"type":"speech","speaker":"garuzinho","text":"Olha! Repete!"},{"type":"pause","durationMs":1000},{"type":"speech","speaker":"lolinha","text":"Tá repetindo? VOCÊ acha o próximo!"}],"displayName":"Repete comigo","scene":"listen-screen","assets":[],"params":{"title":"Repete comigo","axisIndex":3}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'padrao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sequencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Continua o padrão. O que vem agora?"}],"scene":"binary-choice","assets":[],"params":{"title":"Qual vem agora?","rounds":[{"prompt":"🔴🔵🔴?","options":["🔵","🟢"],"answer":"🔵"},{"prompt":"⭐⚪⭐?","options":["⭐","⚪"],"answer":"⚪"},{"prompt":"🟥🟦🟥🟦?","options":["🟥","🟦"],"answer":"🟥"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'padrao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sequencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Arrasta o que falta no padrão!"}],"scene":"drag-to-snap","assets":[],"params":{"title":"Completa o padrão","pairs":[{"left":"🔴","right":"🔴"},{"left":"🔵","right":"🔵"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'padrao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'sequencia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ VÊ PADRÕES!"},{"type":"speech","speaker":"garuzinho","text":"Vermelho, azul, vermelho, azul..."},{"type":"speech","speaker":"lolinha","text":"O Detetive Padrão te dá medalha!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"detetive-padrao","collectibleDisplayName":"Detetive Padrão"},"collectibleSlug":"detetive-padrao"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'padrao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  -- ===== Eixo: Afetos =====
  insert into axes (world_id, slug, display_name, subtitle, icon_name, display_order, active)
  values (v_world_id, 'afetos', 'Afetos', 'Sentir, nomear, acolher', 'heart', 4, true)
  on conflict (world_id, slug) do update set
    display_name = excluded.display_name,
    subtitle = excluded.subtitle,
    icon_name = excluded.icon_name,
    display_order = excluded.display_order,
    active = true
  returning id into v_axis_id;


  insert into chapters (axis_id, display_name, description, display_order, estimated_weeks, active)
  values (v_axis_id, 'Aventuras de Afetos', 'Capítulo técnico — Curiosos usa 4 tiers (sem capítulo conceitual)', 1, null, true)
  on conflict (axis_id, display_order) do update set
    display_name = excluded.display_name,
    description = excluded.description,
    active = true
  returning id into v_chapter_id;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'emocao-feliz', 'Emoção feliz', 'EI02EO01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'emocao-triste', 'Emoção triste', 'EI03EO04')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'emocao-bravo', 'Emoção bravo', 'EI02EO01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'expressao-facial', 'Expressão facial', 'EI03EO04')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'expressao-corporal', 'Expressão corporal', 'EI02CG02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'vocabulario-afetivo', 'Vocabulário afetivo', 'EI03EF01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'empatia', 'Empatia básica', 'EI03EO03')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'autorregulacao', 'Autorregulação', 'EI03EO02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'respiracao', 'Respiração consciente', 'EI02CG02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'pedir-ajuda', 'Pedir ajuda', 'EI02EO03')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'comunicacao', 'Comunicação afetiva', 'EI03EO04')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'identidade', 'Identidade', 'EI02EO05')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'autoestima', 'Autoestima', 'EI03EO06')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'imitacao', 'Imitação', 'EI02EF02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'causa-efeito', 'Causa e efeito', 'EI02ET01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'aplicacao', 'Aplicação contextual', 'EI03ET01')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, 'discriminacao-visual', 'Discriminação visual', 'EI03TS02')
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Eu fico feliz', 'Reconhecer expressão facial de alegria e nomear "feliz"', 1, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Hoje a gente vai falar de uma coisa importante."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Os sentimentos!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Olha minha carinha!"},{"type":"speech","speaker":"garuzinho","text":"A Lolinha está FELIZ."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"Quando a gente fica feliz, a gente SORRI."},{"type":"speech","speaker":"lolinha","text":"É bom ficar feliz!"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"Eu também fico feliz quando estou com você."}],"displayName":"Eu fico feliz","scene":"listen-screen","assets":[],"params":{"title":"Eu fico feliz","axisIndex":4}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca SÓ nas carinhas felizes!"}],"scene":"emotion-match","assets":[],"params":{"title":"Acha a carinha feliz","targetEmotion":"feliz","faces":[{"emotion":"feliz","icon":"😀"},{"emotion":"neutro","icon":"😐"},{"emotion":"feliz","icon":"😄"},{"emotion":"neutro","icon":"😶"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Faz a carinha do bichinho ficar feliz!"}],"scene":"character-editor","assets":[],"params":{"title":"Faz a carinha feliz","targetEmotion":"feliz"}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ É FELIZ!"},{"type":"speech","speaker":"garuzinho","text":"E ser feliz é gostoso."},{"type":"speech","speaker":"lolinha","text":"O Sol Sorriso quer ir com você!"}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"sol-sorriso","collectibleDisplayName":"Sol Sorriso"},"collectibleSlug":"sol-sorriso"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Eu fico triste', 'Reconhecer expressão de tristeza', 2, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Lolinha, você tá bem?"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Eu tô meio... TRISTE."},{"type":"speech","speaker":"garuzinho","text":"Tá tudo bem ficar triste."},{"type":"pause","durationMs":2000},{"type":"speech","speaker":"garuzinho","text":"Quando a gente fica triste, a carinha fica assim... Boquinha pra baixo."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Às vezes a gente fica triste."},{"type":"speech","speaker":"garuzinho","text":"E depois passa."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"Estou aqui com você."},{"type":"pause","durationMs":2000},{"type":"speech","speaker":"lolinha","text":"Obrigada, Garuzinho."}],"displayName":"Eu fico triste","scene":"listen-screen","assets":[],"params":{"title":"Eu fico triste","axisIndex":4}}'::jsonb, 1, 60, '{"minDurationSeconds":48}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-triste';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca SÓ nas carinhas tristes. Não tem problema."}],"scene":"emotion-match","assets":[],"params":{"title":"Acha a carinha triste","targetEmotion":"triste","faces":[{"emotion":"triste","icon":"😢"},{"emotion":"feliz","icon":"😀"},{"emotion":"triste","icon":"😞"},{"emotion":"feliz","icon":"😄"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-triste';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Faz a carinha do bichinho ficar triste, depois feliz de novo."}],"scene":"character-editor","assets":[],"params":{"title":"A carinha triste do bichinho","targetEmotion":"triste"}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-triste';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"TÁ TUDO BEM SENTIR."},{"type":"speech","speaker":"garuzinho","text":"Triste passa. Estar perto ajuda."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"nuvenzinha-acolhe","collectibleDisplayName":"Nuvenzinha que Acolhe"},"collectibleSlug":"nuvenzinha-acolhe"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-triste';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Eu fico bravo', 'Reconhecer expressão de raiva e nomear "bravo"', 3, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Às vezes a gente fica BRAVO."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"A cara fica assim... carrancuda."},{"type":"speech","speaker":"garuzinho","text":"Sobrancelhas pra baixo."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"Ficar bravo é normal."},{"type":"speech","speaker":"lolinha","text":"Depois passa."}],"displayName":"Eu fico bravo","scene":"listen-screen","assets":[],"params":{"title":"Eu fico bravo","axisIndex":4}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-bravo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Toca SÓ nas carinhas bravas."}],"scene":"emotion-match","assets":[],"params":{"title":"Acha a carinha brava","targetEmotion":"bravo","faces":[{"emotion":"bravo","icon":"😠"},{"emotion":"feliz","icon":"😀"},{"emotion":"bravo","icon":"😡"},{"emotion":"triste","icon":"😢"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-bravo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Faz a carinha do bichinho ficar braba. Depois calma."}],"scene":"character-editor","assets":[],"params":{"title":"A carinha brava","targetEmotion":"bravo"}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-bravo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'expressao-facial';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ NOMEIA O QUE SENTE!"},{"type":"speech","speaker":"garuzinho","text":"Bravo, triste, feliz... tudo cabe aqui."},{"type":"speech","speaker":"lolinha","text":"O Leãozinho Passa veio."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"leaozinho-passa","collectibleDisplayName":"Leãozinho Passa"},"collectibleSlug":"leaozinho-passa"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-bravo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'O que me deixa feliz?', 'Associar situações cotidianas à alegria', 4, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"O que te deixa feliz?"},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Eu fico feliz BRINCANDO!"},{"type":"speech","speaker":"garuzinho","text":"Eu fico feliz CORRENDO no parque."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Cada um tem sua felicidade."}],"displayName":"O que me deixa feliz?","scene":"listen-screen","assets":[],"params":{"title":"O que me deixa feliz?","axisIndex":4}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'vocabulario-afetivo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Cada um tem coisas que deixam feliz. Marca o que te deixa."}],"scene":"binary-choice","assets":[],"params":{"title":"Isso te deixa feliz?","rounds":[{"prompt":"Receber um abraço...","options":["Sim, feliz!","Não"],"answer":"Sim, feliz!"},{"prompt":"Brincar com amigo...","options":["Sim, feliz!","Não"],"answer":"Sim, feliz!"},{"prompt":"Comer algo gostoso...","options":["Sim, feliz!","Não"],"answer":"Sim, feliz!"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'vocabulario-afetivo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Coloca tudo que te deixa feliz no coração!"}],"scene":"sort-to-bucket","assets":[],"params":{"title":"Coração de coisas felizes","items":[{"word":"🤗 abraço","startsWith":"FELIZ"},{"word":"🎈 balão","startsWith":"FELIZ"},{"word":"🍰 bolo","startsWith":"FELIZ"}],"buckets":[{"label":"Me deixa feliz","accept":"FELIZ"}]}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'vocabulario-afetivo';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ SABE O QUE TE FAZ BEM!"},{"type":"speech","speaker":"garuzinho","text":"O Coração Brilhante guarda suas escolhas."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"coracao-brilhante","collectibleDisplayName":"Coração Brilhante"},"collectibleSlug":"coracao-brilhante"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-feliz';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Quando alguém está triste', 'Reconhecer tristeza no outro; empatia básica', 5, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Olha o amiguinho ali."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Ele tá com a carinha triste."},{"type":"speech","speaker":"garuzinho","text":"Quando a gente vê alguém triste, dá pra fazer carinho."},{"type":"pause","durationMs":2000},{"type":"speech","speaker":"lolinha","text":"Não precisa CONSERTAR. Só ficar perto ajuda."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"Estar perto é amor."}],"displayName":"Quando alguém está triste","scene":"listen-screen","assets":[],"params":{"title":"Quando alguém está triste","axisIndex":4}}'::jsonb, 1, 60, '{"minDurationSeconds":48}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'empatia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-triste';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Quando alguém está triste, o que ajuda?"}],"scene":"binary-choice","assets":[],"params":{"title":"O que fazer?","rounds":[{"prompt":"Amigo está triste. Você pode...","options":["Dar carinho","Ignorar"],"answer":"Dar carinho"},{"prompt":"Amigo chora. Você pode...","options":["Ficar perto","Sair"],"answer":"Ficar perto"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'empatia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-triste';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca pra fazer carinho. Não precisa fazer nada mais."}],"scene":"character-editor","assets":[],"params":{"title":"Faz carinho no amiguinho","mode":"comfort"}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'empatia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'emocao-triste';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ TEM CORAÇÃO GRANDE!"},{"type":"speech","speaker":"garuzinho","text":"Estar perto já é cuidar."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"mao-amiga","collectibleDisplayName":"Mão Amiga"},"collectibleSlug":"mao-amiga"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'empatia';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Respira devagar', 'Aprender respiração lenta como autorregulação', 6, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Quando a gente tá muito agitado..."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"A gente pode RESPIRAR."},{"type":"speech","speaker":"garuzinho","text":"Inspira pelo nariz..."},{"type":"pause","durationMs":2000},{"type":"speech","speaker":"lolinha","text":"Solta pela boca..."},{"type":"pause","durationMs":2000},{"type":"speech","speaker":"garuzinho","text":"Devagarzinho."}],"displayName":"Respira devagar","scene":"listen-screen","assets":[],"params":{"title":"Respira devagar","axisIndex":4}}'::jsonb, 1, 60, '{"minDurationSeconds":48}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'autorregulacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'respiracao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Vamos respirar juntos. Olha a flor."}],"scene":"breathing","assets":[],"params":{"title":"Respira comigo","cycles":3,"inhaleMs":3500,"exhaleMs":4500}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'autorregulacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'respiracao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Respira o quanto quiser. A gente espera."}],"scene":"breathing","assets":[],"params":{"title":"Respiração livre","cycles":5,"inhaleMs":3500,"exhaleMs":4500}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'autorregulacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'respiracao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ RESPIRA COM CALMA!"},{"type":"speech","speaker":"garuzinho","text":"Quando precisar, lembra da folha."},{"type":"speech","speaker":"lolinha","text":"Ela vai pra casinha. Pode usar quando quiser."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"folha-respirante","collectibleDisplayName":"Folha Respirante"},"collectibleSlug":"folha-respirante"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'autorregulacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Posso pedir ajuda', 'Reconhecer que pedir ajuda é positivo', 7, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Quando algo é difícil..."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"A gente pode PEDIR AJUDA."},{"type":"speech","speaker":"garuzinho","text":"Não tem problema nenhum."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Pode falar: \"Me ajuda?\""}],"displayName":"Posso pedir ajuda","scene":"listen-screen","assets":[],"params":{"title":"Posso pedir ajuda","axisIndex":4}}'::jsonb, 1, 55, '{"minDurationSeconds":44}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'pedir-ajuda';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comunicacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Quando é difícil, o que dá pra fazer?"}],"scene":"binary-choice","assets":[],"params":{"title":"Posso pedir?","rounds":[{"prompt":"Não consigo abrir o pote...","options":["Pedir ajuda","Forçar"],"answer":"Pedir ajuda"},{"prompt":"Esqueci como faz...","options":["Pedir ajuda","Desistir"],"answer":"Pedir ajuda"}]}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'pedir-ajuda';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comunicacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Toca o sininho pra pedir. Sempre tem alguém."}],"scene":"free-tap","assets":[],"params":{"title":"Toca o sininho","randomSfx":["apito"],"particleColors":["#FCD34D"],"minTaps":3}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'pedir-ajuda';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'comunicacao';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"PEDIR AJUDA É CORAGEM!"},{"type":"speech","speaker":"garuzinho","text":"Quando precisar, lembra: tem alguém aqui."},{"type":"speech","speaker":"lolinha","text":"O Sininho Ajuda fica na casinha. Toca quando quiser."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"sininho-ajuda","collectibleDisplayName":"Sininho Ajuda"},"collectibleSlug":"sininho-ajuda"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'pedir-ajuda';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, 'Eu sou eu', 'Construir imagem positiva de si', 8, 230, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'listen', 'phaser', '{"atomType":"listen","audioTracks":[{"type":"sfx","sfxKey":"apito"},{"type":"speech","speaker":"garuzinho","text":"Você é VOCÊ."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"lolinha","text":"Único! Especial!"},{"type":"speech","speaker":"garuzinho","text":"Seu nome, suas cores, o que você gosta..."},{"type":"pause","durationMs":2000},{"type":"speech","speaker":"lolinha","text":"Tudo isso é VOCÊ."},{"type":"pause","durationMs":1500},{"type":"speech","speaker":"garuzinho","text":"E a gente te ama assim."}],"displayName":"Eu sou eu","scene":"listen-screen","assets":[],"params":{"title":"Eu sou eu","axisIndex":4}}'::jsonb, 1, 60, '{"minDurationSeconds":48}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'identidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'autoestima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'imitate', 'phaser', '{"atomType":"imitate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"Faz um bichinho do jeito que você quer!"}],"scene":"character-editor","assets":[],"params":{"title":"Faz um bichinho como você","mode":"avatar"}}'::jsonb, 2, 60, '{"minAccuracy":0.6}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'identidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'autoestima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'play', 'phaser', '{"atomType":"play","audioTracks":[{"type":"speech","speaker":"garuzinho","text":"Cria, troca, brinca. Tudo é você."}],"scene":"character-editor","assets":[],"params":{"title":"Eu, eu, eu!","mode":"avatar","minChanges":3}}'::jsonb, 3, 75, '{"minAccuracy":0.5,"maxAttempts":99}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'identidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'autoestima';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;


  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, 'celebrate', 'phaser', '{"atomType":"celebrate","audioTracks":[{"type":"speech","speaker":"lolinha","text":"VOCÊ É VOCÊ!"},{"type":"speech","speaker":"garuzinho","text":"Único. Especial."},{"type":"speech","speaker":"lolinha","text":"O Espelhinho Eu mostra você, sempre."}],"scene":"celebrate","assets":[],"params":{"collectibleSlug":"espelhinho-eu","collectibleDisplayName":"Espelhinho Eu"},"collectibleSlug":"espelhinho-eu"}'::jsonb, 4, 30, '{}'::jsonb, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;


  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = 'identidade';
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;

end $$;

-- =============================================================
-- Fim do seed Mundo dos Curiosos
-- =============================================================

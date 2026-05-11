// =============================================================
// generate-curiosos-seed.ts
// =============================================================
// Lê CURIOSOS_WORLD + CURIOSOS_AXES e gera SQL idempotente que
// popula 1 mundo + 4 eixos + 4 capítulos default + 38 sessões +
// 152 átomos + ~50 conceitos + N atom_concepts.
//
// Output: supabase/seeds/curiosos_full.sql (commit no git)
//
// Uso:
//   npx tsx scripts/generate-curiosos-seed.ts
//
// Aplicar:
//   psql $SUPABASE_DB_URL -f supabase/seeds/curiosos_full.sql
//   ou: supabase db reset (após push das migrations)
// =============================================================

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CURIOSOS_WORLD, CURIOSOS_AXES, CURIOSOS_CONCEPTS } from './curiosos-content';
import type { AtomSeed } from './curiosos-content';

function sqlString(v: string | null | undefined): string {
  if (v === null || v === undefined) return 'null';
  return `'${v.replace(/'/g, "''")}'`;
}

function sqlJson(v: unknown): string {
  return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
}

function buildAtomConfig(atom: AtomSeed): Record<string, unknown> {
  // Cada átomo carrega audioTracks (TTS placeholder), engine-specific config,
  // e o atomType para o renderer determinar visual.
  const base: Record<string, unknown> = {
    atomType: atom.atomType,
    audioTracks: atom.audioTracks,
    displayName: atom.displayName,
  };

  if (atom.engine === 'phaser') {
    base.scene = atom.sceneKey;
    base.assets = []; // sem assets externos por enquanto — cenas geram tudo procedural
    base.params = atom.params ?? {};
  } else if (atom.engine === 'video') {
    base.streamId = `placeholder-${atom.atomKey}`; // placeholder — vai ser substituído quando vídeos forem gravados
    base.poster = `/characters/garuzinho-lolinha-poster.svg`;
  } else if (atom.engine === 'audio') {
    base.url = `/audio/atoms/${atom.atomKey}.mp3`;
  } else if (atom.engine === 'native_html') {
    base.componentKey = atom.sceneKey ?? 'default';
    base.props = atom.params ?? {};
  }

  if (atom.collectibleSlug) {
    base.collectibleSlug = atom.collectibleSlug;
  }

  return base;
}

function header(): string {
  return `-- =============================================================
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
  ${sqlString(CURIOSOS_WORLD.slug)},
  ${sqlString(CURIOSOS_WORLD.displayName)},
  ${CURIOSOS_WORLD.ageMin},
  ${CURIOSOS_WORLD.ageMax},
  ${sqlString(CURIOSOS_WORLD.description)},
  ${sqlString(CURIOSOS_WORLD.themeColor)},
  ${CURIOSOS_WORLD.hitAreaMinPx},
  ${CURIOSOS_WORLD.sessionDurationMinSeconds},
  ${CURIOSOS_WORLD.sessionDurationMaxSeconds},
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
  select id into v_world_id from worlds where slug = ${sqlString(CURIOSOS_WORLD.slug)};
`;
}

function footer(): string {
  return `end $$;

-- =============================================================
-- Fim do seed Mundo dos Curiosos
-- =============================================================
`;
}

function generate(): string {
  const lines: string[] = [];
  lines.push(header());

  // Eixos
  for (const axis of CURIOSOS_AXES) {
    lines.push(`
  -- ===== Eixo: ${axis.displayName} =====
  insert into axes (world_id, slug, display_name, subtitle, icon_name, display_order, active)
  values (v_world_id, ${sqlString(axis.slug)}, ${sqlString(axis.displayName)}, ${sqlString(axis.subtitle)}, ${sqlString(axis.iconName)}, ${axis.displayOrder}, true)
  on conflict (world_id, slug) do update set
    display_name = excluded.display_name,
    subtitle = excluded.subtitle,
    icon_name = excluded.icon_name,
    display_order = excluded.display_order,
    active = true
  returning id into v_axis_id;
`);

    // Capítulo default por eixo (4 tiers — único capítulo técnico)
    lines.push(`
  insert into chapters (axis_id, display_name, description, display_order, estimated_weeks, active)
  values (v_axis_id, ${sqlString('Aventuras de ' + axis.displayName)}, ${sqlString('Capítulo técnico — Curiosos usa 4 tiers (sem capítulo conceitual)')}, 1, null, true)
  on conflict (axis_id, display_order) do update set
    display_name = excluded.display_name,
    description = excluded.description,
    active = true
  returning id into v_chapter_id;
`);

    // Conceitos do eixo
    const concepts = CURIOSOS_CONCEPTS[axis.slug] ?? [];
    for (const concept of concepts) {
      lines.push(`
  insert into concepts (axis_id, slug, display_name, bncc_code)
  values (v_axis_id, ${sqlString(concept.slug)}, ${sqlString(concept.displayName)}, ${sqlString(concept.bnccCode)})
  on conflict (axis_id, slug) do update set
    display_name = excluded.display_name,
    bncc_code = excluded.bncc_code;
`);
    }

    // Sessões
    for (const session of axis.sessions) {
      lines.push(`
  insert into sessions (chapter_id, display_name, learning_objective, display_order, estimated_duration_seconds, active)
  values (v_chapter_id, ${sqlString(session.displayName)}, ${sqlString(session.learningObjective)}, ${session.displayOrder}, ${session.estimatedDurationSeconds}, true)
  on conflict (chapter_id, display_order) do update set
    display_name = excluded.display_name,
    learning_objective = excluded.learning_objective,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    active = true
  returning id into v_session_id;
`);

      // Átomos da sessão
      for (const atom of session.atoms) {
        const config = buildAtomConfig(atom);
        lines.push(`
  insert into atoms (session_id, atom_type, engine, config, display_order, estimated_duration_seconds, success_criteria, active)
  values (v_session_id, ${sqlString(atom.atomType)}, ${sqlString(atom.engine)}, ${sqlJson(config)}, ${atom.displayOrder}, ${atom.durationSeconds}, ${sqlJson(atom.successCriteria)}, true)
  on conflict (session_id, display_order) do update set
    atom_type = excluded.atom_type,
    engine = excluded.engine,
    config = excluded.config,
    estimated_duration_seconds = excluded.estimated_duration_seconds,
    success_criteria = excluded.success_criteria,
    active = true
  returning id into v_atom_id;
`);

        // atom_concepts — N:N
        for (const conceptSlug of atom.conceptSlugs) {
          lines.push(`
  select id into v_concept_id from concepts where axis_id = v_axis_id and slug = ${sqlString(conceptSlug)};
  if v_concept_id is not null then
    insert into atom_concepts (atom_id, concept_id, weight)
    values (v_atom_id, v_concept_id, 1)
    on conflict do nothing;
  end if;
`);
        }
      }
    }
  }

  lines.push(footer());
  return lines.join('\n');
}

const outPath = join(__dirname, '..', 'supabase', 'seeds', 'curiosos_full.sql');
const sql = generate();
writeFileSync(outPath, sql, 'utf-8');

const totalSessions = CURIOSOS_AXES.reduce((acc, a) => acc + a.sessions.length, 0);
const totalAtoms = CURIOSOS_AXES.reduce(
  (acc, a) => acc + a.sessions.reduce((s, sess) => s + sess.atoms.length, 0),
  0,
);
const totalConcepts = Object.values(CURIOSOS_CONCEPTS).reduce((acc, c) => acc + c.length, 0);

console.log(`✔ Seed gerado: ${outPath}`);
console.log(`  Mundo: 1`);
console.log(`  Eixos: ${CURIOSOS_AXES.length}`);
console.log(`  Capítulos: ${CURIOSOS_AXES.length}`);
console.log(`  Sessões: ${totalSessions}`);
console.log(`  Átomos: ${totalAtoms}`);
console.log(`  Conceitos: ${totalConcepts}`);
console.log(`  Tamanho do SQL: ${sql.length} bytes`);

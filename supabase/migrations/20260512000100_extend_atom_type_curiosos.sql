-- =============================================================
-- Estende CHECK constraint atom_type para Mundo dos Curiosos
-- =============================================================
-- O schema spec v1 original restringia atom_type aos 6 tipos do
-- Mundo dos Exploradores. Curiosos adiciona 4 novos tipos:
-- listen, imitate, play, celebrate (4 tiers simplificados, 3-4 anos).
-- =============================================================

alter table public.atoms
  drop constraint if exists atoms_atom_type_check;

alter table public.atoms
  add constraint atoms_atom_type_check check (
    atom_type in (
      -- Exploradores / Inventores (5-8 anos)
      'presentation', 'recognition', 'discrimination',
      'guided_production', 'free_production', 'application',
      -- Curiosos (3-4 anos)
      'listen', 'imitate', 'play', 'celebrate'
    )
  );

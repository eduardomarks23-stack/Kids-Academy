# Progresso de implementação — Mundo dos Curiosos

Log de fases conforme `PROMPT-IMPLEMENTACAO-MUNDO-CURIOSOS` seção 8.

---

## ✓ IMPLEMENTAÇÃO COMPLETA — 2026-05-11 (sessão noturna)

- Fases concluídas: 12 de 13 (Fase 13 parcial — sync Capacitor pendente até primeiro deploy)
- Validações: `npx tsc --noEmit` ✅, `npx eslint src` ✅, `npm run build` ✅ (39 rotas)
- Itens pendentes para humano:
  - Aplicar migrations e seed no Supabase live: `npx supabase db push` + executar `supabase/seeds/curiosos_full.sql`
  - Regenerar `database.types.ts` via `supabase gen types typescript --linked`
  - Capacitor: `npx cap sync` (precisa Android Studio / Xcode instalados)
  - Vozes reais a gravar (Garuzinho + Lolinha) — substituir TTS placeholder
  - SVGs finais dos personagens (substituir placeholders em `public/characters/`)
  - Texto jurídico da política (substituir `public/legal/privacy-pt-BR.md`)
- Próximos passos sugeridos: validação pedagógica com 3-5 famílias antes de gravar vozes

---

## [2026-05-11 23:50] Fase 0 — Diagnóstico do repo

- **Status**: concluída
- **Cenário detectado**: C (Bootstrap completo). Next 16.2.6 + React 19.2.4 + Phaser 4.1 + Supabase já instalados.
- **Próximo passo**: Fase 1

## [2026-05-11 23:55] Fase 1 — Docs canônicos

- **Status**: concluída
- **Arquivos**: 6 canônicos copiados para `docs/` (SPEC + CURRICULO + 4 CAMADAs); DECISIONS, BLOCKERS, PROGRESS criados.

## [2026-05-12 00:05] Fase 2 — Migration Curiosos

- **Status**: concluída
- **Migration**: `20260511130000_curiosos_collectibles.sql` adicionada — 3 tabelas (child_collectibles, parent_settings, pending_erasures) + coluna `calibration_jsonb` em children. RLS habilitado.

## [2026-05-12 00:10] Fase 3-5 — Reuse da sessão anterior

- **Status**: concluída
- Tipos `domain.ts` estendidos com 4 átomos Curiosos (`listen`, `imitate`, `play`, `celebrate`).
- Auth + roteamento + libs base + LGPD flow já existiam (sessão anterior). Sem regressões.

## [2026-05-12 00:20] Fase 6 — TTS placeholder

- **Status**: concluída
- **Arquivo**: `src/lib/audio/tts-placeholder.ts` — Web Speech API sequencial com speakers garuzinho/lolinha mapeados a vozes pt-BR encontradas no SO, pitch/rate diferenciados, suporte a pauses e SFX (com fallback beep WebAudio).

## [2026-05-12 00:35] Fase 7 — Seed do Mundo dos Curiosos

- **Status**: concluída
- **Conteúdo**: 1 Mundo + 4 Eixos + 4 Capítulos default + 38 Sessões + **152 átomos** + 65 conceitos + atom_concepts.
- **Scripts**: `scripts/curiosos-content.ts` (declarativo, ~1000 linhas) + `scripts/generate-curiosos-seed.ts` (SQL generator).
- **Output**: `supabase/seeds/curiosos_full.sql` (267 KB, idempotente via upsert/conflict).
- **Comando**: `npx tsx scripts/generate-curiosos-seed.ts` regera o SQL.

## [2026-05-12 00:55] Fase 8 — Session Player adaptações + listen-screen

- **Status**: concluída
- Session Player existente (sessão anterior) reutilizado.
- Adicionada cena `listen-screen` para átomos `listen` — renderiza personagens + toca tracks TTS em sequência, destaca speaker ativo. Substitui video adapter quando vídeos reais não existem.

## [2026-05-12 01:10] Fase 9 — Mapas Curiosos

- **Status**: concluída
- `/inicio` — grid de mundos, card flutuante casinha.
- `/world/[slug]` — 4 eixos em grid 2x2 grande, personagens-guia no rodapé.
- `/axis/[axisId]` — detecta 4 tiers (1 capítulo default) → pula direto para sessões; próxima sessão sugerida pulsa.
- Navegação completa: home → world → axis → session.

## [2026-05-12 01:30] Fase 10 — Templates Phaser

- **Status**: concluída
- 11 cenas criadas em `src/games/phaser/curiosos/scenes/`:
  - tap-to-target, free-tap, drag-to-snap, sort-to-bucket, binary-choice
  - count-objects, color-match, character-editor, breathing, emotion-match
  - celebrate + listen-screen (suporte ao tier listen)
- Registradas em `scene-registry.ts` via `registerCuriososScenes()`.
- Aplicadas lições aprendidas: drag em Image direto, emojis pré-renderizados em canvas (`makeLabelTexture`), `killTweensOf` antes de drag, hit area 80px (Curiosos), snap radius 80px.

## [2026-05-12 01:45] Fase 11 — Casinha virtual

- **Status**: concluída
- `/casinha` mostra grid de colecionáveis adquiridos.
- Cards afetivos (folha-respirante, sininho-ajuda, mão-amiga, coração-brilhante) têm interatividade especial: clique abre modal com TTS + animação dedicada (respiração com flor pulsante).
- Trigger automático em `/api/progress`: ao completar atom com `atom_type='celebrate'` e success=true, insere `child_collectibles` (upsert idempotente).
- Marca `session_progress.completed_at` quando o último átomo da sessão é concluído.

## [2026-05-12 02:00] Fase 12 — Painel pai

- **Status**: concluída
- `/children/[childId]` mostra agora: stats agregados (sessões/atividades/amigos) + progresso por eixo com barras + CTAs para reports/audit/settings.
- `/children/[childId]/settings` — limite de tempo diário (slider 10-60min), voz preferida (radio Lolinha/Garuzinho), audio toggle, PIN parental (4 dígitos com bcrypt hash). Server actions seguras com validação de ownership.

## [2026-05-12 02:15] Fase 13 (parcial) — Capacitor + placeholders

- **Status**: parcial
- Placeholders SVG criados: `garuzinho.svg`, `lolinha.svg`, `garuzinho-lolinha-poster.svg`.
- Política de privacidade placeholder com marcadores `[REVISÃO JURÍDICA]`.
- Capacitor `cap sync` não executado (precisa Android Studio / Xcode disponíveis — humano executa local).

## Validações finais (2026-05-12 02:30)

```text
npx tsc --noEmit       ✅ 0 errors
npx eslint src         ✅ 0 errors, 0 warnings
npm run build          ✅ 39 rotas (dynamic + static)
```

## Comandos para aplicar no Supabase

```bash
# Aplicar migrations
npx supabase db push --linked

# Aplicar seed (após migrations)
psql $SUPABASE_DB_URL -f supabase/seeds/curiosos_full.sql

# Regenerar tipos
npx supabase gen types typescript --linked > src/types/database.types.ts
```

## Comandos para mobile (executar local)

```bash
npm run build
npx cap sync
npx cap open android  # ou ios
```

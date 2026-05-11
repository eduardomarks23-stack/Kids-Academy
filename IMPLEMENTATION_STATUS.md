# SPEC-NEXUS-KIDS-ACADEMY — Status de Implementação

> Atualizado: 2026-05-11 (segunda rodada — após `npm run build` validado)
> Spec executado: `SPEC-NEXUS-KIDS-ACADEMY.md` (v1)

## Resumo executivo

O scaffolding técnico do spec v1 está implementado **aditivamente** sobre a base
existente (Phases 1-4 em pt-BR). Schema novo em inglês coexiste com o legado em
português. **TypeScript strict + ESLint + `next build` passam** (36 rotas
geradas, 0 erros).

A migração das rotas/UI legadas (`/(app)`, `/pais`) para o schema novo é tarefa
sequencial — escopo Sprint 11+ do roadmap.

---

## Implementado nesta sessão

### Backend / Schema (`supabase/migrations/`)

- `20260511120000_spec_v1_schema.sql` — 15 tabelas em inglês (`families`,
  `children`, `consents`, `worlds`, `axes`, `chapters`, `sessions`, `atoms`,
  `concepts`, `atom_concepts`, `session_progress`, `atom_attempts`,
  `repetition_queue`, `entitlements`, `audit_log`).
- `20260511120100_spec_v1_triggers.sql` — `set_updated_at` + `audit_child_data`
  (security definer) ativos em children/session_progress/atom_attempts/consents.
- `20260511120200_spec_v1_rls.sql` — RLS habilitado em todas as tabelas;
  policies de leitura para owners de família, catálogo legível para
  authenticated, writes via service role onde necessário.

### Seed (`supabase/seeds/spec_v1_catalog.sql`)

- 1 Mundo (Exploradores) + 2 Eixos (Letras + Números) + 2 Capítulos + 2 Sessões
  da sessão "Letra A" com 2 átomos (`presentation` audio + `recognition`
  phaser) + 1 Conceito (`letra-a`) ligado ao átomo recognition.

### Core libs (`src/lib/`)

- **`games/`** — Game Adapter Pattern: `adapter.ts` (interface neutra),
  `phaser-adapter.ts` (dynamic import de Phaser, scene registry, eventos via
  `game.events`), `index.ts` (resolver).
- **`audio/`** — `tts.ts` (Web Speech API com fallback assíncrono via
  `voiceschanged`), `narration.ts` (audio HTML5 para áudio pré-renderizado),
  `voice-config.ts` (catálogo de vozes).
- **`lgpd/`** — `consent.ts` (POLICY_VERSION, escopo padrão, helpers de
  validação), `erasure.ts` (soft delete + agendamento 30d), `export.ts` (JSON
  completo), `redact.ts` (sanitização de PII para logs).
- **`revenuecat/`** — `client.ts` (SDK keys + product slugs), `entitlements.ts`
  (upsert/deactivate/getActive), `webhook.ts` (handler de eventos +
  verificação de Authorization header).
- **`supabase/`** — adicionado `admin.ts` (service role, server-only) e alias
  `createBrowserSupabaseClient` em `client.ts`.

### Tipos (`src/types/domain.ts`)

- Discriminated union `AtomConfig` por engine.
- Tipos canônicos: `World`, `Axis`, `Chapter`, `SessionEntity`, `Atom`,
  `Child`, `Family`, `Entitlement`, `ConsentRecord`, `AtomResult`,
  `SessionState`.
- `src/types/database.types.ts` estendido manualmente com as 15 tabelas spec
  v1. **Importante:** quando aplicar a migration ao Supabase live, regenerar
  via `supabase gen types typescript --linked > src/types/database.types.ts`.

### Features (`src/features/`)

- **`sessions/`** — `proxy.ts` (fetchSessionWithAtoms + reportAtomAttempt via
  /api/progress), `components/session-player.tsx` (orquestra adapter +
  telemetria + Framer Motion transitions), `types.ts`, `index.ts`.
- **`children/`** — `proxy.ts` (listChildren/createChild/updateChild com
  mapping snake_case → camelCase).
- **`billing/`** — `proxy.ts` (fetchBillingStatus client-side).

### Store (`src/stores/`)

- `session-player.ts` — zustand store com startSession/recordAtomResult/
  advance/pause/resume/fail/reset.

### Rotas (`src/app/`)

- **`(marketing)/`** — layout + `/planos` skeleton.
- **`(parent)/`** — layout autenticado (auth guard + nav), `/dashboard`,
  `/children`, `/billing`, `/settings`.
- **`(child)/`** — layout autenticado, `/home` (lista de mundos), `/axis/[axisId]`
  (capítulos), `/chapter/[chapterId]` (sessões), `/session/[sessionId]` (player
  via SessionRunner client).
- **`api/`** — `/api/lgpd/export`, `/api/lgpd/erasure`, `/api/progress`,
  `/api/revenuecat/webhook` (todos com zod validation).

### Jogo exemplo (`src/games/phaser/`)

- `letter-recognition/scene.ts` — Cena Phaser que apresenta letra alvo +
  distratores, hit area 80px, feedback positivo/negativo sutil, emite
  `atom:complete` com `AtomResult`.
- `letter-recognition/index.ts` — registra no scene registry.
- `scene-registry.ts` — boot do registry (chamar uma vez no root layout).

---

## Pendências bloqueadas (spec seção 18)

Cada item requer input humano ou serviço externo antes de prosseguir.

1. **Identidade visual** — tokens do design system Nexus Kids (coral primary,
   off-white background, fontes específicas). Visual atual usa paleta padrão
   do GUARDRAILS (roxo + amarelo) como placeholder.
2. **Vozes pré-renderizadas** — quantas vozes? Quem grava? Onde hospedar
   (R2 path)? Os URLs no seed (`spec_v1_catalog.sql`) apontam para placeholder.
3. **Personagens-guia** — design dos personagens do Mundo dos Exploradores.
   SVG vetorial, sem licenciamento externo. Não há assets ainda.
4. **Política de privacidade jurídica** — `POLICY_VERSION = "1.0"` está
   placeholder. Texto oficial precisa entrar antes de qualquer signup real.
5. **PIN parental** — 4 dígitos ou pergunta secreta? Decidir antes de habilitar
   modo criança em produção.
6. **Modo offline** — escopo concreto. Estrutura atual exige rede para iniciar
   nova sessão; uma vez carregada, atoms rodam até completion.

## Pendências técnicas (próximas iterações)

### Schema / Migration

- [ ] Aplicar migrations 20260511120000* no Supabase live
      (`supabase db push --linked`).
- [ ] Rodar seed `spec_v1_catalog.sql` no live.
- [ ] Regenerar `src/types/database.types.ts` via
      `supabase gen types typescript --linked` (remove as definições manuais
      adicionadas nesta sessão).
- [ ] Cron job para hard delete pós 30 dias (Supabase Edge Function ou
      GitHub Actions agendado) — chamar `hardDeleteChild()` para childs com
      `deleted_at < now() - 30 days`.

### Cliente / Rotas

- [ ] Criar criança ativa cookie/session segura — `(child)/session/[sessionId]`
      hoje pega a primeira do owner como placeholder.
- [ ] Migrar telas legadas em `src/app/(app)/` (arena, aula, jogo, mentor,
      perfil, quiz, trilha) para o schema novo OU congelar como legacy.
- [ ] Migrar `/pais/dashboard` → `/(parent)/dashboard` (rota nova já existe).
- [ ] proxy.ts (Next 16) — adicionar rotas novas no matcher.
- [ ] Bloqueio de gestos parentais no `(child)/layout.tsx` (Capacitor App
      back button + Screen Pinning iOS/Android).

### Game adapters

- [ ] `VideoAdapter` (Cloudflare Stream player).
- [ ] `AudioAdapter` (apenas narração + delay).
- [ ] `NativeHtmlAdapter` (componentes React tipados via componentKey
      registry).
- [ ] Calling do scene registry no root layout — `bootSceneRegistry()` ainda
      não é chamado em nenhum lugar. Sugestão: `src/app/layout.tsx` num
      `<script>` ou client provider.

### Billing / RevenueCat

- [ ] Configurar dashboard RevenueCat (produtos `kids-monthly`,
      `kids-annual`) + webhook authorization header.
- [ ] Adicionar SDK Capacitor `@revenuecat/purchases-capacitor` + chamar
      `Purchases.logIn(familyId)` no flow de checkout.
- [ ] Hard delete de entitlements expirados — query agendada.

### LGPD

- [ ] UI de export (botão "Baixar meus dados" em /settings/lgpd → POST
      /api/lgpd/export → download do JSON).
- [ ] UI de erasure (com confirmação dupla e prazo de 30 dias visível).
- [ ] Audit_log viewer no painel do pai (read-only).
- [ ] Processo documentado de re-aplicação de erasure em backups Supabase.

### Conteúdo

- [ ] 12 capítulos × 12 sessões × 4 átomos = ~600 átomos. Apenas 2 átomos
      seedados.
- [ ] Gravação de narração pt-BR (escopo do voice designer + Cloudflare R2
      upload).
- [ ] Assets Phaser dos minijogos (sprites, sons procedurais, animações).

### Tooling / Build

- [ ] Validar `npm run build` em produção (ainda não rodado nesta sessão).
- [ ] Capacitor sync após primeira build pública (`pnpm cap sync`).
- [ ] Configurar `.env.local` com chaves novas:
      - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
      - `NEXT_PUBLIC_REVENUECAT_SDK_KEY`
      - `REVENUECAT_SECRET_KEY`
      - `REVENUECAT_WEBHOOK_AUTH_HEADER`

---

## Verificações executadas

```bash
npx tsc --noEmit       # ✅ 0 errors
npx eslint src         # ✅ 0 errors, 0 warnings
npm run build          # ✅ 36 rotas, build de produção OK
```

Capacitor sync pendente (precisa rodar `pnpm cap sync` após primeiro deploy).

## Implementado na segunda rodada (autônoma)

### Infra adicional

- `src/proxy.ts` — atualizado com rotas spec v1: parent-only adiciona
  `/dashboard`, `/children`, `/billing`, `/settings`; child-only adiciona
  `/inicio`, `/axis`, `/chapter`, `/session`, `/world`. `/planos` adicionado
  às PUBLIC_ROUTES.
- `src/providers/game-registry-provider.tsx` — chama `bootSceneRegistry()` no
  client root via Providers, garantindo que todas as scenes Phaser estejam
  registradas antes do primeiro mount.
- `src/lib/active-child.ts` — cookie HttpOnly `nka_active_child` com validação
  server-side de ownership. Substitui o "primeiro filho do owner" placeholder
  em `(child)/session/[sessionId]/page.tsx`.

### Migration de autocreate

- `20260511120300_spec_v1_family_autocreate.sql` — trigger
  `ensure_family_on_signup` cria família automática no signup (paralelo ao
  `handle_new_user` legado); função `get_family_id_for_user` helper.

### Server actions (`src/features/children/actions.ts`)

- `createChildAction` — fluxo completo: cria criança, registra `consents` com
  POLICY_VERSION, auto-cria family se inexistente.
- `activateChildAction` / `deactivateChildAction` — setam/limpam cookie
  active-child.

### Rotas (parent) adicionais

- `/children/new` + `form.tsx` (consentimento LGPD obrigatório com 3 escopos:
  basic/improvement/communications)
- `/children/[childId]` (detalhe + stats + botão "ativar perfil")
- `/children/[childId]/reports` (tabela das últimas 50 sessões)
- `/children/[childId]/audit` (audit log viewer per-criança, RLS-protected)
- `/settings/lgpd` + `lgpd-actions.tsx` (export download via Blob,
  erasure com confirmação dupla + reason opcional)

### Adapters adicionais

- `audio-adapter.ts` — `<audio>` element com play button + auto-play attempt.
- `video-adapter.ts` — Cloudflare Stream via iframe + postMessage listener
  para `timeupdate`/`ended`/`error`; respeita `minDurationSeconds` da
  successCriteria.
- `native-html-adapter.ts` — React component registry para minigames simples
  (`registerNativeAtom(key, loader)`).
- `getAdapter(engine)` resolve todos os 4 engines.

### Cenas Phaser adicionais

- `number-recognition` — toque no número alvo entre distratores (igual
  arquitetura da letter-recognition).
- `letter-discrimination` — "toque no que não é X" (atom_type `discrimination`).

### Seed extras (`supabase/seeds/spec_v1_catalog_extras.sql`)

- Conceitos `numero-1`, `numero-2`, `numero-3`.
- Sessões "Número 1", "Número 2", "Número 3" no capítulo "Os Três Amiguinhos".
- Átomo recognition do Número 3 (linkado ao conceito `numero-3`).
- Átomo discrimination na sessão "Letra A".

### Edge Function

- `supabase/functions/hard-delete-children/index.ts` — Deno function que
  executa hard delete em crianças com `deleted_at > 30 dias`. Autenticação
  via `x-cron-secret` header. Configurar cron diário no Supabase dashboard.

### Conflito de rota resolvido

- `(child)/home` foi renomeado para `(child)/inicio` (rota `/inicio`)
  porque `(app)/home/page.tsx` (legado) reivindica `/home`. O entry point
  da criança no spec v1 agora é `/inicio`.

---

## Arquivos criados (24 novos + 4 modificados)

**Migrations:**

- `supabase/migrations/20260511120000_spec_v1_schema.sql`
- `supabase/migrations/20260511120100_spec_v1_triggers.sql`
- `supabase/migrations/20260511120200_spec_v1_rls.sql`
- `supabase/migrations/20260511120300_spec_v1_family_autocreate.sql`
- `supabase/seeds/spec_v1_catalog.sql`
- `supabase/seeds/spec_v1_catalog_extras.sql`

**Lib:**

- `src/lib/games/adapter.ts`, `phaser-adapter.ts`, `audio-adapter.ts`,
  `video-adapter.ts`, `native-html-adapter.ts`, `index.ts`
- `src/lib/audio/tts.ts`, `narration.ts`, `voice-config.ts`
- `src/lib/lgpd/consent.ts`, `erasure.ts`, `export.ts`, `redact.ts`
- `src/lib/revenuecat/client.ts`, `entitlements.ts`, `webhook.ts`
- `src/lib/supabase/admin.ts`
- `src/lib/active-child.ts`

**Features + Store:**

- `src/features/sessions/{types,proxy,index}.ts` + `components/session-player.tsx`
- `src/features/children/proxy.ts`, `actions.ts`
- `src/features/billing/proxy.ts`
- `src/stores/session-player.ts`

**Tipos:**

- `src/types/domain.ts`
- `src/types/database.types.ts` (estendido com 15 tabelas spec v1)

**Rotas:**

- `src/app/(marketing)/layout.tsx`, `planos/page.tsx`
- `src/app/(parent)/layout.tsx`, `dashboard/page.tsx`, `children/page.tsx`,
  `children/new/{page,form}.tsx`, `children/[childId]/page.tsx`,
  `children/[childId]/reports/page.tsx`, `children/[childId]/audit/page.tsx`,
  `billing/page.tsx`, `settings/page.tsx`, `settings/lgpd/{page,lgpd-actions}.tsx`
- `src/app/(child)/layout.tsx`, `inicio/page.tsx`, `axis/[axisId]/page.tsx`,
  `chapter/[chapterId]/page.tsx`, `session/[sessionId]/{page,session-runner}.tsx`
- `src/app/api/lgpd/export/route.ts`, `lgpd/erasure/route.ts`,
  `progress/route.ts`, `revenuecat/webhook/route.ts`

**Games + Providers:**

- `src/games/phaser/letter-recognition/{scene,index}.ts`
- `src/games/phaser/number-recognition/{scene,index}.ts`
- `src/games/phaser/letter-discrimination/{scene,index}.ts`
- `src/games/phaser/scene-registry.ts`
- `src/providers/game-registry-provider.tsx`

**Edge Functions:**

- `supabase/functions/hard-delete-children/index.ts`

**Modificados:**

- `src/lib/supabase/client.ts` (alias adicionado)
- `src/types/database.types.ts` (tabelas spec v1)
- `src/proxy.ts` (rotas spec v1 protegidas)
- `src/providers/providers.tsx` (GameRegistryProvider)
- `tsconfig.json` (excluir `supabase/functions`)

---

## Decisões tomadas sem aprovação (registrar caso queira reverter)

1. **Coexistência de schemas**: novo schema em inglês coexiste com legado em
   português. Nenhuma DROP table. Migração de dados é tarefa separada.
2. **Rotas paralelas**: `(parent)`, `(child)`, `(marketing)` coexistem com
   `(app)`, `pais` legados. proxy.ts atual provavelmente não cobre as novas.
3. **Database.types.ts manual**: estendido manualmente em vez de regenerar.
   Substituir após primeiro `supabase db push` + `supabase gen types`.
4. **Voz e personagens**: ainda placeholders. Não há blocker técnico.
5. **POLICY_VERSION = "1.0"**: número placeholder. Bump quando jurídico
   aprovar texto.

Caso qualquer decisão precise reverter: as adições são todas aditivas, basta
deletar os arquivos listados.

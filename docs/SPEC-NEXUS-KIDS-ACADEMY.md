# Nexus Kids Academy — Especificação Completa de Implementação

> Documento-fonte para implementação pelo Claude Code no VSCode. Carrega contexto completo: produto, pedagogia, dados, código, compliance.
>
> **Como usar**: este arquivo é o input canônico. Quando entrar em conflito com memória anterior, este documento prevalece. Quando um trecho for ambíguo, pare e pergunte — não invente.
>
> **Status**: v1 do spec. Sujeito a refinamento conforme implementação.
> **Última atualização**: maio/2026

---

## 0. TL;DR

App educacional gamificado para crianças de 5 a 8 anos (MVP), com expansão para 3-4 em v2. Vertical Kids do ecossistema Nexus. Marca-mãe: Nexus. Stack: Next 16 + React 19 + Phaser 4.1 + Supabase + Capacitor. Pais pagam, crianças usam. Zero ads, LGPD-first, white background, microlearning em sessões de 5-12 min compostas por átomos de 1-3 min. Compliance LGPD Crianças é obrigatório, não negociável.

**MVP entrega**: 1 Mundo (Exploradores, 5-6 anos), 2 Eixos (Letras + Números), 12 Capítulos, ~150 Sessões, painel completo do pai, billing via RevenueCat, modo offline básico.

**Fora do MVP**: Mundo dos Inventores (7-8), Mundo dos Curiosos (3-4), eixos Descobertas e Afetos, family plan multi-criança, cross-product entitlement com Drive.

---

## 1. Contexto de produto

Audiência dupla:

- **Usuário final**: criança 5-8. Não lê texto longo, opera por toque/drag/voz, tolera 5-15 min de tela contínua. No MVP, foco em 5-6 anos.
- **Decisor de compra**: pai/responsável 25-45. Precisa ver evidência de aprendizado, não só engajamento. Painel é diferencial.

Concorrentes principais a observar: Khan Kids (grátis, americano), Lingokids (~R$ 50/mês, foco em inglês), kidsacademy.mobi (freemium, ameaça INPI). Posicionamento: tempo de tela com prova de aprendizado, em português brasileiro, alinhado à BNCC.

Decisões irreversíveis herdadas do handoff de negócios:

- Nome: `Nexus Kids Academy` (marca composta, NEXUS dominante visualmente)
- Idioma de naming: inglês (todo o ecossistema)
- Stack: Capacitor (iOS + Android, codebase único)
- Billing: RevenueCat
- Vídeo: Cloudflare Stream
- Posição no roadmap: v5 do ecossistema (após v4 DriveConnect do Drive Academy)

---

## 2. Stack técnica — versões travadas

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| UI lib | React | 19.2.4 |
| Tipos | TypeScript strict | 5.x |
| Estilo | Tailwind CSS | 4.x |
| Componentes | shadcn theme `base-nova` | conforme repo |
| Game engine | Phaser | 4.1.x |
| Mobile wrapper | Capacitor | 8.3.2 |
| Backend | Supabase (SSR client) | atual |
| Server state | TanStack Query | 5.x |
| UI state | Zustand | 5.x |
| Animações | Framer Motion | 12.x |
| i18n | next-intl | 4.x |
| Forms | react-hook-form + zod | 4.x (zod) |
| Billing | RevenueCat | SDK web + Capacitor |
| Vídeo | Cloudflare Stream | — |

Não atualize versões sem consultar. Tailwind 4 e Next 16 têm breaking changes que afetam todo o codebase.

---

## 3. Convenções de código

### Idioma
- Código (variáveis, funções, tipos, tabelas, colunas, comentários): **inglês**
- UI visível ao usuário (copy, labels, mensagens): **pt-BR**
- Headers de commit, README, docs: pt-BR
- Console logs e telemetria: inglês

### Naming
- Arquivos: `kebab-case.tsx` (ex: `session-player.tsx`)
- Componentes React: `PascalCase` (ex: `SessionPlayer`)
- Hooks: `useCamelCase` (ex: `useChildProgress`)
- Funções e variáveis: `camelCase`
- Constantes globais: `SCREAMING_SNAKE_CASE`
- Tipos e interfaces: `PascalCase` (sem prefixo `I`)
- Tabelas Supabase: `snake_case` plural (`children`, `sessions`, `atoms`)
- Colunas: `snake_case` (`created_at`, `world_id`)
- Stores Zustand: `useXStore` (ex: `useSessionStore`)

### Estrutura de arquivos
- 1 componente por arquivo
- Co-localizar tipos e helpers usados apenas pelo componente
- Helpers compartilhados em `src/lib/`
- Server components por padrão; `"use client"` só quando necessário (estado, eventos, browser APIs)

### Padrões React/Next
- App Router (não Pages Router)
- Server Components default; Client Components com `"use client"` no topo
- Loading e error UI via `loading.tsx` / `error.tsx` por segmento
- Suspense boundaries onde fizer sentido
- `route.ts` para handlers de API (sem `pages/api/`)

### Estado
- **Server state**: TanStack Query 5. Não usar Zustand para dados do Supabase.
- **UI state**: Zustand 5. Stores pequenos, separados por domínio.
- **Form state**: react-hook-form + zod. Não usar `useState` para forms com mais de 2 campos.
- Não misturar: nunca cachear dados do servidor em Zustand.

### Convenção `proxy.ts` (herdada do Elite Academy)
Cada feature crítica que toca múltiplos sistemas (Supabase + RevenueCat + Cloudflare Stream + Phaser, por exemplo) expõe um `proxy.ts` que centraliza as chamadas externas. Componentes consomem o proxy, não os SDKs diretamente. Vantagens: testabilidade, swap de provider, observabilidade central.

Exemplo de pasta com proxy:

```
src/features/sessions/
├── components/
├── hooks/
├── types.ts
├── proxy.ts          # facade para Supabase + Phaser + áudio
└── index.ts
```

### Multi-engine games
Game Adapter Pattern (ver seção 10). Componentes consomem o adapter, não o Phaser direto. Permite trocar engine no futuro (Three.js, native HTML, etc) sem reescrever átomos.

---

## 4. Estrutura de pastas

```
nexus-kids-academy/
├── src/
│   ├── app/
│   │   ├── (marketing)/                    # landing, planos, blog
│   │   │   ├── page.tsx
│   │   │   └── planos/page.tsx
│   │   ├── (parent)/                       # painel do pai, autenticado
│   │   │   ├── layout.tsx                  # auth guard + sidebar
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── children/
│   │   │   │   ├── page.tsx                # listagem de filhos
│   │   │   │   └── [childId]/
│   │   │   │       ├── page.tsx            # perfil + progresso
│   │   │   │       └── reports/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── billing/page.tsx
│   │   ├── (child)/                        # modo criança, perfil ativo
│   │   │   ├── layout.tsx                  # bloqueio de gestos parentais
│   │   │   ├── home/page.tsx               # mapa do Mundo
│   │   │   ├── axis/[axisId]/page.tsx      # eixo selecionado
│   │   │   ├── chapter/[chapterId]/page.tsx
│   │   │   └── session/[sessionId]/page.tsx # session player
│   │   ├── api/
│   │   │   ├── revenuecat/webhook/route.ts
│   │   │   ├── lgpd/erasure/route.ts
│   │   │   └── progress/route.ts
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                             # shadcn base-nova primitives
│   │   ├── parent/                         # cards, charts, forms do pai
│   │   ├── child/                          # botões grandes, personagens
│   │   └── games/                          # canvas wrapper, adapters
│   ├── features/                           # vertical slices
│   │   ├── auth/
│   │   ├── children/
│   │   ├── sessions/
│   │   ├── progress/
│   │   ├── billing/
│   │   └── lgpd/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                   # browser client
│   │   │   ├── server.ts                   # server client (RSC)
│   │   │   └── middleware.ts               # session refresh
│   │   ├── games/                          # Game Adapter Pattern
│   │   │   ├── adapter.ts                  # interface
│   │   │   ├── phaser-adapter.ts
│   │   │   └── types.ts
│   │   ├── audio/
│   │   │   ├── tts.ts                      # Web Speech API wrapper
│   │   │   ├── narration.ts                # pre-rendered audio
│   │   │   └── voice-config.ts
│   │   ├── lgpd/
│   │   │   ├── consent.ts
│   │   │   ├── erasure.ts
│   │   │   └── audit.ts
│   │   ├── revenuecat/
│   │   │   ├── client.ts
│   │   │   └── entitlements.ts
│   │   └── utils/
│   ├── hooks/
│   ├── stores/                             # zustand
│   │   ├── active-child.ts
│   │   ├── session-player.ts
│   │   └── audio-player.ts
│   ├── types/
│   │   ├── database.ts                     # gerado: supabase gen types
│   │   └── domain.ts                       # tipos de domínio (Atom, Session...)
│   ├── i18n/
│   │   ├── pt-BR.json
│   │   └── config.ts
│   └── styles/
│       └── globals.css
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── android/                                # Capacitor
├── ios/                                    # Capacitor
├── public/
│   ├── audio/                              # pre-rendered narration
│   ├── characters/                         # SVG dos personagens
│   └── icons/
├── capacitor.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Arquitetura pedagógica — 5 tiers

Hierarquia central do produto. Cada nível tem função distinta e granularidade distinta.

### Tier 1 — Mundo (`worlds`)
Definido por faixa etária. Uma criança vive em um Mundo ativo por vez. Conteúdo, personagens e tom são exclusivos do Mundo. MVP: `Exploradores` (5-6). v2: `Inventores` (7-8). v3: `Curiosos` (3-4, arquitetura simplificada — ver seção 5.6).

### Tier 2 — Eixo de habilidade (`axes`)
2 a 4 trilhas paralelas por Mundo. MVP entrega 2: `Letras` (alfabetização) e `Números` (matemática inicial). Criança escolhe livremente entre eixos — autonomia preservada.

### Tier 3 — Capítulo (`chapters`)
4 a 6 capítulos por eixo. Cada capítulo tem arco narrativo curto (~3 semanas de uso típico, 15-20 sessões). É a unidade que aparece no painel do pai como "completou X de Y capítulos".

### Tier 4 — Sessão (`sessions`) — UNIDADE CENTRAL DE MICROLEARNING
15 a 20 sessões por capítulo. Duração: 5-12 min (5-6 anos), 10-15 min (7-8 anos). **Esta é a unidade que a criança "começa e termina" numa única abertura do app.** Toda telemetria, gamificação e save state pivotam aqui. Sessão tem um único objetivo de aprendizado e contém 3-5 átomos.

### Tier 5 — Átomo (`atoms`)
Bloco de 1-3 min com uma única interação pedagógica. É o que o Phaser/HTML renderiza. Tipos canônicos para o Mundo dos Exploradores e Inventores:

- `presentation` — vídeo curto ou animação 30-60s, introduz conceito
- `recognition` — toque para identificar ("qual é a letra A?")
- `discrimination` — toque para distinguir ("qual NÃO é a letra A?")
- `guided_production` — drag/trace com guia visual
- `free_production` — drag/trace sem guia
- `application` — minijogo Phaser aplicando o conceito em contexto

Cada átomo declara: tipo, engine (`phaser` / `video` / `audio` / `native_html`), config (engine-specific), conceitos taggeados (para spaced repetition), critério de sucesso.

### 5.6 — Arquitetura simplificada para 3-4 anos (v2)
Não copiar a estrutura acima. Mundo dos Curiosos usa **4 tiers em vez de 5** (sem Capítulo) e átomos de tipos diferentes (`listen`, `imitate`, `play`, `celebrate`). Sessões de 3-5 min, átomos de 30-90s. Hit area mínima 80px (não 64). Narração com voz humana real, não TTS. Documentar em spec separado quando aproximar v2.

---

## 6. Modelo de dados Supabase — DDL

### Princípios
- Todas as tabelas têm `id uuid primary key default gen_random_uuid()`, `created_at timestamptz default now()`, `updated_at timestamptz default now()` (com trigger).
- Trigger `set_updated_at` em todas as tabelas mutáveis.
- RLS habilitado em **todas** as tabelas. Sem exceção.
- Soft delete via `deleted_at timestamptz` em tabelas com dados de criança (LGPD reversível antes da erasure final).
- Audit log automático via trigger em tabelas com dados de criança.

### 6.1 Tabelas

```sql
-- ============================================
-- IDENTIDADE E AUTORIZAÇÃO
-- ============================================

-- Família = unidade de billing e consentimento
create table families (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  display_name text,
  country_code text not null default 'BR',
  locale text not null default 'pt-BR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Perfil da criança (filho da família)
create table children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  display_name text not null,             -- apelido escolhido pelo pai
  birth_year smallint not null,           -- só ano, nunca dia/mês
  avatar_seed text,                       -- semente para gerar avatar
  active_world_id uuid references worlds(id),
  preferred_voice text,                   -- id da voz pré-renderizada
  hand_preference text,                   -- 'left' | 'right' | null
  onboarding_completed_at timestamptz,
  deleted_at timestamptz,                 -- soft delete para LGPD
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index children_family_id_idx on children(family_id) where deleted_at is null;

-- Consentimento LGPD por criança
create table consents (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  granted_by uuid not null references auth.users(id),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  scope jsonb not null,                   -- {"audio": true, "analytics": false, ...}
  policy_version text not null,           -- ex: "1.0"
  ip_address inet,
  user_agent text
);

create index consents_child_id_idx on consents(child_id);

-- ============================================
-- CATÁLOGO DE CONTEÚDO
-- ============================================

create table worlds (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,              -- 'exploradores', 'inventores', 'curiosos'
  display_name text not null,             -- 'Mundo dos Exploradores'
  age_min smallint not null,
  age_max smallint not null,
  description text,
  theme_color text,                       -- hex
  hit_area_min_px smallint not null default 64,
  session_duration_min_seconds int not null default 300,
  session_duration_max_seconds int not null default 720,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table axes (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references worlds(id),
  slug text not null,                     -- 'letras', 'numeros'
  display_name text not null,             -- 'Letras'
  subtitle text,                          -- 'alfabetização'
  icon_name text,                         -- tabler icon name
  display_order smallint not null default 0,
  active boolean not null default true,
  unique(world_id, slug)
);

create table chapters (
  id uuid primary key default gen_random_uuid(),
  axis_id uuid not null references axes(id),
  display_name text not null,             -- 'Capítulo 1: A Letra Perdida'
  description text,
  display_order smallint not null,
  estimated_weeks smallint default 3,
  active boolean not null default true,
  unique(axis_id, display_order)
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id),
  display_name text not null,             -- 'Letra A'
  learning_objective text not null,       -- objetivo único da sessão
  display_order smallint not null,
  estimated_duration_seconds int not null,
  active boolean not null default true,
  unique(chapter_id, display_order)
);

create table atoms (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id),
  atom_type text not null,                -- 'presentation' | 'recognition' | ...
  engine text not null,                   -- 'phaser' | 'video' | 'audio' | 'native_html'
  config jsonb not null,                  -- engine-specific config
  display_order smallint not null,
  estimated_duration_seconds int not null,
  success_criteria jsonb not null,        -- {"min_accuracy": 0.7, "max_attempts": 3}
  active boolean not null default true,
  unique(session_id, display_order)
);

create index atoms_session_id_idx on atoms(session_id);

-- ============================================
-- CONCEITOS (spaced repetition)
-- ============================================

create table concepts (
  id uuid primary key default gen_random_uuid(),
  axis_id uuid not null references axes(id),
  slug text not null,                     -- 'letra-a', 'numero-3'
  display_name text not null,
  bncc_code text,                         -- código BNCC mapeado
  unique(axis_id, slug)
);

-- N:N entre átomos e conceitos (um átomo trabalha múltiplos conceitos)
create table atom_concepts (
  atom_id uuid not null references atoms(id) on delete cascade,
  concept_id uuid not null references concepts(id) on delete cascade,
  weight smallint not null default 1,     -- peso do conceito neste átomo
  primary key (atom_id, concept_id)
);

-- ============================================
-- PROGRESSO E TELEMETRIA
-- ============================================

create table session_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  session_id uuid not null references sessions(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  total_attempts int not null default 0,
  success_score real,                     -- 0..1
  unique(child_id, session_id)
);

create index session_progress_child_id_idx on session_progress(child_id);

create table atom_attempts (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  atom_id uuid not null references atoms(id),
  session_progress_id uuid references session_progress(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  success boolean,
  difficulty_level smallint not null default 1,  -- 1=fácil ... 3=desafio
  result jsonb,                           -- detalhes engine-specific
  created_at timestamptz not null default now()
);

create index atom_attempts_child_id_idx on atom_attempts(child_id);
create index atom_attempts_atom_id_idx on atom_attempts(atom_id);

-- Fila de repetição espaçada por criança/conceito
create table repetition_queue (
  child_id uuid not null references children(id) on delete cascade,
  concept_id uuid not null references concepts(id) on delete cascade,
  mastery_score real not null default 0,  -- 0..1
  next_review_at timestamptz not null,
  interval_days smallint not null default 1,
  last_seen_at timestamptz,
  primary key (child_id, concept_id)
);

create index repetition_queue_due_idx on repetition_queue(child_id, next_review_at);

-- ============================================
-- ACESSO E BILLING
-- ============================================

create table entitlements (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  product_slug text not null,             -- 'kids-monthly', 'kids-annual'
  source text not null,                   -- 'revenuecat', 'drive-founder-grant'
  active boolean not null default true,
  expires_at timestamptz,
  metadata jsonb,                         -- payload original da fonte
  created_at timestamptz not null default now()
);

create index entitlements_family_id_idx on entitlements(family_id) where active = true;

-- ============================================
-- AUDIT (LGPD)
-- ============================================

create table audit_log (
  id bigserial primary key,
  occurred_at timestamptz not null default now(),
  actor_id uuid,                          -- auth.users.id ou null para sistema
  child_id uuid,                          -- quando aplicável
  action text not null,                   -- 'insert' | 'update' | 'delete' | 'export' | 'erasure'
  entity_table text not null,
  entity_id uuid,
  diff jsonb                              -- before/after
);

create index audit_log_child_id_idx on audit_log(child_id, occurred_at desc);
```

### 6.2 Triggers essenciais

```sql
-- updated_at automático
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Aplicar em todas as tabelas com updated_at
-- (children, families, etc)
create trigger trg_children_updated_at
  before update on children
  for each row execute function set_updated_at();

-- Audit trigger para dados de criança
create or replace function audit_child_data() returns trigger as $$
declare
  v_child_id uuid;
begin
  v_child_id := coalesce(new.child_id, old.child_id, new.id, old.id);
  insert into audit_log(actor_id, child_id, action, entity_table, entity_id, diff)
  values (
    auth.uid(),
    v_child_id,
    tg_op::text,
    tg_table_name,
    coalesce(new.id, old.id),
    jsonb_build_object('before', to_jsonb(old), 'after', to_jsonb(new))
  );
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

create trigger trg_children_audit
  after insert or update or delete on children
  for each row execute function audit_child_data();

-- Replicar em: session_progress, atom_attempts, consents
```

### 6.3 pgvector (opcional, v2+)

Habilitar `vector` extension para embeddings de:
- Perfil de aprendizagem da criança (clustering de dificuldades)
- Recomendação cross-eixo

Não bloquear MVP por isso. Coluna `embedding vector(384)` em `children` quando precisar.

---

## 7. RLS policies

Princípio: parent só acessa dados da própria família. Criança não autentica diretamente (sem login para menor). Sistema (service role) faz operações administrativas.

```sql
alter table families enable row level security;

create policy "owner reads own family" on families
  for select using (owner_id = auth.uid());

create policy "owner updates own family" on families
  for update using (owner_id = auth.uid());

alter table children enable row level security;

create policy "parent reads own children" on children
  for select using (
    family_id in (select id from families where owner_id = auth.uid())
    and deleted_at is null
  );

create policy "parent inserts own children" on children
  for insert with check (
    family_id in (select id from families where owner_id = auth.uid())
  );

create policy "parent updates own children" on children
  for update using (
    family_id in (select id from families where owner_id = auth.uid())
  );

-- Criança "loga" via service role assumindo seu child_id no JWT custom claim.
-- Progresso é gravado server-side, nunca direto pelo client da criança.

alter table session_progress enable row level security;

create policy "parent reads progress of own children" on session_progress
  for select using (
    child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );

-- Inserts e updates de progresso só via service role em route handlers
-- com validação custom de child_id ativo na sessão do navegador.

-- Catálogo (worlds, axes, chapters, sessions, atoms, concepts):
-- leitura pública autenticada, escrita só admin via service role.

alter table worlds enable row level security;
create policy "authenticated read worlds" on worlds for select using (auth.role() = 'authenticated' and active = true);

-- Replicar para axes, chapters, sessions, atoms, atom_concepts, concepts.

alter table audit_log enable row level security;
create policy "parent reads own audit log" on audit_log
  for select using (
    child_id in (
      select id from children
      where family_id in (select id from families where owner_id = auth.uid())
    )
  );
-- Audit é só leitura para usuários. Inserts só pelos triggers (security definer).
```

---

## 8. Tipos TypeScript canônicos

Gerar tipos do Supabase via `supabase gen types typescript --linked > src/types/database.ts`. Tipos de domínio em `src/types/domain.ts`:

```ts
// src/types/domain.ts

export type AtomType =
  | 'presentation'
  | 'recognition'
  | 'discrimination'
  | 'guided_production'
  | 'free_production'
  | 'application'

export type GameEngine = 'phaser' | 'video' | 'audio' | 'native_html'

export interface AtomConfig {
  // shape varia por engine; usar discriminated unions
}

export interface PhaserAtomConfig {
  scene: string                          // nome da cena registrada
  assets: Array<{ key: string; url: string; type: 'image' | 'audio' | 'spritesheet' }>
  params: Record<string, unknown>        // parâmetros específicos da cena
}

export interface VideoAtomConfig {
  streamId: string                       // Cloudflare Stream ID
  poster?: string
  captions?: string                      // VTT URL
}

export interface SuccessCriteria {
  minAccuracy?: number                   // 0..1
  maxAttempts?: number
  minDurationSeconds?: number            // para vídeos: tempo mínimo assistido
}

export interface AtomResult {
  success: boolean
  durationMs: number
  attempts: number
  difficultyLevel: 1 | 2 | 3
  conceptsScored: Array<{ conceptId: string; score: number }>
  raw?: Record<string, unknown>          // engine-specific
}

// Session state na zustand store
export interface SessionState {
  sessionId: string | null
  childId: string | null
  currentAtomIndex: number
  atomResults: AtomResult[]
  startedAt: Date | null
  status: 'idle' | 'playing' | 'paused' | 'completed' | 'error'
}
```

---

## 9. Padrões de UI para crianças

### Princípios não-negociáveis
- **White background** sempre na área da criança. Sem dark mode (essa convenção é só para o painel do pai, se configurada).
- **Hit area mínima 64px** para 5-6 anos. **80px** para 3-4 anos. **48px** só no painel do pai. Aplica a botões, ícones tocáveis, alvos de drag, áreas de pin/snap.
- **Texto NUNCA é a única carga de sentido**. Toda informação vem acompanhada de ícone + áudio. Mesmo botão "Sim" tem ícone de check e narração ao foco.
- **Áudio toca automaticamente** ao entrar em uma tela nova. Pai pode desligar nas settings do painel; criança não.
- **Animações sutis com Framer Motion**. Sem CSS animations infinitas (já tem efeito visual barulhento). Sem confetti default em conclusões; reservar para conquistas reais.
- **2 weights de fonte**: 400 e 500. Nunca 600/700. Mesmo princípio do design system Anthropic.
- **Sem rolagem horizontal**. Tudo cabe na tela ou vira nova tela.
- **Botão de ajuda persistente** (canto superior direito), reproduz a instrução em áudio. Toque grande.

### Padrões específicos
- Botão primário: 80px altura mínima, coral `#E26B45` (a definir exato), texto branco, ícone esquerda, label direita
- Personagem-guia presente em todas as telas da criança como anchor visual (não decoração)
- Transições de tela: 200-300ms ease-out (Framer Motion)
- Feedback de toque: scale 0.95 + haptic (Capacitor Haptics) quando disponível
- Feedback de acerto: animação curta + som + voz ("muito bem!") — variar para não cansar
- Feedback de erro: nunca punitivo. Som suave, voz encorajadora ("tenta de novo!"), retry imediato

### Tabler Icons (outline only)
Mesma convenção do ecossistema. Importar via `@tabler/icons-react`. Tamanhos: 24px inline, 40-48px decorativo grande. Stroke 1.5 default.

---

## 10. Game Adapter Pattern

Abstrair Phaser para permitir múltiplos engines e facilitar testes.

```ts
// src/lib/games/adapter.ts

export interface GameAdapter<TConfig, TResult> {
  readonly engine: GameEngine
  mount(container: HTMLElement, config: TConfig): Promise<GameInstance<TResult>>
}

export interface GameInstance<TResult> {
  pause(): void
  resume(): void
  destroy(): Promise<void>
  onComplete(cb: (result: TResult) => void): void
  onError(cb: (error: GameError) => void): void
  onProgress?(cb: (progress: number) => void): void
}

export class GameError extends Error {
  constructor(message: string, public readonly code: string, public readonly cause?: unknown) {
    super(message)
  }
}
```

```ts
// src/lib/games/phaser-adapter.ts

import type Phaser from 'phaser'
import type { GameAdapter, GameInstance } from './adapter'
import type { PhaserAtomConfig, AtomResult } from '@/types/domain'

export class PhaserAdapter implements GameAdapter<PhaserAtomConfig, AtomResult> {
  readonly engine = 'phaser' as const

  async mount(container: HTMLElement, config: PhaserAtomConfig): Promise<GameInstance<AtomResult>> {
    // dynamic import para não inflar o bundle inicial
    const Phaser = (await import('phaser')).default
    const SceneClass = await loadScene(config.scene)

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      backgroundColor: '#FFFFFF',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: SceneClass,
      input: { activePointers: 2 },
    })

    return new PhaserInstance(game, config)
  }
}

class PhaserInstance implements GameInstance<AtomResult> {
  // implementar pause/resume/destroy/onComplete/onError
}
```

### Lições aprendidas Phaser (herdadas)

Documentar como código defensivo nos adapters:

1. **Drag em `Image`**: Phaser não habilita drag em `Image` por default. Sempre setar `image.setInteractive({ draggable: true })` e adicionar a cena ao `input.dragDistanceThreshold`. Para `Sprite`, drag funciona out-of-the-box.

2. **Emoji no canvas**: renderização de emoji via `Text` no Phaser falha em alguns devices Android antigos. Para qualquer emoji ou caractere fora do BMP, usar sprite pré-renderizado ou SVG inline. Nunca confiar em `setText('🎉')`.

3. **Tween em dragstart**: se um objeto tem tween ativo no momento do `dragstart`, o drag quebra (offset incorreto). Sempre matar tweens do objeto antes de iniciar drag: `this.tweens.killTweensOf(target)`.

4. **TTS pt-BR**: Web Speech API tem voz pt-BR variável (algumas devices só têm pt-PT). Sempre testar `speechSynthesis.getVoices()` e fallback para áudio pré-renderizado quando voz pt-BR ausente. Em Capacitor iOS, preferir plugin nativo `@capacitor-community/speech-recognition` ou TTS pré-renderizado.

5. **Hit area 64px Phaser**: usar `setInteractive({ hitArea: new Phaser.Geom.Rectangle(...), hitAreaCallback: Phaser.Geom.Rectangle.Contains })` quando o sprite for menor que o alvo de toque desejado.

---

## 11. Áudio e TTS pt-BR

### Estratégia
- **Narração principal** (instruções, personagem falando): pré-renderizada, hospedada em Cloudflare R2. URL em `atoms.config`.
- **Texto dinâmico do painel do pai**: TTS via Web Speech API quando disponível (não crítico).
- **Voz da criança não é capturada nem processada**. Atividades de produção oral marcam "feito" via timer ou botão, não reconhecimento.

### Wrapper TTS

```ts
// src/lib/audio/tts.ts

export interface TTSOptions {
  voice?: string
  rate?: number      // 0.8-1.2
  pitch?: number     // 0.9-1.1
  volume?: number
}

export class TTSService {
  private synth: SpeechSynthesis | null = null
  private voicePtBR: SpeechSynthesisVoice | null = null

  constructor() {
    if (typeof window === 'undefined') return
    this.synth = window.speechSynthesis
    this.loadVoice()
  }

  private loadVoice() {
    const voices = this.synth?.getVoices() ?? []
    this.voicePtBR =
      voices.find(v => v.lang === 'pt-BR') ??
      voices.find(v => v.lang.startsWith('pt')) ??
      null
  }

  async speak(text: string, opts: TTSOptions = {}): Promise<void> {
    if (!this.synth || !this.voicePtBR) {
      throw new Error('TTS unavailable; use pre-rendered audio')
    }
    return new Promise((resolve, reject) => {
      const utter = new SpeechSynthesisUtterance(text)
      utter.voice = this.voicePtBR
      utter.rate = opts.rate ?? 1
      utter.pitch = opts.pitch ?? 1
      utter.volume = opts.volume ?? 1
      utter.onend = () => resolve()
      utter.onerror = e => reject(e)
      this.synth!.speak(utter)
    })
  }
}
```

### Áudio pré-renderizado

```ts
// src/lib/audio/narration.ts

export class NarrationPlayer {
  private audio: HTMLAudioElement | null = null

  async play(url: string): Promise<void> {
    this.stop()
    return new Promise((resolve, reject) => {
      const audio = new Audio(url)
      audio.onended = () => resolve()
      audio.onerror = e => reject(e)
      this.audio = audio
      audio.play()
    })
  }

  stop() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
      this.audio = null
    }
  }
}
```

---

## 12. Rotas e telas principais

### `(marketing)` — não autenticado
- `/` — landing
- `/planos` — pricing
- `/sobre` — sobre Nexus
- `/login` — auth (apenas pai)

### `(parent)` — autenticado, layout com sidebar
- `/dashboard` — visão geral
- `/children` — listagem dos filhos
- `/children/new` — criar perfil de criança (consentimento LGPD obrigatório aqui)
- `/children/[id]` — perfil + progresso
- `/children/[id]/reports` — relatórios detalhados
- `/children/[id]/settings` — settings específicos (limites de tempo, voz, etc)
- `/settings` — settings da conta
- `/billing` — assinatura, histórico, gerenciar via RevenueCat

### `(child)` — perfil ativo da criança, layout sem navegação parental
- `/home` — mapa do Mundo (escolha de eixo)
- `/axis/[axisId]` — mapa do eixo (escolha de capítulo)
- `/chapter/[chapterId]` — mapa do capítulo (escolha de sessão, com próxima sugerida pulsando)
- `/session/[sessionId]` — session player (renderiza sequência de átomos)

### `/api`
- `/api/revenuecat/webhook` — sync de entitlements
- `/api/lgpd/export` — exportar dados de uma criança (JSON)
- `/api/lgpd/erasure` — disparar erasure (soft delete + agendamento de hard delete em 30 dias)
- `/api/progress` — gravar resultado de átomo/sessão (server-side, validação custom)

### Modo criança — bloqueio de saída
Em `(child)/layout.tsx`, capturar gestos do iOS/Android que poderiam fechar o app ou abrir notificações. No Capacitor, usar Guided Access (iOS) ou Screen Pinning (Android) opcionalmente. Mínimo: sem links externos, sem botões de back que voltem para o painel do pai sem PIN parental.

---

## 13. Compliance LGPD Crianças — checklist técnico

### Coleta
- ✅ Consentimento explícito do responsável antes de qualquer coleta. Tela dedicada com checkbox por escopo (uso básico, melhoria de produto, comunicações). Armazenar em `consents` com versão da política.
- ✅ Coletar apenas o mínimo. Nada de localização precisa, contatos, fotos, mídia da galeria.
- ✅ Idade da criança em granularidade de ANO (não data de nascimento). Coluna `birth_year` apenas.
- ✅ Sem nome legal completo. Apenas apelido (`display_name`).

### Acesso e processamento
- ✅ RLS bloqueando acesso cruzado entre famílias.
- ✅ Dados de criança nunca expostos em URLs (parâmetros de query). Apenas IDs uuid.
- ✅ Logs de aplicação não persistem PII de criança. Sanitizar com `redact()` antes de logar.
- ✅ Backups Supabase devem respeitar erasure: documentar e implementar processo de re-aplicação de erasure em backups quando solicitado.

### Direitos do titular
- ✅ Export: endpoint `/api/lgpd/export` retorna JSON com tudo sobre uma criança (perfil, progresso, attempts, consents).
- ✅ Erasure: endpoint `/api/lgpd/erasure` faz soft delete imediato (`deleted_at = now()`), agenda hard delete em 30 dias, dispara entrada em `audit_log` com `action = 'erasure'`.
- ✅ Correção: parent pode editar `display_name`, `birth_year`, `preferred_voice` a qualquer momento.
- ✅ Revogação de consentimento: marca `consents.revoked_at`, pausa coleta de telemetria opcional automaticamente.

### Segurança
- ✅ Auth via Supabase (email + senha, OAuth Google opcional). Senha forte enforcement no front (zod + zxcvbn).
- ✅ Service role key nunca exposta ao client. Operações privilegiadas via route handlers Next.
- ✅ Webhook RevenueCat valida assinatura HMAC.
- ✅ CSP estrita em produção.

### Banidos
- 🚫 Ads (de qualquer tipo, mesmo "educacionais")
- 🚫 Chats abertos entre crianças
- 🚫 Mensagens com adultos externos
- 🚫 Reconhecimento facial ou de voz para identificação
- 🚫 Tracking comportamental para publicidade
- 🚫 Cookies de terceiros (analytics first-party only)

---

## 14. Escopo MVP (v1)

### Conteúdo
- 1 Mundo: `Exploradores` (5-6 anos)
- 2 Eixos: `Letras` (alfabetização) + `Números` (matemática inicial 0-20)
- 6 Capítulos por eixo (12 total)
- ~12 Sessões por capítulo (~150 total)
- ~4 Átomos por sessão (~600 átomos total)
- Pelo menos 3 minijogos Phaser únicos no eixo Letras
- Pelo menos 3 minijogos Phaser únicos no eixo Números

### Funcionalidades — modo criança
- Onboarding (pai responde 3 perguntas para calibrar)
- Mapa do Mundo (escolha de eixo)
- Mapa do eixo (escolha de capítulo, com sugestão pulsante)
- Mapa do capítulo (escolha de sessão)
- Session player com 4 tipos de átomo: `presentation`, `recognition`, `guided_production`, `application`
- Sistema de "casa virtual" (coleção de criaturas conquistadas)
- Voz/áudio em todas as telas

### Funcionalidades — painel do pai
- Login/registro (email + senha)
- Criar e gerenciar perfis de até 2 crianças
- Dashboard com progresso semanal
- Relatório detalhado por criança (sessões completadas, conceitos dominados)
- Settings: limites de tempo diário, escolha de voz, ativar/desativar áudio
- Billing via RevenueCat (assinar, cancelar, ver histórico)
- LGPD: export + erasure self-service

### Tecnologia
- Web (Next 16) + Capacitor (iOS + Android)
- Modo offline básico: sessão já iniciada conclui sem rede; nova sessão exige rede
- TTS pt-BR onde disponível + áudio pré-renderizado como fallback

### Fora do MVP (v2+)
- Mundo dos Inventores (7-8)
- Mundo dos Curiosos (3-4) — arquitetura diferente, pipeline diferente
- Eixos Descobertas e Afetos
- Átomos `discrimination` e `free_production`
- Family Pass (multi-criança)
- Cross-product entitlement com Drive Academy
- Spaced repetition completa (MVP terá fila básica, sem algoritmo refinado)
- pgvector e recomendação adaptativa cross-eixo
- Modo offline completo

---

## 15. Anti-patterns — não fazer

### Pedagógicos
- 🚫 Streaks com timer de pressão ("você tem 24h ou perde a sequência")
- 🚫 Sistema de vidas/corações que esgotam (Duolingo-style)
- 🚫 Ranking social entre crianças
- 🚫 "Parabéns!" em literalmente tudo — perde valor
- 🚫 Voz adulta de "professor severo" — usar voz de personagem

### Técnicos
- 🚫 `localStorage` para qualquer dado de criança (LGPD)
- 🚫 Misturar TanStack Query e Zustand para o mesmo dado
- 🚫 CSS animations infinitas (`animation: spin infinite`) — Framer Motion controlado
- 🚫 Emoji renderizado em `<Text>` do Phaser (ver lição aprendida)
- 🚫 Importar Phaser estaticamente no bundle inicial — sempre dynamic import
- 🚫 Acessar Supabase com service role do client
- 🚫 Logar PII de criança em console ou serviço de log
- 🚫 URLs com nome/ID de criança em query string

### Marca
- 🚫 Vocabulário do Elite Academy (`Treino`, `Trilha`, `Piloto`, `Desafio`). Kids tem vocabulário próprio: `Sessão`, `Capítulo`, `Mundo`, `Aventura`.
- 🚫 Promessas de "aprenda rápido", "em 30 dias", "garantido". Pais querem aprendizado sólido, não atalhos.
- 🚫 Dark mode na área da criança.

---

## 16. Roadmap de implementação

Sprints de 1 semana, dedicação plena. Ajustar conforme realidade.

### Sprint 1 — Setup e infra
- Boot do projeto Next 16 + Capacitor + Tailwind 4 + shadcn `base-nova`
- Setup Supabase (migrations, RLS skeleton, gen types)
- Setup TanStack Query, Zustand, react-hook-form
- Estrutura de pastas conforme seção 4
- Auth básico (login/registro do pai)

### Sprint 2 — Modelo de dados e seed
- Aplicar todas as migrations da seção 6
- Triggers (`set_updated_at`, `audit_child_data`)
- RLS policies da seção 7
- Seed de catálogo: 1 mundo + 2 eixos + 6 capítulos + 1 capítulo completo com sessões e átomos de exemplo

### Sprint 3 — Painel do pai (CRUD)
- Layout autenticado
- Criar/listar/editar perfis de criança (com fluxo de consentimento LGPD)
- Dashboard com placeholder de métricas
- Settings

### Sprint 4 — Game Adapter + primeiro átomo Phaser
- Implementar `GameAdapter` interface e `PhaserAdapter`
- Cena Phaser de exemplo: `recognition` da letra A
- Wrapper React para montar/desmontar adapter
- Sistema de eventos completion/error/progress

### Sprint 5 — Session Player
- Rota `/session/[sessionId]` na área da criança
- Sequência de átomos com progressão
- Telemetria: registrar `atom_attempts` e `session_progress` via route handler
- Áudio: TTS + narração pré-renderizada

### Sprint 6 — Modo criança end-to-end
- Mapas: mundo → eixo → capítulo → sessão
- Bloqueio parental (PIN para sair do modo criança)
- Casa virtual (coleção de criaturas)
- Animações de transição (Framer Motion)

### Sprint 7 — Conteúdo (paralelo, começa Sprint 2)
- Produção de 12 capítulos × 12 sessões × 4 átomos
- Gravação de narração pré-renderizada
- Assets Phaser para minijogos

### Sprint 8 — Billing e RevenueCat
- Integração RevenueCat client + webhook
- Tabela `entitlements` sync
- Paywall na primeira sessão após trial
- Fluxo de assinatura completo

### Sprint 9 — LGPD self-service
- Export endpoint
- Erasure endpoint + soft delete + agendamento de hard delete
- Tela de gerenciamento de consentimento

### Sprint 10 — Polimento e Capacitor
- Build iOS + Android via Capacitor
- Haptics, splash screen, ícones
- Testes em devices reais
- Performance audit (bundle size, lazy loading)

### Sprint 11 — QA e beta fechado
- Testes com 10-20 famílias (Founders Drive como primeira coorte)
- Coleta de feedback
- Correções

### Sprint 12 — Soft launch
- App Store + Play Store submission
- Onboarding marketing inicial

---

## 17. Comandos úteis

```bash
# desenvolvimento
pnpm dev

# gerar tipos do Supabase
supabase gen types typescript --linked > src/types/database.ts

# migration nova
supabase migration new <nome>
supabase db push

# Capacitor
pnpm build && pnpm cap sync
pnpm cap run ios
pnpm cap run android

# lint + type-check antes de commit
pnpm lint && pnpm tsc --noEmit
```

---

## 18. Pendências e decisões abertas

Itens que o Claude Code deve pausar e perguntar antes de implementar:

1. **Identidade visual exata**: shadcn `base-nova` precisa de tokens específicos para Kids (coral primary, off-white background, fontes). Aguardar tokens do design system Nexus Kids.
2. **Vozes pré-renderizadas**: definir quantas vozes e quem grava antes do Sprint 5.
3. **Personagens-guia**: design dos personagens do Mundo dos Exploradores. SVG vetorial, sem licenciamento externo.
4. **Política de privacidade**: texto jurídico oficial precisa estar pronto antes do Sprint 3 (tela de consentimento).
5. **PIN parental**: 4 dígitos ou pergunta secreta? Decidir antes do Sprint 6.
6. **Modo offline detalhado**: o quão completo? Definir escopo concreto antes do Sprint 10.

Quando bater em qualquer desses pontos: **pare, mostre o contexto, pergunte**. Não invente.

---

## 19. Pontos de contato

- `HANDOFF-NEXUS-KIDS-ACADEMY-NEG.md` — contexto de negócios do Kids
- `HANDOFF-NEGOCIOS.md` — contexto do ecossistema Nexus
- Spec do Drive Academy — referência de stack e padrões já validados
- Skill `nexus-elite-academy` — convenções compartilhadas do ecossistema (atenção: vocabulário do Elite NÃO se aplica ao Kids)

---

*Fim do spec. Itere conforme o projeto evoluir; manter este arquivo como fonte canônica.*

# Nexus Kids Academy

Plataforma educacional gamificada para crianças. Aprendizado BNCC com jogos multi-engine (React + Phaser + PixiJS), sistema MENTOR de IA pedagógica e dashboard parental com compliance LGPD para menores.

> **Status:** Fase 1 (setup base) — Maio 2026. MVP previsto Q3-Q4 2027.

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript 5 strict |
| Estilo | Tailwind CSS 4 + shadcn/ui (base-nova / @base-ui/react) |
| Animações | Framer Motion 12 |
| Estado | Zustand 5 + TanStack Query 5 |
| Forms | React Hook Form 7 + Zod 4 |
| Backend | Supabase (PostgreSQL, Auth, RLS, Realtime, Edge Functions) |
| IA pedagógica | Anthropic Claude Haiku 4.5 |
| Mobile | Capacitor 8 (Android + iOS, IAP via lojas) |
| Pagamento | RevenueCat (Google Play Billing + Apple StoreKit) |
| i18n | next-intl (pt-BR ativo, EN/ES preparados) |
| Errors / Analytics | Sentry + PostHog |
| Email | Resend |
| Game engines | Phaser 3 (lazy) e PixiJS (lazy) sob Game Adapter Pattern |

---

## Pré-requisitos

- Node.js >= 20 (testado em 24.14)
- npm >= 10
- Git
- Para builds mobile: Android Studio (Android), Xcode + Mac (iOS)

---

## Setup local

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com credenciais reais (Supabase, Anthropic, etc.)

# Rodar dev server
npm run dev
# → http://localhost:3000
```

---

## Scripts

| Script | Função |
| --- | --- |
| `npm run dev` | Dev server Next.js (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Servir build de produção |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run typecheck` | TypeScript sem emitir |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check |
| `npm run cap:sync` | Build + sync Capacitor (Android + iOS) |
| `npm run cap:android` | Build + sync + abrir Android Studio |
| `npm run cap:ios` | Build + sync + abrir Xcode |

---

## Estrutura

```text
nexus-kids-academy/
├── src/
│   ├── app/                  → App Router (rotas, layouts)
│   ├── components/
│   │   ├── ui/               → shadcn/ui primitivos
│   │   ├── kids/             → Componentes UI infantis
│   │   ├── layout/           → Headers, sidebars
│   │   ├── forms/            → Forms reutilizáveis
│   │   └── games/            → Wrappers de jogos
│   ├── games/
│   │   ├── core/             → Game Adapter Pattern, BehaviorTracker
│   │   ├── simple/           → Jogos React + Framer Motion
│   │   ├── phaser/           → Jogos Phaser 3 (lazy)
│   │   └── pixi/             → Jogos PixiJS (lazy)
│   ├── hooks/                → Custom React hooks
│   ├── lib/
│   │   ├── supabase/         → Clients (client/server/middleware)
│   │   ├── auth/             → Helpers auth
│   │   ├── claude/           → MENTOR IA client
│   │   ├── revenuecat/       → IAP wrapper
│   │   ├── analytics/        → PostHog
│   │   ├── sentry/           → Error tracking
│   │   ├── email/            → Resend templates
│   │   └── utils/            → Helpers gerais
│   ├── providers/            → React Context providers
│   ├── services/             → Lógica de negócio
│   ├── stores/               → Zustand stores
│   ├── types/                → TypeScript types globais
│   └── i18n/                 → next-intl config + messages
├── public/
│   ├── locales/              → Mensagens de tradução
│   └── assets/               → Imagens, sprites, áudio
├── supabase/
│   ├── migrations/           → SQL versionado
│   └── functions/            → Edge functions (MENTOR, webhooks)
├── docs/                     → Arquitetura, ADRs, runbook
├── tests/                    → Unit + E2E
├── prototipo-original/       → Protótipo HTML+React inicial (preservado)
└── android/, ios/            → Gerados por Capacitor (gitignored)
```

---

## Documentação

Em `/docs/`:

- `ARCHITECTURE.md` — visão geral
- `SETUP.md` — passo-a-passo de instalação
- `COMPLIANCE_LGPD.md` — compliance para menores
- `DEPLOYMENT.md` — Vercel + Capacitor + lojas
- `GAMES_ARCHITECTURE.md` — multi-engine
- `CREATING_NEW_GAMES.md` — como adicionar novos jogos
- `MENTOR_AI.md` — sistema IA pedagógica
- `RUNBOOK.md` — problemas comuns
- `adr/` — decisões arquiteturais

---

## Convenções

- **Idioma UI:** pt-BR (preparado para EN/ES futuras via next-intl)
- **Background:** sempre branco (não dark mode)
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, etc.) — validado por commitlint
- **Pre-commit:** lint-staged roda ESLint + Prettier nos arquivos staged
- **Type safety:** 100% TypeScript strict — sem `any` salvo justificativa em comentário

---

## Licença

UNLICENSED — propriedade Nexus / Eduardo Marks.

@AGENTS.md

# Nexus Kids Academy — Guia para Claude

Plataforma educacional gamificada infantil. Mobile-first via Capacitor, lojas Google Play + Apple App Store. Compliance LGPD para menores.

## Plano de implementação

`C:\Users\DIRIGE AI\.claude\plans\analise-o-prompt-e-peppy-lake.md` — fonte de verdade. 6 fases sequenciais com aprovação entre cada.

## Stack travado

- **Next.js 16.2.6** (App Router) + React 19 + TypeScript 5 strict
- **Tailwind 4** + shadcn/ui (style: base-nova, com @base-ui/react)
- **Capacitor 8** (Android + iOS, IAP via lojas)
- **RevenueCat** para assinaturas (Google Play Billing + Apple StoreKit)
- **Supabase** (PostgreSQL + Auth + RLS + Edge Functions)
- **TanStack Query 5 + Zustand 5 + Framer Motion 12 + next-intl + react-hook-form + zod**
- **Anthropic Claude Haiku 4.5** para MENTOR pedagógico

## Convenções inquebráveis

- **Idioma UI:** pt-BR. Comunicação humana em pt-BR; código/commits em inglês.
- **Background:** branco em todas as telas (não dark mode).
- **Animações:** apenas Framer Motion (não substituir sem ADR).
- **RLS:** habilitado em todas as tabelas Supabase. Nunca desabilitar.
- **LGPD menores:** dados mínimos. Consentimento parental obrigatório. Pai pode deletar dados da criança.
- **Lazy loading:** Phaser e PixiJS via dynamic import — bundle inicial < 300KB.
- **Type safety:** sem `any` salvo justificativa em comentário.
- **Commits:** Conventional Commits (validado por commitlint pre-commit).

## Regras invioláveis (do prompt original)

1. Nunca instalar dependências sem listar e explicar — pedir aprovação.
2. Nunca commitar sem aprovação explícita do Eduardo.
3. Nunca expor secrets em código (usar `.env.local`).
4. Nunca pular testes ou linting "para acelerar".
5. Nunca adicionar features fora do escopo da fase atual.
6. Nunca usar serviços pagos sem aprovação prévia.
7. Sempre explicar decisões técnicas em pt-BR claro.
8. Sempre comentar código complexo (em pt-BR).
9. Sempre criar testes para lógica crítica.
10. Sempre perguntar em casos de dúvida — auto mode ≠ autonomia em produto.
11. Sempre validar TypeScript strict antes de prosseguir.
12. Sempre respeitar arquitetura multi-engine para jogos.

## Arquitetura multi-engine de jogos

Cada jogo escolhe a engine ideal via Game Adapter Pattern (`src/games/core/types.ts`):

- **React + Framer Motion** (`src/games/simple/`) — memória, drag-drop, quiz interativo (50-100KB)
- **Phaser 3** (`src/games/phaser/`) — plataforma, RPG, side-scrolling (lazy, 500KB-2MB)
- **PixiJS** (`src/games/pixi/`) — casos especiais (lazy)

Core do app não conhece a engine. Captura 15 dimensões comportamentais → MENTOR.

## Projeto irmão (referência)

`C:\Users\DIRIGE AI\nexus-elite-academy\` — Next.js 16 + Supabase. Reusar padrões: auth-provider, hooks, supabase clients, proxy.ts (NÃO middleware.ts em Next 16), migrations.

## Roadmap

- **Fase 1** (atual): setup base + tooling + Capacitor + estrutura
- **Fase 2:** Supabase + auth pai-criança + LGPD
- **Fase 3:** migrar 7 telas do protótipo + roteamento + i18n
- **Fase 4:** Game Adapter Pattern + 1 jogo React + 1 Phaser
- **Fase 5:** MENTOR IA + Sentry + PostHog + Resend + RevenueCat
- **Fase 6:** Capacitor build + Vercel deploy + docs finais

MVP completo: 15-22 semanas. Lançamento Q3-Q4 2027.

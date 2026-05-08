# Arquitetura — Nexus Kids Academy

> Documento vivo. Atualizado por fase de desenvolvimento.

## Visão geral

Aplicação web Next.js empacotada em Capacitor para distribuição mobile (Google Play + Apple App Store). Backend Supabase. Pagamentos via IAP unificado (RevenueCat). Sistema MENTOR de IA pedagógica via Anthropic Claude Haiku.

## Camadas

```text
┌─────────────────────────────────────────────┐
│  Mobile (Capacitor 8)        │  Web (Vercel) │
│  Android • iOS               │  Browser     │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  Next.js 16 (App Router) + React 19         │
│  • UI: shadcn/ui + Tailwind 4               │
│  • Estado: Zustand + TanStack Query         │
│  • Animações: Framer Motion                 │
│  • i18n: next-intl                          │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  Supabase                                   │
│  • PostgreSQL + RLS                         │
│  • Auth (email + Google + MFA)              │
│  • Storage (assets)                         │
│  • Realtime                                 │
│  • Edge Functions (MENTOR, webhooks)        │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  Serviços externos                          │
│  • Anthropic Claude (MENTOR IA)             │
│  • RevenueCat (IAP webhook)                 │
│  • Resend (email)                           │
│  • Sentry (errors)                          │
│  • PostHog (analytics + replay)             │
└─────────────────────────────────────────────┘
```

## Multi-engine de jogos

Cada jogo implementa interface `KidsAcademyGame` (`src/games/core/types.ts`). Engine carregada via lazy import.

| Categoria | Engine | Tamanho típico | Uso |
| --- | --- | --- | --- |
| Simples | React + Framer Motion | 50-100KB | Memória, drag-drop, quiz |
| 2D padrão | Phaser 3 | 500KB-2MB | Plataforma, RPG, aventura |
| 2D especial | PixiJS | variável | WebGL pesado |

`GameRunner.tsx` (`src/games/core/`) detecta engine e carrega dinamicamente. `BehaviorTracker` captura 15 dimensões → MENTOR.

## Fluxo MENTOR

1. Jogo emite evento via `BehaviorTracker.track()`
2. Eventos persistem em `eventos_comportamento` (Supabase)
3. Edge function `mentor-insight` consulta últimas N sessões
4. Claude Haiku gera insight pedagógico personalizado
5. Insight cacheado 24h e exibido na tela /mentor

## Compliance

- **LGPD menores:** consentimento parental obrigatório, dados mínimos, pai pode deletar tudo. Ver `COMPLIANCE_LGPD.md` (Fase 2).
- **Stores:** privacy policy URL pública, classificação etária Kids 4+.

## Status atual

**Fase 1 concluída** (2026-05-08): setup base, Capacitor, tooling, estrutura. Próximas fases detalhadas no plano em `~/.claude/plans/`.

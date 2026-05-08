# ADR 0001 — Decisões iniciais de stack

**Data:** 2026-05-08
**Status:** Aceito
**Autor:** Eduardo Marks (com Claude Code)

## Contexto

Setup inicial do Nexus Kids Academy. Protótipo HTML+CDN React precisa virar produto premium com distribuição mobile (Google Play + Apple App Store) e arquitetura escalável para multi-engine de jogos.

## Decisões

### 1. Next.js 16 (em vez de Next.js 14 do prompt original)

**Escolha:** Next.js 16.2.6 (App Router, React 19, Tailwind 4).

**Por quê:**
- Coerência com `nexus-elite-academy` (projeto irmão), permitindo reuso de padrões.
- React 19 + Tailwind 4 mais maduros em 2026-05.
- App Router padrão de mercado.

**Trade-off aceito:** menor base de exemplos online vs Next 14 LTS, compensado pela coerência cross-projetos Nexus.

### 2. Capacitor 8 desde Fase 1

**Escolha:** Capacitor 8 wrapper desde o início, mesmo com web-first.

**Por quê:**
- Distribuição via lojas (decisão do produto).
- Espelha Drive Academy e plano de migração Elite Academy.
- Setup mobile cedo evita refactor doloroso depois.

**Trade-off aceito:** maior complexidade inicial vs deploy só Vercel.

### 3. RevenueCat (em vez de Stripe ou Asaas)

**Escolha:** RevenueCat unifica Google Play Billing + Apple StoreKit.

**Por quê:**
- IAP via lojas é o modelo escolhido (resposta direta do Eduardo: "lojas google e apple").
- Free tier até $2.5K MTR.
- Webhooks para Supabase resolvem sync de assinaturas.
- Padrão da indústria edu apps.

**Trade-off aceito:** dependência de SDK terceiro vs implementação StoreKit/Billing direta (mais código mas zero custo de serviço).

### 4. shadcn/ui style "base-nova" com @base-ui/react

**Escolha:** preset padrão da CLI shadcn 4.

**Por quê:**
- @base-ui/react é o sucessor oficial de @radix-ui mantido pela mesma equipe.
- Já é o default do shadcn 4 (preset base-nova).
- Tailwind 4 nativo.

**Trade-off aceito:** componente `form` não está no registro base-nova — wrapper customizado quando necessário (Fase 2 auth).

### 5. next-intl (i18n) ativo desde Fase 1

**Escolha:** instalado e configurado mesmo só com pt-BR ativo, EN/ES como placeholders.

**Por quê:**
- Spec original pede internacionalização preparada.
- Mercado internacional planejado pós-MVP.
- Custo zero adicionar agora; refactor pós-launch é caro.

**Trade-off aceito:** Elite Academy hardcoded pt-BR — Kids diverge porque escopo de mercado é diferente.

### 6. Manter projeto in-place com `/prototipo-original/` como backup

**Escolha:** protótipo movido para subpasta, Next.js init na pasta original.

**Por quê:**
- Mantém histórico do projeto na pasta única.
- Evita "qual é a pasta certa?" futuro.

**Trade-off aceito:** vs criar pasta sibling — risco baixo já que protótipo está separado.

## Consequências

- Stack premium e moderno alinhado a 2026.
- Qualquer mudança nessas decisões exige novo ADR.
- Mobile-first desde o início obriga validar `output: 'export'` ou modo standalone do Next.js para Capacitor (verificar em Fase 6).

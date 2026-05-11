# Nexus Kids Academy — Stack Técnico

Referência rápida para agentes de IA. Fonte de verdade viva: [package.json](package.json),
[GUARDRAILS.md](GUARDRAILS.md), [CLAUDE.md](CLAUDE.md).

> **Última verificação:** 2026-05-10 (Fase 4 ✅, próxima Fase 5).

---

## TL;DR

Plataforma educacional gamificada infantil (3-10 anos), **mobile-first via
Capacitor**, distribuição em Google Play + Apple App Store. Compliance LGPD
para menores. UI 100% pt-BR, código/commits em inglês.

---

## Versões travadas (não trocar sem ADR)

### Core framework
| Pacote | Versão | Notas críticas |
|---|---|---|
| `next` | **16.2.6** | App Router. **Quebra com Next ≤ 15** — ler `node_modules/next/dist/docs/` antes de codar. Usa `proxy.ts`, **NÃO** `middleware.ts`. |
| `react` / `react-dom` | **19.2.4** | Server Components ativos (`rsc: true` em [components.json](components.json)). |
| `typescript` | **^5** | `strict` + `noUnusedLocals` + `noUnusedParameters` — ver [tsconfig.json](tsconfig.json). `any` proibido sem comentário justificando. |

### UI / estilo
| Pacote | Versão | Notas |
|---|---|---|
| `tailwindcss` | **^4** | Tailwind 4 (PostCSS plugin via `@tailwindcss/postcss`). CSS variables em [src/app/globals.css](src/app/globals.css). |
| `shadcn` | **^4.7.0** | Preset `base-nova`, `baseColor: neutral`. CLI gera em `@/components/ui`. |
| `@base-ui/react` | **^1.4.1** | Primitivos do preset `base-nova`. |
| `framer-motion` | **^12.38.0** | **Única** lib de animação no app React. Não substituir sem ADR. |
| `lucide-react` | **^1.14.0** | Icon library oficial. |
| `tw-animate-css` | **^1.4.0** | Util de animações tailwind. |

### Backend / dados
| Pacote | Versão | Notas |
|---|---|---|
| `@supabase/supabase-js` | **^2.105.4** | Cliente principal. |
| `@supabase/ssr` | **^0.10.3** | Auth com cookies via Server Components. |
| `supabase` (CLI) | **^2.98.2** | Migrations em [supabase/migrations/](supabase/migrations/). **Nunca editar migration aplicada — criar nova.** |
| `@tanstack/react-query` | **^5.100.9** | Estado de servidor. |
| `zustand` | **^5.0.13** | Estado client. |

### Forms / validação / i18n
| Pacote | Versão | Notas |
|---|---|---|
| `react-hook-form` | **^7.75.0** | Forms. |
| `@hookform/resolvers` | **^5.2.2** | Bridge para zod. |
| `zod` | **^4.4.3** | Validação ponta-a-ponta. |
| `next-intl` | **^4.11.1** | i18n (pt-BR ativo, EN/ES preparados). Strings UI **nunca** hardcoded. |

### Mobile / billing
| Pacote | Versão | Notas |
|---|---|---|
| `@capacitor/core` `/cli` | **^8.3.2** | App ID `com.nexus.kidsacademy`, webDir `out` — ver [capacitor.config.ts](capacitor.config.ts). |
| `@capacitor/android` | **^8.3.2** | |
| `@capacitor/ios` | **^8.3.2** | |
| RevenueCat | _não instalado ainda_ | Fase 5. Unificará Google Play Billing + Apple StoreKit. |

### Game engines (multi-engine)
| Pacote | Versão | Quando usar |
|---|---|---|
| React + Framer Motion | (já instalado) | Memória, drag-drop, quiz interativo. Bundle 50-100KB. Em [src/games/simple/](src/games/simple/). |
| `phaser` | **^4.1.0** | Plataforma, RPG, side-scrolling. **Sempre `dynamic()`** para lazy load (500KB-2MB). Em [src/games/phaser/](src/games/phaser/). |
| PixiJS | _não instalado_ | Casos especiais (efeitos pesados). Pasta [src/games/pixi/](src/games/pixi/) reservada. |

### Tooling
| Pacote | Versão | Notas |
|---|---|---|
| `eslint` | **^9** | + `eslint-config-next@16.2.6` + `eslint-config-prettier`. |
| `prettier` | **^3.8.3** | |
| `husky` | **^9.1.7** | Hooks pre-commit. |
| `lint-staged` | **^17.0.3** | |
| `@commitlint/cli` `/config-conventional` | **^21.0.0** | Conventional Commits obrigatórios (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`). |

### IA pedagógica (Fase 5)
- **Anthropic Claude Haiku 4.5** — MENTOR. SDK ainda **não instalado**.

---

## Estrutura de pastas (convenção Elite Academy)

```
src/
├── app/                    # App Router (Next 16)
│   ├── (auth)/             # rotas públicas: cadastro, login, consentimento-lgpd
│   ├── (app)/              # área da criança (proxy.ts protege)
│   ├── pais/               # área do responsável (proxy.ts protege)
│   ├── auth/               # callback de email verification
│   ├── onboarding/         # primeiro acesso pós-cadastro
│   └── api/                # route handlers
├── components/
│   ├── kids/               # child-friendly: AppShell, BottomNav, DogBerg
│   └── ui/                 # shadcn primitives (preset base-nova)
├── games/
│   ├── core/               # types.ts, GameRegistry.ts, GameRunner.tsx, PhaserHost.tsx, BehaviorTracker.ts
│   ├── simple/             # React + Framer Motion (PegaFracoes, _template)
│   ├── phaser/             # Phaser 3 (EncaixeFormas, ResgatePrimeiraLetra, AventuraMatematica, _template, shared/)
│   └── pixi/               # vazio até precisar
├── hooks/                  # use-auth, use-child, use-parent, use-mentor
├── i18n/                   # next-intl config
├── lib/                    # supabase clients, utils
├── providers/              # auth-provider, query-provider
├── services/               # camada de domínio
├── stores/                 # zustand
├── types/                  # database.types.ts (auto-gerado pelo CLI Supabase)
└── proxy.ts                # ⚠ Next 16 — NÃO middleware.ts
```

Pastas excluídas do typecheck (ver [tsconfig.json](tsconfig.json)):
`node_modules`, `prototipo-original`, `public`.

---

## Backend Supabase

- **Projeto**: `uwoibdyjbnrlrdtotygz.supabase.co`
- **13 tabelas com RLS habilitado**: `responsaveis`, `perfis_crianca`,
  `consentimentos_lgpd`, `trilhas`, `niveis`, `aulas`, `jogos`, `questoes`
  (com `pgvector(1536)`), `sessoes`, `progresso_aluno`,
  `eventos_comportamento`, `conquistas`, `conquistas_aluno`,
  `mentor_insights`, `assinaturas`, `assinaturas_eventos`, `feedback`.
- **Migrations**: 5 aplicadas em `2026-05-08`, ver
  [supabase/migrations/](supabase/migrations/).
- **Trigger `handle_new_user`** cria `responsaveis` automaticamente após signup.
- **Função `deletar_dados_crianca`** atende LGPD Art. 18.
- **UUIDs**: `gen_random_uuid()` (PG13+ nativo), **NÃO** `uuid_generate_v4()`.

---

## Game Adapter Pattern

Todo jogo implementa `KidsAcademyGameWithCallbacks` em
[src/games/core/types.ts](src/games/core/types.ts). Core do app não conhece a engine.

```ts
interface KidsAcademyGame {
  readonly id: string;
  readonly title: string;
  readonly engine: 'react' | 'phaser' | 'pixi';
  readonly conceitos: string[];
  mount(container: HTMLElement, config: GameConfig): Promise<void>;
  unmount(): void;
  pause(): void;
  resume(): void;
  reset(): void;
}
```

Comunicação Phaser ↔ React **somente** via `GameCallbacks` tipados —
nunca `window.dispatchEvent`. Cada jogo é registrado em
[src/games/core/GameRegistry.ts](src/games/core/GameRegistry.ts) com slug + loader dinâmico.

**Telemetria comportamental**: cada jogo emite eventos via
[BehaviorTracker.ts](src/games/core/BehaviorTracker.ts) (15 dimensões) que
alimentarão o MENTOR na Fase 5. Mínimo: `tempo_resposta`,
`tentativas_multiplas`, `conquista_streak`.

### Lições aprendidas Phaser (consultar antes de novo jogo)

- Drag em `Image` direto, **NÃO** em `Container` escalado (hit area desalinha).
- Letras/símbolos via Canvas API embutido na textura, **NÃO** `Phaser.Text` filho.
- **Emojis**: Phaser.Text corta — pré-renderizar em canvas com fonts
  `"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"` e usar `addCanvas`.
- Tween de flutuação: parar no `dragstart`, recriar no `dragend`.
- `Phaser.Scale.RESIZE` + posições computadas de `this.scale.width/height`.
- Sons procedurais via Web Audio API (sem assets HTTP) — ver `sound.ts` em jogos existentes.
- TTS pt-BR feminina: `getVoices()` é async, escutar `voiceschanged`,
  priorizar Maria/Francisca/Luciana/Camila/Vitoria/Helena/Fernanda ou Google PT-BR.

---

## Convenções de comunicação e código

| Contexto | Idioma |
|---|---|
| UI / textos visíveis | **pt-BR** (sempre via next-intl) |
| Código / variáveis / commits / PRs | inglês |
| Comentários no código | pt-BR |
| Logs / erros técnicos | inglês |

---

## Visual

- **Background sempre BRANCO** — nunca dark mode neste produto.
- **Paleta**: roxo `#6B46C1` + amarelo `#FCD34D` + apoio (azul, verde, rosa pastel).
- **Fonte**: Nunito (via `next/font/google`).
- **Hit areas mínimas**: 48×48px (criança 3-10 tem coordenação imprecisa).
- **Mobile-first**: portrait estreito (320px) primeiro, depois desktop.

---

## Compliance LGPD (crítico)

- Consentimento parental **obrigatório** antes de criar perfil de criança.
- Coletar dados mínimos.
- Pai pode deletar todos os dados da criança (Art. 18) via
  `deletar_dados_crianca`.
- **RLS em todas as tabelas — nunca desabilitar**, nem temporariamente.
- Pai A nunca acessa dados da criança B — testar com 2 famílias antes de release.
- Docs em pt-BR com marcadores `[REVISÃO JURÍDICA]`:
  [docs/COMPLIANCE_LGPD.md](docs/COMPLIANCE_LGPD.md),
  `docs/TERMOS_USO_MENORES.md`, `docs/POLITICA_PRIVACIDADE_INFANTIL.md`.

---

## Comandos

```bash
npm run dev              # next dev (Turbopack)
npm run build            # next build
npm run start            # next start
npm run lint             # eslint
npm run lint:fix         # eslint --fix
npm run typecheck        # tsc --noEmit (strict)
npm run format           # prettier --write .
npm run cap:sync         # next build && cap sync
npm run cap:android      # next build && cap sync android && cap open android
npm run cap:ios          # next build && cap sync ios && cap open ios
```

**Antes de declarar tarefa completa:**
```bash
npx tsc --noEmit
npx eslint <arquivos-modificados>
npm run build      # quando refatoração tocar muitos arquivos
```

---

## Anti-patterns (não fazer)

- ❌ `middleware.ts` em Next 16 — usar `proxy.ts`.
- ❌ Mocks em testes que tocam Supabase/Auth — usar test database real.
- ❌ Phaser.Text com emojis — pré-renderizar em canvas.
- ❌ Drag em Container Phaser escalado — usar Image direto.
- ❌ `window.addEventListener` para Phaser ↔ React — usar `GameCallbacks`.
- ❌ Comentários "o que" o código faz — apenas "por que" não-óbvio.
- ❌ Comentários referenciando issue/task/PR.
- ❌ `console.log` em produção — usar Sentry (Fase 5).
- ❌ Strings literais hardcoded em UI — passar pelo next-intl.
- ❌ Importar Phaser fora de `dynamic()` — entra no bundle inicial.
- ❌ Editar migration SQL já aplicada — criar nova.
- ❌ `git push --force` sem permissão.
- ❌ `git commit --no-verify` (skip hooks).
- ❌ Adicionar `any` sem comentário justificando.
- ❌ Instalar dependência sem aprovação prévia do Eduardo.

---

## Roadmap

| Fase | Status | Conteúdo |
|---|---|---|
| 1 | ✅ | Setup: Next 16 + Capacitor + tooling + estrutura |
| 2 | ✅ | Supabase + auth pai-criança + LGPD docs |
| 3 | ✅ | 7 telas do protótipo + i18n base + roteamento |
| 4 | ✅ | Game Adapter Pattern + Encaixe Formas + Resgate da Primeira Letra + Aventura Matemática + Pega Frações |
| 5 | ⏸ | MENTOR IA (Claude Haiku 4.5) + Sentry + PostHog + Resend + RevenueCat |
| 6 | ⏸ | Capacitor build (Android/iOS) + Vercel deploy + docs finais |

MVP completo: 15-22 semanas. Lançamento Q3-Q4 2027.

---

## Referências externas

- **Projeto irmão**: `C:\Users\DIRIGE AI\nexus-elite-academy\` — Next.js 16 + Supabase
  maduro. Reusar padrões de auth-provider, hooks, supabase clients, `proxy.ts`,
  migrations.
- **Plano original**: `~/.claude/plans/analise-o-prompt-e-peppy-lake.md`.
- **Repo**: `https://github.com/eduardomarks23-stack/Kids-Academy.git`
  (não pushado ainda).

# Nexus Kids Academy — Guardrails

Regras obrigatórias para qualquer sessão de desenvolvimento. Tudo aqui está
travado: alterações exigem ADR explícita em `docs/adr/` aprovada pelo Eduardo.

---

## 1. Stack travada (não trocar sem ADR)

| Camada | Decisão |
|---|---|
| Framework | Next.js 16.2.6 (App Router, **NÃO** Pages Router) |
| Runtime | React 19 + TypeScript 5 strict |
| Estilo | Tailwind 4 + shadcn/ui preset `base-nova` (usa `@base-ui/react`) |
| Mobile | Capacitor 8 (Android + iOS) — **mobile-first** |
| Pagamento | RevenueCat unificando Google Play Billing + Apple StoreKit |
| Backend | Supabase (PostgreSQL + Auth + RLS + Edge Functions) |
| Estado server | TanStack Query 5 |
| Estado client | Zustand 5 |
| Animações | Framer Motion 12 (**única** lib de animação no app React) |
| Forms | react-hook-form + zod |
| i18n | next-intl (pt-BR ativo, EN/ES preparados) |
| IA pedagógica | Anthropic Claude Haiku 4.5 (MENTOR) |
| Game engines | React + Framer Motion (simples), Phaser 3 (complexos), PixiJS (especiais) |

**Atenção: Next.js 16 quebra com seu treinamento.** APIs, file structure e
convenções podem diferir. Antes de codar Next.js, leia `node_modules/next/dist/docs/`.
Em Next 16 use `proxy.ts` (NÃO `middleware.ts`).

---

## 2. Idioma e comunicação

- **UI / textos visíveis ao usuário:** sempre pt-BR.
- **Código / nomes de variáveis / commits / PRs:** sempre inglês.
- **Comentários no código:** pt-BR (consistência com docs internos).
- **Logs / erros técnicos:** inglês.
- **Conversa com Eduardo:** pt-BR claro, sem jargão desnecessário.

---

## 3. Visual e UX (criança 3-10 anos)

- **Background sempre BRANCO** em todas as telas. Nunca dark mode neste produto.
- **Paleta**: roxo `#6B46C1` + amarelo `#FCD34D` + apoio (azul, verde, rosa pastel).
- **Fonte**: Nunito (já configurada via `next/font/google`).
- **Mobile-first**: layout precisa funcionar em portrait estreito (320px) ANTES
  de pensar em desktop.
- **Toques infantis**: hit areas mínimas de 48×48px. Crianças têm coordenação motora
  imprecisa. Em jogos, usar tolerância generosa (raio do alvo × 1.4 no mínimo).
- **Sem features escondidas**: criança de 4 anos não sabe ler instrução escondida.
  Tutoriais visuais com setas + emojis + voz (TTS).

---

## 4. Compliance LGPD para menores (CRÍTICO)

- **Consentimento parental obrigatório** antes de criar perfil de criança.
- **Dados mínimos**: coletar apenas o estritamente necessário ao funcionamento.
- **Pai pode deletar todos os dados da criança** (Art. 18 LGPD) — função
  `deletar_dados_crianca` no Supabase.
- **RLS em TODAS as tabelas**, sem exceção. Nunca desabilitar mesmo
  "temporariamente".
- **Pai A nunca acessa dados da criança B** — testar com 2 famílias antes de
  qualquer release.
- **Conteúdo jurídico** (`docs/COMPLIANCE_LGPD.md`, termos, privacidade) tem
  marcadores `[REVISÃO JURÍDICA]`. Eduardo + advogado revisam antes de produção.

---

## 5. Regras invioláveis

1. **Nunca instalar dependências sem listar e explicar o que cada uma faz** —
   Eduardo aprova antes de cada `npm install`.
2. **Nunca commitar sem aprovação explícita.** Auto mode permite codar
   livremente, mas commits precisam de OK.
3. **Nunca expor secrets em código.** `.env.local` para tudo. Verificar antes
   de commit.
4. **Nunca pular testes ou linting "para acelerar".** `npm run typecheck` +
   `npx eslint` antes de declarar tarefa completa.
5. **Nunca adicionar features fora do escopo da fase atual.** Roadmap fases 1-6.
6. **Nunca usar serviços pagos sem aprovação prévia.** Anthropic API, Sentry,
   PostHog, Resend, RevenueCat — todos têm free tier; só ativar pagos com OK.
7. **Sempre explicar decisões técnicas** em pt-BR direto.
8. **Sempre comentar código complexo** (em pt-BR).
9. **Sempre criar testes para lógica crítica** (auth, RLS, billing).
10. **Sempre perguntar em casos de dúvida** — auto mode ≠ autonomia em produto.
11. **Sempre validar TypeScript strict** antes de prosseguir (`tsc --noEmit`).
12. **Sempre respeitar a arquitetura multi-engine** para jogos (`KidsAcademyGame`
    interface).

---

## 6. Game Adapter Pattern (todo jogo segue)

Todo jogo implementa `KidsAcademyGameWithCallbacks` em `src/games/core/types.ts`:

```typescript
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

- **Lazy loading rigoroso**: Phaser/PixiJS importados via `dynamic()` em
  `GameRunner.tsx`. Bundle inicial deve ficar < 300KB.
- **Comunicação Phaser ↔ React via `GameCallbacks`** (tipados), NUNCA via
  `window.dispatchEvent`/listeners globais (frágil e não-tipado).
- **Telemetria comportamental obrigatória**: cada jogo emite eventos pelo
  `BehaviorTracker` para alimentar o MENTOR. Mínimo: `tempo_resposta`,
  `tentativas_multiplas`, `conquista_streak`. Quando relevante:
  `hesitacao`, `erro_conceitual`, `interacao_audio`.
- **Registrar em `src/games/core/GameRegistry.ts`** com slug + loader dinâmico.

### Padrões dos jogos Phaser (lições aprendidas em produção)

- **Drag em `Image` direto, NÃO em Container** — hit area do Container
  desalinha do visual quando escalado. Image tem hit detection nativa precisa.
- **Letras/símbolos dentro da textura** (Canvas API) em vez de `Phaser.Text`
  como filho — drag funciona com hit area exata do pixel.
- **Emojis em jogos**: Phaser.Text **corta emojis** (measureText calcula métrica
  errada). Pré-renderizar em canvas dedicado com `font` apontando para
  `"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"` e usar como
  textura via `addCanvas`.
- **Tween de flutuação contínua**: parar no `dragstart` (senão sobrescreve
  o `y` do drag e bloqueia movimento vertical). Recriar no `dragend` se voltar
  pra posição original.
- **`Phaser.Scale.RESIZE`** + posições computadas a partir de
  `this.scale.width/height` para responsividade real.
- **Sons procedurais via Web Audio API** (sem assets HTTP) — `playSuccess`,
  `playWrong`, `playRoundComplete`, `playVictory` em `sound.ts`.
- **TTS pt-BR feminina**: `window.speechSynthesis.getVoices()` é async (precisa
  listener `voiceschanged`); priorizar nomes femininos (Maria, Francisca,
  Luciana, Camila, Vitoria, Helena, Fernanda) ou Google português do Brasil
  (Chrome).
- **Sistema de pontuação padrão**: 10 base + speed bonus (até 10) + combo
  (até 10) + sem-erros bonus (20 por rodada). Estrelas finais 1-3.

---

## 7. Backend Supabase

- **Projeto**: `uwoibdyjbnrlrdtotygz.supabase.co`
- **Migrations**: versionadas em `supabase/migrations/`. **Nunca editar
  migration já aplicada**; criar nova.
- **UUIDs**: usar `gen_random_uuid()` (PostgreSQL 13+ nativo), NÃO
  `uuid_generate_v4()` (extensão).
- **RLS**: habilitado em todas as tabelas. Política mínima: pai vê seus
  filhos, criança vê próprio progresso, admin vê tudo.
- **Trigger `handle_new_user`** cria registro em `responsaveis`
  automaticamente após signup.
- **pgvector(1536)** em `questoes.embedding` para MENTOR (Fase 5).
- **`BehaviorTracker` valida UUID** — slugs (ex: `'encaixe-formas'`) vão para
  `valor.jogo_slug` (campo Json), não para `jogo_id` (FK).

---

## 8. Estrutura de pastas (Elite Academy convention)

```
src/
├── app/                    # App Router (Next 16)
│   ├── (auth)/             # rotas públicas: login, cadastro, lgpd
│   ├── (app)/              # área da criança (proxy.ts protege)
│   ├── pais/               # área do responsável (proxy.ts protege)
│   └── api/                # route handlers
├── components/
│   ├── kids/               # componentes child-friendly (DogBerg, BottomNav, AppShell)
│   └── ui/                 # shadcn primitives
├── games/
│   ├── core/               # types, GameRegistry, GameRunner, BehaviorTracker
│   ├── simple/             # jogos React + Framer Motion
│   ├── phaser/             # jogos Phaser
│   └── pixi/               # jogos PixiJS (vazio até precisar)
├── hooks/                  # use-auth, use-child, use-parent, use-mentor
├── lib/                    # supabase, claude, sentry, posthog, resend, revenuecat
├── providers/              # auth-provider, query-provider
├── proxy.ts                # proteção de rotas (Next 16; NÃO middleware.ts)
├── stores/                 # zustand stores
└── types/                  # database.types.ts (auto-gerado)
```

---

## 9. Tooling não-negociável

- **TypeScript strict** + `noUnusedLocals`/`noUnusedParameters`.
- **`any` proibido** salvo justificativa em comentário linha-acima.
- **ESLint + Prettier** rodam em pre-commit (Husky).
- **Conventional Commits** validado por commitlint (`feat:`, `fix:`, `chore:`,
  `docs:`, `refactor:`, `test:`).
- **`tsconfig.json` `exclude`**: `node_modules`, `prototipo-original`, `public`.
  Protótipos vivem em `public/` e não devem ser type-checked.

### Comandos sempre antes de "tarefa completa"

```bash
npx tsc --noEmit                      # typecheck strict
npx eslint <files-modificados>        # lint zero warnings
npm run build                         # quando refatoração tocar muitos arquivos
```

---

## 10. Workflow / Aprovações

- **Plan mode obrigatório** antes de tarefas multi-fase. Plano em
  `~/.claude/plans/` é fonte de verdade até Eduardo aprovar.
- **PARE entre fases** (regra do plano original) — esperar OK do Eduardo
  antes de iniciar próxima fase grande.
- **Auto mode ≠ liberdade total**: ações destrutivas (delete, drop, force-push,
  modificar config compartilhada) sempre confirmar.
- **Feedback do Eduardo** prevalece sobre minha interpretação. Se ele corrige,
  salvar em memory `feedback_*.md`.

---

## 11. Memory / persistência entre sessões

Memory file system em `~/.claude/projects/c--Users-DIRIGE-AI-Documents-Nexus-Kids-Academy/memory/`.

- Salvar **fatos sobre Eduardo, projeto, decisões não-óbvias**.
- **Não salvar** coisas deriváveis do código (paths, structure, history).
- Atualizar **MEMORY.md** index com 1 linha por entrada (< 200 linhas total).
- Usar tipos: `user`, `feedback`, `project`, `reference`.

---

## 12. Roadmap (estado atual: Fase 4 ✅)

| Fase | Status | Conteúdo |
|---|---|---|
| 1 | ✅ | Setup: Next 16 + Capacitor + tooling + estrutura |
| 2 | ✅ | Supabase + auth pai-criança + LGPD docs |
| 3 | ✅ | 7 telas do protótipo + i18n base + roteamento |
| 4 | ✅ | Game Adapter Pattern + Encaixe Formas + Resgate da Primeira Letra |
| 5 | ⏸ | MENTOR IA + Sentry + PostHog + Resend + RevenueCat |
| 6 | ⏸ | Capacitor build + Vercel deploy + docs finais |

MVP completo: 15-22 semanas. Lançamento Q3-Q4 2027.

---

## 13. Referências externas

- **Projeto irmão**: `C:\Users\DIRIGE AI\nexus-elite-academy\` — Next.js 16 + Supabase
  maduro. Reusar padrões de `auth-provider`, hooks, supabase clients,
  `proxy.ts`, migrations.
- **Plano original**: `~/.claude/plans/analise-o-prompt-e-peppy-lake.md`.
- **Repo**: `https://github.com/eduardomarks23-stack/Kids-Academy.git` (não
  pushado ainda).

---

## 14. Anti-patterns (NÃO fazer)

- ❌ `middleware.ts` em Next 16 — usar `proxy.ts`.
- ❌ Mocks em testes que tocam Supabase/Auth — usar test database real.
- ❌ Phaser.Text com emojis — sempre pré-renderizar em canvas.
- ❌ Drag em Container Phaser escalado — usar Image direto.
- ❌ `window.addEventListener` para comunicação Phaser ↔ React — usar `GameCallbacks`.
- ❌ Comentários explicando "o que" o código faz — apenas "por que" não-óbvio.
- ❌ Comentários referenciando issue/task/PR ("added for X", "fixes #123") —
  isso vai pra mensagem de commit, não pro código.
- ❌ `console.log` em produção — usar Sentry (Fase 5).
- ❌ Strings literais hardcoded em UI — passar pelo next-intl.
- ❌ Importar Phaser fora de `dynamic()` — bola no bundle inicial.
- ❌ Editar migration SQL já aplicada — criar nova.
- ❌ `git push --force` sem permissão explícita.
- ❌ `git commit --no-verify` (skip hooks).
- ❌ Adicionar `any` sem comentário justificando.

---

**Última atualização:** 2026-05-08 (após integração de Resgate da Primeira
Letra, lições sobre drag em Image direto + emoji rendering em canvas).

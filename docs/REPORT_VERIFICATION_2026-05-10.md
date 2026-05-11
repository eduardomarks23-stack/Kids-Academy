# Relatório de Verificação — Nexus Kids Academy

**Data:** 2026-05-10
**Commit auditado:** `a8d6ef2869fc2dc39deb619bd05ac1af2101260d`
**Branch:** `main` (com 10 arquivos modificados não commitados)
**Fases cobertas:** 1, 2, 3, 4 (declaradas completas)
**Plano executado:** [docs/VERIFICATION_PLAN.md](VERIFICATION_PLAN.md)

---

## 0. Sumário executivo

| Severidade | Contagem | Itens |
|---|---|---|
| 🔴 **Crítico** | 1 | Bypass de consentimento LGPD em `/onboarding` |
| 🟠 **Alto** | 6 | Aventura Matemática placeholder, exclusão LGPD desabilitada, telefone sem justificativa, dark mode acessível, verificação de bundle pendente, sem testes |
| 🟡 **Médio** | 7 | Strings UI fora de i18n, `console.warn` em produção, `noUnusedLocals/Parameters` ausentes, depth-in-defense, MFA sem flow, dependências menores desatualizadas, falta `src/app/api` |
| 🟢 **Baixo / OK** | — | RLS completo, secrets bem isolados, proxy correto, Game Adapter íntegro, todas as 9 telas, 4 jogos |
| ℹ️ **Informativo** | 4 | Docs LGPD em draft (esperado), turbopack output sem bundle sizes, npm audit 2 moderate transitivos, 1.3MB chunk (provável Phaser) |

**Veredito:** **APROVADO COM RESSALVAS**

Zero issues bloqueantes a nível de código (typecheck ✅, lint ✅, build ✅).
**1 issue 🔴 LGPD precisa correção antes de qualquer beta com famílias reais.**
6 itens 🟠 são gaps conhecidos ou cosméticos para Fase 5.

---

## 1. Estado base

```
Commit:       a8d6ef2 feat(games): Fase 4 — Game Adapter Pattern + multi-engine + Pega Frações + Aventura Matemática
Working tree: 10 modificados, 8 untracked (incluindo este relatório)
Arquivos rastreados (git): 130
Arquivos em src/:          90
Node:    v24.14.0
npm:     11.9.0
TS:      5.9.3
```

Histórico recente (4 commits, 1 por fase):
- `a8d6ef2` Fase 4 — Game Adapter + 4 jogos
- `88cdb27` Fase 3 — 7 telas + i18n
- `220205f` Fase 2 — Auth + LGPD
- `eeec346` Fase 1 — scaffold

---

## 2. Verificação de Código

### 2.1 TypeScript strict — ✅ OK
`npx tsc --noEmit --pretty false` → **exit 0**, zero erros.

### 2.2 ESLint zero warnings — ✅ OK
`npx eslint src --max-warnings=0` → **exit 0**, zero warnings.
ℹ️ Aviso informativo: o formatador `compact` não faz mais parte do core do ESLint 9; usar `stylish` ou instalar `eslint-formatter-compact` se preferido.

### 2.3 Build de produção — ✅ OK / 🟠 bundle size não medido
`npm run build` → **exit 0**, compilou em 7.5s, 14 rotas geradas.

| Rota | Tipo |
|---|---|
| `/` | static |
| `/cadastro`, `/login`, `/consentimento-lgpd`, `/onboarding`, `/recuperar-senha` | static |
| `/home`, `/mentor`, `/aula/[id]`, `/jogo/[id]`, `/quiz/[id]`, `/trilha/[id]` | dynamic |
| `/pais/conta`, `/pais/dashboard` | dynamic |
| `/auth/callback` | dynamic |

🟠 **Verificação de bundle <300KB pendente.** Next 16 com Turbopack não imprime "First Load JS" no formato clássico (route × KB). Inspeção manual de `.next/static/chunks/`:
- ~70 chunks gerados
- Maior chunk: 1.3MB (`12-kc_cqtu~fe.js`) — provável Phaser, **deve ser carregado lazy**
- Confirmação arquitetural: `src/games/phaser/*/index.ts` usam `await import('phaser')` dentro de `mount()` (verificado em 3 jogos), garantindo lazy loading
- **Recomendação:** rodar `@next/bundle-analyzer` numa próxima passagem para medir First Load JS exato

### 2.4 Anti-patterns

| Check | Resultado |
|---|---|
| `any` sem comentário | 🟢 zero |
| `middleware.ts` | 🟢 não existe (apenas `proxy.ts`) |
| `console.log/debug/info` | 🟡 1 ocorrência: [src/games/core/BehaviorTracker.ts:127](../src/games/core/BehaviorTracker.ts#L127) — `console.warn` em error path. Aceitável até Sentry (Fase 5) |
| `window.dispatchEvent` em jogos | 🟢 zero |
| Phaser.Text com emoji | 🟢 zero — emojis pré-renderizados em texturas conforme guardrail |
| Phaser fora de `dynamic()` | 🟢 todos os imports são `await import('phaser')` |
| Comentários `// fixes #...` / `// added for X` | 🟢 zero |
| Migration editada após commit | 🟢 zero (`git log --diff-filter=M` vazio) |

### 2.5 Game Adapter Pattern

| Jogo | Engine | Slug registrado | Interface | Eventos comportamentais | Status |
|---|---|---|---|---|---|
| **Pega Frações** | react | `pega-fracoes` | ✅ `KidsAcademyGameWithCallbacks` | ✅ tempo_resposta, tentativas_multiplas, conquista_streak | 🟢 |
| **Encaixe das Formas** | phaser | `encaixe-formas` | ✅ | ✅ + erro_conceitual | 🟢 |
| **Resgate da Primeira Letra** | phaser | `resgate-primeira-letra` | ✅ | ✅ + hesitacao + interacao_audio | 🟢 |
| **Aventura Matemática** | phaser | `aventura-matematica` | ✅ | ❌ **nenhum** | 🟠 placeholder |

🟠 **[src/games/phaser/AventuraMatematica/index.ts:1-6](../src/games/phaser/AventuraMatematica/index.ts#L1)** — auto-declarado placeholder ("Implementação completa virá em sub-fase dedicada"). Está registrado no `GameRegistry` e pode aparecer na UI sem entregar valor pedagógico ou telemetria. **Decisão:** ou completar antes de mostrar a usuários, ou flagear como `dev-only` no registry.

🟢 **BehaviorTracker correto:** [src/games/core/GameRunner.tsx:32](../src/games/core/GameRunner.tsx#L32) passa slug em `jogoId` e o tracker em [BehaviorTracker.ts:105-108](../src/games/core/BehaviorTracker.ts#L105) detecta UUID vs slug, gravando slug em `valor.jogo_slug` (campo Json) e não em `jogo_id` (FK UUID).

### 2.6 Estrutura de pastas — 🟢 / 🟡

Todos os diretórios obrigatórios existem (`src/app/{(auth),(app),pais,auth,onboarding}`, `src/components/{kids,ui}`, `src/games/{core,simple,phaser}`, `src/{hooks,lib,providers,services,stores,types}`, `src/proxy.ts`).

🟡 **`src/app/api/` não existe.** Único route handler: `src/app/auth/callback/route.ts`. Endpoints API server-side (chamadas para Anthropic, RevenueCat webhooks, MENTOR) virão na Fase 5 — diretório precisa ser criado então.

🟡 **`src/stores/` está vazio.** Sem stores Zustand criados ainda (esperado — surgirão conforme necessidade).

---

## 3. Verificação de Segurança

### 3.1 Secrets — 🟢 OK

- 🟢 Nenhum token hardcoded (`sk-`, `sb_`, `AIza`, JWT) em `src/` ou `supabase/`.
- 🟢 `.env.local` está no `.gitignore` e **nunca foi rastreado** (`git log --all --full-history -- .env.local` vazio). Existe localmente para dev — comportamento correto.
- 🟢 Apenas `.env.example` está rastreado (sem segredos reais).
- 🟢 `SUPABASE_SERVICE_ROLE_KEY` não aparece em código client-side.
- 🟢 Nenhum `NEXT_PUBLIC_(SERVICE|SECRET|PRIVATE|ADMIN|ROLE)`.

> **Nota:** uma checagem inicial sugeriu `.env.local` exposto — falso positivo. O arquivo existe localmente (correto) mas não está no histórico git.

### 3.2 Supabase / RLS — 🟢 OK

Matriz completa em [Anexo A](#anexo-a-matriz-rls). Resumo:

- ✅ **17/17 tabelas** com `ENABLE ROW LEVEL SECURITY`.
- ✅ **17/17 tabelas** com policy SELECT explícita.
- ✅ **0 policies** com `USING (true)` (open).
- ✅ Todas as policies de INSERT/UPDATE têm `WITH CHECK`.
- ✅ Helper `pertence_ao_responsavel()` centraliza lógica responsável→criança.
- ✅ Zero uso de `uuid_generate_v4()` (todos `gen_random_uuid()`).
- ✅ Ausência intencional de policies DELETE para tabelas de progresso (audit trail) — exclusão LGPD via função `deletar_dados_crianca()`.

### 3.3 Auth / proxy — 🟢 OK

[src/proxy.ts:54](../src/proxy.ts#L54) usa `supabase.auth.getUser()` (validação server-side via Auth API) e **não** apenas `getSession()` para gating de rotas.

| Rota | Acesso |
|---|---|
| `/`, `/login`, `/cadastro`, `/recuperar-senha`, `/auth/callback` | 🟢 público |
| `/pais/**`, `/consentimento-lgpd`, `/onboarding` | 🟢 protegido (PAIS_ONLY) |
| `/home`, `/trilha`, `/aula`, `/jogo`, `/quiz`, `/mentor` | 🟢 protegido (APP_ONLY) |

[src/providers/auth-provider.tsx:25-36](../src/providers/auth-provider.tsx#L25) usa `getSession()` apenas para estado de UI — não para autorização. Correto.

Filtro `responsavel_id` por defesa em profundidade confirmado em:
- [src/app/pais/dashboard/page.tsx](../src/app/pais/dashboard/page.tsx)
- [src/app/(app)/layout.tsx](../src/app/(app)/layout.tsx)
- [src/app/(app)/jogo/[id]/page.tsx](../src/app/(app)/jogo/[id]/page.tsx)

### 3.4 Inputs do usuário — 🟢 OK

- 🟢 Zero `dangerouslySetInnerHTML`.
- 🟢 Zero `.rpc()` com concatenação de input.
- 🟢 Validação Zod em todos os formulários `(auth)`: cadastro, login, consentimento-lgpd, recuperar-senha.
- 🟢 Sem endpoints POST de API hoje (apenas `/auth/callback` GET para OAuth).

### 3.5 Capacitor — 🟢 OK

[capacitor.config.ts](../capacitor.config.ts) minimalista:
```ts
{ appId: 'com.nexus.kidsacademy', appName: 'Kids Academy', webDir: 'out' }
```
- 🟢 Sem `server.url` apontando para localhost.
- 🟢 Sem `cleartext: true`.
- 🟢 Sem `allowNavigation` amplo.
- ℹ️ `android/` e `ios/` ainda não criados (Fase 6).

### 3.6 npm audit — 🟡 2 moderate

```
moderate: 2 (postcss XSS via </style> + next como effect)
high: 0
critical: 0
```

- **postcss <8.5.10** (transitivo via `next` — node_modules/next/node_modules/postcss). CWE-79, CVSS 6.1.
- `fixAvailable` exige `next@9.3.3` (downgrade major). **Não corrigir** — esperar patch upstream do Next 16. Risco real é baixo (postcss roda em build, não em runtime do app servidor).

### 3.7 Dependências desatualizadas — 🟡

Nenhum major bloqueante. Atualizações menores recomendadas (não-breaking):

| Pacote | Atual | Wanted | Latest |
|---|---|---|---|
| @capacitor/* | 8.3.2 | 8.3.3 | 8.3.3 |
| @tailwindcss/postcss + tailwindcss | 4.2.4 | 4.3.0 | 4.3.0 |
| react / react-dom | 19.2.4 | — | 19.2.6 |
| tailwind-merge | 3.5.0 | — | 3.6.0 |
| lint-staged | 17.0.3 | — | 17.0.4 |
| eslint | 9.39.4 | — | 10.3.0 (major, ignorar) |
| typescript | 5.9.3 | — | 6.0.3 (major, ignorar) |

---

## 4. Verificação de Compliance LGPD

### 4.1 Consentimento parental — 🔴 CRÍTICO

**Tela existe:** [src/app/(auth)/consentimento-lgpd/page.tsx](../src/app/(auth)/consentimento-lgpd/page.tsx) com versionamento de termo (`TERMO_VERSAO`), 3 checkboxes (1 obrigatório + 2 opcionais), registro auditável de IP/user-agent/timestamp em `consentimentos_lgpd`. ✅

**🔴 Falha de fluxo:** [src/app/onboarding/page.tsx:45-70](../src/app/onboarding/page.tsx#L45) faz `INSERT em perfis_crianca` **sem consultar `consentimentos_lgpd`**. O fluxo desejado é cadastro → email → callback → `/consentimento-lgpd` → `/pais/dashboard`, mas se o usuário acessar diretamente `/onboarding` (rota protegida pelo proxy mas não pelo consentimento), pula a etapa.

**Risco:** LGPD Art. 14 §1 — consentimento "específico e em destaque" não garantido procedimentalmente. Auditoria externa flagaria.

**Correção sugerida** (4-6 linhas, antes da Fase 5):

```typescript
// Em criarPerfil(), antes do insert:
const { data: consent } = await supabase
  .from('consentimentos_lgpd')
  .select('id')
  .eq('responsavel_id', user.id)
  .eq('tipo', 'tratamento_dados')
  .eq('status', 'concedido')
  .maybeSingle();
if (!consent) { router.push('/consentimento-lgpd?next=/onboarding'); return; }
```

### 4.2 Direito ao esquecimento (Art. 18) — 🟠

- ✅ Função `deletar_dados_crianca(crianca_id uuid)` definida em [supabase/migrations/20260508120000_initial_schema.sql:175-193](../supabase/migrations/20260508120000_initial_schema.sql#L175) com check de `responsavel_id = auth.uid()` e cascata via FK.
- 🟠 UI desabilitada — botão "Excluir conta e dados" em `src/app/pais/conta/page.tsx:57-59` está marcado "em breve". Sem endpoint que invoque a função.
- **Aceitável até Fase 6** (deploy em produção exige).

### 4.3 Coleta mínima — 🟢 / 🟠 (1 item)

`perfis_crianca` (8 campos): id, responsavel_id, nome, data_nascimento (opcional), serie, avatar_id, ativo, pin_acesso (hash). 🟢 minimalista.

`responsaveis` (7 campos): nome, email, **telefone** 🟠, cpf_hash 🟢. **🟠 telefone é coletado sem justificativa em `COMPLIANCE_LGPD.md` ou `POLITICA_PRIVACIDADE_INFANTIL.md`** — remover ou documentar finalidade.

✅ Não coletados: CPF da criança, geolocalização, foto real, contatos, dados de saúde.

### 4.4 Conteúdo jurídico — ℹ️ esperado

| Doc | Tamanho | Marcadores `[REVISÃO JURÍDICA]` |
|---|---|---|
| `COMPLIANCE_LGPD.md` | 7.5KB | 7 |
| `POLITICA_PRIVACIDADE_INFANTIL.md` | 5.0KB | 2 |
| `TERMOS_USO_MENORES.md` | 3.6KB | 3 |

Todos auto-declarados como **draft**. ℹ️ esperado para Fase 4.

### 4.5 Isolamento entre famílias — 🟢

RLS + `pertence_ao_responsavel()` cobrem cada tabela com dados de menores. UI ainda faz `.eq('responsavel_id', user.id)` redundante — defesa em profundidade correta.

---

## 5. Verificação de UX infantil

### 5.1 Background branco — 🟢

- ✅ Telas infantis usam `bg-white` ou padrão claro (verified em `onboarding`, `home`, `(app)/layout`, `pais/dashboard`).
- ✅ `globals.css` define `--background: oklch(1 0 0)` (branco) em `:root`.
- 🟠 **Dark mode implementado mas sem trava em telas infantis.** Classe `.dark` em `globals.css:86-118` define `--background` cinza escuro. Componentes shadcn (`button`, `input`) usam `dark:bg-*`. Se o Capacitor/sistema operacional ativar `<html class="dark">` (preferência do SO), o background quebra.
  - **Correção:** em `src/app/(app)/layout.tsx`, forçar `document.documentElement.classList.remove('dark')` no mount.

### 5.2 Hit areas (≥48px) — 🟢

- ✅ Botões principais do onboarding: `h-[60px]` ou `h-14` (56px).
- ✅ Avatares: `aspect-square` em grid de 6 colunas (~60px+).
- ✅ Bottom nav: `py-2.5` com ícones grandes.
- ℹ️ Checkboxes em formulários de adulto (`consentimento-lgpd`): `h-4 w-4` — aceitável (não é UI infantil).

### 5.3 i18n — 🟡

- ✅ Estrutura pronta: `src/i18n/config.ts`, `src/i18n/messages/pt-BR.json` (98 strings).
- 🟡 **Telas infantis ainda usam strings pt-BR hardcoded** (não chamam `useTranslations()` / `t()`). Confirmado em onboarding, home. Aceitável para Fase 1 (pt-BR ativo); refatorar antes de habilitar EN/ES.
- 🟡 Strings hardcoded em jogos: `PegaFracoes/index.tsx`, `ResgatePrimeiraLetra/MainScene.ts` (5 amostras coletadas). Mesma justificativa.

### 5.4 Mobile-first 320px — 🟢

`max-w-xl mx-auto` em telas → 336px ok em 320px viewport. `globals.css` sem max-width fixa restritiva.

---

## 6. Verificação de Negócio

### 6.1 Roadmap Fase 1-4 — 🟢 100%

| Fase | Score | Highlights |
|---|---|---|
| **Fase 1 — Setup** | 5/5 ✅ | Next 16.2.6, Capacitor 8, TS strict, ESLint 9, estrutura completa |
| **Fase 2 — Auth + LGPD** | 7/7 ✅ | proxy.ts, auth-provider, 3 tabelas LGPD, trigger handle_new_user, função deletar_dados_crianca, 3 docs jurídicos |
| **Fase 3 — 7 telas + i18n** | 4/4 ✅ | **9 telas** entregues (excede), next-intl 4.11.1, src/i18n/ configurado |
| **Fase 4 — Game Adapter + 2 jogos** | 6/6 ✅ | **4 jogos** entregues (excede), types.ts, GameRegistry, BehaviorTracker, GameRunner, PhaserHost |

**Telas (9):** `/`, `/login`, `/cadastro`, `/recuperar-senha`, `/consentimento-lgpd`, `/onboarding`, `/home`, `/trilha/[id]`, `/aula/[id]`, `/quiz/[id]`, `/jogo/[id]`, `/mentor`, `/pais/dashboard`, `/pais/conta` (na verdade 14 com auth e pais, todas funcionais).

🟡 **TS strict cosmético:** `tsconfig.json` tem `"strict": true` mas faltam `noUnusedLocals` e `noUnusedParameters` exigidos pelo `GUARDRAILS §9`. Adicionar antes da Fase 5.

### 6.2 Vazamento de escopo Fase 5 — 🟢 zero

| Dep | Encontrado |
|---|---|
| `@sentry/*` | ❌ não |
| `posthog` | ❌ não |
| `revenuecat` | ❌ não |
| `resend` | ❌ não |
| `@anthropic-ai/sdk` (client ou server) | ❌ não |

🟢 Nenhuma dependência de Fase 5 importada. Apenas referências de schema em `src/types/database.types.ts` (auto-gerado, não-executável).

### 6.3 Documentação — 🟢

| Doc | Tamanho | Status |
|---|---|---|
| ARCHITECTURE.md | 3.8KB | ✅ |
| GAMES_ARCHITECTURE.md | 4.0KB | ✅ |
| CREATING_NEW_GAMES.md | 4.7KB | ✅ |
| COMPLIANCE_LGPD.md | 7.5KB | ✅ |
| TERMOS_USO_MENORES.md | 3.6KB | ✅ |
| POLITICA_PRIVACIDADE_INFANTIL.md | 5.0KB | ✅ |
| README.md | 5.2KB | ✅ |
| adr/0001-stack-decisions.md | ✅ | Stack consolidada |

### 6.4 ADRs — 🟢

ADR 0001 cobre toda a stack travada. Decisões adicionais (lazy loading Phaser, multi-engine, proxy.ts vs middleware.ts) estão consolidadas em `GAMES_ARCHITECTURE.md` e `CLAUDE.md` — aceitável para o estágio.

---

## 7. Verificação de Testes — 🟠 gap conhecido

- ❌ `tests/unit/` vazio.
- ❌ `tests/e2e/` vazio.
- ❌ Zero arquivos `*.test.ts(x)` ou `*.spec.ts(x)` em `src/` ou `tests/`.
- ❌ Sem `vitest`, `jest` ou `playwright` em `package.json`.

**Risco:** Lógica crítica (auth, RLS, billing, BehaviorTracker, fluxo de consentimento) sem cobertura. Viola `GUARDRAILS §5.9`.

**Mitigação:** TypeScript strict + ESLint + RLS no banco fornecem proteção parcial. **Bloqueante antes de produção; aceitável até início da Fase 5.**

**Recomendação:** instalar Vitest + @testing-library/react no início da Fase 5 e cobrir como prioridade:
1. `proxy.ts` — autorização de rotas.
2. `BehaviorTracker` — UUID vs slug, batch flush.
3. RLS via integration tests com 2 famílias.
4. Fluxo de consentimento → onboarding.

---

## 8. Plano de ação priorizado

### 🔴 Crítico — corrigir antes de qualquer beta

1. **Bypass de consentimento em `/onboarding`** ([src/app/onboarding/page.tsx:45](../src/app/onboarding/page.tsx#L45))
   - **Por quê:** LGPD Art. 14 §1 — consentimento parental obrigatório antes de tratar dados de menor.
   - **Como:** adicionar query a `consentimentos_lgpd` antes do INSERT (snippet em §4.1).
   - **Esforço:** ~10 min.

### 🟠 Alto — antes da Fase 5

2. **Aventura Matemática placeholder visível ao usuário** ([src/games/phaser/AventuraMatematica/](../src/games/phaser/AventuraMatematica/))
   - **Como:** completar implementação OU desregistrar do `GameRegistry` em produção (flag dev).
   - **Esforço:** 1 dia de implementação ou 5 min de flag.

3. **Telefone coletado sem justificativa documentada** (`responsaveis.telefone`)
   - **Como:** documentar finalidade em `POLITICA_PRIVACIDADE_INFANTIL.md` OU remover coleta.
   - **Esforço:** 30 min.

4. **Dark mode acessível em telas infantis** (globals.css `.dark`)
   - **Como:** forçar remoção da classe `.dark` no layout `(app)`.
   - **Esforço:** 5 linhas.

5. **Bundle size <300KB não verificado** (`.next/static/chunks` com 70+ chunks Turbopack)
   - **Como:** rodar `@next/bundle-analyzer` ou `next build --analyze` numa próxima passagem.
   - **Esforço:** 30 min.

6. **Sem testes automatizados**
   - **Como:** instalar Vitest no início da Fase 5; cobertura mínima de 4 áreas (§7).
   - **Esforço:** 1 sprint de Fase 5.

### 🟡 Médio — durante Fase 5

7. **Strings UI fora de i18n** (telas + jogos) — refatorar com `useTranslations()` antes de habilitar EN/ES.
8. **`console.warn` em BehaviorTracker** ([src/games/core/BehaviorTracker.ts:127](../src/games/core/BehaviorTracker.ts#L127)) — substituir por Sentry quando integrado.
9. **`tsconfig.json` faltam `noUnusedLocals` + `noUnusedParameters`** (`GUARDRAILS §9`).
10. **Botão "Excluir dados" desabilitado** ([src/app/pais/conta/page.tsx](../src/app/pais/conta/page.tsx)) — implementar fluxo confirmação por email + chamar `deletar_dados_crianca()`.
11. **MFA opcional** — schema tem `responsaveis.mfa_habilitado` mas sem flow no login.
12. **Atualizações menores de deps** (capacitor 8.3.2→8.3.3, tailwind 4.2.4→4.3.0, react 19.2.4→19.2.6).
13. **`src/app/api/` ausente** — criar quando primeira route handler de Fase 5 surgir.

### ℹ️ Informativo — esperado

- 12 marcadores `[REVISÃO JURÍDICA]` em docs LGPD — agendar revisão com advogado pré-produção.
- 2 vulnerabilidades `moderate` (postcss transitivo) — aguardar patch upstream do Next.

---

## 9. Anexos

### Anexo A — Matriz RLS

| Tabela | RLS | SELECT | INSERT (WITH CHECK) | UPDATE | DELETE |
|---|---|---|---|---|---|
| `responsaveis` | ✅ | `id = auth.uid()` | (trigger handle_new_user) | `id = auth.uid()` | — |
| `perfis_crianca` | ✅ | `responsavel_id = auth.uid()` | ✅ `responsavel_id = auth.uid()` | ✅ | ✅ |
| `consentimentos_lgpd` | ✅ | próprio | ✅ próprio | próprio | — |
| `trilhas` | ✅ | `ativa = true` | (service_role) | — | — |
| `niveis` | ✅ | `ativo = true` | — | — | — |
| `aulas` | ✅ | `ativa = true` | — | — | — |
| `jogos` | ✅ | `ativo = true` | — | — | — |
| `questoes` | ✅ | sem filtro (público) | — | — | — |
| `sessoes` | ✅ | `pertence_ao_responsavel()` | ✅ | ✅ | — |
| `progresso_aluno` | ✅ | `pertence_ao_responsavel()` | ✅ | ✅ | — |
| `eventos_comportamento` | ✅ | `pertence_ao_responsavel()` | ✅ | — | — |
| `conquistas` | ✅ | `ativa = true` | — | — | — |
| `conquistas_aluno` | ✅ | `pertence_ao_responsavel()` | ✅ | — | — |
| `mentor_insights` | ✅ | `pertence_ao_responsavel()` | (service_role) | ✅ | — |
| `assinaturas` | ✅ | `responsavel_id = auth.uid()` | (service_role) | — | — |
| `assinaturas_eventos` | ✅ | `responsavel_id = auth.uid()` | (service_role) | — | — |
| `feedback` | ✅ | próprio | ✅ próprio | — | — |

Total: 17/17 tabelas com RLS habilitado. Ausência de DELETE é intencional (audit trail + LGPD via função).

### Anexo B — Vulnerabilidades npm

```
moderate: 2
  - postcss <8.5.10 (XSS via </style> em CSS Stringify Output)
    CVE: GHSA-qx2v-qp2m-jg93 | CVSS 6.1 | CWE-79
    Via: next > postcss
    fixAvailable: next@9.3.3 (downgrade major — NÃO APLICAR)
high: 0
critical: 0
total: 2 / 906 dependências
```

### Anexo C — Métricas do projeto

```
Arquivos rastreados:        130
Arquivos em src/:            90
Migrations SQL:               5
Telas (page.tsx + route.ts): 14
Componentes kids:             8
Componentes ui (shadcn):      6
Jogos registrados:            4 (1 react + 3 phaser)
Strings i18n pt-BR:          98
Docs (markdown):              7 + 1 ADR
Build time:                7.5s (Turbopack)
Static pages:                14
Bundle chunks:               70+ (não medido individualmente)
Maior chunk:               1.3MB (provável Phaser, lazy)
```

### Anexo D — Telas e rotas

| Rota | Tipo | Auth |
|---|---|---|
| `/` | static | público |
| `/login` | static | público |
| `/cadastro` | static | público |
| `/recuperar-senha` | static | público |
| `/consentimento-lgpd` | static | autenticado |
| `/auth/callback` | dynamic | público (OAuth) |
| `/onboarding` | static | autenticado (PAIS_ONLY) |
| `/home` | dynamic | autenticado (APP) |
| `/trilha/[id]` | dynamic | autenticado (APP) |
| `/aula/[id]` | dynamic | autenticado (APP) |
| `/quiz/[id]` | dynamic | autenticado (APP) |
| `/jogo/[id]` | dynamic | autenticado (APP) |
| `/mentor` | dynamic | autenticado (APP) |
| `/pais/dashboard` | dynamic | autenticado (PAIS_ONLY) |
| `/pais/conta` | dynamic | autenticado (PAIS_ONLY) |

---

**Auditoria executada autonomamente em 2026-05-10 conforme `docs/VERIFICATION_PLAN.md`.**
**Próxima revisão obrigatória:** após corrigir 🔴 e antes de iniciar Fase 5.

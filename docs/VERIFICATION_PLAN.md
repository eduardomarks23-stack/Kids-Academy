# Plano de Verificação Completa — Nexus Kids Academy

**Versão:** 1.0
**Criado em:** 2026-05-10
**Escopo:** Revisão de Segurança + Código + Negócio das Fases 1-4 concluídas
**Modo de execução:** Autônomo, single-shot, somente leitura (sem mutações no repo)

---

## 0. Princípios de execução

- **Read-only obrigatório.** Nenhum comando deste plano modifica arquivos
  rastreados, banco, configs compartilhadas ou estado git. Saída final é um
  único relatório novo em `docs/REPORT_VERIFICATION_<data>.md`.
- **Sem prompts.** Todos os comandos abaixo são pré-aprovados (typecheck,
  lint, build, grep, cat, glob). Build é o único potencialmente lento — usar
  timeout 600s.
- **Sem dependências novas.** Não rodar `npm install`. Se faltar ferramenta,
  registrar no relatório como "gap de tooling" — não instalar.
- **Falhas não param a execução.** Cada checagem captura exit code + output
  para o relatório, e o agente segue para a próxima. Relatório consolida tudo
  ao final.
- **Idioma do relatório:** pt-BR. Severidades: 🔴 crítico / 🟠 alto / 🟡 médio /
  🟢 baixo / ℹ️ informativo.

---

## 1. Inventário inicial (baseline)

Coletar o estado para o relatório. Comandos:

```powershell
# Estado git (snapshot)
git status --short
git log --oneline -20
git rev-parse HEAD
git diff --stat HEAD

# Tamanho do projeto
git ls-files | Measure-Object -Line     # arquivos rastreados
(Get-ChildItem src -Recurse -File).Count # arquivos em src

# Versão do toolchain
node --version
npm --version
npx tsc --version
```

**Saída esperada no relatório:** seção "1. Estado base" com commit atual,
contagem de arquivos, branch, versões.

---

## 2. Verificação de Código (qualidade técnica)

### 2.1 TypeScript strict

```bash
npx tsc --noEmit --pretty false
```

- ✅ esperado: zero erros.
- ❌ qualquer erro → 🔴 crítico no relatório com arquivo:linha.

### 2.2 ESLint zero warnings

```bash
npx eslint src --max-warnings=0 --format=compact
```

- ✅ esperado: zero warnings/errors.
- Cada warning → entrada no relatório (severidade 🟡 a 🟠 conforme regra).

### 2.3 Build de produção (mede também bundle)

```bash
npm run build
```

- Capturar tamanho do bundle inicial. **GUARDRAIL: bundle inicial < 300KB.**
- Se bundle ≥ 300KB → 🔴 violação direta de `GUARDRAILS.md §6`.
- Verificar que Phaser/PixiJS não aparecem no bundle inicial (apenas chunks
  dinâmicos).

### 2.4 Dead code, `any` proibido, anti-patterns

Rodar greps específicos do `GUARDRAILS.md §14`:

```
# any sem comentário justificando
Grep: pattern=":\s*any[\s,;)>]" type=ts,tsx
  → para cada match, ler 1 linha acima; se não houver comentário pt-BR
    justificando → 🟠 violação do guardrail #9.

# middleware.ts (Next 16 usa proxy.ts)
Glob: pattern="src/**/middleware.ts"
  → qualquer match → 🔴 violação anti-pattern.

# console.log em src/ (deve estar zerado até Sentry/Fase 5)
Grep: pattern="console\.(log|debug|info)" path="src" type=ts,tsx
  → cada match → 🟡 (será migrado para Sentry na Fase 5, mas registrar).

# window.dispatchEvent / addEventListener para Phaser↔React
Grep: pattern="window\.(dispatchEvent|addEventListener)" path="src/games"
  → match → 🔴 violação Game Adapter §6 (deve usar GameCallbacks tipado).

# Strings literais em UI (deveriam estar via next-intl)
Grep: pattern=">[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]{3,}" path="src/components/kids" type=tsx
  → revisar amostra; se string visível ao usuário não passa por t() → 🟡.

# Phaser.Text com emoji (deve usar canvas pré-renderizado)
Grep: pattern="this\.add\.text.*[\u{1F300}-\u{1FAFF}]" path="src/games/phaser" type=ts multiline=true
  → match → 🟠 violação anti-pattern.

# Phaser fora de dynamic() (bloqueia bundle inicial)
Grep: pattern="^import\s+.*\s+from\s+['\"]phaser['\"]" path="src" type=ts,tsx
  → qualquer import estático que não esteja dentro de PhaserHost/dynamic
    → 🔴 violação §6.

# Comentários referenciando issue/task/PR
Grep: pattern="(// |\* )(added for|fixes #|para a fase|implementa task|issue #)" path="src" type=ts,tsx
  → match → 🟡 (anti-pattern §14).

# Migrations editadas
git log --diff-filter=M -- supabase/migrations/
  → qualquer modificação após primeiro commit da migration → 🔴
    violação §7 (nunca editar migration aplicada).
```

### 2.5 Conformidade com Game Adapter Pattern

Para cada jogo em `src/games/phaser/*` e `src/games/simple/*` (exceto
`_template`):

```
# 1. Implementa KidsAcademyGameWithCallbacks?
Grep: pattern="KidsAcademyGame(WithCallbacks)?" path=<jogo>

# 2. Registrado em GameRegistry.ts?
Read: src/games/core/GameRegistry.ts
  → confirmar slug e loader dinâmico.

# 3. Emite eventos comportamentais mínimos?
Grep: pattern="(tempo_resposta|tentativas_multiplas|conquista_streak)" path=<jogo>
  → faltar algum dos 3 → 🟠.

# 4. BehaviorTracker passa slug em valor.jogo_slug, não em jogo_id?
Grep: pattern="jogo_id\s*:\s*['\"][a-z-]" path=<jogo>
  → match → 🔴 (BehaviorTracker espera UUID em jogo_id).
```

### 2.6 Estrutura de pastas

Conferir que existem (e que nada está fora do lugar):

```
src/app/(auth)
src/app/(app)
src/app/pais
src/app/api
src/components/kids
src/components/ui
src/games/core
src/games/simple
src/games/phaser
src/hooks
src/lib
src/providers
src/proxy.ts          ← deve existir (NÃO middleware.ts)
src/stores
src/types
```

Qualquer divergência → 🟡.

---

## 3. Verificação de Segurança

### 3.1 Secrets em código

```
# Tokens da Supabase, OpenAI, Anthropic, Google, etc.
Grep: pattern="(sk-[a-zA-Z0-9]{20,}|sb_[a-z]{6}_[a-zA-Z0-9-]{30,}|AIza[0-9A-Za-z_-]{30,}|eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,})" path="src"
  → qualquer match → 🔴 crítico (secret commitado).

# .env / .env.local rastreados pelo git
git ls-files | Select-String "^\.env"
  → match → 🔴.

# Service role key client-side
Grep: pattern="SUPABASE_SERVICE_ROLE_KEY" path="src/app" type=ts,tsx
  → match em código rodado no client (component sem 'use server' ou rota não-API)
    → 🔴.

# NEXT_PUBLIC_ vazando o que não devia
Grep: pattern="NEXT_PUBLIC_(SERVICE|SECRET|PRIVATE|ADMIN)" path="src"
  → match → 🔴.
```

### 3.2 Supabase / RLS

```
# Toda tabela em migrations tem RLS habilitado?
Grep: pattern="CREATE TABLE" path="supabase/migrations" type=sql
  → para cada tabela criada, conferir em rls_policies.sql:
    - "ALTER TABLE <nome> ENABLE ROW LEVEL SECURITY" presente
    - pelo menos 1 policy de SELECT
    - faltar qualquer um → 🔴 (violação LGPD + §7).

# Policies que vazam dados entre famílias
Grep: pattern="USING\s*\(\s*true\s*\)" path="supabase/migrations" type=sql
  → match → 🔴 (policy aberta).

# Policies sem WITH CHECK em INSERT/UPDATE
Grep: pattern="CREATE POLICY.*FOR (INSERT|UPDATE)" path="supabase/migrations" type=sql multiline=true
  → cada uma → conferir presença de WITH CHECK; faltar → 🟠.

# uuid_generate_v4 (deve usar gen_random_uuid)
Grep: pattern="uuid_generate_v4" path="supabase/migrations" type=sql
  → match → 🟠 (§7).
```

### 3.3 Auth / proxy de rotas

```
Read: src/proxy.ts
  → conferir que rotas /(app)/*, /pais/*, /onboarding são protegidas.
  → conferir que /(auth)/* e /auth/callback são públicas.
  → conferir que sessão é validada via getUser() e não apenas getSession()
    (getSession lê cookie sem validar) → se usar só getSession → 🔴.

Read: src/providers/auth-provider.tsx (se existir)
Read: src/hooks/use-auth.ts (se existir)
  → checar que children não conseguem ver dados de outras famílias
    (filtro por responsavel_id em queries Supabase).
```

### 3.4 Dependências vulneráveis

```bash
npm audit --omit=dev --json
```

- Capturar `metadata.vulnerabilities` por severidade.
- 🔴 crítico ou 🟠 alto → entrada por pacote no relatório com versão recomendada.
- Não rodar `npm audit fix` (escopo é só leitura).

### 3.5 Dependências desatualizadas (informativo)

```bash
npm outdated --json
```

- Apenas registrar; não atualizar nada.
- Major version atrasada em libs críticas (Next, React, Supabase) → 🟡.

### 3.6 Inputs do usuário (XSS / injection surface)

```
# dangerouslySetInnerHTML no app
Grep: pattern="dangerouslySetInnerHTML" path="src"
  → match → 🟠, justificar uso ou remover.

# Construção de query SQL string (deve usar Supabase client tipado)
Grep: pattern="\.rpc\(|\.sql\(" path="src"
  → revisar cada uso; concat de input do usuário em SQL → 🔴.

# Validação Zod nos endpoints API
Glob: pattern="src/app/api/**/route.ts"
  → para cada route handler, confirmar parsing com zod schema antes de
    chamar Supabase. Faltar → 🟠.

# CORS / origin validation em route handlers que aceitam POST
Grep: pattern="export async function POST" path="src/app/api"
  → conferir que handler valida origem ou está atrás de auth.
```

### 3.7 Capacitor / Mobile

```
Read: capacitor.config.ts
  → server.url apontando para localhost ou IP fixo em produção → 🔴.
  → cleartext: true em produção → 🔴.
  → allowNavigation amplo demais → 🟠.

Glob: pattern="android/app/src/main/AndroidManifest.xml"
Glob: pattern="ios/App/App/Info.plist"
  → se existirem, listar permissões declaradas; permissões não-justificadas
    para um app infantil (CAMERA sem feature, LOCATION) → 🟠.
```

---

## 4. Verificação de Compliance LGPD

### 4.1 Fluxo de consentimento parental

```
Read: src/app/(auth)/consentimento-lgpd/page.tsx (ou similar)
  → confirmar que perfil de criança não pode ser criado antes do
    consentimento. Se rota /pais/dashboard cria criança sem checar
    flag de consentimento → 🔴 (LGPD §4).

Grep: pattern="consentimento_lgpd|consent" path="src" type=ts,tsx
  → mapear pontos de checagem.
```

### 4.2 Direito ao esquecimento (Art. 18)

```
# Função deletar_dados_crianca existe e está exposta?
Grep: pattern="deletar_dados_crianca" path="supabase/migrations" type=sql
  → confirmar definição.

Grep: pattern="deletar_dados_crianca" path="src"
  → confirmar UI/endpoint que chama. Se função existe no backend mas não
    há UI ainda → 🟠 (gap até Fase 6).
```

### 4.3 Coleta mínima

```
Read: supabase/migrations/*_initial_schema.sql
  → listar campos de perfis_crianca + responsaveis.
  → flagear campos não-essenciais para o produto (ex: cep, endereço completo,
    cpf da criança, foto sem necessidade) → 🟠.
```

### 4.4 Conteúdo jurídico revisado

```
Read: docs/COMPLIANCE_LGPD.md
Read: docs/TERMOS_USO_MENORES.md
Read: docs/POLITICA_PRIVACIDADE_INFANTIL.md
  → listar marcadores [REVISÃO JURÍDICA] pendentes (esperado, não bloqueia
    Fase 4) → ℹ️.
  → flagear se algum doc afirma compliance sem essa revisão final → 🟡.
```

### 4.5 Isolamento entre famílias (teste lógico)

Sem rodar testes (não existem ainda — ver §7), conferir manualmente as
queries de listagem em `src/hooks/` e `src/app/pais/`:

```
Grep: pattern="\.from\(['\"](perfis_crianca|progresso_aluno|sessoes|eventos_comportamento)" path="src"
  → para cada uso, conferir que há filtro por responsavel_id ou que RLS
    cobre. Lista direta sem filtro → 🟠 (depende da policy mas é defesa em
    profundidade).
```

---

## 5. Verificação de UX / Acessibilidade infantil

### 5.1 Background branco em todas as telas

```
Grep: pattern="(bg-(black|gray-9|slate-9|zinc-9|neutral-9|stone-9)|backgroundColor:\s*['\"]#[0-3])" path="src" type=tsx
  → match em tela de criança → 🔴 (GUARDRAILS §3).

Grep: pattern="dark:bg-" path="src" type=tsx
  → app não usa dark mode. Match → 🟠 (limpar).
```

### 5.2 Hit areas mínimas (48×48 px)

```
Grep: pattern="(h-(8|9|10)\s+w-(8|9|10)|height:\s*['\"]?[1-3][0-9]px)" path="src/components/kids" type=tsx
  → cada match em elemento clicável → revisar; <48px → 🟠.
```

### 5.3 i18n: zero hardcoded strings em telas

Já coberto em §2.4. Reportar consolidado aqui.

### 5.4 Mobile-first 320px

```
Read: src/app/globals.css
  → conferir reset / breakpoints. Se max-width fixa < 100% sem responsivo
    → 🟡.
```

---

## 6. Verificação de Negócio (alinhamento com escopo)

### 6.1 Roadmap Fase 1-4

Para cada item declarado completo no `GUARDRAILS.md §12`, validar
existência de artefato:

| Fase | Entregável esperado | Onde validar |
|---|---|---|
| 1 | Next 16 + Capacitor + tooling | `package.json`, `capacitor.config.ts`, `eslint.config.mjs`, `tsconfig.json` strict |
| 2 | Auth pai-criança + LGPD docs | `src/proxy.ts`, `src/providers/auth-provider.tsx`, `docs/COMPLIANCE_LGPD.md`, migration `_initial_schema.sql` |
| 3 | 7 telas migradas + i18n + roteamento | `src/app/**/page.tsx` ≥ 7 telas funcionais, `src/i18n/` configurado, `next-intl` ativo |
| 4 | Game Adapter + 2 jogos | `src/games/core/types.ts`, `src/games/phaser/EncaixeFormas/`, `src/games/phaser/ResgatePrimeiraLetra/`, registrados em `GameRegistry.ts` |

Cada entregável faltante → 🔴.

### 6.2 Não vazou escopo de fases futuras

```
# Sentry (Fase 5)
Grep: pattern="@sentry/" path="package.json|src"
  → match → 🟡 (escopo Fase 5 antecipado sem ADR).

# PostHog (Fase 5)
Grep: pattern="posthog" path="package.json|src" -i
  → match → 🟡.

# RevenueCat (Fase 5)
Grep: pattern="revenuecat|@revenuecat" path="package.json|src" -i
  → match → 🟡.

# Anthropic SDK direto no client (MENTOR é Fase 5 e deve ficar server-side)
Grep: pattern="from\s+['\"]@anthropic-ai/sdk['\"]" path="src/app/(app)|src/components/kids|src/games"
  → match → 🔴 (chave API exposta).
```

### 6.3 Documentação básica

Conferir presença e tamanho razoável (não vazio):

```
docs/ARCHITECTURE.md
docs/GAMES_ARCHITECTURE.md
docs/CREATING_NEW_GAMES.md
docs/COMPLIANCE_LGPD.md
docs/TERMOS_USO_MENORES.md
docs/POLITICA_PRIVACIDADE_INFANTIL.md
docs/adr/0001-stack-decisions.md
```

Qualquer faltante → 🟡. Vazio (< 500 chars) → 🟠.

### 6.4 ADRs para decisões travadas

Decisões de stack travadas em `GUARDRAILS.md §1` precisam de ADR:

```
ls docs/adr/
  → conferir presença mínima:
    - 0001 stack decisions (existe)
    - decisões adicionais (lazy loading Phaser, RLS-first, multi-engine)
      podem ser cobertas em 0001 ou ADRs próprias.
  → faltar ADR para mudança grande feita (ex: troca de animação)
    → 🟡.
```

---

## 7. Verificação de Testes

### 7.1 Cobertura de testes existente

```
Glob: pattern="tests/**/*.{test,spec}.{ts,tsx}"
Glob: pattern="src/**/*.{test,spec}.{ts,tsx}"
  → contar.
```

**Diretórios `tests/unit/` e `tests/e2e/` estão vazios na baseline (2026-05-10).**
Isso é gap conhecido. Reportar como:

- 🟠 **Risco:** "Lógica crítica (auth, RLS, billing) sem testes — viola
  GUARDRAILS §5.9. Aceitável até Fase 5 começar; bloqueante antes de produção."

### 7.2 Configuração de teste runner

```
Grep: pattern="(vitest|jest|playwright)" path="package.json"
  → nenhum match → 🟡 (não há runner configurado; planejar para Fase 5).
```

---

## 8. Geração do relatório

### 8.1 Formato

Criar **um único arquivo novo**: `docs/REPORT_VERIFICATION_2026-05-10.md`
(usar data atual). Sem editar arquivos existentes.

### 8.2 Estrutura do relatório

```markdown
# Relatório de Verificação — Nexus Kids Academy
**Data:** <YYYY-MM-DD>
**Commit:** <git rev-parse HEAD>
**Fases cobertas:** 1-4

## Sumário executivo
- 🔴 Críticos: <N>
- 🟠 Altos: <N>
- 🟡 Médios: <N>
- 🟢 Baixos: <N>
- ℹ️ Informativos: <N>

**Veredito:** APROVADO / APROVADO COM RESSALVAS / BLOQUEADO

## 1. Estado base
<git status, contagem, versões>

## 2. Código
### 2.1 TypeScript
### 2.2 ESLint
### 2.3 Build + bundle inicial
### 2.4 Anti-patterns
### 2.5 Game Adapter
### 2.6 Estrutura

## 3. Segurança
### 3.1 Secrets
### 3.2 Supabase / RLS
### 3.3 Auth / proxy
### 3.4 npm audit
### 3.5 Deps desatualizadas
### 3.6 Input validation
### 3.7 Capacitor

## 4. LGPD
### 4.1 Consentimento
### 4.2 Direito ao esquecimento
### 4.3 Coleta mínima
### 4.4 Docs jurídicos
### 4.5 Isolamento entre famílias

## 5. UX infantil
### 5.1 Background branco
### 5.2 Hit areas
### 5.3 i18n
### 5.4 Mobile-first

## 6. Negócio
### 6.1 Roadmap Fase 1-4
### 6.2 Vazamento de escopo
### 6.3 Docs
### 6.4 ADRs

## 7. Testes
### 7.1 Cobertura
### 7.2 Runner

## 8. Plano de ação
Lista priorizada por severidade. Cada item:
- **Severidade**
- **O quê** (descrição curta)
- **Onde** (arquivo:linha ou comando)
- **Por quê** (qual guardrail/risco)
- **Como corrigir** (1-2 linhas)
- **Quando** (antes da Fase 5 / antes de produção / nice-to-have)
```

### 8.3 Critérios de veredito

- **APROVADO** — zero 🔴, ≤ 3 🟠. Pode iniciar Fase 5.
- **APROVADO COM RESSALVAS** — zero 🔴, > 3 🟠 OU presença de gaps
  conhecidos (testes vazios, docs com [REVISÃO JURÍDICA]).
- **BLOQUEADO** — qualquer 🔴. Listar quais e estimar esforço de correção.

---

## 9. Anexos previstos no relatório

- **Anexo A:** matriz tabela × policy × tipo (SELECT/INSERT/UPDATE/DELETE) do
  Supabase, marcando lacunas.
- **Anexo B:** lista completa de dependências com versão atual × latest ×
  vulnerabilidades.
- **Anexo C:** árvore resumida do `src/` com tamanho em KB de cada subdiretório.
- **Anexo D:** quadro Roadmap × Entregável × Status (✅/⚠️/❌) com evidência
  (arquivo:linha).

---

## 10. Estimativa de tempo

- Coleta (§1-§7): 5-10 min (dependendo do `npm run build`).
- Geração de relatório (§8): 2-3 min.
- **Total:** ~15 min em uma única passagem.

---

## 11. O que este plano NÃO faz (escopo explicitamente fora)

- Não corrige nada — apenas reporta.
- Não roda os jogos no browser (precisa interação humana).
- Não testa fluxo de billing real (RevenueCat/IAP — Fase 5).
- Não valida PDF/conteúdo jurídico final (depende de advogado).
- Não faz teste de penetração ativo (apenas inspeção estática + npm audit).
- Não toca em Supabase produção (apenas lê migrations locais).

---

## 12. Como executar

Mensagem ao agente em uma única linha:

> "Execute `docs/VERIFICATION_PLAN.md` integralmente em modo autônomo,
> consolide tudo em `docs/REPORT_VERIFICATION_<data>.md` e me devolva o
> sumário executivo no chat."

O agente deve:
1. Ler este plano por completo.
2. Executar cada bloco de comandos em ordem (§1 → §7).
3. Capturar resultado de cada checagem.
4. Gerar o relatório (§8) no formato especificado.
5. Postar no chat apenas o sumário executivo + caminho do relatório.

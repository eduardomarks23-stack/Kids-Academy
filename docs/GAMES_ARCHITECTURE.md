# Arquitetura Multi-Engine de Jogos

## Filosofia

Cada jogo escolhe a tecnologia ideal para sua complexidade. O core do app não conhece a engine — tudo é abstraído via Game Adapter Pattern.

| Categoria | Engine | Tamanho | Uso |
| --- | --- | --- | --- |
| Simples | React + Framer Motion | ~50-100KB | Memória, drag-drop, quiz interativo |
| 2D padrão | Phaser 3 | ~500KB-2MB (lazy) | Plataforma, RPG, side-scrolling |
| 2D especial | PixiJS | variável (lazy) | WebGL pesado, partículas, shaders |

## Componentes do core (`src/games/core/`)

```text
core/
├── types.ts          → KidsAcademyGame interface, BehaviorEvent, GameResult
├── GameRegistry.ts   → catálogo slug → loader dinâmico
├── GameRunner.tsx    → componente universal, lazy-loads engine
├── PhaserHost.tsx    → wrapper React p/ jogos Phaser (canvas)
└── BehaviorTracker.ts → captura 15 dimensões → eventos_comportamento
```

## Game Adapter Pattern

Todos os jogos implementam `KidsAcademyGame`:

```typescript
interface KidsAcademyGame {
  readonly id: string;
  readonly title: string;
  readonly engine: 'react' | 'phaser' | 'pixi';
  readonly conceitos: string[];   // BNCC

  mount(container: HTMLElement, config: GameConfig): Promise<void>;
  unmount(): void;
  pause(): void;
  resume(): void;
  reset(): void;
}
```

Jogos React são **componentes** que recebem `{ slug, config, callbacks }` via props (`GameComponentProps`). Não precisam implementar `mount`/`unmount` manualmente — o React/Next handle tudo.

Jogos Phaser/PixiJS são **classes** que implementam `KidsAcademyGameWithCallbacks` (ver `src/games/phaser/AventuraMatematica/index.ts`).

## Lazy loading rigoroso

- `GameRunner` usa `next/dynamic` para importar o jogo
- `PhaserHost` só é importado quando jogo Phaser é executado
- `phaser` package é code-split — bundle inicial < 300KB
- Verificar com `npm run build` (output mostra Route chunks)

## 15 dimensões comportamentais → MENTOR

Mapeadas no enum `tipo_evento_comportamento` (Supabase migration 00003):

1. `tempo_resposta` — ms gasto em questão
2. `hesitacao` — mouse parado >3s
3. `tentativas_multiplas` — re-submissões na mesma questão
4. `padrao_erro` — sistemático vs aleatório
5. `engajamento_foco` — foco vs distração (window blur/focus)
6. `velocidade_leitura` — tempo de leitura de enunciado
7. `uso_de_dica` — solicitou dica/ajuda
8. `desistencia` — abandonou antes de concluir
9. `retomada` — voltou após erro
10. `conquista_streak` — acertos consecutivos
11. `erro_conceitual` — erro identificado por padrão
12. `tempo_total_sessao` — duração total
13. `interacao_audio` — usou áudio
14. `replay_solicitado` — pediu para repetir
15. `feedback_emocional` — reação detectada (frustração/satisfação)

`BehaviorTracker` agrupa eventos em batch (20 por flush ou 5s) e persiste em `eventos_comportamento` no Supabase. RLS garante que apenas o responsável vê os eventos do filho.

## Adicionar novo jogo

Ver [`CREATING_NEW_GAMES.md`](./CREATING_NEW_GAMES.md).

## Fluxo de execução

1. Usuário abre `/(app)/jogo/[slug]`
2. Server Component valida user + perfil_crianca → carrega `JogoClient`
3. `JogoClient` renderiza `<GameRunner slug={slug} config={...} />`
4. `GameRunner` consulta `GameRegistry`, identifica engine
5. Para `react` — usa `next/dynamic` + componente React
6. Para `phaser` — usa `PhaserHost` que carrega `phaser` lazy
7. Jogo invoca `callbacks.onScore`, `onBehavior`, `onComplete`
8. `BehaviorTracker` faz batch flush para Supabase
9. `onComplete` → atualiza `progresso_aluno` (Fase 5+) e redireciona

## Trade-offs

- **Single contract, multiple engines** — cresce sem refactor do core
- **Lazy loading** — usuário não baixa Phaser se vai jogar só Pega Frações
- **Behavior tracking unificado** — MENTOR vê dados consistentes independente do jogo
- **Custo:** PhaserHost adiciona overhead de wrapper (mínimo, ~5KB) e duplica lifecycle (React + Phaser)

# Criando novos jogos — Kids Academy

> Pré-requisito: ler [`GAMES_ARCHITECTURE.md`](./GAMES_ARCHITECTURE.md).

## Decisão: qual engine?

| Você precisa de... | Engine |
| --- | --- |
| UI customizada com lógica simples (drag-drop, click, animações leves) | React + Framer Motion |
| Física 2D, sprites, side-scrolling, cenas múltiplas | Phaser 3 |
| WebGL pesado, partículas, shaders customizados | PixiJS |

**Default: React.** Fall back para Phaser apenas se a complexidade justifica o ~500KB extra.

## Jogo simples (React + Framer Motion)

### 1. Copiar template

```bash
cp -r src/games/simple/_template src/games/simple/MeuJogo
```

### 2. Implementar

`src/games/simple/MeuJogo/index.tsx`:

```typescript
'use client';
import type { GameComponentProps } from '@/games/core/GameRunner';

export default function MeuJogo({ callbacks }: GameComponentProps) {
  // ...lógica do jogo
  callbacks.onScore(100);
  callbacks.onBehavior({ type: 'tempo_resposta', valor: { ms: 2400 } });
  callbacks.onComplete({
    score: 100,
    duracaoSegundos: 90,
    acertos: 5,
    erros: 1,
    conceitosTrabalhados: ['fracoes'],
  });
  return <div>...</div>;
}
```

### 3. Registrar

`src/games/core/GameRegistry.ts`:

```typescript
'meu-jogo': {
  slug: 'meu-jogo',
  title: 'Meu Jogo',
  engine: 'react',
  conceitos: ['fracoes', 'matematica-ef-3'],
  loader: () => import('@/games/simple/MeuJogo'),
},
```

### 4. Testar

Acesse `/jogo/meu-jogo` no app. O `GameRunner` carrega via `next/dynamic`.

## Jogo Phaser 3

### 1. Copiar template

```bash
cp -r src/games/phaser/_template src/games/phaser/MeuJogoPhaser
```

### 2. Implementar

`src/games/phaser/MeuJogoPhaser/index.ts` — exporte `default` uma classe que implementa `KidsAcademyGameWithCallbacks`:

```typescript
import type { KidsAcademyGameWithCallbacks, GameCallbacks, GameConfig } from '@/games/core/types';

export default class MeuJogoPhaser implements KidsAcademyGameWithCallbacks {
  readonly id = 'meu-jogo-phaser';
  readonly title = 'Meu Jogo Phaser';
  readonly engine = 'phaser' as const;
  readonly conceitos = ['fracoes'];

  private game: import('phaser').Game | null = null;
  private callbacks: GameCallbacks | null = null;

  setCallbacks(callbacks: GameCallbacks) { this.callbacks = callbacks; }

  async mount(container: HTMLElement, config: GameConfig) {
    const Phaser = (await import('phaser')).default;
    // criar cenas, registrar, etc.
    this.game = new Phaser.Game({ type: Phaser.AUTO, parent: container, /* ... */ });
  }

  unmount() { this.game?.destroy(true); this.game = null; }
  pause() { this.game?.scene.getScenes(true).forEach(s => s.scene.pause()); }
  resume() { this.game?.scene.getScenes(true).forEach(s => s.scene.resume()); }
  reset() { this.game?.scene.getScenes(true).forEach(s => s.scene.restart()); }
}
```

### 3. Usar `BaseScene` / `KIDS_COLORS` (opcional)

`src/games/phaser/shared/base-scene.ts` oferece helpers:

- `KIDS_COLORS` — paleta padrão da identidade visual
- `createButton()` — botão Phaser com hover state

### 4. Registrar

`src/games/core/GameRegistry.ts`:

```typescript
'meu-jogo-phaser': {
  slug: 'meu-jogo-phaser',
  title: 'Meu Jogo Phaser',
  engine: 'phaser',
  conceitos: ['fracoes'],
  loader: () => import('@/games/phaser/MeuJogoPhaser'),
},
```

### 5. Testar

Acesse `/jogo/meu-jogo-phaser`. `PhaserHost` carrega Phaser lazy + monta o jogo.

## Reportar comportamento

Sempre que possível, reporte eventos para alimentar o MENTOR:

```typescript
callbacks.onBehavior({
  type: 'hesitacao',
  valor: { duracao_ms: 4200 },
  questaoId: 'q-123',
});
```

Tipos válidos: `tempo_resposta`, `hesitacao`, `tentativas_multiplas`, `padrao_erro`, `engajamento_foco`, `velocidade_leitura`, `uso_de_dica`, `desistencia`, `retomada`, `conquista_streak`, `erro_conceitual`, `tempo_total_sessao`, `interacao_audio`, `replay_solicitado`, `feedback_emocional`.

## Conceitos BNCC

Use slugs estáveis para mapear ao currículo:

- `matematica-ef-1` … `matematica-ef-5` (1º-5º ano)
- `fracoes`, `aritmetica`, `geometria`, `medidas`
- `lingua-portuguesa-ef-3`, `gramatica`, `interpretacao-texto`
- `ciencias-ef-2`, `seres-vivos`, `materia-energia`

Estes alimentam o MENTOR para identificar pontos fortes/fracos.

## Checklist antes de PR

- [ ] Jogo registrado em `GameRegistry`
- [ ] Implementa `onScore` + `onComplete` + `onBehavior` (mínimo 3 tipos)
- [ ] Acessível por teclado (jogos React)
- [ ] Background branco respeitado (não dark mode)
- [ ] Texto pt-BR child-friendly (não infantilizado)
- [ ] Testado em mobile (touch targets ≥ 44px)
- [ ] Phaser games: bundle continua lazy (verificar `npm run build` output)

// =============================================================
// NativeHtmlAdapter — átomos React renderizados via component
// registry (sem Phaser)
// =============================================================
// Útil para minigames simples (memória, drag de poucos itens,
// quiz quick-pick) que não justificam o overhead do Phaser.
// =============================================================

import { createRoot, type Root } from 'react-dom/client';
import { createElement, type ComponentType } from 'react';
import type {
  NativeHtmlAtomConfig,
  AtomResult,
} from '@/types/domain';
import type { GameAdapter, GameInstance } from './adapter';
import { GameError } from './adapter';

export interface NativeAtomProps {
  params: Record<string, unknown>;
  onComplete: (result: AtomResult) => void;
  onError: (error: GameError) => void;
  onProgress?: (progress: number) => void;
}

type NativeAtomComponent = ComponentType<NativeAtomProps>;

const componentRegistry = new Map<
  string,
  () => Promise<{ default: NativeAtomComponent }>
>();

export function registerNativeAtom(
  key: string,
  loader: () => Promise<{ default: NativeAtomComponent }>,
): void {
  componentRegistry.set(key, loader);
}

export class NativeHtmlAdapter
  implements GameAdapter<NativeHtmlAtomConfig, AtomResult>
{
  readonly engine = 'native_html' as const;

  async mount(
    container: HTMLElement,
    config: NativeHtmlAtomConfig,
  ): Promise<GameInstance<AtomResult>> {
    const loader = componentRegistry.get(config.componentKey);
    if (!loader) {
      throw new GameError(
        `Component "${config.componentKey}" não registrado`,
        'COMPONENT_NOT_FOUND',
      );
    }
    const mod = await loader();
    const Component = mod.default;

    return new NativeHtmlInstance(container, Component, config.props);
  }
}

class NativeHtmlInstance implements GameInstance<AtomResult> {
  private root: Root | null = null;
  private completeCb: ((result: AtomResult) => void) | null = null;
  private errorCb: ((error: GameError) => void) | null = null;
  private progressCb: ((progress: number) => void) | null = null;

  constructor(
    private container: HTMLElement,
    Component: NativeAtomComponent,
    params: Record<string, unknown>,
  ) {
    this.root = createRoot(container);
    this.root.render(
      createElement(Component, {
        params,
        onComplete: (r) => this.completeCb?.(r),
        onError: (e) => this.errorCb?.(e),
        onProgress: (p) => this.progressCb?.(p),
      }),
    );
  }

  pause(): void {
    // Native atoms gerenciam pause internamente via prop opcional
  }
  resume(): void {
    // idem
  }
  async destroy(): Promise<void> {
    this.root?.unmount();
    this.root = null;
    this.container.innerHTML = '';
  }
  onComplete(cb: (result: AtomResult) => void): void {
    this.completeCb = cb;
  }
  onError(cb: (error: GameError) => void): void {
    this.errorCb = cb;
  }
  onProgress(cb: (progress: number) => void): void {
    this.progressCb = cb;
  }
}

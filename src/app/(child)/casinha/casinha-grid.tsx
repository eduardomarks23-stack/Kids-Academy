'use client';

// =============================================================
// CasinhaGrid — grid interativo de colecionáveis
// =============================================================
// Itens afetivos (Eixo 4) têm interatividade especial.
// =============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTtsPlaceholder } from '@/lib/audio/tts-placeholder';

interface Props {
  collectibles: Array<{ slug: string; acquired_at: string }>;
}

const COLLECTIBLE_META: Record<
  string,
  { icon: string; displayName: string; description: string; special?: 'breathing' | 'helper' | 'comfort' | 'heart' }
> = {
  // Eixo 1
  'tatuzinho-tatactaque': { icon: '🐀', displayName: 'Tatuzinho Tatactaque', description: 'Lembra dos sons do corpo.' },
  'campainha-din-don': { icon: '🔔', displayName: 'Campainha Din-Don', description: 'Sons da casinha.' },
  'galinha-co-co-ri': { icon: '🐔', displayName: 'Galinha Có-Có-Ri', description: 'Sons dos animais.' },
  'passarinho-ri-ri': { icon: '🐦', displayName: 'Passarinho Ri-Ri', description: 'Canta rimas com nomes.' },
  'patinho-rimador': { icon: '🦆', displayName: 'Patinho Rimador', description: 'Rima com bichos.' },
  'abelhinha-a': { icon: '🐝', displayName: 'Abelhinha A', description: 'Conhece a letra A.' },
  'elefantinho-e': { icon: '🐘', displayName: 'Elefantinho E', description: 'Conhece a letra E.' },
  'ilhota-i': { icon: '🏝️', displayName: 'Ilhota I', description: 'Conhece a letra I.' },
  'ovinho-o': { icon: '🥚', displayName: 'Ovinho O', description: 'Conhece a letra O.' },
  'ursinho-u': { icon: '🐻', displayName: 'Ursinho U', description: 'Conhece a letra U.' },
  // Eixo 2
  'trio-patinho': { icon: '🦆', displayName: 'Trio Patinho', description: 'Conta até 3.' },
  'maozinha-do-5': { icon: '🖐️', displayName: 'Mãozinha do 5', description: 'Conta até 5.' },
  'cestinha-cheia': { icon: '🧺', displayName: 'Cestinha Cheia', description: 'Muito e pouco.' },
  'duo-tamanho': { icon: '🦒', displayName: 'Duo Tamanho', description: 'Grande e pequeno.' },
  'copinho-cheio': { icon: '🥛', displayName: 'Copinho Cheio', description: 'Cheio e vazio.' },
  'gemeos-felizes': { icon: '👯', displayName: 'Gêmeos Felizes', description: 'Igual e diferente.' },
  'estrelinha-5': { icon: '⭐', displayName: 'Estrelinha 5', description: 'Correspondência um-a-um.' },
  'cesto-mais': { icon: '🧺', displayName: 'Cesto do Mais', description: 'Onde tem mais.' },
  'cesto-menos': { icon: '🧺', displayName: 'Cesto do Menos', description: 'Onde tem menos.' },
  'dezena-amiga': { icon: '🔟', displayName: 'Dezena Amiga', description: 'Conta até 10.' },
  // Eixo 3
  'tomatinho-vermelho': { icon: '🍅', displayName: 'Tomatinho Vermelho', description: 'A cor vermelha.' },
  'peixinho-azul': { icon: '🐟', displayName: 'Peixinho Azul', description: 'A cor azul.' },
  'solzinho-amarelo': { icon: '☀️', displayName: 'Solzinho Amarelo', description: 'A cor amarela.' },
  'sapinho-verde': { icon: '🐸', displayName: 'Sapinho Verde', description: 'A cor verde.' },
  'arco-iris': { icon: '🌈', displayName: 'Arco-Íris', description: 'Misturando cores.' },
  'bolinha-rolante': { icon: '⚪', displayName: 'Bolinha Rolante', description: 'O círculo.' },
  'caixinha-quadrada': { icon: '📦', displayName: 'Caixinha Quadrada', description: 'O quadrado.' },
  'pizza-triangular': { icon: '🍕', displayName: 'Pizza Triangular', description: 'O triângulo.' },
  'encaixador-mestre': { icon: '🧩', displayName: 'Encaixador Mestre', description: 'Encaixar formas.' },
  'detetive-padrao': { icon: '🕵️', displayName: 'Detetive Padrão', description: 'Padrões ABAB.' },
  // Eixo 4 — alguns têm interatividade
  'sol-sorriso': { icon: '☀️', displayName: 'Sol Sorriso', description: 'Você é feliz.' },
  'nuvenzinha-acolhe': { icon: '☁️', displayName: 'Nuvenzinha que Acolhe', description: 'Triste passa.', special: 'comfort' },
  'leaozinho-passa': { icon: '🦁', displayName: 'Leãozinho Passa', description: 'Bravo é normal.' },
  'coracao-brilhante': { icon: '💖', displayName: 'Coração Brilhante', description: 'O que te faz feliz.', special: 'heart' },
  'mao-amiga': { icon: '🤝', displayName: 'Mão Amiga', description: 'Estar perto é cuidar.', special: 'helper' },
  'folha-respirante': { icon: '🍃', displayName: 'Folha Respirante', description: 'Respira quando precisar.', special: 'breathing' },
  'sininho-ajuda': { icon: '🔔', displayName: 'Sininho Ajuda', description: 'Pode pedir ajuda.', special: 'helper' },
  'espelhinho-eu': { icon: '🪞', displayName: 'Espelhinho Eu', description: 'Você é único.' },
};

export function CasinhaGrid({ collectibles }: Props) {
  const [active, setActive] = useState<string | null>(null);

  if (collectibles.length === 0) {
    return (
      <section className="mt-12 rounded-3xl border-2 border-dashed border-gray-200 p-8 text-center">
        <p className="text-gray-500">
          Complete sua primeira sessão pra ganhar o primeiro amiguinho!
        </p>
      </section>
    );
  }

  const activeMeta = active ? COLLECTIBLE_META[active] : null;

  return (
    <>
      <section className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4">
        {collectibles.map((c) => {
          const meta = COLLECTIBLE_META[c.slug];
          if (!meta) return null;
          return (
            <button
              key={c.slug}
              onClick={() => {
                setActive(c.slug);
                void getTtsPlaceholder().play([
                  { type: 'speech', speaker: 'lolinha', text: meta.displayName },
                ]);
              }}
              className="group flex flex-col items-center rounded-2xl border-2 border-gray-100 bg-white p-4 transition-transform hover:scale-105 hover:border-[#FCD34D]"
              style={{ minHeight: 140 }}
            >
              <span className="text-5xl">{meta.icon}</span>
              <span className="mt-2 text-xs font-medium text-gray-700">{meta.displayName}</span>
            </button>
          );
        })}
      </section>

      <AnimatePresence>
        {activeMeta ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="rounded-3xl bg-white p-8 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
              style={{ minWidth: 280, maxWidth: 400 }}
            >
              <div className="text-7xl">{activeMeta.icon}</div>
              <h2 className="mt-4 text-2xl font-medium text-[#E26B45]">{activeMeta.displayName}</h2>
              <p className="mt-2 text-base text-gray-600">{activeMeta.description}</p>
              {activeMeta.special === 'breathing' ? (
                <BreathingOverlay />
              ) : activeMeta.special === 'helper' ? (
                <p className="mt-4 text-sm text-gray-500">
                  Toque dois cliques pra chamar o adulto.
                </p>
              ) : activeMeta.special === 'heart' ? (
                <p className="mt-4 text-sm text-gray-500">
                  Aqui ficam as coisas que te deixam feliz.
                </p>
              ) : null}
              <button
                onClick={() => setActive(null)}
                className="mt-6 rounded-2xl bg-[#E26B45] px-6 py-3 text-white"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

// Mini-modo de respiração ativado pela Folha Respirante
function BreathingOverlay() {
  return (
    <motion.div
      initial={{ scale: 0.6 }}
      animate={{ scale: [0.6, 1.4, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full bg-pink-100 text-5xl"
    >
      🌸
    </motion.div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { listGames } from '@/games/core/GameRegistry';
import { GameThumb, getGameTheme } from '@/components/kids/game-thumbs';
import { KidsIcon } from '@/components/kids/icons';

const ENGINE_BADGE: Record<string, { label: string; emoji: string }> = {
  react: { label: 'Rápido', emoji: '⚡' },
  phaser: { label: 'Aventura', emoji: '🎮' },
  pixi: { label: 'Especial', emoji: '✨' },
};

export default function ArenaPage() {
  const jogos = listGames();

  return (
    <div className="min-h-full bg-white">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900">Arena</h1>
            <span className="text-sm font-bold text-purple-700 bg-purple-50 rounded-full px-2.5 py-0.5">
              {jogos.length} {jogos.length === 1 ? 'jogo' : 'jogos'}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Escolhe um jogo e bora se divertir aprendendo!
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-6">
        {jogos.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 p-10 text-center">
            <p className="text-gray-600 font-medium">Nenhum jogo disponível ainda.</p>
          </div>
        ) : (
          <ul className="space-y-5">
            {jogos.map((jogo, index) => {
              const theme = getGameTheme(jogo.slug);
              const badge = ENGINE_BADGE[jogo.engine] ?? ENGINE_BADGE.react!;

              return (
                <motion.li
                  key={jogo.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
                >
                  <Link href={`/jogo/${jogo.slug}`} className="block">
                    <motion.article
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                      className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
                      style={{
                        boxShadow: `0 14px 28px -16px ${theme.accent}40, 0 4px 8px -4px ${theme.accent}20`,
                      }}
                    >
                      <div
                        className="relative h-44 sm:h-48 flex items-center justify-center overflow-hidden"
                        style={{ background: theme.gradient }}
                      >
                        <svg
                          className="absolute inset-0 w-full h-full opacity-25"
                          aria-hidden="true"
                        >
                          <defs>
                            <pattern
                              id={`dots-${jogo.slug}`}
                              width="20"
                              height="20"
                              patternUnits="userSpaceOnUse"
                            >
                              <circle cx="2" cy="2" r="1.4" fill="white" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#dots-${jogo.slug})`} />
                        </svg>

                        <span
                          className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-white/90 text-gray-700 backdrop-blur"
                        >
                          <span>{badge.emoji}</span>
                          <span>{badge.label}</span>
                        </span>

                        <motion.div
                          whileHover={{ rotate: -3, scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                          className="relative drop-shadow-[0_10px_18px_rgba(0,0,0,0.18)]"
                        >
                          <GameThumb slug={jogo.slug} size={140} />
                        </motion.div>
                      </div>

                      <div className="px-5 py-4 bg-white">
                        <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                          {jogo.title}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium mt-1">
                          {theme.subtitle}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                            <KidsIcon.Star size={14} fill="#E5E7EB" />
                            <KidsIcon.Star size={14} fill="#E5E7EB" />
                            <KidsIcon.Star size={14} fill="#E5E7EB" />
                            <span className="ml-1">por enquanto</span>
                          </div>
                          <span
                            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-white px-4 py-2 rounded-2xl shadow-md"
                            style={{
                              background: theme.accent,
                              boxShadow: `0 6px 14px -4px ${theme.accent}99`,
                            }}
                          >
                            Jogar
                            <KidsIcon.Play size={14} />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        )}

        <p className="text-xs text-gray-400 mt-8 text-center">
          Mais jogos chegando em breve. Conquistas e ranking virão na Fase 5.
        </p>
      </main>
    </div>
  );
}

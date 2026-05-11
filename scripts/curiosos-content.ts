// =============================================================
// Conteúdo declarativo — Mundo dos Curiosos (3-4 anos)
// =============================================================
// Curado a partir de docs/CURRICULO-MUNDO-CURIOSOS-3-4-ANOS.md +
// docs/CAMADA-{2..5}-EIXO-{1..4}-*.md
//
// Estrutura: 1 Mundo + 4 Eixos + 4 Capítulos default (técnicos,
// não navegáveis) + 38 Sessões + 152 Átomos + ~40 Conceitos.
//
// Cada sessão tem 4 átomos: listen → imitate → play → celebrate.
// Cada átomo tem audioTracks (roteiro TTS placeholder), engine,
// config específica do template Phaser e success_criteria.
// =============================================================

// Tipo TtsTrack copiado de src/lib/audio/tts-placeholder.ts.
// Duplicado aqui para permitir execução standalone via tsx sem
// resolver alias @/. Manter em sincronia.
export type TtsTrack =
  | { type: 'speech'; speaker: 'garuzinho' | 'lolinha' | 'narrator'; text: string; rate?: number; pitch?: number }
  | { type: 'pause'; durationMs: number }
  | { type: 'sfx'; sfxKey: string; srcPlaceholder?: string };

export interface ConceptSeed {
  slug: string;
  displayName: string;
  bnccCode: string | null;
}

export interface AtomSeed {
  atomKey: string; // ex: '1.1.1' — único dentro do Mundo
  atomType: 'listen' | 'imitate' | 'play' | 'celebrate';
  engine: 'phaser' | 'video' | 'audio' | 'native_html';
  displayOrder: number;
  durationSeconds: number;
  conceptSlugs: string[];
  successCriteria: { minAccuracy?: number; minDurationSeconds?: number; maxAttempts?: number };
  audioTracks: TtsTrack[];
  /** Para phaser: nome da cena no scene-registry */
  sceneKey?: string;
  /** Parâmetros que vão para o atomParams no Phaser registry */
  params?: Record<string, unknown>;
  /** Collectible adquirido ao completar celebrate (apenas atom_type='celebrate') */
  collectibleSlug?: string;
  /** Display name curto na UI (opcional) */
  displayName?: string;
}

export interface SessionSeed {
  slug: string; // único no eixo
  displayName: string;
  learningObjective: string;
  displayOrder: number;
  estimatedDurationSeconds: number;
  atoms: AtomSeed[];
}

export interface AxisSeed {
  slug: string;
  displayName: string;
  subtitle: string;
  iconName: string;
  displayOrder: number;
  themeAccent: string; // hex
  sessions: SessionSeed[];
}

export interface WorldSeed {
  slug: string;
  displayName: string;
  ageMin: number;
  ageMax: number;
  description: string;
  themeColor: string;
  hitAreaMinPx: number;
  sessionDurationMinSeconds: number;
  sessionDurationMaxSeconds: number;
}

// -------------------------------------------------------------
// Helpers para construir tracks
// -------------------------------------------------------------

const garu = (text: string): TtsTrack => ({ type: 'speech', speaker: 'garuzinho', text });
const lola = (text: string): TtsTrack => ({ type: 'speech', speaker: 'lolinha', text });
const pause = (ms: number): TtsTrack => ({ type: 'pause', durationMs: ms });
const sfx = (key: string): TtsTrack => ({ type: 'sfx', sfxKey: key });
const apito = (): TtsTrack => ({ type: 'sfx', sfxKey: 'apito' });

// -------------------------------------------------------------
// Conceitos do Mundo dos Curiosos
// -------------------------------------------------------------

export const CURIOSOS_CONCEPTS: Record<string, ConceptSeed[]> = {
  'sons-letras': [
    { slug: 'som-corpo', displayName: 'Sons do corpo', bnccCode: 'EI02EF02' },
    { slug: 'palma', displayName: 'Palma', bnccCode: 'EI02CG05' },
    { slug: 'estalo', displayName: 'Estalo de língua', bnccCode: 'EI02CG05' },
    { slug: 'sopro', displayName: 'Sopro', bnccCode: 'EI02CG05' },
    { slug: 'som-objeto', displayName: 'Sons de objetos', bnccCode: 'EI02ET01' },
    { slug: 'escuta-ativa', displayName: 'Escuta ativa', bnccCode: 'EI02EF02' },
    { slug: 'som-animal', displayName: 'Sons de animais', bnccCode: 'EI02ET03' },
    { slug: 'discriminacao-auditiva', displayName: 'Discriminação auditiva', bnccCode: 'EI02EF02' },
    { slug: 'rima', displayName: 'Rima', bnccCode: 'EI02EF09' },
    { slug: 'consciencia-fonologica', displayName: 'Consciência fonológica', bnccCode: 'EI03EF09' },
    { slug: 'letra-a', displayName: 'Letra A', bnccCode: 'EI03EF01' },
    { slug: 'letra-e', displayName: 'Letra E', bnccCode: 'EI03EF01' },
    { slug: 'letra-i', displayName: 'Letra I', bnccCode: 'EI03EF01' },
    { slug: 'letra-o', displayName: 'Letra O', bnccCode: 'EI03EF01' },
    { slug: 'letra-u', displayName: 'Letra U', bnccCode: 'EI03EF01' },
    { slug: 'som-inicial', displayName: 'Som inicial de palavras', bnccCode: 'EI03EF09' },
    { slug: 'forma-letra', displayName: 'Forma visual de letra', bnccCode: 'EI03EF01' },
  ],
  'contar-comparar': [
    { slug: 'contagem-oral-3', displayName: 'Contagem oral até 3', bnccCode: 'EI02ET07' },
    { slug: 'contagem-oral-5', displayName: 'Contagem oral até 5', bnccCode: 'EI03ET07' },
    { slug: 'contagem-oral-10', displayName: 'Contagem oral até 10', bnccCode: 'EI03ET07' },
    { slug: 'correspondencia-1-1', displayName: 'Correspondência um-a-um', bnccCode: 'EI02ET07' },
    { slug: 'subitizing', displayName: 'Subitizing (percepção rápida)', bnccCode: 'EI03ET08' },
    { slug: 'comparacao-quantidade', displayName: 'Comparação de quantidade', bnccCode: 'EI03ET08' },
    { slug: 'muito-pouco', displayName: 'Muito e pouco', bnccCode: 'EI02ET08' },
    { slug: 'comparacao-tamanho', displayName: 'Comparação de tamanho', bnccCode: 'EI02ET04' },
    { slug: 'grande-pequeno', displayName: 'Grande e pequeno', bnccCode: 'EI02ET04' },
    { slug: 'estado-volume', displayName: 'Estado de volume (cheio/vazio)', bnccCode: 'EI03ET04' },
    { slug: 'cheio-vazio', displayName: 'Cheio e vazio', bnccCode: 'EI03ET04' },
    { slug: 'classificacao', displayName: 'Classificação por atributo', bnccCode: 'EI02ET05' },
    { slug: 'igual-diferente', displayName: 'Igual e diferente', bnccCode: 'EI02ET05' },
    { slug: 'sequencia', displayName: 'Sequência numérica', bnccCode: 'EI03ET07' },
    { slug: 'mais', displayName: 'Conjunto com mais', bnccCode: 'EI03ET08' },
    { slug: 'menos', displayName: 'Conjunto com menos', bnccCode: 'EI03ET08' },
  ],
  'formas-cores': [
    { slug: 'cor-vermelho', displayName: 'Cor vermelha', bnccCode: 'EI02TS02' },
    { slug: 'cor-azul', displayName: 'Cor azul', bnccCode: 'EI02TS02' },
    { slug: 'cor-amarelo', displayName: 'Cor amarela', bnccCode: 'EI02TS02' },
    { slug: 'cor-verde', displayName: 'Cor verde', bnccCode: 'EI02TS02' },
    { slug: 'reconhecimento-visual', displayName: 'Reconhecimento visual', bnccCode: 'EI03TS02' },
    { slug: 'mistura-cores', displayName: 'Mistura de cores', bnccCode: 'EI02ET06' },
    { slug: 'transformacao', displayName: 'Transformação', bnccCode: 'EI02ET06' },
    { slug: 'forma-circulo', displayName: 'Forma círculo', bnccCode: 'EI03ET01' },
    { slug: 'forma-quadrado', displayName: 'Forma quadrado', bnccCode: 'EI03ET01' },
    { slug: 'forma-triangulo', displayName: 'Forma triângulo', bnccCode: 'EI03ET01' },
    { slug: 'geometria', displayName: 'Geometria básica', bnccCode: 'EI03ET01' },
    { slug: 'encaixe', displayName: 'Encaixe motor fino', bnccCode: 'EI02CG05' },
    { slug: 'coordenacao-motora', displayName: 'Coordenação motora fina', bnccCode: 'EI02CG05' },
    { slug: 'correspondencia', displayName: 'Correspondência forma-silhueta', bnccCode: 'EI03ET05' },
    { slug: 'padrao', displayName: 'Padrão ABAB', bnccCode: 'EI03ET05' },
  ],
  afetos: [
    { slug: 'emocao-feliz', displayName: 'Emoção feliz', bnccCode: 'EI02EO01' },
    { slug: 'emocao-triste', displayName: 'Emoção triste', bnccCode: 'EI03EO04' },
    { slug: 'emocao-bravo', displayName: 'Emoção bravo', bnccCode: 'EI02EO01' },
    { slug: 'expressao-facial', displayName: 'Expressão facial', bnccCode: 'EI03EO04' },
    { slug: 'expressao-corporal', displayName: 'Expressão corporal', bnccCode: 'EI02CG02' },
    { slug: 'vocabulario-afetivo', displayName: 'Vocabulário afetivo', bnccCode: 'EI03EF01' },
    { slug: 'empatia', displayName: 'Empatia básica', bnccCode: 'EI03EO03' },
    { slug: 'autorregulacao', displayName: 'Autorregulação', bnccCode: 'EI03EO02' },
    { slug: 'respiracao', displayName: 'Respiração consciente', bnccCode: 'EI02CG02' },
    { slug: 'pedir-ajuda', displayName: 'Pedir ajuda', bnccCode: 'EI02EO03' },
    { slug: 'comunicacao', displayName: 'Comunicação afetiva', bnccCode: 'EI03EO04' },
    { slug: 'identidade', displayName: 'Identidade', bnccCode: 'EI02EO05' },
    { slug: 'autoestima', displayName: 'Autoestima', bnccCode: 'EI03EO06' },
    { slug: 'imitacao', displayName: 'Imitação', bnccCode: 'EI02EF02' },
    { slug: 'causa-efeito', displayName: 'Causa e efeito', bnccCode: 'EI02ET01' },
    { slug: 'aplicacao', displayName: 'Aplicação contextual', bnccCode: 'EI03ET01' },
    { slug: 'discriminacao-visual', displayName: 'Discriminação visual', bnccCode: 'EI03TS02' },
  ],
};

// -------------------------------------------------------------
// Builder de átomos — gera 4 átomos por sessão com padrão coeso
// -------------------------------------------------------------

interface SessionDescriptor {
  slug: string;
  displayName: string;
  learningObjective: string;
  displayOrder: number;
  conceptSlugs: string[];
  /** Conteúdo do átomo listen (vídeo placeholder) */
  listen: {
    intro: TtsTrack[];
    durationSeconds?: number;
  };
  /** Conteúdo do átomo imitate (Phaser) */
  imitate: {
    sceneKey: string;
    params: Record<string, unknown>;
    intro: TtsTrack[];
    durationSeconds?: number;
  };
  /** Conteúdo do átomo play (Phaser) */
  play: {
    sceneKey: string;
    params: Record<string, unknown>;
    intro: TtsTrack[];
    durationSeconds?: number;
  };
  /** Conteúdo do átomo celebrate (Phaser) */
  celebrate: {
    collectibleSlug: string;
    collectibleDisplayName: string;
    intro: TtsTrack[];
    durationSeconds?: number;
  };
}

function buildSessionAtoms(eixo: number, descriptor: SessionDescriptor): AtomSeed[] {
  const base = `${eixo}.${descriptor.displayOrder}`;
  return [
    {
      atomKey: `${base}.1`,
      atomType: 'listen',
      engine: 'phaser',
      sceneKey: 'listen-screen',
      params: { title: descriptor.displayName, axisIndex: eixo },
      displayOrder: 1,
      durationSeconds: descriptor.listen.durationSeconds ?? 55,
      conceptSlugs: descriptor.conceptSlugs,
      successCriteria: { minDurationSeconds: Math.floor((descriptor.listen.durationSeconds ?? 55) * 0.8) },
      audioTracks: descriptor.listen.intro,
      displayName: descriptor.displayName,
    },
    {
      atomKey: `${base}.2`,
      atomType: 'imitate',
      engine: 'phaser',
      displayOrder: 2,
      durationSeconds: descriptor.imitate.durationSeconds ?? 60,
      conceptSlugs: descriptor.conceptSlugs,
      successCriteria: { minAccuracy: 0.6 },
      audioTracks: descriptor.imitate.intro,
      sceneKey: descriptor.imitate.sceneKey,
      params: descriptor.imitate.params,
    },
    {
      atomKey: `${base}.3`,
      atomType: 'play',
      engine: 'phaser',
      displayOrder: 3,
      durationSeconds: descriptor.play.durationSeconds ?? 75,
      conceptSlugs: descriptor.conceptSlugs,
      successCriteria: { minAccuracy: 0.5, maxAttempts: 99 },
      audioTracks: descriptor.play.intro,
      sceneKey: descriptor.play.sceneKey,
      params: descriptor.play.params,
    },
    {
      atomKey: `${base}.4`,
      atomType: 'celebrate',
      engine: 'phaser',
      displayOrder: 4,
      durationSeconds: descriptor.celebrate.durationSeconds ?? 30,
      conceptSlugs: descriptor.conceptSlugs.slice(0, 1),
      successCriteria: {},
      audioTracks: descriptor.celebrate.intro,
      sceneKey: 'celebrate',
      params: {
        collectibleSlug: descriptor.celebrate.collectibleSlug,
        collectibleDisplayName: descriptor.celebrate.collectibleDisplayName,
      },
      collectibleSlug: descriptor.celebrate.collectibleSlug,
    },
  ];
}

// -------------------------------------------------------------
// EIXO 1 — Sons e Letras (10 sessões)
// -------------------------------------------------------------

const EIXO_1_SESSIONS: SessionDescriptor[] = [
  {
    slug: 'sons-do-meu-corpo',
    displayName: 'Sons do meu corpo',
    learningObjective: 'Perceber que o corpo produz sons (palma, estalo, sopro)',
    displayOrder: 1,
    conceptSlugs: ['som-corpo', 'palma', 'estalo', 'sopro'],
    listen: {
      intro: [
        lola('Oi! Eu sou a Lolinha!'),
        pause(500),
        garu('E eu sou o Garuzinho.'),
        pause(1000),
        lola('Hoje a gente vai brincar com... SONS!'),
        pause(1000),
        apito(),
        garu('Mas não é qualquer som. É o som que sai do seu corpo.'),
        pause(1000),
        sfx('palma'),
        lola('Olha! UMA PALMA!'),
        pause(1000),
        sfx('estalo'),
        garu('Esse é o ESTALO da língua. Tlóc!'),
        pause(1000),
        sfx('sopro'),
        lola('E esse é o SOPRO! Fffff!'),
        pause(1500),
        garu('Vem brincar com a gente?'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Faz como a gente',
        prompts: [
          { label: 'Palma', icon: '✋', sfxKey: 'palma' },
          { label: 'Estalo', icon: '👅', sfxKey: 'estalo' },
          { label: 'Sopro', icon: '💨', sfxKey: 'sopro' },
        ],
        mode: 'sequential',
      },
      intro: [garu('Agora é a sua vez!'), pause(1000), lola('Toca aqui pra fazer PALMA!')],
    },
    play: {
      sceneKey: 'free-tap',
      params: {
        title: 'Toque mágico',
        randomSfx: ['palma', 'estalo', 'sopro'],
        particleColors: ['#E26B45', '#FCD34D', '#A78BFA'],
        minTaps: 5,
      },
      intro: [
        lola('Olha que demais!'),
        pause(500),
        lola('Cada vez que você toca, vira um som!'),
        pause(1000),
        garu('Toca em qualquer lugar da tela.'),
      ],
    },
    celebrate: {
      collectibleSlug: 'tatuzinho-tatactaque',
      collectibleDisplayName: 'Tatuzinho Tatactaque',
      intro: [
        lola('VOCÊ FEZ SONS COM SEU CORPO!'),
        pause(500),
        garu('Você foi incrível.'),
        pause(1000),
        lola('O Tatuzinho Tatactaque quer morar na sua casinha!'),
      ],
    },
  },
  {
    slug: 'sons-da-casa',
    displayName: 'Sons da casa',
    learningObjective: 'Reconhecer sons domésticos comuns',
    displayOrder: 2,
    conceptSlugs: ['som-objeto', 'escuta-ativa'],
    listen: {
      intro: [
        garu('Essa é a nossa casinha!'),
        lola('Tem MUITOS sons aqui!'),
        apito(),
        garu('Escuta esse...'),
        sfx('campainha'),
        lola('A CAMPAINHA! Din-don!'),
        pause(1000),
        sfx('telefone'),
        garu('O TELEFONE. Trim trim.'),
        pause(1000),
        sfx('agua'),
        lola('A ÁGUA da torneira!'),
        pause(1000),
        sfx('porta'),
        garu('E a PORTA.'),
        pause(1500),
        lola('Vem achar esses sons com a gente!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Que som é esse?',
        rounds: [
          { promptSfx: 'campainha', options: ['campainha', 'porta'], answer: 'campainha' },
          { promptSfx: 'agua', options: ['agua', 'telefone'], answer: 'agua' },
          { promptSfx: 'telefone', options: ['telefone', 'agua'], answer: 'telefone' },
          { promptSfx: 'porta', options: ['porta', 'campainha'], answer: 'porta' },
        ],
      },
      intro: [garu('Eu vou tocar um som. Você toca no que faz esse som.')],
    },
    play: {
      sceneKey: 'free-tap',
      params: {
        title: 'A casa toda tocando',
        randomSfx: ['campainha', 'telefone', 'agua', 'porta'],
        particleColors: ['#FCD34D', '#A78BFA', '#60A5FA'],
        minTaps: 5,
      },
      intro: [lola('Agora você comanda a casinha! Toca em qualquer canto.')],
    },
    celebrate: {
      collectibleSlug: 'campainha-din-don',
      collectibleDisplayName: 'Campainha Din-Don',
      intro: [lola('VOCÊ ACHOU TODOS OS SONS!'), garu('A Campainha Din-Don quer ir pra sua casinha!')],
    },
  },
  {
    slug: 'sons-dos-animais',
    displayName: 'Sons dos animais',
    learningObjective: 'Identificar sons de animais domésticos',
    displayOrder: 3,
    conceptSlugs: ['som-animal', 'discriminacao-auditiva'],
    listen: {
      intro: [
        apito(),
        garu('Olha quem chegou!'),
        sfx('cachorro'),
        lola('O CACHORRO! Au au!'),
        pause(1000),
        sfx('gato'),
        garu('O GATO. Miau.'),
        pause(1000),
        sfx('vaca'),
        lola('A VACA! Mu!'),
        pause(1000),
        sfx('galinha'),
        garu('E a GALINHA. Có có ri có!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Qual bicho faz esse som?',
        rounds: [
          { promptSfx: 'cachorro', options: ['cachorro', 'gato'], answer: 'cachorro' },
          { promptSfx: 'gato', options: ['cachorro', 'gato'], answer: 'gato' },
          { promptSfx: 'vaca', options: ['vaca', 'galinha'], answer: 'vaca' },
          { promptSfx: 'galinha', options: ['vaca', 'galinha'], answer: 'galinha' },
        ],
      },
      intro: [garu('Eu faço o som. Você acha o bichinho.')],
    },
    play: {
      sceneKey: 'free-tap',
      params: {
        title: 'A fazenda toda',
        randomSfx: ['cachorro', 'gato', 'vaca', 'galinha'],
        particleColors: ['#FCD34D', '#E26B45', '#34D399'],
        minTaps: 5,
      },
      intro: [lola('Toca pra fazer cada bicho cantar!')],
    },
    celebrate: {
      collectibleSlug: 'galinha-co-co-ri',
      collectibleDisplayName: 'Galinha Có-Có-Ri',
      intro: [lola('VOCÊ CONHECE OS BICHOS!'), garu('A Galinha Có-Có-Ri quer ir com você!')],
    },
  },
  {
    slug: 'vai-rimar-nomes',
    displayName: 'Vai rimar! Nomes',
    learningObjective: 'Perceber rima usando nomes de pessoas',
    displayOrder: 4,
    conceptSlugs: ['rima', 'consciencia-fonologica'],
    listen: {
      intro: [
        apito(),
        garu('Hoje a gente vai rimar!'),
        pause(1000),
        lola('Rimar é quando palavra termina IGUAL.'),
        pause(1000),
        lola('Ouve: GARU-ZINHO... TATU-ZINHO!'),
        pause(1500),
        garu('LO-LINHA... PAU-LINHA!'),
        pause(1500),
        lola('As pontinhas TERMINAM IGUAL! Isso é RIMA!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Combina ou não combina?',
        rounds: [
          { prompt: 'GARUZINHO ... TATUZINHO?', options: ['Rima!', 'Não rima'], answer: 'Rima!' },
          { prompt: 'LOLINHA ... CASA?', options: ['Rima!', 'Não rima'], answer: 'Não rima' },
          { prompt: 'PAULINHA ... LOLINHA?', options: ['Rima!', 'Não rima'], answer: 'Rima!' },
          { prompt: 'MARIA ... BOLA?', options: ['Rima!', 'Não rima'], answer: 'Não rima' },
        ],
      },
      intro: [garu('Eu falo duas palavras. Você diz se elas rimam.')],
    },
    play: {
      sceneKey: 'drag-to-snap',
      params: {
        title: 'Acha o par que rima',
        pairs: [
          { left: 'Lolinha', right: 'Paulinha' },
          { left: 'Garuzinho', right: 'Tatuzinho' },
          { left: 'Maria', right: 'Sofia' },
        ],
      },
      intro: [lola('Arrasta cada nome para o seu PAR que RIMA!')],
    },
    celebrate: {
      collectibleSlug: 'passarinho-ri-ri',
      collectibleDisplayName: 'Passarinho Ri-Ri',
      intro: [lola('VOCÊ JÁ RIMA!'), garu('O Passarinho Ri-Ri canta pra você!')],
    },
  },
  {
    slug: 'vai-rimar-bichos',
    displayName: 'Vai rimar! Bichos',
    learningObjective: 'Brincar de rimar com nomes de animais',
    displayOrder: 5,
    conceptSlugs: ['rima', 'consciencia-fonologica', 'som-animal'],
    listen: {
      intro: [
        apito(),
        garu('Hoje os bichos vão rimar!'),
        pause(1000),
        lola('PATO... RATO!'),
        pause(1500),
        garu('GATO... PATO!'),
        pause(1500),
        lola('CAVALO... GALO!'),
      ],
    },
    imitate: {
      sceneKey: 'drag-to-snap',
      params: {
        title: 'Junta os bichos que rimam',
        pairs: [
          { left: 'Pato', right: 'Rato' },
          { left: 'Gato', right: 'Pato' },
          { left: 'Cavalo', right: 'Galo' },
        ],
      },
      intro: [garu('Liga o bicho com o que rima com ele.')],
    },
    play: {
      sceneKey: 'free-tap',
      params: {
        title: 'Festa da rima',
        randomSfx: ['gato', 'cachorro', 'vaca', 'galinha'],
        particleColors: ['#FCD34D', '#E26B45'],
        minTaps: 5,
      },
      intro: [lola('Toca pra fazer a festa! Cada toque chama um bicho que rima!')],
    },
    celebrate: {
      collectibleSlug: 'patinho-rimador',
      collectibleDisplayName: 'Patinho Rimador',
      intro: [lola('VOCÊ RIMA COMO POETA!'), garu('O Patinho Rimador quer ir com você!')],
    },
  },
  {
    slug: 'conheci-o-a',
    displayName: 'Conheci o A',
    learningObjective: 'Reconhecer a letra A pela forma e pelo som inicial',
    displayOrder: 6,
    conceptSlugs: ['letra-a', 'som-inicial', 'forma-letra'],
    listen: {
      intro: [
        apito(),
        garu('Hoje a gente conhece... A LETRA A!'),
        pause(1000),
        lola('AAAAA!'),
        pause(1000),
        lola('AVIÃO começa com A!'),
        pause(1000),
        garu('ABELHA também.'),
        pause(1000),
        lola('ANANÁS! AMOR! ABRAÇO!'),
        pause(1500),
        garu('Tudo isso começa com... A.'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Acha a letra A',
        prompts: [
          { label: 'A', icon: 'A', isTarget: true },
          { label: 'E', icon: 'E', isTarget: false },
          { label: 'A', icon: 'A', isTarget: true },
          { label: 'I', icon: 'I', isTarget: false },
        ],
        targetLabel: 'A',
      },
      intro: [garu('Toca em todos os A que ver na tela.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cesta do A',
        items: [
          { word: 'AVIÃO', startsWith: 'A' },
          { word: 'BOLA', startsWith: 'B' },
          { word: 'ABELHA', startsWith: 'A' },
          { word: 'GATO', startsWith: 'G' },
          { word: 'AMOR', startsWith: 'A' },
        ],
        buckets: [
          { label: 'Tem A no começo', accept: 'A' },
          { label: 'Não tem', accept: 'OTHER' },
        ],
      },
      intro: [lola('Arrasta as palavras que começam com A para a cesta certa!')],
    },
    celebrate: {
      collectibleSlug: 'abelhinha-a',
      collectibleDisplayName: 'Abelhinha A',
      intro: [lola('VOCÊ CONHECE O A!'), garu('A Abelhinha A quer morar com você!')],
    },
  },
  {
    slug: 'conheci-o-e',
    displayName: 'Conheci o E',
    learningObjective: 'Reconhecer a letra E pela forma e pelo som inicial',
    displayOrder: 7,
    conceptSlugs: ['letra-e', 'som-inicial', 'forma-letra'],
    listen: {
      intro: [
        apito(),
        garu('Agora... A LETRA E!'),
        lola('EEEE!'),
        pause(1000),
        garu('ELEFANTE começa com E.'),
        lola('ESCADA também!'),
        garu('ESPELHO. ESTRELA.'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Acha a letra E',
        prompts: [
          { label: 'E', icon: 'E', isTarget: true },
          { label: 'A', icon: 'A', isTarget: false },
          { label: 'E', icon: 'E', isTarget: true },
          { label: 'O', icon: 'O', isTarget: false },
        ],
        targetLabel: 'E',
      },
      intro: [garu('Toca em todos os E.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cesta do E',
        items: [
          { word: 'ELEFANTE', startsWith: 'E' },
          { word: 'CASA', startsWith: 'C' },
          { word: 'ESCADA', startsWith: 'E' },
          { word: 'BOLA', startsWith: 'B' },
          { word: 'ESTRELA', startsWith: 'E' },
        ],
        buckets: [
          { label: 'Tem E no começo', accept: 'E' },
          { label: 'Não tem', accept: 'OTHER' },
        ],
      },
      intro: [lola('Cesta do E! Arrasta as que começam com E!')],
    },
    celebrate: {
      collectibleSlug: 'elefantinho-e',
      collectibleDisplayName: 'Elefantinho E',
      intro: [lola('VOCÊ ACHOU O E!'), garu('O Elefantinho E quer ir com você!')],
    },
  },
  {
    slug: 'conheci-o-i',
    displayName: 'Conheci o I',
    learningObjective: 'Reconhecer a letra I pela forma e pelo som inicial',
    displayOrder: 8,
    conceptSlugs: ['letra-i', 'som-inicial', 'forma-letra'],
    listen: {
      intro: [
        apito(),
        garu('Olha! A LETRA I!'),
        lola('IIII!'),
        garu('IOGURTE começa com I.'),
        lola('ILHA! IGREJA!'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Acha o I',
        prompts: [
          { label: 'I', icon: 'I', isTarget: true },
          { label: 'A', icon: 'A', isTarget: false },
          { label: 'I', icon: 'I', isTarget: true },
          { label: 'U', icon: 'U', isTarget: false },
        ],
        targetLabel: 'I',
      },
      intro: [garu('Toca em todos os I que aparecerem.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cesta do I',
        items: [
          { word: 'IOGURTE', startsWith: 'I' },
          { word: 'TAPETE', startsWith: 'T' },
          { word: 'ILHA', startsWith: 'I' },
          { word: 'BOLA', startsWith: 'B' },
        ],
        buckets: [
          { label: 'Tem I no começo', accept: 'I' },
          { label: 'Não tem', accept: 'OTHER' },
        ],
      },
      intro: [lola('Cesta do I! Vai!')],
    },
    celebrate: {
      collectibleSlug: 'ilhota-i',
      collectibleDisplayName: 'Ilhota I',
      intro: [lola('VOCÊ ACHOU O I!'), garu('A Ilhota I é sua!')],
    },
  },
  {
    slug: 'conheci-o-o',
    displayName: 'Conheci o O',
    learningObjective: 'Reconhecer a letra O pela forma e pelo som inicial',
    displayOrder: 9,
    conceptSlugs: ['letra-o', 'som-inicial', 'forma-letra'],
    listen: {
      intro: [
        apito(),
        garu('A LETRA O!'),
        lola('OOOO!'),
        garu('OSSO começa com O.'),
        lola('ÓCULOS! OVO!'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Acha o O',
        prompts: [
          { label: 'O', icon: 'O', isTarget: true },
          { label: 'I', icon: 'I', isTarget: false },
          { label: 'O', icon: 'O', isTarget: true },
          { label: 'E', icon: 'E', isTarget: false },
        ],
        targetLabel: 'O',
      },
      intro: [garu('Toca em todos os O!')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cesta do O',
        items: [
          { word: 'OSSO', startsWith: 'O' },
          { word: 'BALA', startsWith: 'B' },
          { word: 'OVO', startsWith: 'O' },
          { word: 'GATO', startsWith: 'G' },
        ],
        buckets: [
          { label: 'Tem O no começo', accept: 'O' },
          { label: 'Não tem', accept: 'OTHER' },
        ],
      },
      intro: [lola('Cesta do O! Pra cima!')],
    },
    celebrate: {
      collectibleSlug: 'ovinho-o',
      collectibleDisplayName: 'Ovinho O',
      intro: [lola('VOCÊ ACHOU O O!'), garu('O Ovinho O foi com você!')],
    },
  },
  {
    slug: 'conheci-o-u',
    displayName: 'Conheci o U',
    learningObjective: 'Reconhecer a letra U pela forma e pelo som inicial',
    displayOrder: 10,
    conceptSlugs: ['letra-u', 'som-inicial', 'forma-letra'],
    listen: {
      intro: [
        apito(),
        garu('Última vogal: A LETRA U!'),
        lola('UUUU!'),
        garu('UVA começa com U.'),
        lola('URSO! UNHA!'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Acha o U',
        prompts: [
          { label: 'U', icon: 'U', isTarget: true },
          { label: 'O', icon: 'O', isTarget: false },
          { label: 'U', icon: 'U', isTarget: true },
          { label: 'I', icon: 'I', isTarget: false },
        ],
        targetLabel: 'U',
      },
      intro: [garu('Toca em todos os U!')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cesta do U',
        items: [
          { word: 'UVA', startsWith: 'U' },
          { word: 'CASA', startsWith: 'C' },
          { word: 'URSO', startsWith: 'U' },
          { word: 'PEIXE', startsWith: 'P' },
        ],
        buckets: [
          { label: 'Tem U no começo', accept: 'U' },
          { label: 'Não tem', accept: 'OTHER' },
        ],
      },
      intro: [lola('Cesta do U! Vai vai vai!')],
    },
    celebrate: {
      collectibleSlug: 'ursinho-u',
      collectibleDisplayName: 'Ursinho U',
      intro: [
        lola('VOCÊ APRENDEU AS CINCO VOGAIS!'),
        garu('A, E, I, O, U. Você é INCRÍVEL!'),
        lola('O Ursinho U quer comemorar com você!'),
      ],
    },
  },
];

// -------------------------------------------------------------
// EIXO 2 — Contar e Comparar (10 sessões)
// -------------------------------------------------------------

const EIXO_2_SESSIONS: SessionDescriptor[] = [
  {
    slug: 'um-dois-tres',
    displayName: 'Um, dois, três',
    learningObjective: 'Contar oralmente até três com correspondência a objetos',
    displayOrder: 1,
    conceptSlugs: ['contagem-oral-3', 'correspondencia-1-1'],
    listen: {
      intro: [
        apito(),
        garu('Olha quem chegou pra brincar!'),
        garu('UM patinho!'),
        pause(1000),
        lola('Dois!'),
        garu('DOIS patinhos!'),
        pause(1000),
        lola('TRÊS!'),
        garu('UM... DOIS... TRÊS!'),
        pause(1500),
        lola('Quer contar também?'),
      ],
    },
    imitate: {
      sceneKey: 'count-objects',
      params: { title: 'Conta os patinhos', totalCount: 3, itemKey: 'patinho' },
      intro: [garu('Agora você conta!'), lola('Toca em cada patinho!')],
    },
    play: {
      sceneKey: 'count-objects',
      params: { title: 'Conta o que aparece', totalCount: 3, itemKey: 'mistos', rounds: 5 },
      intro: [lola('Olha! Aparecem coisas novas! Toca pra contar!')],
    },
    celebrate: {
      collectibleSlug: 'trio-patinho',
      collectibleDisplayName: 'Trio Patinho',
      intro: [
        lola('VOCÊ CONTOU ATÉ TRÊS!'),
        garu('Um... dois... três. Você conseguiu.'),
        lola('O TRIO PATINHO quer ir pra sua casinha!'),
      ],
    },
  },
  {
    slug: 'vamos-contar-mais',
    displayName: 'Vamos contar mais',
    learningObjective: 'Contar oralmente até cinco',
    displayOrder: 2,
    conceptSlugs: ['contagem-oral-5'],
    listen: {
      intro: [
        apito(),
        garu('Olha que descoberta!'),
        lola('Uma MÃO!'),
        garu('Vamos contar os dedinhos? UM!'),
        lola('DOIS!'),
        garu('TRÊS!'),
        lola('QUATRO!'),
        garu('E... CINCO!'),
        lola('CINCO DEDINHOS!'),
      ],
    },
    imitate: {
      sceneKey: 'count-objects',
      params: { title: 'Abre os dedinhos', totalCount: 5, itemKey: 'dedinho' },
      intro: [garu('Toca em cada dedinho pra contar.')],
    },
    play: {
      sceneKey: 'count-objects',
      params: { title: 'Conta de 1 a 5', totalCount: 5, itemKey: 'mistos', rounds: 5 },
      intro: [lola('Quantos aparecem? Conta!')],
    },
    celebrate: {
      collectibleSlug: 'maozinha-do-5',
      collectibleDisplayName: 'Mãozinha do 5',
      intro: [lola('VOCÊ CONTOU ATÉ CINCO!'), garu('Cinco dedinhos. Cinco amigos.')],
    },
  },
  {
    slug: 'muito-e-pouco',
    displayName: 'Muito e pouco',
    learningObjective: 'Comparar grandes vs pequenos conjuntos (subitizing)',
    displayOrder: 3,
    conceptSlugs: ['comparacao-quantidade', 'muito-pouco'],
    listen: {
      intro: [
        apito(),
        garu('Olha esses dois pratos.'),
        lola('Esse aqui tem MUITAS cerejas!'),
        garu('E esse tem POUCAS.'),
        pause(1000),
        lola('MUITO! POUCO!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Onde tem MUITO?',
        rounds: [
          { prompt: 'Toca onde tem MUITO!', options: ['Muito', 'Pouco'], answer: 'Muito' },
          { prompt: 'Toca onde tem POUCO!', options: ['Muito', 'Pouco'], answer: 'Pouco' },
          { prompt: 'Toca onde tem MUITO!', options: ['Muito', 'Pouco'], answer: 'Muito' },
        ],
      },
      intro: [garu('Eu pergunto. Você toca.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cestas de muito e pouco',
        items: [
          { word: '🍓🍓🍓🍓🍓🍓', startsWith: 'MUITO' },
          { word: '🍓', startsWith: 'POUCO' },
          { word: '⭐⭐⭐⭐⭐', startsWith: 'MUITO' },
          { word: '⭐', startsWith: 'POUCO' },
        ],
        buckets: [
          { label: 'MUITO', accept: 'MUITO' },
          { label: 'POUCO', accept: 'POUCO' },
        ],
      },
      intro: [lola('Coloca cada conjunto na cesta certa!')],
    },
    celebrate: {
      collectibleSlug: 'cestinha-cheia',
      collectibleDisplayName: 'Cestinha Cheia',
      intro: [lola('VOCÊ VÊ MUITO E POUCO!'), garu('A Cestinha Cheia veio te visitar.')],
    },
  },
  {
    slug: 'grande-e-pequeno',
    displayName: 'Grande e pequeno',
    learningObjective: 'Comparar tamanhos de objetos',
    displayOrder: 4,
    conceptSlugs: ['comparacao-tamanho', 'grande-pequeno'],
    listen: {
      intro: [
        apito(),
        garu('Olha esses dois ursos.'),
        lola('Esse é GRANDE!'),
        garu('Esse é PEQUENO.'),
        pause(1000),
        lola('GRANDE! PEQUENO!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Toca no GRANDE',
        rounds: [
          { prompt: 'Toca no GRANDE!', options: ['Grande', 'Pequeno'], answer: 'Grande' },
          { prompt: 'Toca no PEQUENO!', options: ['Grande', 'Pequeno'], answer: 'Pequeno' },
          { prompt: 'Toca no GRANDE!', options: ['Grande', 'Pequeno'], answer: 'Grande' },
        ],
      },
      intro: [garu('Eu peço. Você toca.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cestas de tamanho',
        items: [
          { word: '🐘', startsWith: 'GRANDE' },
          { word: '🐭', startsWith: 'PEQUENO' },
          { word: '🦒', startsWith: 'GRANDE' },
          { word: '🐝', startsWith: 'PEQUENO' },
        ],
        buckets: [
          { label: 'GRANDE', accept: 'GRANDE' },
          { label: 'PEQUENO', accept: 'PEQUENO' },
        ],
      },
      intro: [lola('Separa os GRANDES dos PEQUENOS!')],
    },
    celebrate: {
      collectibleSlug: 'duo-tamanho',
      collectibleDisplayName: 'Duo Tamanho',
      intro: [lola('VOCÊ SABE GRANDE E PEQUENO!'), garu('Mais um amigo na casinha.')],
    },
  },
  {
    slug: 'cheio-e-vazio',
    displayName: 'Cheio e vazio',
    learningObjective: 'Reconhecer estados de recipientes',
    displayOrder: 5,
    conceptSlugs: ['estado-volume', 'cheio-vazio'],
    listen: {
      intro: [
        apito(),
        garu('Olha esse copo!'),
        lola('Ele tá CHEIO!'),
        pause(1000),
        garu('E esse outro... VAZIO.'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Cheio ou vazio?',
        rounds: [
          { prompt: 'Esse copo está...', options: ['Cheio', 'Vazio'], answer: 'Cheio' },
          { prompt: 'Esse copo está...', options: ['Cheio', 'Vazio'], answer: 'Vazio' },
          { prompt: 'Esse copo está...', options: ['Cheio', 'Vazio'], answer: 'Cheio' },
        ],
      },
      intro: [garu('Olha cada copo e me diz.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cesta de cheios e vazios',
        items: [
          { word: '🥛 cheio', startsWith: 'CHEIO' },
          { word: '🥛 vazio', startsWith: 'VAZIO' },
          { word: '🪣 cheio', startsWith: 'CHEIO' },
          { word: '🪣 vazio', startsWith: 'VAZIO' },
        ],
        buckets: [
          { label: 'CHEIO', accept: 'CHEIO' },
          { label: 'VAZIO', accept: 'VAZIO' },
        ],
      },
      intro: [lola('Separa cheios e vazios!')],
    },
    celebrate: {
      collectibleSlug: 'copinho-cheio',
      collectibleDisplayName: 'Copinho Cheio',
      intro: [lola('VOCÊ SABE CHEIO E VAZIO!'), garu('Que descoberta!')],
    },
  },
  {
    slug: 'igual-e-diferente',
    displayName: 'Igual e diferente',
    learningObjective: 'Identificar pares idênticos vs diferentes',
    displayOrder: 6,
    conceptSlugs: ['classificacao', 'igual-diferente'],
    listen: {
      intro: [
        apito(),
        garu('Olha esses dois.'),
        lola('São IGUAIS!'),
        garu('Esses dois são DIFERENTES.'),
        pause(1000),
        lola('IGUAL! DIFERENTE!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Igual ou diferente?',
        rounds: [
          { prompt: 'Esses dois são...', options: ['Iguais', 'Diferentes'], answer: 'Iguais' },
          { prompt: 'Esses dois são...', options: ['Iguais', 'Diferentes'], answer: 'Diferentes' },
          { prompt: 'Esses dois são...', options: ['Iguais', 'Diferentes'], answer: 'Iguais' },
          { prompt: 'Esses dois são...', options: ['Iguais', 'Diferentes'], answer: 'Diferentes' },
        ],
      },
      intro: [garu('Compara cada par e responde.')],
    },
    play: {
      sceneKey: 'drag-to-snap',
      params: {
        title: 'Junta os iguais',
        pairs: [
          { left: '🍎', right: '🍎' },
          { left: '⭐', right: '⭐' },
          { left: '🌸', right: '🌸' },
        ],
      },
      intro: [lola('Arrasta os iguais juntos!')],
    },
    celebrate: {
      collectibleSlug: 'gemeos-felizes',
      collectibleDisplayName: 'Gêmeos Felizes',
      intro: [lola('VOCÊ VÊ IGUAL E DIFERENTE!'), garu('Os Gêmeos Felizes vieram pra casinha!')],
    },
  },
  {
    slug: 'conta-comigo',
    displayName: 'Conta comigo',
    learningObjective: 'Contar até cinco com correspondência um-a-um',
    displayOrder: 7,
    conceptSlugs: ['correspondencia-1-1', 'contagem-oral-5'],
    listen: {
      intro: [
        apito(),
        garu('Vamos contar JUNTOS.'),
        lola('UM... DOIS... TRÊS... QUATRO... CINCO!'),
        pause(1000),
        garu('Agora é com você.'),
      ],
    },
    imitate: {
      sceneKey: 'count-objects',
      params: { title: 'Aponta junto', totalCount: 5, itemKey: 'estrela' },
      intro: [garu('Aponta em cada um. Eu conto junto.')],
    },
    play: {
      sceneKey: 'count-objects',
      params: { title: 'Conta o que aparece', totalCount: 5, itemKey: 'mistos', rounds: 5 },
      intro: [lola('Conta tudo que aparecer!')],
    },
    celebrate: {
      collectibleSlug: 'estrelinha-5',
      collectibleDisplayName: 'Estrelinha 5',
      intro: [lola('VOCÊ CONTA COMIGO!'), garu('A Estrelinha 5 brilha pra você.')],
    },
  },
  {
    slug: 'onde-tem-mais',
    displayName: 'Onde tem mais?',
    learningObjective: 'Identificar conjunto com maior quantidade até 5',
    displayOrder: 8,
    conceptSlugs: ['comparacao-quantidade', 'mais'],
    listen: {
      intro: [
        apito(),
        garu('Olha esses dois grupos!'),
        lola('Aqui tem MAIS!'),
        garu('Aqui tem MENOS.'),
        pause(1000),
        lola('MAIS!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Onde tem MAIS?',
        rounds: [
          { prompt: 'Toca onde tem MAIS!', options: ['Esquerda', 'Direita'], answer: 'Esquerda' },
          { prompt: 'Toca onde tem MAIS!', options: ['Esquerda', 'Direita'], answer: 'Direita' },
          { prompt: 'Toca onde tem MAIS!', options: ['Esquerda', 'Direita'], answer: 'Esquerda' },
        ],
      },
      intro: [garu('Compara e toca no que tem MAIS.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Enche a cestinha do MAIS',
        items: [
          { word: '🍓🍓🍓🍓', startsWith: 'MAIS' },
          { word: '🍓', startsWith: 'MENOS' },
          { word: '⭐⭐⭐', startsWith: 'MAIS' },
          { word: '⭐', startsWith: 'MENOS' },
        ],
        buckets: [
          { label: 'MAIS', accept: 'MAIS' },
          { label: 'MENOS', accept: 'MENOS' },
        ],
      },
      intro: [lola('Cesta do MAIS, cesta do MENOS!')],
    },
    celebrate: {
      collectibleSlug: 'cesto-mais',
      collectibleDisplayName: 'Cesto do Mais',
      intro: [lola('VOCÊ ACHA O MAIS!'), garu('Bom trabalho.')],
    },
  },
  {
    slug: 'onde-tem-menos',
    displayName: 'Onde tem menos?',
    learningObjective: 'Identificar conjunto com menor quantidade até 5',
    displayOrder: 9,
    conceptSlugs: ['comparacao-quantidade', 'menos'],
    listen: {
      intro: [
        apito(),
        garu('Olha esses dois grupos!'),
        lola('Aqui tem POUQUINHO. É MENOS.'),
        garu('Aqui tem mais.'),
        pause(1000),
        lola('MENOS!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Onde tem MENOS?',
        rounds: [
          { prompt: 'Toca onde tem MENOS!', options: ['Esquerda', 'Direita'], answer: 'Direita' },
          { prompt: 'Toca onde tem MENOS!', options: ['Esquerda', 'Direita'], answer: 'Esquerda' },
          { prompt: 'Toca onde tem MENOS!', options: ['Esquerda', 'Direita'], answer: 'Direita' },
        ],
      },
      intro: [garu('Vamos achar o MENOS.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Cestinha do MENOS',
        items: [
          { word: '🍓', startsWith: 'MENOS' },
          { word: '🍓🍓🍓', startsWith: 'MAIS' },
          { word: '⭐', startsWith: 'MENOS' },
          { word: '⭐⭐⭐⭐', startsWith: 'MAIS' },
        ],
        buckets: [
          { label: 'MENOS', accept: 'MENOS' },
          { label: 'MAIS', accept: 'MAIS' },
        ],
      },
      intro: [lola('Cesta do MENOS! Vamos!')],
    },
    celebrate: {
      collectibleSlug: 'cesto-menos',
      collectibleDisplayName: 'Cesto do Menos',
      intro: [lola('VOCÊ ACHA O MENOS!'), garu('Você compara muito bem.')],
    },
  },
  {
    slug: 'conta-ate-dez',
    displayName: 'Conta até dez',
    learningObjective: 'Recitar a sequência oral de 1 a 10',
    displayOrder: 10,
    conceptSlugs: ['contagem-oral-10', 'sequencia'],
    listen: {
      intro: [
        apito(),
        garu('Agora a gente conta MAIS LONGE.'),
        lola('UM, DOIS, TRÊS, QUATRO, CINCO,'),
        garu('SEIS, SETE, OITO, NOVE, DEZ!'),
        pause(1500),
        lola('DEZ! Você consegue?'),
      ],
    },
    imitate: {
      sceneKey: 'count-objects',
      params: { title: 'Toca em cada amiguinho', totalCount: 10, itemKey: 'patinho' },
      intro: [garu('Vamos contar até 10!')],
    },
    play: {
      sceneKey: 'count-objects',
      params: { title: 'Conta o que aparece', totalCount: 10, itemKey: 'mistos', rounds: 3 },
      intro: [lola('Você consegue contar tudo?')],
    },
    celebrate: {
      collectibleSlug: 'dezena-amiga',
      collectibleDisplayName: 'Dezena Amiga',
      intro: [
        lola('VOCÊ CONTA ATÉ DEZ!'),
        garu('Um, dois, três, quatro, cinco... dez! Que jornada.'),
        lola('A Dezena Amiga veio comemorar!'),
      ],
    },
  },
];

// -------------------------------------------------------------
// EIXO 3 — Formas e Cores (10 sessões)
// -------------------------------------------------------------

const EIXO_3_SESSIONS: SessionDescriptor[] = [
  {
    slug: 'a-cor-vermelha',
    displayName: 'A cor vermelha',
    learningObjective: 'Reconhecer e nomear a cor vermelha',
    displayOrder: 1,
    conceptSlugs: ['cor-vermelho', 'reconhecimento-visual'],
    listen: {
      intro: [
        apito(),
        lola('Olha o laço do Garuzinho!'),
        lola('É VERMELHO!'),
        garu('Sim! VERMELHO.'),
        pause(1000),
        garu('O tomate é VERMELHO.'),
        lola('A maçã também é VERMELHA!'),
        garu('E o coração... VERMELHO!'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Toca no vermelho',
        prompts: [
          { label: 'tomate', icon: '🍅', isTarget: true, color: 'red' },
          { label: 'folha', icon: '🍃', isTarget: false, color: 'green' },
          { label: 'coração', icon: '❤️', isTarget: true, color: 'red' },
          { label: 'peixe', icon: '🐟', isTarget: false, color: 'blue' },
        ],
        targetColor: 'red',
      },
      intro: [lola('Toca SÓ nas coisas VERMELHAS!')],
    },
    play: {
      sceneKey: 'color-match',
      params: { title: 'O mundo vermelho', targetColor: 'red', minTaps: 4 },
      intro: [garu('Toca em tudo que for VERMELHO!')],
    },
    celebrate: {
      collectibleSlug: 'tomatinho-vermelho',
      collectibleDisplayName: 'Tomatinho Vermelho',
      intro: [
        lola('VOCÊ ACHOU O VERMELHO!'),
        garu('Vermelho como meu laço.'),
        lola('O Tomatinho Vermelho quer ir pra sua casinha!'),
      ],
    },
  },
  {
    slug: 'a-cor-azul',
    displayName: 'A cor azul',
    learningObjective: 'Reconhecer e nomear a cor azul',
    displayOrder: 2,
    conceptSlugs: ['cor-azul', 'reconhecimento-visual'],
    listen: {
      intro: [
        apito(),
        garu('Olha pra cima!'),
        lola('O CÉU!'),
        garu('O céu é AZUL.'),
        lola('O MAR também é AZUL!'),
        garu('AZUL é a cor do céu e do mar.'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Toca no azul',
        prompts: [
          { label: 'peixe', icon: '🐟', isTarget: true, color: 'blue' },
          { label: 'sol', icon: '☀️', isTarget: false, color: 'yellow' },
          { label: 'balão', icon: '🎈', isTarget: true, color: 'blue' },
          { label: 'maçã', icon: '🍎', isTarget: false, color: 'red' },
        ],
        targetColor: 'blue',
      },
      intro: [garu('Toca SÓ nas AZUIS!')],
    },
    play: {
      sceneKey: 'color-match',
      params: { title: 'O mar azul', targetColor: 'blue', minTaps: 4 },
      intro: [lola('Toca em tudo que for AZUL!')],
    },
    celebrate: {
      collectibleSlug: 'peixinho-azul',
      collectibleDisplayName: 'Peixinho Azul',
      intro: [lola('VOCÊ ACHOU O AZUL!'), garu('O Peixinho Azul nadou pra sua casinha!')],
    },
  },
  {
    slug: 'a-cor-amarela',
    displayName: 'A cor amarela',
    learningObjective: 'Reconhecer e nomear a cor amarela',
    displayOrder: 3,
    conceptSlugs: ['cor-amarelo', 'reconhecimento-visual'],
    listen: {
      intro: [
        apito(),
        garu('Olha o SOL!'),
        lola('AMARELO!'),
        garu('A banana também é AMARELA.'),
        lola('E o pintinho!'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Toca no amarelo',
        prompts: [
          { label: 'sol', icon: '☀️', isTarget: true, color: 'yellow' },
          { label: 'folha', icon: '🍃', isTarget: false, color: 'green' },
          { label: 'banana', icon: '🍌', isTarget: true, color: 'yellow' },
          { label: 'coração', icon: '❤️', isTarget: false, color: 'red' },
        ],
        targetColor: 'yellow',
      },
      intro: [lola('Toca SÓ nas AMARELAS!')],
    },
    play: {
      sceneKey: 'color-match',
      params: { title: 'O dia amarelo', targetColor: 'yellow', minTaps: 4 },
      intro: [garu('Toca em tudo AMARELO!')],
    },
    celebrate: {
      collectibleSlug: 'solzinho-amarelo',
      collectibleDisplayName: 'Solzinho Amarelo',
      intro: [lola('VOCÊ ACHOU O AMARELO!'), garu('O Solzinho Amarelo brilha pra você.')],
    },
  },
  {
    slug: 'a-cor-verde',
    displayName: 'A cor verde',
    learningObjective: 'Reconhecer e nomear a cor verde',
    displayOrder: 4,
    conceptSlugs: ['cor-verde', 'reconhecimento-visual'],
    listen: {
      intro: [
        apito(),
        garu('Olha a FOLHA!'),
        lola('VERDE!'),
        garu('O sapinho. A grama. Tudo VERDE.'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Toca no verde',
        prompts: [
          { label: 'folha', icon: '🍃', isTarget: true, color: 'green' },
          { label: 'sol', icon: '☀️', isTarget: false, color: 'yellow' },
          { label: 'sapinho', icon: '🐸', isTarget: true, color: 'green' },
          { label: 'peixe', icon: '🐟', isTarget: false, color: 'blue' },
        ],
        targetColor: 'green',
      },
      intro: [lola('Toca SÓ nas VERDES!')],
    },
    play: {
      sceneKey: 'color-match',
      params: { title: 'A floresta verde', targetColor: 'green', minTaps: 4 },
      intro: [garu('Toca em tudo VERDE!')],
    },
    celebrate: {
      collectibleSlug: 'sapinho-verde',
      collectibleDisplayName: 'Sapinho Verde',
      intro: [lola('VOCÊ ACHOU O VERDE!'), garu('O Sapinho Verde pulou pra sua casinha!')],
    },
  },
  {
    slug: 'misturando-cores',
    displayName: 'Misturando cores',
    learningObjective: 'Perceber que cores se combinam',
    displayOrder: 5,
    conceptSlugs: ['mistura-cores', 'transformacao'],
    listen: {
      intro: [
        apito(),
        garu('Mágica de cores!'),
        lola('Vermelho + Amarelo = LARANJA!'),
        pause(1000),
        garu('Azul + Amarelo = VERDE!'),
        pause(1000),
        lola('Cores se misturam!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Qual cor sai?',
        rounds: [
          { prompt: 'Vermelho + Amarelo?', options: ['Laranja', 'Roxo'], answer: 'Laranja' },
          { prompt: 'Azul + Amarelo?', options: ['Verde', 'Rosa'], answer: 'Verde' },
          { prompt: 'Vermelho + Azul?', options: ['Roxo', 'Verde'], answer: 'Roxo' },
        ],
      },
      intro: [garu('Eu misturo. Você adivinha!')],
    },
    play: {
      sceneKey: 'free-tap',
      params: { title: 'Festa das cores', randomSfx: ['palma'], particleColors: ['#FF6B35', '#34D399', '#A78BFA', '#F472B6'], minTaps: 5 },
      intro: [lola('Cada toque vira uma cor surpresa!')],
    },
    celebrate: {
      collectibleSlug: 'arco-iris',
      collectibleDisplayName: 'Arco-Íris',
      intro: [lola('VOCÊ ENTENDE MISTURA!'), garu('O Arco-Íris veio te visitar!')],
    },
  },
  {
    slug: 'o-circulo',
    displayName: 'O círculo',
    learningObjective: 'Reconhecer o círculo',
    displayOrder: 6,
    conceptSlugs: ['forma-circulo', 'geometria'],
    listen: {
      intro: [
        apito(),
        garu('CÍRCULO!'),
        lola('Redondinho! Sem ponta!'),
        garu('A bola é círculo. O sol é círculo. A lua cheia também.'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Toca no círculo',
        prompts: [
          { label: 'bola', icon: '⚽', isTarget: true, shape: 'circle' },
          { label: 'quadrado', icon: '🟥', isTarget: false, shape: 'square' },
          { label: 'lua', icon: '🌕', isTarget: true, shape: 'circle' },
          { label: 'triângulo', icon: '🔺', isTarget: false, shape: 'triangle' },
        ],
        targetShape: 'circle',
      },
      intro: [lola('Toca SÓ nos CÍRCULOS!')],
    },
    play: {
      sceneKey: 'drag-to-snap',
      params: { title: 'Encaixa os círculos', pairs: [{ left: '⚪', right: '⚪' }, { left: '🌕', right: '🌕' }] },
      intro: [garu('Coloca cada círculo no lugar dele.')],
    },
    celebrate: {
      collectibleSlug: 'bolinha-rolante',
      collectibleDisplayName: 'Bolinha Rolante',
      intro: [lola('VOCÊ CONHECE O CÍRCULO!'), garu('A Bolinha Rolante quer brincar com você!')],
    },
  },
  {
    slug: 'o-quadrado',
    displayName: 'O quadrado',
    learningObjective: 'Reconhecer o quadrado',
    displayOrder: 7,
    conceptSlugs: ['forma-quadrado', 'geometria'],
    listen: {
      intro: [
        apito(),
        garu('QUADRADO!'),
        lola('Quatro lados iguais!'),
        garu('A janela. A caixa. O dado.'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Toca no quadrado',
        prompts: [
          { label: 'caixa', icon: '🟥', isTarget: true, shape: 'square' },
          { label: 'bola', icon: '⚽', isTarget: false, shape: 'circle' },
          { label: 'dado', icon: '🎲', isTarget: true, shape: 'square' },
          { label: 'lua', icon: '🌕', isTarget: false, shape: 'circle' },
        ],
        targetShape: 'square',
      },
      intro: [lola('Toca SÓ nos QUADRADOS!')],
    },
    play: {
      sceneKey: 'drag-to-snap',
      params: { title: 'Encaixa os quadrados', pairs: [{ left: '🟥', right: '🟥' }, { left: '🟦', right: '🟦' }] },
      intro: [garu('Coloca cada quadrado no lugar.')],
    },
    celebrate: {
      collectibleSlug: 'caixinha-quadrada',
      collectibleDisplayName: 'Caixinha Quadrada',
      intro: [lola('VOCÊ CONHECE O QUADRADO!'), garu('A Caixinha Quadrada chegou!')],
    },
  },
  {
    slug: 'o-triangulo',
    displayName: 'O triângulo',
    learningObjective: 'Reconhecer o triângulo',
    displayOrder: 8,
    conceptSlugs: ['forma-triangulo', 'geometria'],
    listen: {
      intro: [
        apito(),
        garu('TRIÂNGULO!'),
        lola('Três pontinhas!'),
        garu('O telhado. A pizza fatiada. A vela do barco.'),
      ],
    },
    imitate: {
      sceneKey: 'tap-to-target',
      params: {
        title: 'Toca no triângulo',
        prompts: [
          { label: 'pizza', icon: '🍕', isTarget: true, shape: 'triangle' },
          { label: 'bola', icon: '⚽', isTarget: false, shape: 'circle' },
          { label: 'telhado', icon: '🔺', isTarget: true, shape: 'triangle' },
          { label: 'caixa', icon: '🟥', isTarget: false, shape: 'square' },
        ],
        targetShape: 'triangle',
      },
      intro: [lola('Toca SÓ nos TRIÂNGULOS!')],
    },
    play: {
      sceneKey: 'drag-to-snap',
      params: { title: 'Encaixa os triângulos', pairs: [{ left: '🔺', right: '🔺' }, { left: '⛰️', right: '⛰️' }] },
      intro: [garu('Coloca cada triângulo no lugar.')],
    },
    celebrate: {
      collectibleSlug: 'pizza-triangular',
      collectibleDisplayName: 'Pizza Triangular',
      intro: [lola('VOCÊ CONHECE O TRIÂNGULO!'), garu('A Pizza Triangular chegou!')],
    },
  },
  {
    slug: 'encaixa-direitinho',
    displayName: 'Encaixa direitinho',
    learningObjective: 'Encaixar formas em silhuetas correspondentes',
    displayOrder: 9,
    conceptSlugs: ['encaixe', 'coordenacao-motora', 'correspondencia'],
    listen: {
      intro: [
        apito(),
        garu('Cada forma tem um lugar.'),
        lola('Círculo no buraco redondo!'),
        garu('Quadrado no buraco quadrado.'),
        lola('Triângulo no triangular!'),
      ],
    },
    imitate: {
      sceneKey: 'drag-to-snap',
      params: {
        title: 'Encaixa as formas',
        pairs: [
          { left: '⚪', right: '⚪' },
          { left: '🟥', right: '🟥' },
          { left: '🔺', right: '🔺' },
        ],
      },
      intro: [garu('Arrasta cada forma pro buraco certinho.')],
    },
    play: {
      sceneKey: 'drag-to-snap',
      params: {
        title: 'Encaixa rapidinho',
        pairs: [
          { left: '⚪', right: '⚪' },
          { left: '🟥', right: '🟥' },
          { left: '🔺', right: '🔺' },
          { left: '🟦', right: '🟦' },
        ],
      },
      intro: [lola('Quantas você encaixa?')],
    },
    celebrate: {
      collectibleSlug: 'encaixador-mestre',
      collectibleDisplayName: 'Encaixador Mestre',
      intro: [lola('VOCÊ ENCAIXA TUDO!'), garu('Você é mestre encaixador.')],
    },
  },
  {
    slug: 'repete-comigo',
    displayName: 'Repete comigo',
    learningObjective: 'Completar padrões simples ABAB',
    displayOrder: 10,
    conceptSlugs: ['padrao', 'sequencia'],
    listen: {
      intro: [
        apito(),
        garu('Padrão!'),
        lola('Vermelho... Azul... Vermelho... AZUL!'),
        garu('Olha! Repete!'),
        pause(1000),
        lola('Tá repetindo? VOCÊ acha o próximo!'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Qual vem agora?',
        rounds: [
          { prompt: '🔴🔵🔴?', options: ['🔵', '🟢'], answer: '🔵' },
          { prompt: '⭐⚪⭐?', options: ['⭐', '⚪'], answer: '⚪' },
          { prompt: '🟥🟦🟥🟦?', options: ['🟥', '🟦'], answer: '🟥' },
        ],
      },
      intro: [garu('Continua o padrão. O que vem agora?')],
    },
    play: {
      sceneKey: 'drag-to-snap',
      params: {
        title: 'Completa o padrão',
        pairs: [
          { left: '🔴', right: '🔴' },
          { left: '🔵', right: '🔵' },
        ],
      },
      intro: [lola('Arrasta o que falta no padrão!')],
    },
    celebrate: {
      collectibleSlug: 'detetive-padrao',
      collectibleDisplayName: 'Detetive Padrão',
      intro: [
        lola('VOCÊ VÊ PADRÕES!'),
        garu('Vermelho, azul, vermelho, azul...'),
        lola('O Detetive Padrão te dá medalha!'),
      ],
    },
  },
];

// -------------------------------------------------------------
// EIXO 4 — Afetos (8 sessões — mais sensível, pausas maiores)
// -------------------------------------------------------------

const longPause = (ms: number) => pause(Math.max(1500, ms));

const EIXO_4_SESSIONS: SessionDescriptor[] = [
  {
    slug: 'eu-fico-feliz',
    displayName: 'Eu fico feliz',
    learningObjective: 'Reconhecer expressão facial de alegria e nomear "feliz"',
    displayOrder: 1,
    conceptSlugs: ['emocao-feliz', 'expressao-facial'],
    listen: {
      durationSeconds: 55,
      intro: [
        apito(),
        garu('Hoje a gente vai falar de uma coisa importante.'),
        longPause(1500),
        lola('Os sentimentos!'),
        longPause(1000),
        lola('Olha minha carinha!'),
        garu('A Lolinha está FELIZ.'),
        longPause(1500),
        garu('Quando a gente fica feliz, a gente SORRI.'),
        lola('É bom ficar feliz!'),
        longPause(1500),
        garu('Eu também fico feliz quando estou com você.'),
      ],
    },
    imitate: {
      sceneKey: 'emotion-match',
      params: {
        title: 'Acha a carinha feliz',
        targetEmotion: 'feliz',
        faces: [
          { emotion: 'feliz', icon: '😀' },
          { emotion: 'neutro', icon: '😐' },
          { emotion: 'feliz', icon: '😄' },
          { emotion: 'neutro', icon: '😶' },
        ],
      },
      intro: [garu('Toca SÓ nas carinhas felizes!')],
    },
    play: {
      sceneKey: 'character-editor',
      params: { title: 'Faz a carinha feliz', targetEmotion: 'feliz' },
      intro: [lola('Faz a carinha do bichinho ficar feliz!')],
    },
    celebrate: {
      collectibleSlug: 'sol-sorriso',
      collectibleDisplayName: 'Sol Sorriso',
      intro: [lola('VOCÊ É FELIZ!'), garu('E ser feliz é gostoso.'), lola('O Sol Sorriso quer ir com você!')],
    },
  },
  {
    slug: 'eu-fico-triste',
    displayName: 'Eu fico triste',
    learningObjective: 'Reconhecer expressão de tristeza',
    displayOrder: 2,
    conceptSlugs: ['emocao-triste', 'expressao-facial'],
    listen: {
      durationSeconds: 60,
      intro: [
        apito(),
        garu('Lolinha, você tá bem?'),
        longPause(1500),
        lola('Eu tô meio... TRISTE.'),
        garu('Tá tudo bem ficar triste.'),
        longPause(2000),
        garu('Quando a gente fica triste, a carinha fica assim... Boquinha pra baixo.'),
        longPause(1500),
        lola('Às vezes a gente fica triste.'),
        garu('E depois passa.'),
        longPause(1500),
        garu('Estou aqui com você.'),
        longPause(2000),
        lola('Obrigada, Garuzinho.'),
      ],
    },
    imitate: {
      sceneKey: 'emotion-match',
      params: {
        title: 'Acha a carinha triste',
        targetEmotion: 'triste',
        faces: [
          { emotion: 'triste', icon: '😢' },
          { emotion: 'feliz', icon: '😀' },
          { emotion: 'triste', icon: '😞' },
          { emotion: 'feliz', icon: '😄' },
        ],
      },
      intro: [garu('Toca SÓ nas carinhas tristes. Não tem problema.')],
    },
    play: {
      sceneKey: 'character-editor',
      params: { title: 'A carinha triste do bichinho', targetEmotion: 'triste' },
      intro: [lola('Faz a carinha do bichinho ficar triste, depois feliz de novo.')],
    },
    celebrate: {
      collectibleSlug: 'nuvenzinha-acolhe',
      collectibleDisplayName: 'Nuvenzinha que Acolhe',
      intro: [lola('TÁ TUDO BEM SENTIR.'), garu('Triste passa. Estar perto ajuda.')],
    },
  },
  {
    slug: 'eu-fico-bravo',
    displayName: 'Eu fico bravo',
    learningObjective: 'Reconhecer expressão de raiva e nomear "bravo"',
    displayOrder: 3,
    conceptSlugs: ['emocao-bravo', 'expressao-facial'],
    listen: {
      durationSeconds: 55,
      intro: [
        apito(),
        garu('Às vezes a gente fica BRAVO.'),
        longPause(1500),
        lola('A cara fica assim... carrancuda.'),
        garu('Sobrancelhas pra baixo.'),
        longPause(1500),
        garu('Ficar bravo é normal.'),
        lola('Depois passa.'),
      ],
    },
    imitate: {
      sceneKey: 'emotion-match',
      params: {
        title: 'Acha a carinha brava',
        targetEmotion: 'bravo',
        faces: [
          { emotion: 'bravo', icon: '😠' },
          { emotion: 'feliz', icon: '😀' },
          { emotion: 'bravo', icon: '😡' },
          { emotion: 'triste', icon: '😢' },
        ],
      },
      intro: [garu('Toca SÓ nas carinhas bravas.')],
    },
    play: {
      sceneKey: 'character-editor',
      params: { title: 'A carinha brava', targetEmotion: 'bravo' },
      intro: [lola('Faz a carinha do bichinho ficar braba. Depois calma.')],
    },
    celebrate: {
      collectibleSlug: 'leaozinho-passa',
      collectibleDisplayName: 'Leãozinho Passa',
      intro: [
        lola('VOCÊ NOMEIA O QUE SENTE!'),
        garu('Bravo, triste, feliz... tudo cabe aqui.'),
        lola('O Leãozinho Passa veio.'),
      ],
    },
  },
  {
    slug: 'o-que-me-deixa-feliz',
    displayName: 'O que me deixa feliz?',
    learningObjective: 'Associar situações cotidianas à alegria',
    displayOrder: 4,
    conceptSlugs: ['emocao-feliz', 'vocabulario-afetivo'],
    listen: {
      durationSeconds: 55,
      intro: [
        apito(),
        garu('O que te deixa feliz?'),
        longPause(1500),
        lola('Eu fico feliz BRINCANDO!'),
        garu('Eu fico feliz CORRENDO no parque.'),
        longPause(1500),
        lola('Cada um tem sua felicidade.'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Isso te deixa feliz?',
        rounds: [
          { prompt: 'Receber um abraço...', options: ['Sim, feliz!', 'Não'], answer: 'Sim, feliz!' },
          { prompt: 'Brincar com amigo...', options: ['Sim, feliz!', 'Não'], answer: 'Sim, feliz!' },
          { prompt: 'Comer algo gostoso...', options: ['Sim, feliz!', 'Não'], answer: 'Sim, feliz!' },
        ],
      },
      intro: [garu('Cada um tem coisas que deixam feliz. Marca o que te deixa.')],
    },
    play: {
      sceneKey: 'sort-to-bucket',
      params: {
        title: 'Coração de coisas felizes',
        items: [
          { word: '🤗 abraço', startsWith: 'FELIZ' },
          { word: '🎈 balão', startsWith: 'FELIZ' },
          { word: '🍰 bolo', startsWith: 'FELIZ' },
        ],
        buckets: [{ label: 'Me deixa feliz', accept: 'FELIZ' }],
      },
      intro: [lola('Coloca tudo que te deixa feliz no coração!')],
    },
    celebrate: {
      collectibleSlug: 'coracao-brilhante',
      collectibleDisplayName: 'Coração Brilhante',
      intro: [lola('VOCÊ SABE O QUE TE FAZ BEM!'), garu('O Coração Brilhante guarda suas escolhas.')],
    },
  },
  {
    slug: 'quando-alguem-esta-triste',
    displayName: 'Quando alguém está triste',
    learningObjective: 'Reconhecer tristeza no outro; empatia básica',
    displayOrder: 5,
    conceptSlugs: ['empatia', 'emocao-triste'],
    listen: {
      durationSeconds: 60,
      intro: [
        apito(),
        garu('Olha o amiguinho ali.'),
        longPause(1500),
        lola('Ele tá com a carinha triste.'),
        garu('Quando a gente vê alguém triste, dá pra fazer carinho.'),
        longPause(2000),
        lola('Não precisa CONSERTAR. Só ficar perto ajuda.'),
        longPause(1500),
        garu('Estar perto é amor.'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'O que fazer?',
        rounds: [
          { prompt: 'Amigo está triste. Você pode...', options: ['Dar carinho', 'Ignorar'], answer: 'Dar carinho' },
          { prompt: 'Amigo chora. Você pode...', options: ['Ficar perto', 'Sair'], answer: 'Ficar perto' },
        ],
      },
      intro: [garu('Quando alguém está triste, o que ajuda?')],
    },
    play: {
      sceneKey: 'character-editor',
      params: { title: 'Faz carinho no amiguinho', mode: 'comfort' },
      intro: [lola('Toca pra fazer carinho. Não precisa fazer nada mais.')],
    },
    celebrate: {
      collectibleSlug: 'mao-amiga',
      collectibleDisplayName: 'Mão Amiga',
      intro: [lola('VOCÊ TEM CORAÇÃO GRANDE!'), garu('Estar perto já é cuidar.')],
    },
  },
  {
    slug: 'respira-devagar',
    displayName: 'Respira devagar',
    learningObjective: 'Aprender respiração lenta como autorregulação',
    displayOrder: 6,
    conceptSlugs: ['autorregulacao', 'respiracao'],
    listen: {
      durationSeconds: 60,
      intro: [
        apito(),
        garu('Quando a gente tá muito agitado...'),
        longPause(1500),
        lola('A gente pode RESPIRAR.'),
        garu('Inspira pelo nariz...'),
        longPause(2000),
        lola('Solta pela boca...'),
        longPause(2000),
        garu('Devagarzinho.'),
      ],
    },
    imitate: {
      sceneKey: 'breathing',
      params: { title: 'Respira comigo', cycles: 3, inhaleMs: 3500, exhaleMs: 4500 },
      intro: [garu('Vamos respirar juntos. Olha a flor.')],
    },
    play: {
      sceneKey: 'breathing',
      params: { title: 'Respiração livre', cycles: 5, inhaleMs: 3500, exhaleMs: 4500 },
      intro: [lola('Respira o quanto quiser. A gente espera.')],
    },
    celebrate: {
      collectibleSlug: 'folha-respirante',
      collectibleDisplayName: 'Folha Respirante',
      intro: [
        lola('VOCÊ RESPIRA COM CALMA!'),
        garu('Quando precisar, lembra da folha.'),
        lola('Ela vai pra casinha. Pode usar quando quiser.'),
      ],
    },
  },
  {
    slug: 'posso-pedir-ajuda',
    displayName: 'Posso pedir ajuda',
    learningObjective: 'Reconhecer que pedir ajuda é positivo',
    displayOrder: 7,
    conceptSlugs: ['pedir-ajuda', 'comunicacao'],
    listen: {
      durationSeconds: 55,
      intro: [
        apito(),
        garu('Quando algo é difícil...'),
        longPause(1500),
        lola('A gente pode PEDIR AJUDA.'),
        garu('Não tem problema nenhum.'),
        longPause(1500),
        lola('Pode falar: "Me ajuda?"'),
      ],
    },
    imitate: {
      sceneKey: 'binary-choice',
      params: {
        title: 'Posso pedir?',
        rounds: [
          { prompt: 'Não consigo abrir o pote...', options: ['Pedir ajuda', 'Forçar'], answer: 'Pedir ajuda' },
          { prompt: 'Esqueci como faz...', options: ['Pedir ajuda', 'Desistir'], answer: 'Pedir ajuda' },
        ],
      },
      intro: [garu('Quando é difícil, o que dá pra fazer?')],
    },
    play: {
      sceneKey: 'free-tap',
      params: { title: 'Toca o sininho', randomSfx: ['apito'], particleColors: ['#FCD34D'], minTaps: 3 },
      intro: [lola('Toca o sininho pra pedir. Sempre tem alguém.')],
    },
    celebrate: {
      collectibleSlug: 'sininho-ajuda',
      collectibleDisplayName: 'Sininho Ajuda',
      intro: [
        lola('PEDIR AJUDA É CORAGEM!'),
        garu('Quando precisar, lembra: tem alguém aqui.'),
        lola('O Sininho Ajuda fica na casinha. Toca quando quiser.'),
      ],
    },
  },
  {
    slug: 'eu-sou-eu',
    displayName: 'Eu sou eu',
    learningObjective: 'Construir imagem positiva de si',
    displayOrder: 8,
    conceptSlugs: ['identidade', 'autoestima'],
    listen: {
      durationSeconds: 60,
      intro: [
        apito(),
        garu('Você é VOCÊ.'),
        longPause(1500),
        lola('Único! Especial!'),
        garu('Seu nome, suas cores, o que você gosta...'),
        longPause(2000),
        lola('Tudo isso é VOCÊ.'),
        longPause(1500),
        garu('E a gente te ama assim.'),
      ],
    },
    imitate: {
      sceneKey: 'character-editor',
      params: { title: 'Faz um bichinho como você', mode: 'avatar' },
      intro: [lola('Faz um bichinho do jeito que você quer!')],
    },
    play: {
      sceneKey: 'character-editor',
      params: { title: 'Eu, eu, eu!', mode: 'avatar', minChanges: 3 },
      intro: [garu('Cria, troca, brinca. Tudo é você.')],
    },
    celebrate: {
      collectibleSlug: 'espelhinho-eu',
      collectibleDisplayName: 'Espelhinho Eu',
      intro: [
        lola('VOCÊ É VOCÊ!'),
        garu('Único. Especial.'),
        lola('O Espelhinho Eu mostra você, sempre.'),
      ],
    },
  },
];

// -------------------------------------------------------------
// Eixos finalizados
// -------------------------------------------------------------

export const CURIOSOS_WORLD: WorldSeed = {
  slug: 'curiosos',
  displayName: 'Mundo dos Curiosos',
  ageMin: 3,
  ageMax: 4,
  description: 'O primeiro mundo. Sons, números, cores e afetos com Garuzinho e Lolinha.',
  themeColor: '#E26B45',
  hitAreaMinPx: 80,
  sessionDurationMinSeconds: 180,
  sessionDurationMaxSeconds: 300,
};

export const CURIOSOS_AXES: AxisSeed[] = [
  {
    slug: 'sons-letras',
    displayName: 'Sons e Letras',
    subtitle: 'Escutar, brincar de rimar, conhecer vogais',
    iconName: 'music',
    displayOrder: 1,
    themeAccent: '#E26B45',
    sessions: EIXO_1_SESSIONS.map((s) => ({
      slug: s.slug,
      displayName: s.displayName,
      learningObjective: s.learningObjective,
      displayOrder: s.displayOrder,
      estimatedDurationSeconds: 210,
      atoms: buildSessionAtoms(1, s),
    })),
  },
  {
    slug: 'contar-comparar',
    displayName: 'Contar e Comparar',
    subtitle: 'Um, dois, três... muito, pouco, mais, menos',
    iconName: 'hash',
    displayOrder: 2,
    themeAccent: '#60A5FA',
    sessions: EIXO_2_SESSIONS.map((s) => ({
      slug: s.slug,
      displayName: s.displayName,
      learningObjective: s.learningObjective,
      displayOrder: s.displayOrder,
      estimatedDurationSeconds: 210,
      atoms: buildSessionAtoms(2, s),
    })),
  },
  {
    slug: 'formas-cores',
    displayName: 'Formas e Cores',
    subtitle: 'Cores, formas, encaixes e padrões',
    iconName: 'palette',
    displayOrder: 3,
    themeAccent: '#FCD34D',
    sessions: EIXO_3_SESSIONS.map((s) => ({
      slug: s.slug,
      displayName: s.displayName,
      learningObjective: s.learningObjective,
      displayOrder: s.displayOrder,
      estimatedDurationSeconds: 210,
      atoms: buildSessionAtoms(3, s),
    })),
  },
  {
    slug: 'afetos',
    displayName: 'Afetos',
    subtitle: 'Sentir, nomear, acolher',
    iconName: 'heart',
    displayOrder: 4,
    themeAccent: '#F472B6',
    sessions: EIXO_4_SESSIONS.map((s) => ({
      slug: s.slug,
      displayName: s.displayName,
      learningObjective: s.learningObjective,
      displayOrder: s.displayOrder,
      estimatedDurationSeconds: 230,
      atoms: buildSessionAtoms(4, s),
    })),
  },
];

// Sanity check: 38 sessões, 152 átomos
const totalSessions = CURIOSOS_AXES.reduce((acc, a) => acc + a.sessions.length, 0);
const totalAtoms = CURIOSOS_AXES.reduce(
  (acc, a) => acc + a.sessions.reduce((s, sess) => s + sess.atoms.length, 0),
  0,
);
if (totalSessions !== 38) {
  throw new Error(`Esperado 38 sessões, obtido ${totalSessions}`);
}
if (totalAtoms !== 152) {
  throw new Error(`Esperado 152 átomos, obtido ${totalAtoms}`);
}

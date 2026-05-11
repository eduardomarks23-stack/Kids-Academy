# Currículo — Mundo dos Curiosos (3-4 anos)

> Conteúdo do Nexus Kids Academy para a faixa 3-4 anos. Camada 1: estrutura macro completa.
>
> **Status**: especificação pedagógica. Aguarda detalhamento de átomos por eixo (Camada 2).
> **Alinhamento curricular**: BNCC Educação Infantil — campos de experiência EI02 (crianças bem pequenas) e início de EI03 (crianças pequenas).
> **Última atualização**: maio/2026

---

## 0. TL;DR

4 Eixos, 38 Sessões, ~150 Átomos no total. Arquitetura simplificada de **4 tiers** (sem Capítulo), átomos de 30-90s do tipo `listen` / `imitate` / `play` / `celebrate`. Conteúdo desenhado para sessões de 3-5 min com narração humana real (não TTS) e hit area mínima de 80px. Pré-leitura, pré-matemática, formas/cores e socioemocional básico.

---

## 1. Princípios pedagógicos aplicados

Decisões herdadas da especificação de arquitetura (não reabrir):

- **Pensamento pré-operatório (Piaget)**: zero conservação, zero reversibilidade, horizonte temporal "agora vs depois". Sem arco narrativo de semanas.
- **Iniciativa vs culpa (Erikson)**: tudo é tentativa, nada é fracasso. Sem punição, mesmo simbólica.
- **Causa-efeito imediato**: a recompensa É a interação. Estrelas, badges e coleções abstratas são neutralizadas — o que prende é "toquei → algo aconteceu".
- **Repetição saudável**: criança pede a mesma atividade várias vezes. Cada sessão é desenhada para suportar 3-5 repetições sem fadiga.
- **Egocentrismo cognitivo**: narrativa é em segunda pessoa ("Você encontrou…"), não terceira.
- **Voz humana real**: TTS é insuficiente. Todas as narrações principais são gravadas.
- **Áudio + ícone + animação** — texto na tela nunca é a única carga de sentido.

---

## 2. Arquitetura — 4 tiers

Diferente de Exploradores (5-6) e Inventores (7-8), que usam 5 tiers.

```
Mundo dos Curiosos (3-4 anos)
└── Eixo (4 trilhas paralelas)
    └── Sessão (3-5 min, autoconclusiva)
        └── Átomo (30-90s, granularidade de interação)
```

O conceito de `Capítulo` não existe nessa faixa — a criança não retém arco narrativo de 3 semanas.

---

## 3. Tipos de átomo

Quatro tipos canônicos, distintos dos átomos do Exploradores/Inventores:

| Tipo | Função | Duração | Mecânica típica |
|---|---|---|---|
| `listen` | Ouvir música, história curta, narrativa pessoal | 30-60s | Reprodução de áudio com animação simples; criança apenas observa/escuta |
| `imitate` | Arrastar pra cima de modelo, repetir som, copiar gesto | 45-90s | Drag com snap generoso, mimic de áudio, gesto guiado |
| `play` | Causa-efeito puro, sem objetivo declarado | 60-90s | Toque ativa surpresa; cenário interativo livre |
| `celebrate` | Celebração imediata + opção de "fazer de novo" | 30-45s | Animação, som, "de novo!" como CTA principal |

**Sequência típica de uma sessão**: `listen → imitate → play → celebrate`. Variações permitidas, mas `celebrate` é sempre o último átomo.

---

## 4. Eixos do Mundo dos Curiosos

### Eixo 1 — Sons e Letras
**Objetivo geral**: desenvolver consciência fonológica e reconhecimento de letras como formas (não como código de leitura). Trabalha escuta ativa, discriminação sonora, rima, e introdução visual das vogais.

**Campos BNCC**: Escuta, fala, pensamento e imaginação (EF) + Traços, sons, cores e formas (TS).

**Pré-requisitos**: nenhum. Eixo de entrada.

### Eixo 2 — Contar e Comparar
**Objetivo geral**: construir noção de quantidade através de contagem oral, correspondência um-a-um, e comparação de grandezas. Não trabalha soma nem registro escrito de números — apenas oralidade e percepção.

**Campos BNCC**: Espaços, tempos, quantidades, relações e transformações (ET).

**Pré-requisitos**: nenhum.

### Eixo 3 — Formas e Cores
**Objetivo geral**: reconhecer e nomear cores primárias e secundárias básicas, identificar formas geométricas elementares, classificar objetos por atributo, e iniciar percepção de padrões. Trabalha coordenação motora fina via encaixe.

**Campos BNCC**: Traços, sons, cores e formas (TS) + Espaços, tempos, quantidades (ET).

**Pré-requisitos**: nenhum.

### Eixo 4 — Afetos
**Objetivo geral**: nomear emoções básicas (feliz, triste, bravo), reconhecer expressões correspondentes, e iniciar autorregulação via respiração simples. Construir vocabulário emocional e imagem positiva de si.

**Campos BNCC**: O eu, o outro e o nós (EO) + Corpo, gestos e movimentos (CG).

**Pré-requisitos**: nenhum. Recomendado intercalar com os outros eixos, não acumular.

---

## 5. Eixo 1 — Sons e Letras (10 sessões)

| # | Sessão | Objetivo de aprendizagem | Conceitos | BNCC |
|---|---|---|---|---|
| 1 | Sons do meu corpo | Perceber que o corpo produz sons (palma, estalo, língua, sopro) | `som-corpo` `palma` `estalo` | EI02EF02, EI02CG05 |
| 2 | Sons da casa | Reconhecer sons domésticos comuns (porta, telefone, água, descarga) | `som-objeto` `escuta-ativa` | EI02EF02, EI02ET01 |
| 3 | Sons dos animais | Identificar sons de animais domésticos (cachorro, gato, vaca, galinha) | `som-animal` `discriminacao-auditiva` | EI02EF02, EI02ET03 |
| 4 | Vai rimar! Nomes | Perceber rima usando o próprio nome e o de pessoas conhecidas | `rima` `consciencia-fonologica` | EI02EF09, EI03EF09 |
| 5 | Vai rimar! Bichos | Brincar de rimar com nomes de animais (pato-rato, gato-pato) | `rima` `consciencia-fonologica` | EI02EF09, EI03EF09 |
| 6 | Conheci o A | Reconhecer a letra A pela forma e pelo som inicial de palavras (avião, abelha) | `letra-a` `som-inicial` `forma-letra` | EI03EF01, EI03EF09 |
| 7 | Conheci o E | Reconhecer a letra E pela forma e pelo som inicial (elefante, escada) | `letra-e` `som-inicial` `forma-letra` | EI03EF01, EI03EF09 |
| 8 | Conheci o I | Reconhecer a letra I pela forma e pelo som inicial (iogurte, ilha) | `letra-i` `som-inicial` `forma-letra` | EI03EF01, EI03EF09 |
| 9 | Conheci o O | Reconhecer a letra O pela forma e pelo som inicial (osso, óculos) | `letra-o` `som-inicial` `forma-letra` | EI03EF01, EI03EF09 |
| 10 | Conheci o U | Reconhecer a letra U pela forma e pelo som inicial (uva, urso) | `letra-u` `som-inicial` `forma-letra` | EI03EF01, EI03EF09 |

**Sequência sugerida**: linear de S1 a S10. Sessões 1-5 constroem escuta e consciência fonológica antes de introduzir letras nas sessões 6-10. Consoantes ficam para evolução pós-MVP da faixa.

**Repetição espaçada**: sons de S1-S3 voltam embedded em S4-S5 (rimas) e em S6-S10 (sons iniciais de palavras-âncora).

---

## 6. Eixo 2 — Contar e Comparar (10 sessões)

| # | Sessão | Objetivo de aprendizagem | Conceitos | BNCC |
|---|---|---|---|---|
| 1 | Um, dois, três | Contar oralmente até três com correspondência a objetos visuais | `contagem-oral-3` `correspondencia-1-1` | EI02ET07, EI03ET07 |
| 2 | Vamos contar mais | Contar oralmente até cinco | `contagem-oral-5` | EI02ET07, EI03ET07 |
| 3 | Muito e pouco | Comparar conjuntos grandes vs pequenos sem contar (percepção subitizing) | `comparacao-quantidade` `muito-pouco` | EI02ET08, EI03ET08 |
| 4 | Grande e pequeno | Comparar tamanhos de objetos (mesmo tipo, escalas diferentes) | `comparacao-tamanho` `grande-pequeno` | EI02ET04, EI03ET04 |
| 5 | Cheio e vazio | Reconhecer estados de recipientes; introdução conservação de volume | `estado-volume` `cheio-vazio` | EI02ET04, EI03ET04 |
| 6 | Igual e diferente | Identificar pares idênticos vs diferentes (cor, forma, tamanho) | `classificacao` `igual-diferente` | EI02ET05, EI03ET05 |
| 7 | Conta comigo | Contar até cinco apontando para cada elemento (correspondência um-a-um rigorosa) | `correspondencia-1-1` `contagem-precisa` | EI02ET07, EI03ET07 |
| 8 | Onde tem mais? | Identificar conjunto com maior quantidade (até 5 elementos) | `comparacao-quantidade` `mais` | EI02ET08, EI03ET08 |
| 9 | Onde tem menos? | Identificar conjunto com menor quantidade (até 5 elementos) | `comparacao-quantidade` `menos` | EI02ET08, EI03ET08 |
| 10 | Conta até dez | Recitar a sequência oral de 1 a 10 (recitação, não correspondência) | `contagem-oral-10` `sequencia` | EI02ET07, EI03ET07 |

**Sequência sugerida**: S1-S2 (contagem oral pequena) → S3-S5 (comparação de grandezas) → S6 (classificação) → S7 (correspondência precisa) → S8-S9 (comparação numérica) → S10 (extensão da contagem).

**Repetição espaçada**: contagem de S1-S2 reaparece em S7-S10. Comparação de S3 reaparece em S8-S9.

---

## 7. Eixo 3 — Formas e Cores (10 sessões)

| # | Sessão | Objetivo de aprendizagem | Conceitos | BNCC |
|---|---|---|---|---|
| 1 | A cor vermelha | Reconhecer e nomear a cor vermelha em objetos do cotidiano | `cor-vermelho` `reconhecimento-visual` | EI02TS02, EI03TS02 |
| 2 | A cor azul | Reconhecer e nomear a cor azul | `cor-azul` `reconhecimento-visual` | EI02TS02, EI03TS02 |
| 3 | A cor amarela | Reconhecer e nomear a cor amarela | `cor-amarelo` `reconhecimento-visual` | EI02TS02, EI03TS02 |
| 4 | A cor verde | Reconhecer e nomear a cor verde | `cor-verde` `reconhecimento-visual` | EI02TS02, EI03TS02 |
| 5 | Misturando cores | Perceber que cores se combinam (vermelho + amarelo = laranja; azul + amarelo = verde) | `mistura-cores` `transformacao` | EI02TS02, EI02ET06 |
| 6 | O círculo | Reconhecer o círculo em objetos e na natureza | `forma-circulo` `geometria` | EI02TS02, EI03ET01 |
| 7 | O quadrado | Reconhecer o quadrado | `forma-quadrado` `geometria` | EI02TS02, EI03ET01 |
| 8 | O triângulo | Reconhecer o triângulo | `forma-triangulo` `geometria` | EI02TS02, EI03ET01 |
| 9 | Encaixa direitinho | Encaixar formas em silhuetas correspondentes (motor fino + correspondência) | `encaixe` `coordenacao-motora` `correspondencia` | EI02CG05, EI03ET05 |
| 10 | Repete comigo | Completar padrões simples ABAB (vermelho, azul, vermelho, ?) | `padrao` `sequencia` `ABAB` | EI03ET01, EI03ET05 |

**Sequência sugerida**: S1-S4 (cores básicas em série) → S5 (transformação) → S6-S8 (formas em série) → S9 (motor + correspondência) → S10 (padrão como síntese).

**Repetição espaçada**: cores de S1-S4 voltam em todos os átomos de S6-S10 (formas coloridas). S9 e S10 retomam classificação do Eixo 2 (S6 Igual e diferente).

---

## 8. Eixo 4 — Afetos (8 sessões)

| # | Sessão | Objetivo de aprendizagem | Conceitos | BNCC |
|---|---|---|---|---|
| 1 | Eu fico feliz | Reconhecer expressão facial de alegria; nomear "feliz" | `emocao-feliz` `expressao-facial` | EI02EO01, EI03EO04 |
| 2 | Eu fico triste | Reconhecer expressão de tristeza; nomear "triste" | `emocao-triste` `expressao-facial` | EI02EO01, EI03EO04 |
| 3 | Eu fico bravo | Reconhecer expressão de raiva; nomear "bravo" | `emocao-bravo` `expressao-facial` | EI02EO01, EI03EO04 |
| 4 | O que me deixa feliz? | Associar situações cotidianas à alegria; vocabulário expressivo | `emocao-feliz` `vocabulario-afetivo` | EI03EO04, EI03EF01 |
| 5 | Quando alguém está triste | Reconhecer tristeza no outro; introduzir empatia básica | `empatia` `emocao-triste` | EI02EO02, EI03EO03 |
| 6 | Respira devagar | Aprender técnica de respiração lenta como autorregulação | `autorregulacao` `respiracao` | EI02CG02, EI03EO02 |
| 7 | Posso pedir ajuda | Reconhecer que pedir ajuda é uma ação positiva; verbalizar pedido | `pedir-ajuda` `comunicacao` | EI02EO03, EI03EO04 |
| 8 | Eu sou eu | Construir imagem positiva de si: nome, características, preferências | `identidade` `autoestima` | EI02EO05, EI03EO06 |

**Sequência sugerida**: S1-S3 nomeiam emoções → S4-S5 expandem (causa, no outro) → S6 introduz regulação → S7 amplia para ação social → S8 fecha com identidade.

**Repetição espaçada**: emoções de S1-S3 reaparecem em todas as sessões seguintes.

**Cuidado especial**: este eixo tem mais peso emocional. Narração precisa ser especialmente calorosa. Toda situação negativa (tristeza, raiva) deve ser apresentada como temporária e válida ("é normal ficar bravo às vezes"). Nunca patologizar.

---

## 9. Mapeamento BNCC consolidado

Códigos BNCC trabalhados no Mundo dos Curiosos:

### Crianças bem pequenas (EI02 — 1a7m a 3a11m)
- `EI02EF02` — Identificar e criar diferentes sons (Eixo 1)
- `EI02EF09` — Manusear materiais impressos (Eixo 1, S6-S10)
- `EI02ET01` — Explorar características do ambiente (Eixo 1, S2)
- `EI02ET03` — Compartilhar objetos e espaços (transversal)
- `EI02ET04` — Identificar relações espaciais e temporais (Eixo 2, S4-S5)
- `EI02ET05` — Classificar objetos (Eixo 2 S6, Eixo 3 S9)
- `EI02ET06` — Utilizar conceitos básicos de tempo (Eixo 3 S5)
- `EI02ET07` — Contar oralmente objetos (Eixo 2, S1-S2, S7, S10)
- `EI02ET08` — Registrar com números a quantidade (Eixo 2, S3, S8-S9)
- `EI02TS02` — Utilizar materiais variados (Eixo 3, transversal)
- `EI02EO01` — Demonstrar atitude de cuidado (Eixo 4, S1-S3)
- `EI02EO02` — Demonstrar imagem positiva de si (Eixo 4, S5)
- `EI02EO03` — Comunicar suas necessidades (Eixo 4, S7)
- `EI02EO05` — Perceber preferências (Eixo 4, S8)
- `EI02CG02` — Deslocar seu corpo no espaço (Eixo 4, S6)
- `EI02CG05` — Desenvolver habilidades manuais (Eixo 1 S1, Eixo 3 S9)

### Crianças pequenas (EI03 — 4a a 5a11m, início aplicável)
- `EI03EF01` — Expressar ideias, desejos e sentimentos (Eixo 1 S6-S10, Eixo 4 S4)
- `EI03EF09` — Levantar hipóteses sobre gêneros textuais (Eixo 1, S4-S10)
- `EI03ET01` — Estabelecer relações entre objetos (Eixo 3, S6-S8, S10)
- `EI03ET04` — Registrar observações (Eixo 2, S4-S5)
- `EI03ET05` — Classificar objetos e figuras (Eixo 3, S9-S10)
- `EI03ET07` — Relacionar números à sua função (Eixo 2, S1-S2, S7, S10)
- `EI03ET08` — Expressar medidas (Eixo 2, S3, S8-S9)
- `EI03TS02` — Expressar-se livremente (Eixo 3, transversal)
- `EI03EO02` — Agir de maneira independente (Eixo 4, S6)
- `EI03EO03` — Ampliar relações interpessoais (Eixo 4, S5)
- `EI03EO04` — Comunicar-se com colegas e adultos (Eixo 4, S1-S5, S7)
- `EI03EO06` — Manifestar interesse e respeito por diferentes culturas (Eixo 4, S8)

**Cobertura total**: 20 códigos BNCC trabalhados. Cobertura completa dos 5 campos de experiência da Educação Infantil. Material defensável institucionalmente para parceria com escolas.

---

## 10. Ordem de execução sugerida no produto

A criança não é forçada a seguir ordem — eixos são paralelos. Mas o "personagem-guia" sugere uma ordem na home:

```
Dia típico (sugestão da home):
  1. Eixo de entrada da semana (rotação semanal automática)
  2. Próxima sessão do eixo mais "atrasado" da criança
  3. Sessão livre (criança escolhe)
```

Eixos rotacionam como "destaque da semana":
- Semana 1: Sons e Letras
- Semana 2: Contar e Comparar
- Semana 3: Formas e Cores
- Semana 4: Afetos
- (cicla)

Isso garante exposição balanceada sem forçar progressão linear.

---

## 11. Volume de produção (Camada 2 — próximos)

Para implementação, cada sessão precisa ser detalhada em 4 átomos (`listen`, `imitate`, `play`, `celebrate`). Volume total da Camada 2:

| Eixo | Sessões | Átomos |
|---|---|---|
| Sons e Letras | 10 | 40 |
| Contar e Comparar | 10 | 40 |
| Formas e Cores | 10 | 40 |
| Afetos | 8 | 32 |
| **Total** | **38** | **152** |

Cada átomo na Camada 2 inclui:
- Roteiro de narração (script falado, ~30-90s)
- Mecânica de jogo (specs Phaser ou tipo de mídia)
- Lista de assets necessários (áudios a gravar, sprites a criar)
- Critério de sucesso (`success_criteria` para a tabela `atoms`)
- Conceitos taggeados (referência cruzada com `atom_concepts`)
- Variações de retry (para suportar repetição saudável)

**Tempo estimado de produção da Camada 2**: 4 documentos (um por eixo), aprofundamento focado e detalhado.

---

## 12. Anti-patterns específicos desta faixa

Adicionais aos anti-patterns gerais do SPEC:

- 🚫 Letras consoantes no MVP da faixa (não tem base fonológica suficiente aos 3-4)
- 🚫 Soma e subtração (mesmo "1+1=2") — só contagem e comparação
- 🚫 Leitura de palavras escritas como única instrução
- 🚫 Atividades cooperativas entre crianças (egocentrismo cognitivo)
- 🚫 Narrativa com personagem na terceira pessoa como protagonista
- 🚫 Timer visível ou contagem regressiva
- 🚫 "Você errou" — qualquer variante; substituir por "vamos tentar de novo juntos"
- 🚫 Emoções complexas (frustração, inveja, vergonha) — só feliz, triste, bravo
- 🚫 Conceito de "amanhã" ou "ontem" — só "agora" e "depois"

---

## 13. Decisões abertas

Itens para alinhar antes da Camada 2:

1. **Identidade do personagem-guia**: nome, espécie, design. Sugestão de PM: animal pequeno e curioso (esquilo, raposinha) — combina com o tema "Curiosos".
2. **Vozes**: quantas vozes pré-renderizadas? Recomendo 2 opções (uma masculina, uma feminina) que o pai escolhe no onboarding. Casting profissional, não voluntário.
3. **Trilha sonora ambiente**: ter ou não música de fundo? Recomendação pedagógica: silêncio é melhor que música constante para essa faixa (música distrai atenção). Som ambiente curto só em momentos específicos.
4. **Repetição de sessão**: limite ou ilimitado? Sugiro ilimitado com leve variação a cada repetição (ordem dos átomos pode alternar). Painel do pai vê "X vezes" como dado, não como problema.
5. **Recompensa concreta**: o que a criança "ganha"? Sugestão: cada sessão concluída traz um "bichinho" para a casa virtual. Mesma mecânica de Exploradores, mas itens diferentes (mais filhotes, menos heróis).

---

## 14. Próximos passos

1. **Validar este currículo macro** com a equipe (PM + pedagogo + designer)
2. **Resolver decisões abertas** da seção 13
3. **Camada 2 — escolher eixo prioritário** para detalhamento: recomendo **Eixo 1 (Sons e Letras)** primeiro, por ser a porta de entrada e o eixo com maior peso de produção de áudio
4. **Em paralelo**: começar casting de vozes e design do personagem-guia

---

*Fim do currículo macro. Camadas 2-5 detalharão átomos por eixo individualmente.*

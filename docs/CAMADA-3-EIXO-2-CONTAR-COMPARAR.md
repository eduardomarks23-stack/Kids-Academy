# Camada 3 — Eixo 2: Contar e Comparar (3-4 anos)

> Detalhamento de átomos do Eixo `Contar e Comparar` do Mundo dos Curiosos.
>
> **Status**: especificação de produção. Pronto para virar seed de banco + briefing de gravação + tickets de dev Phaser.
> **Volume**: 10 sessões × 4 átomos = 40 átomos.
> **Última atualização**: maio/2026

---

## 0. Premissas confirmadas

Mantidas integralmente do Eixo 1 (ver `CAMADA-2-EIXO-1-SONS-LETRAS.md`, seção 0). Diferenças específicas deste eixo:

### Protagonismo
- **Garuzinho lidera o ensino** neste Eixo de maneira mais explícita. Border collie é cão de raciocínio — "ele pensa, conta, organiza". Lolinha continua celebrando e amplificando energia, mas é o Garuzinho quem aciona o apito antes de "explicar" cada conceito numérico.
- A cor dominante de fundo deste eixo puxa levemente para azul-claro (vs coral do Eixo 1), reforçando a identidade.

### Conteúdo
- **NÃO trabalha**: soma, subtração, registro escrito de números (algarismos como código)
- **Trabalha**: contagem oral, correspondência um-a-um, subitizing (reconhecimento perceptual até 3 elementos), comparação de grandezas físicas e numéricas

---

## 1. Convenções desta camada

Idênticas às do Eixo 1 (notação `[GARUZINHO]/[LOLINHA]`, hit area 80px, drag com snap generoso, critério permissivo, padrão de 4 átomos por sessão). Ver Camada 2 do Eixo 1 para detalhes.

---

## 2. Sessão 1 — Um, dois, três

**Objetivo**: contar oralmente até três com correspondência a objetos visuais.
**Conceitos**: `contagem-oral-3`, `correspondencia-1-1`.
**BNCC**: EI02ET07, EI03ET07.
**Duração total**: ~3min 30s.

### Átomo 2.1.1 — Os três patinhos
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `contagem-oral-3`, `correspondencia-1-1`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO] [AÇÃO: Garuzinho aciona o apito]
[GARUZINHO]: Olha quem chegou pra brincar com a gente!
[AÇÃO: um patinho amarelo entra]
[GARUZINHO, apontando]: UM patinho!
[PAUSA 1s]
[AÇÃO: segundo patinho entra]
[LOLINHA, surpresa]: Dois!
[GARUZINHO]: DOIS patinhos!
[PAUSA 1s]
[AÇÃO: terceiro patinho entra]
[LOLINHA, eufórica]: TRÊS!
[GARUZINHO]: TRÊS patinhos!
[PAUSA 1s]
[GARUZINHO, contando junto apontando]: UM... DOIS... TRÊS!
[LOLINHA, eco]: UM, DOIS, TRÊS!
[PAUSA 1.5s]
[LOLINHA]: Quer contar também?
```

**Mecânica**: vídeo linear. Patinhos entram um por vez com pausa entre eles. Cada patinho recebe um número visual flutuante (1, 2, 3) ao entrar, mas o foco auditivo é a contagem oral.

**Assets**:
- `audio/eixo2/s1-a1-intro.mp3` (50s)
- `video/eixo2/s1-a1.mp4`
- 3 sprites de patinho amarelo (mesmo design, posições diferentes)
- Números flutuantes 1, 2, 3 em font display

**Retry**:
1. Variação A — patinhos amarelos (padrão)
2. Variação B — pintinhos
3. Variação C — coelhinhos

---

### Átomo 2.1.2 — Conta os patinhos
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `contagem-oral-3`, `correspondencia-1-1`
- **Critério**: tocar nos 3 patinhos (ordem não importa)

**Roteiro:**
```
[GARUZINHO]: Agora você conta!
[LOLINHA]: Toca em cada patinho!
[PAUSA 1s]
[Ao tocar primeiro]: [GARUZINHO, junto]: UM!
[Ao tocar segundo]: [LOLINHA]: DOIS!
[Ao tocar terceiro]: [GARUZINHO, eco]: TRÊS! [LOLINHA]: TODOS!
[Após 5s sem toque]: [GARUZINHO, suave]: Toca neles. Eles estão esperando.
```

**Mecânica**:
- 3 patinhos parados na tela, espaçados (cada um ~120px)
- Toque em cada um: patinho pula + número aparece sobre ele + voz fala o número
- Ordem livre (criança pode tocar em qualquer ordem)
- Após tocar nos 3: todos pulam juntos celebrando

**Assets**:
- Sprites patinhos com animação de pulo
- Números 1, 2, 3 grandes (font display) aparecendo sobre cada patinho
- `audio/eixo2/s1-a2-counts.mp3` (Garu + Lola contando alternadamente)

**Retry**:
1. Variação A — patinhos lado a lado
2. Variação B — patinhos espalhados em diagonal
3. Variação C — pintinhos amarelos

---

### Átomo 2.1.3 — Conta o que aparece
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `contagem-oral-3`, `subitizing`
- **Critério**: ≥3 grupos contados

**Roteiro:**
```
[LOLINHA, animada]: Olha! Aparecem coisas novas!
[GARUZINHO]: Toca pra contar!
[Ao tocar grupo de 1]: [GARUZINHO]: UM!
[Ao tocar grupo de 2]: [GARUZINHO]: UM, DOIS!
[Ao tocar grupo de 3]: [GARUZINHO]: UM, DOIS, TRÊS!
[Lolinha celebra cada contagem]
```

**Mecânica**:
- Tela limpa, fundo azul-claro
- A cada tap em botão "Próximo!", aparece um grupo diferente de objetos: 1 maçã, 2 bolinhas, 3 estrelinhas, 1 flor, 2 carrinhos, 3 corações, etc.
- Quando criança toca em qualquer item do grupo, a voz conta TODO o grupo (não só o item)
- Mínimo 5 grupos diferentes

**Assets**:
- 5-8 conjuntos de objetos colecionáveis simples (maçã, bolinha, estrela, flor, carrinho, coração, peixinho, balão)
- Animação de "aparecer" para cada grupo
- `audio/eixo2/s1-a3-counts.mp3`

**Retry**: 2 ordens diferentes de aparição.

---

### Átomo 2.1.4 — Você conta até três!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Trio Patinho` (3 patinhos amarelos amiguinhos juntos)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ CONTOU ATÉ TRÊS!
[GARUZINHO]: Um... dois... três. Você conseguiu.
[AÇÃO: 3 patinhos aparecem juntos]
[LOLINHA]: O TRIO PATINHO quer ir pra sua casinha!
```

---

## 3. Sessão 2 — Vamos contar mais

**Objetivo**: contar oralmente até cinco.
**Conceitos**: `contagem-oral-5`.
**BNCC**: EI02ET07, EI03ET07.

### Átomo 2.2.1 — Os dedinhos da mão
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `contagem-oral-5`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha que descoberta!
[AÇÃO: mão amiguinha aparece com 5 dedos visíveis, fechada em punho]
[LOLINHA]: Uma MÃO!
[GARUZINHO]: Vamos contar os dedinhos?
[AÇÃO: dedo abre, número 1 aparece]
[GARUZINHO]: UM dedinho.
[PAUSA 0.5s]
[AÇÃO: segundo dedo abre, número 2]
[LOLINHA]: DOIS!
[Continua até 5, alternando vozes]
[Ao chegar em 5]: [LOLINHA, eufórica]: CINCO DEDINHOS!
[PAUSA 1s]
[GARUZINHO, recapitulando]: Um, dois, três, quatro, cinco!
[LOLINHA]: Vamos contar juntos?
```

**Mecânica**: vídeo linear. Mão estilizada (carinha amigável, "Mãozinha do 5") abre dedos um por vez com número flutuante.

**Assets**:
- Sprite "Mãozinha do 5" (mão antropomórfica simpática)
- Números 1, 2, 3, 4, 5 grandes
- `audio/eixo2/s2-a1-intro.mp3`

**Retry**: variação B com dedinhos diferentes ordem; variação C com a outra mão (espelho).

---

### Átomo 2.2.2 — Abre os dedinhos
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `contagem-oral-5`
- **Critério**: tocar nos 5 dedinhos

**Mecânica**:
- Mãozinha do 5 com punho fechado na tela
- Criança toca em cada dedinho (ainda fechado); dedo abre, número aparece, voz conta
- Hit area 90px por dedo (gerosa)
- Ao abrir todos: Mãozinha do 5 acena celebrando

**Roteiro chave:**
```
[GARUZINHO]: Abre os dedinhos contando!
[A cada toque]: número correspondente + voz
[Ao final]: [LOLINHA]: CINCO!
```

**Retry**: 2 mãos diferentes (direita, esquerda) — mecânica idêntica.

---

### Átomo 2.2.3 — Conta as estrelinhas
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `contagem-oral-5`, `correspondencia-1-1`
- **Critério**: ≥3 grupos contados (grupos de 1 a 5)

**Roteiro:**
```
[LOLINHA]: Olha o céu cheio de estrelas!
[GARUZINHO]: Quantas estrelinhas tem em cada nuvem?
[A cada nuvem tocada]: contagem do grupo (1 a 5 estrelas)
[Lolinha celebra]
```

**Mecânica**:
- Cenário noturno com 5 nuvens
- Cada nuvem tem 1-5 estrelinhas pequenas brilhando
- Toque na nuvem: estrelas pulam uma por vez sendo contadas pela voz
- Mínimo 3 nuvens diferentes contadas

**Assets**: cenário noturno, sprites de nuvem, estrelinhas brilhantes, áudios de contagem.

**Retry**: 2 variações — nuvens diurnas com gotinhas / nuvens noturnas com estrelas.

---

### Átomo 2.2.4 — Você conta até cinco!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Mãozinha do 5` (mão antropomórfica com 5 dedos abertos)

---

## 4. Sessão 3 — Muito e pouco

**Objetivo**: comparar conjuntos grandes vs pequenos por percepção visual (sem contar).
**Conceitos**: `comparacao-quantidade`, `muito-pouco`.
**BNCC**: EI02ET08, EI03ET08.

### Átomo 2.3.1 — Olha o formigueiro!
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `muito-pouco`, `subitizing`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha quem mora aqui no chão!
[AÇÃO: pequeno grupo de 3 formigas caminha]
[GARUZINHO]: Aqui tem POUCAS formiguinhas.
[PAUSA 1.5s]
[AÇÃO: cenário expande mostrando formigueiro com 30+ formigas]
[LOLINHA, espantada]: UAUUU!
[GARUZINHO]: E aqui tem MUITAS!
[PAUSA 1s]
[AÇÃO: visão alterna entre os dois grupos com destaque]
[GARUZINHO]: POUCAS... [aponta] e MUITAS [aponta].
[LOLINHA]: Que diferença!
[PAUSA 1s]
[LOLINHA]: Vamos brincar de achar MUITO e POUCO?
```

**Mecânica**: vídeo linear com transição visual mostrando contraste claro entre os dois grupos. Não conta — só percepção visual.

**Assets**: cenário de jardim, sprites de formiguinhas (mesma forma, escala pequena), animação de "câmera abrir" para revelar formigueiro maior, áudios.

**Retry**: B com peixes (poucos no aquário pequeno, muitos no oceano); C com bolinhas (poucas na cestinha, muitas no balde).

---

### Átomo 2.3.2 — Toca onde tem MUITO
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `comparacao-quantidade`, `muito-pouco`
- **Critério**: ≥3 de 4 acertos

**Roteiro:**
```
[GARUZINHO]: Eu vou mostrar dois grupos.
[LOLINHA]: Toca onde tem MUITO!
[A cada acerto]: [LOLINHA]: ISSO! Esse tem mais!
[A cada erro]: [GARUZINHO, suave]: Olha de novo. Qual tem mais?
```

**Mecânica**:
- 4 rodadas de comparação binária
- Cada rodada: 2 conjuntos lado a lado (esquerda e direita)
- Conjuntos: 2 vs 8 maçãs, 3 vs 15 bolinhas, 1 vs 10 estrelas, 4 vs 20 corações
- Toque no lado correto: grupo brilha + voz celebra
- Toque no errado: grupo errado faz "shake" suave; pede de novo

**Assets**: 4 pares de conjuntos diferentes (maçãs/bolinhas/estrelas/corações), `audio/eixo2/s3-a2.mp3`.

**Retry**: 2 variações com diferentes objetos.

---

### Átomo 2.3.3 — Toca onde tem POUCO
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `comparacao-quantidade`, `muito-pouco`
- **Critério**: ≥3 de 4 acertos

**Mecânica**: inverte 2.3.2 — agora criança toca no grupo COM POUCO. Mesma estrutura.

**Roteiro chave:**
```
[LOLINHA]: Agora é diferente!
[GARUZINHO]: Toca onde tem POUCO!
```

---

### Átomo 2.3.4 — Você sabe muito de muito e pouco!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Formiguinha Muito` (formiga grande sorrindo, com bandeira "MUITO")

---

## 5. Sessão 4 — Grande e pequeno

**Objetivo**: comparar tamanhos físicos de objetos.
**Conceitos**: `comparacao-tamanho`, `grande-pequeno`.
**BNCC**: EI02ET04, EI03ET04.

### Átomo 2.4.1 — Elefante e ratinho
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `grande-pequeno`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha duas surpresas!
[AÇÃO: elefante grande entra balançando a tromba]
[LOLINHA]: UM ELEFANTE!
[GARUZINHO]: O elefante é GRANDE.
[PAUSA 1s]
[AÇÃO: ratinho minúsculo passa perto dos pés do elefante]
[LOLINHA, sussurrando]: E um ratinho!
[GARUZINHO]: O ratinho é PEQUENO.
[PAUSA 1s]
[AÇÃO: elefante e ratinho lado a lado, contraste visual claro]
[GARUZINHO]: GRANDE... [aponta elefante] e PEQUENO [aponta ratinho].
[LOLINHA]: São amigos do mesmo jeitinho!
[PAUSA 1.5s]
[GARUZINHO]: Vem brincar de achar grande e pequeno.
```

**Nota narrativa**: enfatizar que diferença de tamanho não afeta amizade — reforça valor pedagógico paralelo de aceitação da diferença.

**Assets**: sprites elefante grande + ratinho pequeno, cenário de campo, áudios.

**Retry**: B com girafa/tartaruga; C com pai/filho (figuras antropomórficas).

---

### Átomo 2.4.2 — Toca no GRANDE
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Critério**: ≥3 de 4 acertos

**Mecânica**: 4 pares de objetos lado a lado (mesma forma, escalas diferentes). Criança toca no GRANDE. Sequência: bola grande/pequena, casa grande/pequena, balão grande/pequeno, árvore grande/pequena.

---

### Átomo 2.4.3 — Encontra o pequeno
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Critério**: ≥3 itens pequenos identificados

**Mecânica**:
- Cenário de "casa de bonecas" com móveis em duas escalas
- Criança toca nos objetos pequenos espalhados (cadeirinha pequena, mesinha pequena, lampadinha pequena entre seus equivalentes maiores)
- Cada toque correto: objeto pequeno pula
- Toque em objeto grande: ele "balança" e Garuzinho diz "esse é grande, procura o pequeno"

**Assets**: cenário casa de bonecas, ~8 pares de móveis em duas escalas.

---

### Átomo 2.4.4 — Você sabe grande e pequeno!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Dupla Grande-Pequeno` (elefante e ratinho lado a lado)

---

## 6. Sessão 5 — Cheio e vazio

**Objetivo**: reconhecer estados de recipientes (cheio vs vazio); introdução à conservação de volume.
**Conceitos**: `estado-volume`, `cheio-vazio`.
**BNCC**: EI02ET04, EI03ET04.

### Átomo 2.5.1 — A garrafinha cheia e a garrafinha vazia
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `cheio-vazio`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha duas garrafinhas!
[AÇÃO: 2 garrafinhas com carinhas aparecem — uma com água até a tampa, outra sem nada]
[LOLINHA, apontando]: Essa tá cheia de água!
[GARUZINHO]: Sim! Essa garrafinha está CHEIA.
[PAUSA 1s]
[GARUZINHO, apontando outra]: E essa garrafinha está VAZIA. Não tem nada dentro.
[LOLINHA]: Vazia?
[GARUZINHO]: VAZIA. Sem nada.
[PAUSA 1s]
[AÇÃO: garrafinha cheia "bebe" sua água e fica vazia]
[LOLINHA, surpresa]: Olha! Agora ela tá vazia também!
[GARUZINHO]: Quando tira a água, fica VAZIA.
[PAUSA 1.5s]
[LOLINHA]: Vem brincar de cheio e vazio!
```

**Assets**: sprites garrafinhas antropomórficas, animação de líquido descendo, áudios.

**Retry**: B com copos; C com baldinhos.

---

### Átomo 2.5.2 — Toca na CHEIA
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Critério**: ≥3 de 4 acertos

**Mecânica**: 4 pares de recipientes (garrafinha, copinho, baldinho, vaso). Criança toca na cheia.

---

### Átomo 2.5.3 — Enche e esvazia
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `cheio-vazio`, `causa-efeito`
- **Critério**: ≥3 interações de encher/esvaziar

**Mecânica**:
- Cenário com "torneira" no topo e "baldinho" no chão
- Tocar na torneira: água sai e baldinho enche
- Tocar no baldinho cheio: água some (vira vazio) com animação suave
- Lolinha celebra cada estado
- Pode repetir várias vezes

**Roteiro chave:**
```
[LOLINHA]: Aperta a torneira!
[AÇÃO: água enche o balde]
[GARUZINHO]: Olha! CHEIO!
[AÇÃO: criança toca no balde]
[GARUZINHO]: Esvaziou! VAZIO!
```

**Assets**: sprite torneira, baldinho com 3 estados (vazio, meio, cheio), animação de água.

**Retry**: 2 cenários — banheiro com banheira / cozinha com copo.

---

### Átomo 2.5.4 — Você é especialista em cheio e vazio!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Garrafinha Cheinha` (garrafa com carinha sorridente e bolinhas representando água)

---

## 7. Sessão 6 — Igual e diferente

**Objetivo**: identificar pares idênticos vs diferentes (cor, forma, tamanho).
**Conceitos**: `classificacao`, `igual-diferente`.
**BNCC**: EI02ET05, EI03ET05.

### Átomo 2.6.1 — Os bichos gêmeos
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `igual-diferente`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha que descoberta!
[AÇÃO: dois sapinhos idênticos entram lado a lado]
[LOLINHA, surpresa]: SÃO IGUAIS!
[GARUZINHO]: Sim. Esses dois sapinhos são IGUAIS.
[PAUSA 1s]
[GARUZINHO]: Mesma cor, mesma carinha, mesmo tamanho.
[PAUSA 1s]
[AÇÃO: um pato entra ao lado dos sapinhos]
[LOLINHA]: Olha! Esse aqui é diferente!
[GARUZINHO]: É DIFERENTE. Não é igual aos sapinhos.
[PAUSA 1s]
[AÇÃO: comparação visual destacada]
[GARUZINHO]: IGUAIS [aponta sapinhos]... e DIFERENTE [aponta pato].
[LOLINHA]: Que legal!
[PAUSA 1.5s]
[GARUZINHO]: Vamos achar IGUAIS e DIFERENTES.
```

**Assets**: sprites sapinhos idênticos + pato (claramente diferente), áudios.

**Retry**: B com dois gatinhos + um cachorrinho; C com duas bolinhas vermelhas + uma azul.

---

### Átomo 2.6.2 — Acha o par igual
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `igual-diferente`, `correspondencia`
- **Critério**: ≥3 de 4 pares

**Roteiro:**
```
[GARUZINHO]: Olha as figurinhas!
[LOLINHA]: Acha QUAL É IGUAL à figura grande!
[AÇÃO: figura-âncora à esquerda + 3 figuras à direita]
[Ao tocar o igual]: [LOLINHA]: ACHOU! São IGUAIS!
[Ao tocar diferente]: [GARUZINHO]: Hmm, essa é diferente. Olha de novo.
```

**Mecânica**:
- 4 rodadas
- Cada rodada: 1 figura-âncora grande à esquerda + 3 figuras-opção à direita (1 igual, 2 diferentes)
- Toque na figura igual: ambas brilham; passa pra próxima rodada
- Toque na diferente: figura balança suavemente, pede novamente
- Figuras: maçã vermelha, bolinha azul, estrela amarela, coração rosa

**Retry**: 3 conjuntos de figuras diferentes.

---

### Átomo 2.6.3 — Acha o diferente
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `igual-diferente`
- **Critério**: ≥3 acertos

**Roteiro chave:**
```
[LOLINHA]: Agora é o contrário!
[GARUZINHO]: Olha o grupo. Qual é DIFERENTE dos outros?
[A cada acerto]: [LOLINHA]: ÓTIMO! Era diferente mesmo!
```

**Mecânica**:
- Tela com grupo de 4 figuras (3 iguais + 1 diferente)
- Criança toca na diferente
- Após acerto: a diferente brilha e "vai pra fora"; novo grupo aparece
- Mínimo 4 grupos diferentes (3 sapos verdes + 1 sapo azul; 3 estrelas amarelas + 1 vermelha; etc)

**Retry**: 2 conjuntos completos de 4 grupos cada.

---

### Átomo 2.6.4 — Você sabe igual e diferente!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Bichos Gêmeos` (par de sapinhos verdes idênticos)

---

## 8. Sessão 7 — Conta comigo

**Objetivo**: contar até cinco apontando para cada elemento (correspondência um-a-um rigorosa).
**Conceitos**: `correspondencia-1-1`, `contagem-precisa`.
**BNCC**: EI02ET07, EI03ET07.

### Átomo 2.7.1 — Aponta e conta
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `correspondencia-1-1`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Hoje a gente vai contar diferente.
[LOLINHA]: Diferente como?
[GARUZINHO]: Apontando!
[PAUSA 1s]
[AÇÃO: 5 maçãs aparecem em fila]
[GARUZINHO, apontando devagar]: UM... [aponta a primeira]
[PAUSA 0.7s]
[GARUZINHO]: DOIS... [aponta a segunda]
[PAUSA 0.7s]
[GARUZINHO]: TRÊS... [terceira]
[PAUSA 0.7s]
[GARUZINHO]: QUATRO... [quarta]
[PAUSA 0.7s]
[GARUZINHO]: CINCO! [quinta]
[LOLINHA, eufórica]: VOCÊ APONTOU E CONTOU!
[PAUSA 1s]
[GARUZINHO]: Cada coisa, um número.
[LOLINHA]: Vamos fazer junto?
```

**Nota pedagógica**: este é o conceito-chave da matemática inicial — correspondência um-a-um. Pausas longas entre cada número são essenciais. Garuzinho aponta com a pata visivelmente.

**Assets**: cenário com 5 maçãs em fila, animação da pata do Garuzinho apontando cada uma, números aparecendo sobre cada maçã ao serem contadas.

**Retry**: B com 5 patinhos em fila; C com 5 estrelas.

---

### Átomo 2.7.2 — Aponta junto comigo
- **Tipo**: `imitate` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `correspondencia-1-1`
- **Critério**: tocar nos 5 elementos em sequência

**Roteiro:**
```
[GARUZINHO]: Toca em cada um, devagarinho.
[Ao tocar 1º]: [GARUZINHO]: UM!
[Ao tocar 2º]: [GARUZINHO]: DOIS!
[Ao tocar 3º]: [GARUZINHO]: TRÊS!
[Ao tocar 4º]: [GARUZINHO]: QUATRO!
[Ao tocar 5º]: [GARUZINHO]: CINCO! [LOLINHA]: CONTOU TUDO!
[Se tocar fora de ordem]: [GARUZINHO, gentil]: Vai um por vez, do começo. [Sistema destaca o próximo da fila]
```

**Mecânica**:
- 5 elementos em fila horizontal (espaçados em 100px)
- Sistema espera toque sequencial da esquerda para direita
- Toque correto: elemento sobe um pouco, número aparece, voz conta
- Toque em elemento fora da sequência: elemento balança suavemente, o "próximo correto" pulsa indicando

**Assets**: 5 sprites idênticos (maçãs ou similar), animação de sobe-conta, números 1-5.

**Retry**: 3 tipos de objetos diferentes.

---

### Átomo 2.7.3 — Conta o que tem na cestinha
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `correspondencia-1-1`, `contagem-precisa`
- **Critério**: ≥3 cestinhas contadas

**Roteiro:**
```
[LOLINHA]: Olha as cestinhas do Garuzinho!
[GARUZINHO]: Quantas frutinhas tem em cada uma?
[A cada cestinha tocada]: contagem visual + numérica
[Lolinha celebra contagens]
```

**Mecânica**:
- 5 cestinhas espalhadas na tela
- Cada cestinha contém 1 a 5 frutinhas (visíveis)
- Toque na cestinha: zoom suave + sistema aponta uma fruta por vez contando em voz alta
- Ao final da contagem: número total aparece sobre a cesta + Lolinha celebra
- Criança pode tocar todas as cestinhas em qualquer ordem

**Assets**: 5 cestinhas SVG com frutinhas variadas (maçã, banana, uva, pera, laranja), animação de zoom, áudios.

**Retry**: 2 variações — frutinhas / brinquedinhos / bichinhos.

---

### Átomo 2.7.4 — Você é um contador!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Dedinho Contador` (dedo antropomórfico amigável apontando)

---

## 9. Sessão 8 — Onde tem mais?

**Objetivo**: identificar conjunto com maior quantidade (até 5 elementos).
**Conceitos**: `comparacao-quantidade`, `mais`.
**BNCC**: EI02ET08, EI03ET08.

### Átomo 2.8.1 — A cestinha com mais
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `comparacao-quantidade`, `mais`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha duas cestinhas!
[AÇÃO: cestinha A com 2 maçãs aparece à esquerda]
[GARUZINHO]: Uma tem DUAS maçãs.
[PAUSA 1s]
[AÇÃO: cestinha B com 4 maçãs aparece à direita]
[LOLINHA]: A outra tem... [conta junto] UM, DOIS, TRÊS, QUATRO!
[GARUZINHO]: QUATRO maçãs!
[PAUSA 1s]
[GARUZINHO, destacando a cesta B]: Essa tem MAIS maçãs.
[LOLINHA]: MAIS!
[PAUSA 1s]
[AÇÃO: cesta B brilha levemente]
[GARUZINHO]: Onde tem MAIS coisas, essa é a que tem MAIS.
[PAUSA 1.5s]
[LOLINHA]: Vem brincar de achar MAIS!
```

**Assets**: cenário neutro, 2 cestinhas com maçãs em quantidades distintas, animação de contagem da maior, brilho destaque.

**Retry**: B com bolinhas e baldinhos; C com estrelinhas e nuvens.

---

### Átomo 2.8.2 — Onde tem MAIS?
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Critério**: ≥3 de 4 acertos

**Mecânica**:
- 4 rodadas de comparação binária com quantidades pequenas (1 a 5)
- Cada rodada: 2 conjuntos com diferença clara (ex: 2 vs 5, 1 vs 4, 3 vs 5, 2 vs 4)
- Criança toca no lado com MAIS
- Acerto: lado correto brilha + voz celebra. Erro: balança suave + pede de novo.

**Roteiro chave:**
```
[GARUZINHO]: Onde tem MAIS?
[Ao acerto]: [LOLINHA]: ISSO! Tem MAIS aqui!
```

**Retry**: 2 variações com objetos diferentes.

---

### Átomo 2.8.3 — Enche a cestinha do MAIS
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Critério**: ≥3 arrastos para a cesta correta

**Mecânica**:
- Duas cestinhas grandes na tela: uma rotulada "MAIS" e outra "MENOS" (com ícones visuais grandes, não só texto)
- 6-8 itens (bolinhas, frutas) caem do topo um por vez
- Criança arrasta cada item para a cestinha que ela acha que deve receber
- Quando termina, sistema compara: cestinha MAIS deveria ter mais itens
- Se a criança colocou corretamente: Lolinha festeja. Se desbalanceou: Garuzinho ensina "olha, aqui tem mais" sem punir

**Roteiro chave:**
```
[LOLINHA]: Arrasta os itens!
[GARUZINHO]: A cestinha MAIS deve ficar mais cheia!
[Ao final]: [GARUZINHO]: Olha! Essa cestinha ficou com MAIS! [se errado, ele organiza visualmente]
```

**Assets**: 2 cestinhas grandes com ícones, 8 itens arrastáveis, animação de queda, snap para cestinhas.

**Retry**: 2 conjuntos diferentes de itens.

---

### Átomo 2.8.4 — Você acha o MAIS!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Cestinha Cheia` (cesta antropomórfica sorrindo, transbordando de frutinhas)

---

## 10. Sessão 9 — Onde tem menos?

**Objetivo**: identificar conjunto com menor quantidade.
**Conceitos**: `comparacao-quantidade`, `menos`.
**BNCC**: EI02ET08, EI03ET08.

### Átomo 2.9.1 — A cestinha com menos
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `menos`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Lembra de MAIS?
[LOLINHA]: Lembro! Onde tem mais coisas!
[GARUZINHO]: Hoje a gente vê o contrário. MENOS.
[PAUSA 1s]
[AÇÃO: cestinha A com 5 bolinhas + cestinha B com 2 bolinhas]
[GARUZINHO, apontando A]: Aqui tem cinco.
[GARUZINHO, apontando B]: Aqui tem só duas.
[PAUSA 1s]
[GARUZINHO]: A cestinha B tem MENOS bolinhas.
[LOLINHA]: MENOS! Tem pouquinhas.
[PAUSA 1s]
[AÇÃO: cesta B brilha levemente]
[GARUZINHO]: Onde tem MENOS coisas, essa é a que tem MENOS.
[PAUSA 1.5s]
[LOLINHA]: Vem achar MENOS com a gente!
```

**Nota pedagógica**: trabalhar `menos` separadamente de `mais` permite consolidar cada conceito antes de comparar os dois. Crianças de 3-4 tendem a confundir.

**Assets**: cenário neutro, 2 cestinhas, áudios.

**Retry**: B com baldinhos; C com pratos.

---

### Átomo 2.9.2 — Onde tem MENOS?
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Critério**: ≥3 de 4 acertos

**Mecânica**: invertido de 2.8.2 — criança toca no lado com MENOS.

**Roteiro chave:**
```
[GARUZINHO]: Onde tem MENOS?
[Ao acerto]: [LOLINHA]: AÍ TEM MENOS!
```

---

### Átomo 2.9.3 — Esvazia a cestinha
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Critério**: ≥3 arrastos para fora

**Mecânica**:
- 1 cestinha cheia (6 itens visíveis)
- Tela vazia em volta
- Criança arrasta itens da cestinha para fora (cada arrasto: item "voa" pra fora animadamente)
- A cada item removido: voz conta quantos sobraram ("Agora tem 5... 4... 3...")
- Ao ficar com menos de 3: Lolinha celebra "AGORA TEM POUCO!"
- Pode esvaziar até ficar com 0 (cestinha "VAZIA" — conecta com Sessão 5)

**Roteiro chave:**
```
[LOLINHA]: Olha a cesta cheia!
[GARUZINHO]: Vamos tirar pra ficar com MENOS?
[A cada item removido]: contagem do que sobrou
[Ao ficar com 1]: [LOLINHA]: Quase vazia!
```

**Assets**: 1 cestinha cheia, 6 itens arrastáveis, animação de "voar pra fora", áudios contadores.

**Retry**: 2 variações com itens diferentes.

---

### Átomo 2.9.4 — Você acha o MENOS!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Cestinha Quase Vazia` (cesta antropomórfica com expressão tranquila, 1-2 frutinhas dentro)

---

## 11. Sessão 10 — Conta até dez (e revisão do eixo)

**Objetivo**: recitar sequência oral de 1 a 10 + conquistar título de "Contador Estrela".
**Conceitos**: `contagem-oral-10`, `sequencia`, `contar-comparar-completo`.

### Átomo 2.10.1 — A escada dos números
- **Tipo**: `listen` · **Duração**: 60s · **Engine**: `video`
- **Conceitos**: `contagem-oral-10`, `sequencia`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Hoje vamos contar BEM longe!
[LOLINHA]: Longe quanto?
[GARUZINHO]: Até DEZ!
[LOLINHA, eufórica]: DEZ!
[PAUSA 1s]
[AÇÃO: escada começa a se construir, degrau por degrau com números]
[GARUZINHO, contando devagar]: UM... DOIS... TRÊS... QUATRO... CINCO...
[PAUSA 0.5s]
[LOLINHA, junto]: SEIS... SETE... OITO...
[GARUZINHO]: NOVE... DEZ!
[AÇÃO: escada completa, 10 degraus visíveis, cada um com seu número]
[LOLINHA]: UAUUU! Que escada GRANDE!
[PAUSA 1s]
[GARUZINHO, recapitulando, ritmado]: Um, dois, três, quatro, cinco, seis, sete, oito, nove, DEZ!
[PAUSA 1.5s]
[LOLINHA]: Vem subir a escada com a gente!
```

**Nota pedagógica**: aos 3-4 anos a meta é RECITAR a sequência (memorização do nome dos números 1-10), não necessariamente associar a quantidades. A "escada" é metáfora visual ascendente que reforça ordem.

**Assets**: escada estilizada com 10 degraus, animação de construção sequencial, números grandes em cada degrau, áudios.

**Retry**: B com elevador subindo (mesmo conceito, visual diferente); C com balão subindo.

---

### Átomo 2.10.2 — Sobe a escada
- **Tipo**: `imitate` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `contagem-oral-10`, `sequencia`
- **Critério**: tocar nos 10 degraus em sequência

**Mecânica**:
- Escada completa com 10 degraus, Garuzinho e Lolinha na base
- Criança toca em cada degrau, da base ao topo
- A cada toque: Garuzinho ou Lolinha pula um degrau acima, voz conta
- Sistema só aceita toque no próximo degrau correto (sequência rigorosa)
- Se tocar errado: degrau certo pisca indicando o caminho

**Roteiro chave:**
```
[GARUZINHO]: Toca um degrau de cada vez!
[A cada toque correto]: número correspondente + personagem sobe
[Ao chegar em 10]: [LOLINHA]: CHEGAMOS NO DEZ!
```

**Retry**: 2 variações — escada azul / escada coral.

---

### Átomo 2.10.3 — Bichinhos contadores
- **Tipo**: `play` · **Duração**: 90s · **Engine**: `phaser`
- **Conceitos**: `contagem-oral-10`, `correspondencia-1-1`
- **Critério**: ≥5 grupos contados (de tamanhos variados até 10)

**Mecânica**:
- Cenário tipo "festa dos bichinhos" — 10 grupos diferentes pela tela
- Cada grupo: 1 a 10 bichinhos do mesmo tipo (3 patinhos, 7 coelhinhos, 10 borboletas, etc)
- Toque no grupo: zoom + contagem oral pausada de cada elemento ("UM... DOIS... TRÊS... NOVE!")
- Lolinha pula em cada grupo contado
- Cenário "livre" — criança escolhe ordem de exploração

**Assets**: cenário festa, ~10 grupos de bichinhos variados, áudios de contagem para cada quantidade até 10.

**Retry**: 2 cenários — festa de dia / festa à noite com luzinhas.

---

### Átomo 2.10.4 — VOCÊ CONTA ATÉ DEZ!
- **Tipo**: `celebrate` (especial — final do Eixo) · **Duração**: 60s
- **Engine**: `phaser`
- Colecionável: `Numerinho 10` + **conquista especial** `Contador Estrela`

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA, super eufórica]: VOCÊ FEZ! VOCÊ CONTA ATÉ DEZ!
[GARUZINHO, emocionado]: Um, dois, três, quatro, cinco, seis, sete, oito, nove, DEZ.
[PAUSA 1s]
[AÇÃO: 10 colecionáveis do eixo aparecem juntos formando um arco — Trio Patinho, Mãozinha do 5, Formiguinha Muito, Dupla Grande-Pequeno, Garrafinha Cheinha, Bichos Gêmeos, Dedinho Contador, Cestinha Cheia, Cestinha Quase Vazia, Numerinho 10]
[LOLINHA]: OLHA TODOS OS AMIGOS QUE VOCÊ FEZ!
[PAUSA 1s]
[AÇÃO: medalha "Contador Estrela" aparece]
[GARUZINHO]: Você ganhou a medalha de CONTADOR ESTRELA.
[LOLINHA, sussurrando emocionada]: Você sabe contar até DEZ.
[PAUSA 1s]
[GARUZINHO]: O que a gente faz agora?
[LOLINHA]: Mais números? Ou ver as CORES E FORMAS?
[AÇÃO: 2 botões grandes — "MAIS NÚMEROS" e "VER FORMAS"]
```

**Mecânica**:
- Cena de celebração maior (60s, não 30s)
- 10 colecionáveis do eixo aparecem em arco
- Medalha "Contador Estrela" entregue (item especial na casinha virtual)
- 2 botões grandes:
  - "MAIS NÚMEROS" → volta para mapa do Eixo
  - "VER FORMAS" → navega para Eixo 3 (Formas e Cores) — cross-eixo

**Assets**:
- Animação especial de celebração
- Revisão visual dos 10 colecionáveis
- Sprite medalha "Contador Estrela"
- `audio/eixo2/s10-a4-final-celebration.mp3` (60s)

**Retry**: animação ligeiramente variada em retornos. Medalha entregue uma vez só; em retornos, fala alternativa "Você ainda é Contador Estrela!".

---

## 12. Lista consolidada de colecionáveis do Eixo 2

| Sessão | Colecionável | Aparência |
|---|---|---|
| 1 | Trio Patinho | 3 patinhos amarelos juntinhos |
| 2 | Mãozinha do 5 | Mão antropomórfica com 5 dedos abertos |
| 3 | Formiguinha Muito | Formiga sorridente com bandeira "MUITO" |
| 4 | Dupla Grande-Pequeno | Elefante e ratinho lado a lado |
| 5 | Garrafinha Cheinha | Garrafa com carinha + bolinhas de água |
| 6 | Bichos Gêmeos | 2 sapinhos verdes idênticos |
| 7 | Dedinho Contador | Dedo antropomórfico apontando, amigável |
| 8 | Cestinha Cheia | Cesta sorridente transbordando frutinhas |
| 9 | Cestinha Quase Vazia | Cesta tranquila com 1-2 frutinhas |
| 10 | Numerinho 10 + **medalha "Contador Estrela"** | Número 10 estilizado com carinha + medalha especial |

**Casinha virtual atualizada**: ao final do Eixo 2, criança tem 20 colecionáveis no total (10 do Eixo 1 + 10 do Eixo 2) + 2 medalhas (Conhecedor das Vogais + Contador Estrela).

---

## 13. Lista consolidada de assets para produção — Eixo 2

### Áudios a gravar

| Arquivo | Duração | Conteúdo |
|---|---|---|
| `audio/eixo2/s1-a1-intro.mp3` | 50s | Os três patinhos |
| `audio/eixo2/s1-a2-counts.mp3` | 60s | Conta os patinhos |
| `audio/eixo2/s1-a3-counts.mp3` | 70s | Conta o que aparece |
| `audio/eixo2/s1-a4-celebration.mp3` | 30s | Celebração + Trio Patinho |
| `audio/eixo2/s2-a1-intro.mp3` | 55s | Dedinhos da mão |
| `audio/eixo2/s2-a2-prompts.mp3` | 60s | Abre os dedinhos |
| `audio/eixo2/s2-a3-narration.mp3` | 80s | Conta as estrelinhas |
| `audio/eixo2/s2-a4-celebration.mp3` | 30s | Celebração + Mãozinha do 5 |
| `audio/eixo2/s3-a*` | ~3min 30s | Muito e pouco (4 átomos) |
| `audio/eixo2/s4-a*` | ~3min 30s | Grande e pequeno (4 átomos) |
| `audio/eixo2/s5-a*` | ~3min 30s | Cheio e vazio (4 átomos) |
| `audio/eixo2/s6-a*` | ~3min 30s | Igual e diferente (4 átomos) |
| `audio/eixo2/s7-a*` | ~3min 50s | Conta comigo (4 átomos) |
| `audio/eixo2/s8-a*` | ~3min 50s | Onde tem mais? (4 átomos) |
| `audio/eixo2/s9-a*` | ~3min 50s | Onde tem menos? (4 átomos) |
| `audio/eixo2/s10-a1-3` | ~3min 50s | Conta até dez (3 primeiros) |
| `audio/eixo2/s10-a4-final-celebration.mp3` | 60s | **Celebração final + medalha** |

**Total estimado**: ~40 minutos de narração + 50% para retries → **~60 minutos de gravação efetiva**.

### SFX adicionais (além dos compartilhados com Eixo 1)
- Contagem com "ding" suave a cada número
- Som de "construção de escada" (degrau aparecendo, sem barulho metálico)
- Som de "água enchendo" e "água sumindo" (silenciosos)
- Pop suave de "objeto voando pra fora" (Sessão 9)
- Fanfarra especial de Contador Estrela (60s)

### Sprites adicionais

**Cenários (8 cenários únicos do Eixo 2):**
- Cenário neutro azul-claro (default)
- Jardim com formigas
- Campo com elefante e ratinho
- Casa de bonecas com móveis em duas escalas
- Cenário banheiro/cozinha (cheio e vazio)
- Cenário cestinhas
- Escada dos números
- Festa dos bichinhos (S10)

**Objetos numéricos:**
- Patinhos amarelos (3 idênticos)
- Mãozinha antropomórfica
- Formigas (poucas + muitas — sprite tilling)
- Elefante grande
- Ratinho pequeno
- Garrafinhas + copinhos + baldinhos antropomórficos
- Cestinhas em estados (cheia, meio, vazia)
- Sapinhos idênticos + pato (diferente)
- Maçãs/bolinhas/frutinhas arrastáveis
- Números 1-10 grandes (font display) em paleta azul
- Escada com 10 degraus
- Grupos de bichinhos (1-10) para S10.A3

**Colecionáveis (10):**
- Trio Patinho, Mãozinha do 5, Formiguinha Muito, Dupla Grande-Pequeno, Garrafinha Cheinha, Bichos Gêmeos, Dedinho Contador, Cestinha Cheia, Cestinha Quase Vazia, Numerinho 10
- Medalha "Contador Estrela"

---

## 14. Schema de seed para Supabase — Eixo 2

Mesmo padrão do Eixo 1 (ver Camada 2 seção 14). Diferenças específicas:

```sql
-- conceitos novos a inserir
insert into concepts (axis_id, slug, display_name, bncc_code) values
  ('<axis_id_eixo2>', 'contagem-oral-3', 'Contagem oral até 3', 'EI02ET07'),
  ('<axis_id_eixo2>', 'contagem-oral-5', 'Contagem oral até 5', 'EI02ET07'),
  ('<axis_id_eixo2>', 'contagem-oral-10', 'Contagem oral até 10', 'EI02ET07'),
  ('<axis_id_eixo2>', 'correspondencia-1-1', 'Correspondência um-a-um', 'EI02ET07'),
  ('<axis_id_eixo2>', 'subitizing', 'Subitizing (percepção de quantidade)', 'EI02ET08'),
  ('<axis_id_eixo2>', 'comparacao-quantidade', 'Comparação de quantidades', 'EI02ET08'),
  ('<axis_id_eixo2>', 'comparacao-tamanho', 'Comparação de tamanho', 'EI02ET04'),
  ('<axis_id_eixo2>', 'cheio-vazio', 'Estados cheio e vazio', 'EI02ET04'),
  ('<axis_id_eixo2>', 'igual-diferente', 'Classificação igual/diferente', 'EI02ET05'),
  ('<axis_id_eixo2>', 'mais', 'Conceito de mais', 'EI02ET08'),
  ('<axis_id_eixo2>', 'menos', 'Conceito de menos', 'EI02ET08'),
  ('<axis_id_eixo2>', 'sequencia', 'Sequência numérica', 'EI03ET07');
```

Para átomos Phaser, manter `engine: 'phaser'`, `config.leadCharacter` alternando entre `'garuzinho'` (este eixo) e `'lolinha'` (Eixo 1). Sistema de transição cross-eixo (botão "VER FORMAS" no S10.A4) implementado em route handler:

```ts
// app/api/progress/complete-axis/route.ts
// Quando criança completa último átomo do eixo, registrar medalha + sugerir próximo eixo
```

---

## 15. Próximos passos

### Imediato
1. **Validação pedagógica** deste Eixo (foco em: ordem de introdução dos conceitos, tempo de pausa nas contagens, palavras-âncora regionais)
2. **Casting de vozes** se ainda pendente (mesmas vozes do Eixo 1)
3. **Briefing de design** para os 10 colecionáveis + cenários

### Próximas camadas
- **Camada 4** — Eixo 3 (Formas e Cores) — 10 sessões com foco em coordenação motora fina (encaixe) e padrões. Equilíbrio entre Garuzinho e Lolinha como líderes.
- **Camada 5** — Eixo 4 (Afetos) — 8 sessões (não 10 — eixo mais leve), foco em vocabulário emocional e autorregulação. Ambos personagens modelam emoções igualmente.

### Decisões pendentes para Eixo 3
- Confirmar paleta exata de cores trabalhadas no Eixo 3 (vermelho, azul, amarelo, verde — talvez incluir laranja e roxo como mistura?)
- Mecânica de encaixe com Phaser exige snap muito generoso (raio 80px) para 3-4 anos motoramente

---

*Fim da Camada 3 do Eixo 2. 40 átomos especificados.*


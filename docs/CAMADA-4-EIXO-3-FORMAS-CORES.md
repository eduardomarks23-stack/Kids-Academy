# Camada 4 — Eixo 3: Formas e Cores (3-4 anos)

> Detalhamento de átomos do Eixo `Formas e Cores` do Mundo dos Curiosos.
>
> **Status**: especificação de produção. Pronto para virar seed de banco + briefing de gravação + tickets de dev Phaser.
> **Volume**: 10 sessões × 4 átomos = 40 átomos.
> **Última atualização**: maio/2026

---

## 0. Premissas confirmadas

Mantidas integralmente do Eixo 1 (ver `CAMADA-2-EIXO-1-SONS-LETRAS.md`, seção 0). Diferenças específicas deste eixo:

### Protagonismo
- **Equilíbrio Garuzinho/Lolinha**. Nem ela lidera (Eixo 1 — Sons) nem ele lidera (Eixo 2 — Números). Cores e formas são exploração visual conjunta. Em cores, Lolinha apresenta com entusiasmo. Em formas, Garuzinho apresenta com calma. Em encaixe e padrões, alternam.
- Fundo do eixo puxa para tons mistos suaves (não uma cor dominante única — afinal, é o eixo das cores).

### Mecânica nova crítica: encaixe
- Sessão 9 (`Encaixa direitinho`) introduz drag-to-silhouette com snap muito generoso (raio **80px**, não os 60px padrão). Motor fino aos 3-4 anos é impreciso — punir tentativa frustra demais.
- Item arrastado para silhueta certa: snap suave + animação de "acomodar"
- Item arrastado para silhueta errada: retorna saltitando educadamente, sem som de erro

### Conteúdo
- **Cores trabalhadas**: vermelho, azul, amarelo, verde (primárias + verde como composição percebida); laranja aparece em S5 (mistura)
- **Formas**: círculo, quadrado, triângulo (não retângulo nem losango — formas adicionais ficam para Mundo dos Exploradores)
- **Padrão ABAB**: introdução à seriação

---

## 1. Convenções desta camada

Idênticas às do Eixo 1 (notação `[GARUZINHO]/[LOLINHA]`, hit area 80px, critério permissivo, padrão de 4 átomos por sessão). Diferença: snap de drag é 80px (não 60).

---

## 2. Sessão 1 — A cor vermelha

**Objetivo**: reconhecer e nomear a cor vermelha.
**Conceitos**: `cor-vermelho`, `reconhecimento-visual`.
**BNCC**: EI02TS02, EI03TS02.
**Duração total**: ~3min 30s.

### Átomo 3.1.1 — Tudo o que é vermelho
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `cor-vermelho`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO] [AÇÃO: Garuzinho aciona o apito]
[LOLINHA, animada]: Olha o laço do Garuzinho!
[AÇÃO: laço vermelho do Garuzinho destaca-se com brilho]
[LOLINHA]: É VERMELHO!
[GARUZINHO]: Sim! VERMELHO.
[PAUSA 1s]
[AÇÃO: tomate aparece]
[GARUZINHO]: O tomate é VERMELHO.
[PAUSA 1s]
[AÇÃO: maçã aparece]
[LOLINHA]: A maçã também é VERMELHA!
[PAUSA 1s]
[AÇÃO: coração aparece]
[GARUZINHO]: E o coração... VERMELHO!
[PAUSA 1s]
[AÇÃO: 3 itens vermelhos pulsam juntos]
[LOLINHA]: VERMELHO, VERMELHO, VERMELHO!
[PAUSA 1.5s]
[GARUZINHO]: Vem achar VERMELHO!
```

**Mecânica**: vídeo linear. Cada objeto vermelho aparece com leve brilho/destaque da cor. Laço do Garuzinho como gancho narrativo (item permanente vira primeira referência).

**Assets**:
- Sprites: tomate, maçã, coração (todos vermelhos)
- `audio/eixo3/s1-a1-intro.mp3`

**Retry**: B com morango/cereja/pimentão; C com botão/sinaleiro/joaninha.

---

### Átomo 3.1.2 — Toca no vermelho
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `cor-vermelho`, `discriminacao-visual`
- **Critério**: ≥3 acertos em 5 tentativas

**Roteiro:**
```
[LOLINHA]: Olha quantas coisas!
[GARUZINHO]: Toca SÓ nas vermelhas!
[A cada vermelho]: [LOLINHA]: ISSO! Esse é vermelho!
[A cada outra cor]: [GARUZINHO, suave]: Essa não é vermelha. Vê de novo.
[Ao tocar 3+ vermelhos]: [LOLINHA]: Você achou os vermelhos!
```

**Mecânica**:
- Tela com 6 objetos coloridos (3 vermelhos + 3 distratores em azul/amarelo/verde)
- Objetos: maçã (vermelha), folha (verde), coração (vermelho), peixe (azul), tomate (vermelho), sol (amarelo)
- Toque em vermelho: pulsa + brilha. Toque em outra cor: balança suave, sem punição.
- Após 3 vermelhos tocados: celebração antecipada

**Assets**: 6 sprites de objetos comuns nas 4 cores, áudios.

**Retry**: 3 layouts diferentes com mesmos objetos.

---

### Átomo 3.1.3 — O mundo vermelho
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `cor-vermelho`, `aplicacao`
- **Critério**: ≥4 toques em objetos vermelhos

**Roteiro:**
```
[LOLINHA]: Olha esse cenário!
[GARUZINHO]: Toca em tudo que for VERMELHO!
[A cada acerto]: nome do objeto + voz
[A cada não-vermelho]: voz nomeia "Esse é AZUL/AMARELO/VERDE" sem punir
```

**Mecânica**:
- Cenário "pomar" cheio de elementos coloridos
- Itens vermelhos: maçãs nas árvores, joaninhas no chão, balão vermelho, telhado da casinha
- Itens distratores: folhas verdes, céu azul, flores amarelas, tronco marrom
- Toque correto: item pula + voz nomeia
- Toque errado: voz nomeia a cor real do item sem dizer "errado"

**Assets**: cenário pomar completo, ~15 elementos com cores distintas.

**Retry**: 2 cenários — pomar e parquinho.

---

### Átomo 3.1.4 — Você achou o vermelho!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Tomatinho Vermelho` (tomate antropomórfico sorridente)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ ACHOU O VERMELHO!
[GARUZINHO]: Vermelho como meu laço.
[AÇÃO: Tomatinho aparece pulando]
[LOLINHA]: O TOMATINHO VERMELHO quer ir pra sua casinha!
```

---

## 3. Sessão 2 — A cor azul

**Objetivo**: reconhecer e nomear a cor azul.
**Conceitos**: `cor-azul`.

### Átomo 3.2.1 — Tudo o que é azul
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha pra cima!
[AÇÃO: céu azul aparece com nuvens]
[LOLINHA]: O CÉU!
[GARUZINHO]: O céu é AZUL.
[PAUSA 1s]
[AÇÃO: mar aparece embaixo]
[LOLINHA]: O MAR também é AZUL!
[PAUSA 1s]
[AÇÃO: peixinho azul nada]
[GARUZINHO]: E esse peixinho! AZUL.
[PAUSA 1.5s]
[GARUZINHO]: AZUL é a cor do céu e do mar.
[PAUSA 1s]
[LOLINHA]: Vem achar tudo AZUL!
```

**Assets**: cenário céu+mar, peixinho azul, áudios.

**Retry**: B com balão/blusa/bolinha; C com baleia/borboleta/bola.

---

### Átomo 3.2.2 — Toca no azul
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Critério**: ≥3 acertos em 5 tentativas

**Mecânica**: idêntica a 3.1.2 com objetos azuis (peixinho, balão, gota d'água) entre distratores em outras cores.

---

### Átomo 3.2.3 — O mar azul
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Critério**: ≥4 acertos

**Mecânica**: cenário marítimo (mar, céu, areia). Itens azuis: peixes, baleia, ondas, balde. Distratores: caranguejo (vermelho), conchas (variadas), areia (amarela), coral (verde).

---

### Átomo 3.2.4 — Você achou o azul!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Peixinho Azul` (peixe azul amigável com bolhinhas)

---

## 4. Sessão 3 — A cor amarela

**Objetivo**: reconhecer e nomear a cor amarela.
**Conceitos**: `cor-amarelo`.

### Átomo 3.3.1 — Tudo o que é amarelo
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`

**Roteiro:**
```
[APITO]
[LOLINHA, eufórica]: Olha o SOL!
[AÇÃO: sol aparece brilhando]
[LOLINHA]: O SOL é AMARELO!
[GARUZINHO]: Bem amarelo.
[PAUSA 1s]
[AÇÃO: banana aparece]
[GARUZINHO]: A banana também é AMARELA.
[PAUSA 1s]
[AÇÃO: pintinho passa]
[LOLINHA]: O PINTINHO é AMARELO!
[PAUSA 1s]
[GARUZINHO]: AMARELO é a cor do sol.
[PAUSA 1s]
[LOLINHA]: Acha tudo amarelo!
```

---

### Átomo 3.3.2 — Toca no amarelo
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- Estrutura paralela. Objetos-amarelo: sol, banana, pintinho, flor.

---

### Átomo 3.3.3 — Um dia de sol
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- Cenário: campo ensolarado. Amarelos: sol, girassóis, abelhas, ônibus escolar amarelo passando.

---

### Átomo 3.3.4 — Você achou o amarelo!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Solzinho Amarelo` (sol antropomórfico sorridente com raios)

---

## 5. Sessão 4 — A cor verde

**Objetivo**: reconhecer e nomear a cor verde.
**Conceitos**: `cor-verde`.

### Átomo 3.4.1 — Tudo o que é verde
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha pra baixo!
[AÇÃO: grama verde se estende]
[LOLINHA]: A GRAMA!
[GARUZINHO]: A grama é VERDE.
[PAUSA 1s]
[AÇÃO: folhas das árvores destacam-se]
[GARUZINHO]: As folhas são VERDES.
[PAUSA 1s]
[AÇÃO: sapinho aparece]
[LOLINHA]: O SAPINHO também é VERDE!
[PAUSA 1.5s]
[GARUZINHO]: VERDE é a cor da natureza.
[LOLINHA]: Vem achar verde!
```

---

### Átomos 3.4.2, 3.4.3, 3.4.4
Estrutura paralela. Objetos-verde: folha, sapinho, brócolis, jacaré.
Colecionável: `Folha Verde` (folha antropomórfica com carinha).

---

## 6. Sessão 5 — Misturando cores

**Objetivo**: perceber que cores se combinam para formar novas.
**Conceitos**: `mistura-cores`, `transformacao`.
**BNCC**: EI02TS02, EI02ET06.

### Átomo 3.5.1 — Mágica das cores
- **Tipo**: `listen` · **Duração**: 60s · **Engine**: `video`
- **Conceitos**: `mistura-cores`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO, misterioso]: Olha que mágica!
[AÇÃO: bolha vermelha aparece]
[GARUZINHO]: VERMELHO...
[AÇÃO: bolha amarela aparece ao lado]
[LOLINHA]: AMARELO!
[AÇÃO: bolhas se aproximam e se fundem em laranja]
[GARUZINHO]: VIROU LARANJA!
[LOLINHA, surpresa]: UAUUU!
[PAUSA 1s]
[AÇÃO: nova mistura — azul + amarelo = verde]
[GARUZINHO]: AZUL... mais AMARELO...
[LOLINHA]: VIRA VERDE!
[PAUSA 1.5s]
[GARUZINHO]: Cores se misturam e fazem cores novas!
[LOLINHA]: Vem misturar com a gente!
```

**Mecânica**: vídeo com animação de bolhas coloridas se fundindo. Foco em 2 misturas: vermelho+amarelo=laranja e azul+amarelo=verde.

**Assets**: animação de bolhas se fundindo, áudios.

**Retry**: B com vermelho+azul=roxo; C com revisão das 2 misturas em ordem diferente.

---

### Átomo 3.5.2 — Mistura você
- **Tipo**: `imitate` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `mistura-cores`
- **Critério**: ≥2 misturas completadas

**Mecânica**:
- Tela com 2 "potinhos" de tinta vermelha e amarela
- Pincel grande arrastável
- Criança toca no vermelho (pincel fica vermelho), depois toca em área de mistura (vai pra paleta)
- Toca no amarelo (pincel pega amarelo), volta pra paleta → mistura vira LARANJA
- Repete pra azul+amarelo=verde
- Lolinha celebra cada mistura

**Roteiro chave:**
```
[LOLINHA]: Toca no vermelho!
[Ao tocar]: [GARUZINHO]: Pincel vermelho!
[LOLINHA]: Agora pinta!
[Após arrastar pra paleta]: [GARUZINHO]: Agora amarelo!
[Quando mistura]: [LOLINHA]: VIROU LARANJA!
```

**Assets**: paleta + 4 potinhos de tinta, pincel arrastável, áudios.

**Retry**: 2 conjuntos de misturas diferentes.

---

### Átomo 3.5.3 — Pinta o arco-íris
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `mistura-cores`, `criacao`
- **Critério**: ≥3 misturas exploradas

**Mecânica**:
- Tela com arco-íris incompleto (faixas em branco)
- 6 potinhos: vermelho, azul, amarelo, laranja, verde, roxo
- Criança toca em potinho → cor vai pra faixa do arco-íris correspondente
- Algumas faixas só ficam corretas com mistura: laranja (vermelho+amarelo), verde (azul+amarelo), roxo (vermelho+azul)
- Quando arco-íris está completo: celebração visual

**Assets**: arco-íris animado, potinhos de tinta, áudios encorajadores.

**Retry**: 2 cenários — arco-íris simples / arco-íris duplo.

---

### Átomo 3.5.4 — Você é mágico das cores!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Arco-Íris` (arco-íris pequeno com carinha)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ É MÁGICO!
[GARUZINHO]: Você sabe misturar cores!
[AÇÃO: Arco-Íris aparece flutuando]
[LOLINHA]: O ARCO-ÍRIS quer ir com você!
```

---

## 7. Sessão 6 — O círculo

**Objetivo**: reconhecer a forma do círculo em objetos.
**Conceitos**: `forma-circulo`, `geometria`.
**BNCC**: EI02TS02, EI03ET01.

### Átomo 3.6.1 — O círculo é redondinho
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `forma-circulo`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha essa forma...
[AÇÃO: círculo gigante desce, colorido]
[LOLINHA]: É REDONDO!
[GARUZINHO]: É um CÍRCULO.
[PAUSA 1s]
[GARUZINHO]: Não tem ponta, não tem canto. É só uma curva.
[PAUSA 1s]
[AÇÃO: bola aparece]
[GARUZINHO]: A BOLA é um círculo.
[PAUSA 1s]
[AÇÃO: roda de carrinho]
[LOLINHA]: A RODA também!
[PAUSA 1s]
[AÇÃO: lua aparece]
[GARUZINHO]: E a LUA. Tudo CÍRCULO.
[PAUSA 1.5s]
[LOLINHA]: Vem achar CÍRCULO!
```

**Assets**: círculo gigante animado descendo, sprites bola/roda/lua, áudios.

**Retry**: B com pizza/CD/moeda; C com sol/prato/relógio.

---

### Átomo 3.6.2 — Toca no círculo
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Critério**: ≥3 acertos em 5

**Mecânica**:
- Tela com 6 formas espalhadas (3 círculos + 3 distratores: quadrado, triângulo, estrela)
- Criança toca SÓ nos círculos
- Acerto: brilha. Erro: balança suave.

---

### Átomo 3.6.3 — Caça-círculo
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Critério**: ≥4 círculos identificados

**Mecânica**: cenário de cozinha ou sala — toque em objetos circulares (prato, relógio, moedas, pizza, roda de cadeirinha). Distratores: livro (retangular), almofada (quadrada), etc.

---

### Átomo 3.6.4 — Você achou o círculo!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Círculo Bola` (círculo amarelo antropomórfico)

---

## 8. Sessão 7 — O quadrado

**Objetivo**: reconhecer o quadrado.
**Conceitos**: `forma-quadrado`, `geometria`.

### Átomo 3.7.1 — O quadrado tem quatro lados
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha outra forma!
[AÇÃO: quadrado gigante desce]
[LOLINHA]: Tem CANTOS!
[GARUZINHO]: É um QUADRADO. Tem quatro cantinhos iguais.
[PAUSA 1s]
[AÇÃO: linhas destacam os 4 lados]
[GARUZINHO, contando]: Um... dois... três... quatro lados!
[LOLINHA]: Iguaizinhos!
[PAUSA 1s]
[AÇÃO: janela aparece]
[GARUZINHO]: A JANELA é quadrada.
[AÇÃO: caixa aparece]
[LOLINHA]: A CAIXINHA!
[AÇÃO: dado aparece]
[GARUZINHO]: O DADO. Todo lado é quadrado.
[PAUSA 1.5s]
[LOLINHA]: Acha tudo QUADRADO!
```

**Assets**: quadrado gigante, sprites janela/caixinha/dado, áudios.

---

### Átomos 3.7.2, 3.7.3, 3.7.4
Estrutura paralela à S6.
- 3.7.2: tocar nos quadrados entre formas variadas
- 3.7.3: cenário casa — janelas, caixas, blocos
- 3.7.4: Colecionável `Quadradinho Janela` (quadrado azul com carinha vendo pra fora como janela)

---

## 9. Sessão 8 — O triângulo

**Objetivo**: reconhecer o triângulo.
**Conceitos**: `forma-triangulo`, `geometria`.

### Átomo 3.8.1 — O triângulo é pontudo
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`

**Roteiro:**
```
[APITO]
[LOLINHA]: Olha essa forma!
[AÇÃO: triângulo gigante desce, ponta pra cima]
[LOLINHA]: Tem UMA ponta pra cima!
[GARUZINHO]: É um TRIÂNGULO. Tem três lados.
[PAUSA 1s]
[AÇÃO: linhas destacam os 3 lados]
[GARUZINHO, contando]: Um... dois... três!
[PAUSA 1s]
[AÇÃO: telhado aparece]
[GARUZINHO]: O TELHADO da casa é triangular.
[AÇÃO: fatia de pizza]
[LOLINHA]: A FATIA DE PIZZA!
[AÇÃO: chapéu de festa]
[GARUZINHO]: O CHAPÉU pontudo!
[PAUSA 1.5s]
[LOLINHA]: Acha TRIÂNGULO!
```

---

### Átomos 3.8.2, 3.8.3, 3.8.4
Estrutura paralela.
- 3.8.2: tocar nos triângulos entre formas mistas
- 3.8.3: cenário festa — chapéus pontudos, fatias de bolo, sinalizadores triangulares
- 3.8.4: Colecionável `Trianguinho Telhado` (triângulo vermelho com carinha tipo casinha)

---

## 10. Sessão 9 — Encaixa direitinho

**Objetivo**: encaixar formas em silhuetas correspondentes (motor fino + correspondência).
**Conceitos**: `encaixe`, `coordenacao-motora`, `correspondencia`.
**BNCC**: EI02CG05, EI03ET05.

### Átomo 3.9.1 — A caixinha de formas
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `encaixe`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha essa caixinha mágica!
[AÇÃO: caixa com 3 buracos aparece — círculo, quadrado, triângulo]
[LOLINHA]: Tem buracos!
[GARUZINHO]: Cada buraco quer uma forma certinha.
[PAUSA 1s]
[AÇÃO: forma círculo aparece, "voa" até buraco do círculo, encaixa]
[GARUZINHO]: O círculo vai no buraco redondo.
[PAUSA 1s]
[AÇÃO: quadrado encaixa no quadrado]
[LOLINHA]: O quadrado no quadrado!
[PAUSA 1s]
[AÇÃO: triângulo encaixa no triângulo]
[GARUZINHO]: O triângulo no triangular!
[PAUSA 1.5s]
[LOLINHA]: Vem encaixar com a gente!
```

**Assets**: caixinha de formas estilizada, 3 formas animadas com encaixe.

**Retry**: B com cores em vez de só formas (círculo vermelho, quadrado azul, triângulo amarelo); C com mais formas (4 buracos).

---

### Átomo 3.9.2 — Encaixa as formas
- **Tipo**: `imitate` · **Duração**: 90s · **Engine**: `phaser`
- **Conceitos**: `encaixe`, `coordenacao-motora`
- **Critério**: ≥3 de 3 encaixes (com retries livres)

**Roteiro:**
```
[GARUZINHO]: Arrasta cada forma pro buraco certinho!
[Ao acertar]: [LOLINHA]: ENCAIXOU!
[Ao errar]: [GARUZINHO, gentil]: Tenta outro buraco. [forma volta saltitando]
```

**Mecânica**:
- Caixa de encaixe com 3 buracos (círculo, quadrado, triângulo)
- 3 formas espalhadas embaixo, arrastáveis
- **Snap muito generoso**: raio 80px do buraco-alvo
- Quando forma chega perto do buraco certo: snap suave + "click" + animação de encaixe
- Quando solta longe: volta saltitando para posição inicial
- Quando solta perto de buraco errado: forma "balança" no buraco, volta sem encaixar

**Assets**: caixinha 3D estilizada, 3 formas arrastáveis em cores distintas, animações de encaixe/retorno.

**Retry**: 3 caixinhas — 3 formas / 4 formas (adicionando coração) / 5 formas (adicionando estrela e oval).

---

### Átomo 3.9.3 — Monta a casa
- **Tipo**: `play` · **Duração**: 90s · **Engine**: `phaser`
- **Conceitos**: `encaixe`, `criacao`
- **Critério**: ≥3 peças encaixadas

**Mecânica**:
- Cenário "construção de casa" — silhueta vazia de casa
- Peças soltas: quadrado (corpo), triângulo (telhado), círculo (janela redonda), retângulo pequeno (porta)
- Criança arrasta cada peça para sua silhueta correspondente
- Casa se forma progressivamente
- Quando completa: casa "ganha vida" (luz acende, fumaça da chaminé)

**Assets**: silhueta de casa + 4-5 peças arrastáveis, animação de "casa pronta".

**Retry**: 2 cenários — casa simples / castelo (mais peças).

---

### Átomo 3.9.4 — Você é construtor!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Quebra-Cabecinha` (peças de quebra-cabeça unidas, com carinha)

---

## 11. Sessão 10 — Repete comigo (padrões ABAB)

**Objetivo**: completar padrões simples ABAB.
**Conceitos**: `padrao`, `sequencia`, `ABAB`.
**BNCC**: EI03ET01, EI03ET05.

### Átomo 3.10.1 — Olha o padrão!
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `padrao`, `ABAB`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha que descoberta!
[AÇÃO: sequência aparece — bola vermelha, bola azul, bola vermelha, bola azul]
[LOLINHA]: Vermelho, azul, vermelho, azul!
[GARUZINHO]: É um PADRÃO! Sempre se repete.
[PAUSA 1s]
[AÇÃO: nova sequência — círculo, quadrado, círculo, quadrado]
[GARUZINHO]: Círculo, quadrado, círculo, quadrado.
[LOLINHA]: SE REPETE!
[PAUSA 1s]
[GARUZINHO]: Padrão é quando algo se repete sempre igual.
[PAUSA 1.5s]
[LOLINHA]: Vem completar padrões com a gente!
```

**Nota pedagógica**: padrão ABAB é a primeira forma de pensamento algorítmico/seriação. Aos 3-4 anos, completar padrão simples já é avanço cognitivo significativo.

**Assets**: sequências animadas mostrando repetição clara.

**Retry**: B com tamanhos (grande, pequeno, grande, pequeno); C com sons (palma, estalo, palma, estalo).

---

### Átomo 3.10.2 — Completa o padrão
- **Tipo**: `imitate` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `padrao`, `ABAB`
- **Critério**: ≥3 de 4 padrões completados

**Roteiro:**
```
[GARUZINHO]: Olha o padrão. O que vem depois?
[AÇÃO: padrão visível: vermelho, azul, vermelho, ?]
[Botões com opções aparecem]
[Ao acertar]: [LOLINHA]: ISSO! AZUL!
[Ao errar]: [GARUZINHO]: Hmm, olha de novo. Vermelho, azul, vermelho... o que vem?
```

**Mecânica**:
- Padrão visível no topo (ex: 🔴🔵🔴 ?)
- 2-3 opções embaixo (a correta + 1-2 distratores)
- Criança toca na correta
- 4 padrões diferentes:
  - vermelho/azul ABAB
  - círculo/quadrado ABAB
  - grande/pequeno ABAB
  - sol/lua ABAB

---

### Átomo 3.10.3 — Cria o padrão
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `padrao`, `criacao`
- **Critério**: ≥2 padrões criados (3+ elementos cada)

**Mecânica**:
- Tela com "fileira vazia" e 2 cores/formas disponíveis num "estoque"
- Criança arrasta itens para a fileira na ordem que quiser
- A cada drop: sistema observa se forma padrão
- Quando criança forma ABAB (mínimo 3 elementos consistentes): Lolinha celebra "É UM PADRÃO!"
- Pode trocar conjunto e tentar outro

**Assets**: fileira/calha visível, 2 estoques de itens, sistema de drop, áudios.

**Retry**: 2 conjuntos diferentes (cores / formas).

---

### Átomo 3.10.4 — VOCÊ É MESTRE DAS FORMAS!
- **Tipo**: `celebrate` (especial — final do Eixo) · **Duração**: 60s
- Colecionável: `Padrãozinho Festivo` + **medalha** `Mestre das Formas`

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA, super eufórica]: VOCÊ FEZ TUDO!
[GARUZINHO]: Conhece cores, formas, encaixes e padrões.
[PAUSA 1s]
[AÇÃO: 10 colecionáveis do eixo aparecem formando padrão visual]
[LOLINHA]: TODOS OS AMIGUINHOS COLORIDOS!
[PAUSA 1s]
[AÇÃO: medalha "Mestre das Formas" aparece]
[GARUZINHO]: Você ganhou MESTRE DAS FORMAS.
[LOLINHA]: A gente fez TUDO juntos!
[PAUSA 1s]
[GARUZINHO]: Quer aprender sobre SENTIMENTOS agora?
[AÇÃO: 2 botões — "MAIS FORMAS" e "VER AFETOS"]
```

---

## 12. Lista consolidada de colecionáveis do Eixo 3

| Sessão | Colecionável |
|---|---|
| 1 | Tomatinho Vermelho |
| 2 | Peixinho Azul |
| 3 | Solzinho Amarelo |
| 4 | Folha Verde |
| 5 | Arco-Íris |
| 6 | Círculo Bola |
| 7 | Quadradinho Janela |
| 8 | Trianguinho Telhado |
| 9 | Quebra-Cabecinha |
| 10 | Padrãozinho Festivo + **medalha "Mestre das Formas"** |

**Casinha após Eixo 3**: 30 colecionáveis + 3 medalhas.

---

## 13. Assets do Eixo 3

### Áudios (total estimado: ~40 min gravado, +50% retries = ~60 min)

Mesma estrutura dos eixos anteriores. Foco especial em vozes calorosas para descobertas visuais (cor, forma).

### SFX específicos
- "Click" suave de encaixe (S9)
- "Pop" de mistura de cor (S5)
- Som ascendente de padrão completo (S10)

### Sprites
- **Cenários (10)**: pomar, parquinho, mar+céu, campo ensolarado, floresta, paleta de pintor, arco-íris, cozinha (círculos), casa (quadrados), festa (triângulos), construção, fileira de padrões
- **Formas gigantes**: círculo, quadrado, triângulo (em 4 cores cada)
- **Objetos por cor**:
  - Vermelhos: tomate, maçã, coração, joaninha, balão
  - Azuis: peixe, balão, gota, baleia
  - Amarelos: sol, banana, pintinho, girassol, ônibus
  - Verdes: folha, sapinho, brócolis, jacaré
- **Caixinha de encaixe** (3D estilizada com 3-5 buracos)
- **Peças de casa** (quadrado corpo, triângulo telhado, círculo janela)
- **Colecionáveis (10)** + medalha Mestre das Formas

---

## 14. Schema seed Supabase — Eixo 3

```sql
insert into concepts (axis_id, slug, display_name, bncc_code) values
  ('<axis_id_eixo3>', 'cor-vermelho', 'Cor vermelha', 'EI02TS02'),
  ('<axis_id_eixo3>', 'cor-azul', 'Cor azul', 'EI02TS02'),
  ('<axis_id_eixo3>', 'cor-amarelo', 'Cor amarela', 'EI02TS02'),
  ('<axis_id_eixo3>', 'cor-verde', 'Cor verde', 'EI02TS02'),
  ('<axis_id_eixo3>', 'mistura-cores', 'Mistura de cores', 'EI02TS02'),
  ('<axis_id_eixo3>', 'forma-circulo', 'Forma círculo', 'EI03ET01'),
  ('<axis_id_eixo3>', 'forma-quadrado', 'Forma quadrado', 'EI03ET01'),
  ('<axis_id_eixo3>', 'forma-triangulo', 'Forma triângulo', 'EI03ET01'),
  ('<axis_id_eixo3>', 'encaixe', 'Encaixe e correspondência', 'EI02CG05'),
  ('<axis_id_eixo3>', 'padrao', 'Padrão ABAB', 'EI03ET01');
```

Para átomos de encaixe (3.9.x) e padrão (3.10.x), `config.snapRadius: 80` no Phaser. Importante.

---

## 15. Próximos passos

1. **Validação pedagógica** especialmente para S9 (encaixe) e S10 (padrão) — mecânicas mais complexas
2. **Testes de motor fino com crianças reais** antes de fechar S9. Snap 80px pode precisar ir pra 100px
3. **Próxima camada**: Eixo 4 (Afetos) — 8 sessões, conteúdo socioemocional, ambos personagens modelam emoções

---

*Fim da Camada 4 do Eixo 3. 40 átomos especificados.*


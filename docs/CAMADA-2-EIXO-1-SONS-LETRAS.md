# Camada 2 — Eixo 1: Sons e Letras (3-4 anos)

> Detalhamento de átomos do Eixo `Sons e Letras` do Mundo dos Curiosos.
>
> **Status**: especificação de produção. Pronto para virar seed de banco + briefing de gravação + tickets de dev Phaser.
> **Volume**: 10 sessões × 4 átomos = 40 átomos.
> **Última atualização**: maio/2026

---

## 0. Premissas confirmadas

### Personagens
- **Garuzinho** — border collie filhote, preto e branco, lidera **ensino**. Prosódia calma, afetiva, ritmo lento. Acessório permanente: **laço vermelho** no pescoço. Acessório ativável: **apito dourado** que faz um "piuí" suave (nunca estridente) em momentos de atenção/transição.
- **Lolinha** — golden retriever filhote, creme, lidera **celebração**. Prosódia energética, ritmo rápido, expressiva. Acessório permanente: **coleira rosa com pingente de coração dourado**. O coração brilha sutilmente em momentos afetivos e em conclusões.

### Vozes (gravação humana, não TTS)
- `voice_garu` — masculina, médio-grave, ritmo lento, tom afetivo-acolhedor
- `voice_lola` — feminina, médio-agudo, ritmo rápido, tom energético-celebratório

### Dinâmica narrativa
- Os dois conduzem o produto entre si — não há narradora externa
- Amizade pura, cooperação total, sem rivalidade
- Garuzinho explica e modela; Lolinha reage, celebra e amplia
- No Eixo 1 (especialidade dela, Sons), Lolinha tem leve protagonismo

### Estética sonora
- Silêncio ambiente como padrão
- SFX pontuais apenas em causa-efeito direto
- Apito do Garuzinho é cue de atenção, não decoração

---

## 1. Convenções desta camada

### Notação de roteiro
- `[GARUZINHO]: texto` — fala do Garuzinho (voice_garu)
- `[LOLINHA]: texto` — fala da Lolinha (voice_lola)
- `[SFX: descrição]` — efeito sonoro
- `[PAUSA Xs]` — pausa explícita; sempre presente entre falas para 3-4 anos processarem
- `[AÇÃO: descrição]` — animação ou evento visual sincronizado
- `[APITO]` — som do apito do Garuzinho (piuí suave, ~0.4s)
- `[BRILHO CORAÇÃO]` — pulso luminoso no coração da Lolinha (~1s)

### Estrutura de cada átomo
- `id` no formato `1.S.A` (Eixo.Sessão.Átomo). Ex: `1.1.3` = Eixo 1, Sessão 1, Átomo 3
- `type`, `duration`, `engine`, `concepts`, `success_criteria`
- Roteiro de narração
- Mecânica detalhada
- Lista de assets
- Variações de retry (mínimo 2)

### Critério de sucesso para 3-4 anos
Sempre **permissivo**. A criança "passa" se demonstrar engajamento, não acerto. Erro não bloqueia progressão — apenas adiciona o conceito à `repetition_queue` para reaparecer em sessões futuras.

### Hit area padrão
Todos os alvos tocáveis: mínimo 80px (não os 64px do Mundo dos Exploradores).

### Drag em Phaser
Sempre com snap generoso (raio de 60px). Drag fracassado nunca pune — peça pula de volta animadamente.

### Padrão de distribuição de papéis nos 4 átomos
- **listen**: Garuzinho apresenta, Lolinha reage encantada
- **imitate**: Garuzinho modela o gesto, Lolinha imita junto convidando
- **play**: Lolinha lidera (energia dela é o convite), Garuzinho observa e apoia
- **celebrate**: Lolinha explode em festa, Garuzinho fecha com afeto

---

## 2. Sessão 1 — Sons do meu corpo

**Objetivo**: perceber que o próprio corpo produz sons (palma, estalo de língua, sopro).
**Conceitos**: `som-corpo`, `palma`, `estalo`, `sopro`.
**BNCC**: EI02EF02, EI02CG05.
**Duração total**: ~3min 30s.

### Átomo 1.1.1 — Conheça a Lolinha e o Garuzinho
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `som-corpo`
- **Critério**: ≥80% de duração assistida

**Roteiro:**
```
[AÇÃO: Lolinha aparece pulando, Garuzinho aparece sentado ao lado]
[LOLINHA]: Oi! Eu sou a Lolinha!
[PAUSA 0.5s]
[GARUZINHO]: E eu sou o Garuzinho.
[PAUSA 1s]
[LOLINHA]: Hoje a gente vai brincar com... SONS!
[PAUSA 1s]
[APITO] [AÇÃO: Garuzinho aciona o apito, brilha]
[GARUZINHO]: Mas não é qualquer som. É o som que sai do seu corpo.
[PAUSA 1s]
[AÇÃO: Lolinha faz palma — som claro]
[SFX: palma]
[LOLINHA]: Olha! UMA PALMA!
[PAUSA 1s]
[AÇÃO: Garuzinho estala a língua]
[SFX: estalo]
[GARUZINHO]: Esse é o ESTALO da língua. Tlóc!
[PAUSA 1s]
[AÇÃO: Lolinha sopra, orelhas balançam]
[SFX: sopro suave]
[LOLINHA]: E esse é o SOPRO! Fffff!
[PAUSA 1.5s]
[GARUZINHO]: Vem brincar com a gente?
```

**Mecânica**: vídeo linear. Sem interação além de assistir. Botão de pause grande (100px) no canto inferior direito. Áudio principal pré-renderizado.

**Assets**:
- `audio/s1-a1-intro.mp3` (50s, mix completo Garu + Lola + SFX)
- `video/s1-a1.mp4` ou `video/s1-a1.json` (Lottie)
- Sprites Garuzinho: aceno, estalo, escutando
- Sprites Lolinha: pulando, palma, sopro
- SFX: palma, estalo, sopro, apito

**Retry**:
1. Variação A — ordem padrão (palma → estalo → sopro)
2. Variação B — Garuzinho introduz primeiro, Lolinha demonstra (inverte demonstração)
3. Variação C — adicionam batida de pé como 4º som surpresa

---

### Átomo 1.1.2 — Faz como a gente
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `som-corpo`, `imitacao`
- **Critério**: tocar ≥2 dos 3 botões (não bloqueante)

**Roteiro:**
```
[GARUZINHO]: Agora é a sua vez!
[PAUSA 1s]
[AÇÃO: 3 botões aparecem com pulse]
[LOLINHA]: Toca aqui pra fazer PALMA!
[PAUSA 2s — espera toque do botão palma]
[Se tocar]: [SFX: palma] [LOLINHA]: ISSO!
[Após 3s sem toque]: [GARUZINHO, calmo]: Pode tocar. A gente espera.
[PAUSA até toque]
[GARUZINHO]: Agora o ESTALO. Tlóc!
[Mesma estrutura para sopro]
[Ao terminar os 3]: [LOLINHA]: VOCÊ FEZ TODOS!
```

**Mecânica**:
- 3 botões grandes (100px cada), arranjados horizontalmente
- Botão 1: ícone de mão batendo + label "Palma"
- Botão 2: ícone de boca + label "Estalo"
- Botão 3: ícone de vento + label "Sopro"
- Sequência guiada: Lolinha pede cada botão na vez, espera toque, dá feedback positivo
- Se 3 segundos sem toque, Garuzinho encoraja calmamente (NÃO pressiona)
- Se criança toca em ordem aleatória, sistema aceita sem corrigir

**Assets**:
- `audio/s1-a2-prompts.mp3` (com timecodes para sincronia)
- Sprites SVG: mão batendo (ícone), boca com estalo, sopro com vento
- Áudios SFX: `sfx/palma.mp3`, `sfx/estalo.mp3`, `sfx/sopro.mp3`

**Retry**:
1. Variação A — ordem padrão
2. Variação B — Garuzinho lidera os pedidos (em vez de Lolinha)
3. Variação C — pedem tocar 2 vezes seguidas o mesmo botão antes de avançar

---

### Átomo 1.1.3 — Toque mágico
- **Tipo**: `play` · **Duração**: 60-90s (livre, encerra com botão "pronto")
- **Engine**: `phaser`
- **Conceitos**: `som-corpo`, `causa-efeito`
- **Critério**: ≥5 toques na tela

**Roteiro:**
```
[LOLINHA, energética]: Olha que demais!
[PAUSA 0.5s]
[LOLINHA]: Cada vez que você toca, vira um som!
[PAUSA 1s]
[GARUZINHO]: Toca em qualquer lugar da tela.
[A cada toque]: [SFX aleatório: palma OU estalo OU sopro]
[A cada 15s sem toque]: [LOLINHA]: Toca mais! É legal!
[Após 60s ou ao tocar "pronto"]: [GARUZINHO]: Quando quiser parar, é só tocar no botão.
```

**Mecânica**:
- Tela limpa, fundo branco, Lolinha no canto inferior esquerdo pulando suavemente, Garuzinho no canto inferior direito observando
- Qualquer toque na tela gera:
  - Animação de "partícula" no ponto do toque (círculo expansivo colorido em coral, rosa ou amarelo)
  - Som aleatório dos 3 (palma, estalo, sopro)
- Botão "Pronto!" no canto superior direito (criança escolhe quando sair)
- Contador interno (invisível) de toques; após 5, libera celebração antecipada se criança continuar

**Assets**:
- Sprite de partícula (círculo expansivo SVG animado via Framer Motion ou Phaser tween)
- Áudios já listados em 1.1.2
- `audio/s1-a3-encouragements.mp3` (5 frases curtas alternadas Lola + Garu)

**Retry**:
1. Variação A — partículas em paleta primária (vermelho/amarelo/azul)
2. Variação B — partículas em paleta pastel
3. Variação C — Lolinha pula pela tela acompanhando os toques (mais ativa visualmente)

---

### Átomo 1.1.4 — Você fez sons!
- **Tipo**: `celebrate` · **Duração**: 30s · **Engine**: `phaser`
- **Critério**: toque em "Mais uma vez" OU "Próxima"

**Roteiro:**
```
[AÇÃO: Lolinha dança no centro, coração brilha]
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ FEZ SONS COM SEU CORPO!
[PAUSA 0.5s]
[GARUZINHO, suave]: Você foi incrível.
[PAUSA 1s]
[AÇÃO: bichinho colecionável aparece — Tatuzinho Tatactaque]
[LOLINHA]: O Tatuzinho Tatactaque quer morar na sua casinha!
[PAUSA 1s]
[GARUZINHO]: Quer fazer DE NOVO? Ou ver o que vem AGORA?
[AÇÃO: 2 botões pulsam]
```

**Mecânica**:
- Animação curta da Lolinha dançando (loop 6s) com coração brilhando
- Garuzinho ao lado, balançando a cauda calmamente
- Confete sutil em paleta coral/rosa (3-5 partículas, não dezenas)
- Bichinho colecionável (`Tatuzinho Tatactaque`) aparece com animação de "voar pra dentro da casinha"
- 2 botões grandes (100px):
  - Esquerdo: "MAIS UMA VEZ!" → reinicia 1.1.3 (átomo de play)
  - Direito: "PRÓXIMA!" → avança para próxima sessão

**Assets**:
- Animação Lolinha dançando + coração pulsando
- Animação Garuzinho balançando cauda
- Sprite "Tatuzinho Tatactaque" (colecionável da S1)
- `audio/s1-a4-celebration.mp3`
- SFX: confete suave

**Retry**: não aplicável (átomo terminal). Variar apenas as falas entre 3 versões para evitar repetição cansativa em retornos à sessão.

---

## 3. Sessão 2 — Sons da casa

**Objetivo**: reconhecer sons domésticos comuns.
**Conceitos**: `som-objeto`, `escuta-ativa`.
**BNCC**: EI02EF02, EI02ET01.
**Duração total**: ~3min 30s.

### Átomo 1.2.1 — Os sons da casinha
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `som-objeto`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[AÇÃO: Garuzinho e Lolinha em cenário de casa estilizada — sala e cozinha]
[GARUZINHO]: Essa é a nossa casinha!
[LOLINHA, animada]: Tem MUITOS sons aqui!
[APITO] [AÇÃO: Garuzinho aciona o apito]
[GARUZINHO]: Escuta esse...
[AÇÃO: campainha toca]
[SFX: campainha]
[LOLINHA]: A CAMPAINHA! Din-don!
[PAUSA 1s]
[AÇÃO: telefone toca na mesa]
[SFX: telefone]
[GARUZINHO]: O TELEFONE. Trim trim.
[PAUSA 1s]
[AÇÃO: torneira aberta na cozinha]
[SFX: água correndo]
[LOLINHA]: A ÁGUA da torneira!
[PAUSA 1s]
[AÇÃO: porta abre e fecha]
[SFX: porta]
[GARUZINHO]: E a PORTA.
[PAUSA 1.5s]
[LOLINHA]: Vem achar esses sons com a gente!
```

**Mecânica**: animação linear, criança só assiste. Apito do Garuzinho marca início da sequência de sons.

**Assets**:
- `audio/s2-a1-intro.mp3` (55s)
- `video/s2-a1.mp4`
- Cenário de casa em SVG (sala + cozinha)
- SFX: campainha, telefone, água, porta, apito

**Retry**: 3 ordens diferentes dos 4 sons; em variação C, geladeira ("vrrrrm") aparece como bonus.

---

### Átomo 1.2.2 — Que som é esse?
- **Tipo**: `imitate` (variante de reconhecimento) · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `som-objeto`, `discriminacao-auditiva`
- **Critério**: ≥3 de 4 acertos (não bloqueante)

**Roteiro:**
```
[GARUZINHO]: Eu vou tocar um som. Você toca no que faz esse som.
[PAUSA 1s]
[APITO]
[SFX: campainha]
[PAUSA 2s — espera resposta]
[Se acertar]: [LOLINHA]: ACERTOU! [próximo som]
[Se errar]: [GARUZINHO, suave]: Quase! Vamos tentar de novo? [áudio do som correto repete]
[Após 2 erros no mesmo item]: [LOLINHA]: Olha aqui! [AÇÃO: ícone correto pulsa]
```

**Mecânica**:
- Tela com 4 ícones grandes (90px cada) — campainha, telefone, torneira, porta
- Garuzinho aciona apito → SFX toca → criança identifica
- Sem timer. Sem limite de tentativas.
- Após 2 erros no mesmo item, ícone correto pulsa mostrando resposta

**Assets**:
- 4 sprites SVG dos objetos
- Áudios SFX já listados
- `audio/s2-a2-prompts.mp3` (Garu + Lola alternados)

**Retry**: ordem aleatória dos sons; em variação C, incluir som novo (geladeira ou descarga) como bonus.

---

### Átomo 1.2.3 — Casa sonora
- **Tipo**: `play` · **Duração**: 60-90s · **Engine**: `phaser`
- **Conceitos**: `som-objeto`, `exploracao`
- **Critério**: ≥4 toques diferentes no cenário

**Roteiro:**
```
[LOLINHA, eufórica]: Olha! É a casinha toda pra você!
[PAUSA 1s]
[LOLINHA]: Toca em cada coisa pra ouvir o som dela!
[A cada toque]: [SFX correspondente]
[A cada 3 toques diferentes]: [GARUZINHO]: Você está achando todos os sons!
[Lolinha pula no canto comemorando descobertas]
```

**Mecânica**:
- Cenário de casa interativo (sala + cozinha) em SVG
- 5-6 objetos tocáveis: campainha, telefone, torneira, porta, geladeira, TV
- Cada toque: ícone pulsa, som toca, animação curta (porta abre, água sai)
- Lolinha visível pulando no canto, Garuzinho observando da soleira
- Botão "Pronto" persistente (100px) canto superior direito

**Assets**:
- Cenário completo SVG (sala + cozinha)
- 6 sprites animados (campainha, telefone, torneira, porta, geladeira, TV)
- 6 áudios SFX
- Animação Lolinha pulando + Garuzinho observando

**Retry**: 2 cenários — casa de dia e casa de noite com mesmos objetos mas sons levemente diferentes (luz acesa vs apagada).

---

### Átomo 1.2.4 — Caçador de sons!
- **Tipo**: `celebrate` · **Duração**: 30s
- **Critério**: toque em botão

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA]: Você ouviu MUITO BEM!
[GARUZINHO]: Os sons da casa não escondem de você.
[AÇÃO: colecionável "Cuquinha Apito" aparece]
[LOLINHA]: A Cuquinha Apito quer morar com você!
[GARUZINHO]: Faz DE NOVO ou PRÓXIMA?
```

**Mecânica**: padrão (vide 1.1.4). Colecionável: `Cuquinha Apito` (passarinho amarelo que apita).

**Assets**: sprite Cuquinha Apito, animação curta, `audio/s2-a4-celebration.mp3`.

---

## 4. Sessão 3 — Sons dos animais

**Objetivo**: identificar sons de animais domésticos comuns.
**Conceitos**: `som-animal`, `discriminacao-auditiva`.
**BNCC**: EI02EF02, EI02ET03.

### Átomo 1.3.1 — Os amigos da fazenda
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `som-animal`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[AÇÃO: Garuzinho e Lolinha numa cerquinha de fazenda]
[LOLINHA]: Olha quem mora perto da casinha!
[AÇÃO: cachorro grande entra abanando o rabo]
[SFX: latido]
[GARUZINHO]: O CACHORRO GRANDÃO! Au au!
[PAUSA 1s]
[AÇÃO: gato passa]
[SFX: miado]
[LOLINHA]: O GATO! Miau!
[PAUSA 1s]
[AÇÃO: vaca aparece olhando por cima da cerca]
[SFX: muu]
[GARUZINHO]: A VACA! Muuu!
[PAUSA 1s]
[AÇÃO: galinha caminha pela frente]
[SFX: cacarejo]
[LOLINHA]: A GALINHA! Có có có!
[PAUSA 1s]
[GARUZINHO]: Vem brincar de descobrir os sons!
```

**Assets**: 4 sprites de animais animados (entrada lateral em loop), 4 SFX, vozes Garu + Lola.

**Retry**: trocar ordem; adicionar pato como surpresa em variação C.

---

### Átomo 1.3.2 — Quem fez o som?
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `som-animal`, `discriminacao-auditiva`
- **Critério**: ≥3 de 4 acertos

**Mecânica**: idêntica a 1.2.2 mas com 4 animais. Apito → SFX animal → criança escolhe entre os 4 ícones. Garuzinho aciona apito, Lolinha celebra acertos.

**Roteiro chave**:
```
[GARUZINHO]: Quem fez esse som?
[APITO]
[SFX: latido]
[PAUSA 2s]
[Se acertar]: [LOLINHA]: É o CACHORRO!
[Após cada acerto]: animal correspondente pula no ícone
```

**Retry**: variação com pato ("quack") como som novo.

---

### Átomo 1.3.3 — Faz a voz do bicho
- **Tipo**: `play` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `som-animal`, `expressao-vocal`
- **Critério**: ≥3 toques

**Roteiro:**
```
[LOLINHA]: Olha, são os bichos!
[LOLINHA]: Toca neles pra eles falarem!
[A cada toque]: animal pula + faz som + Lolinha incentiva "Au au!" ou "Miau!"
[GARUZINHO]: Você pode falar igual eles também!
```

**Mecânica**:
- 4 animais visíveis na tela (90px cada, espaçados)
- Toque em animal → ele pula com animação + SFX + Lolinha repete o som dele com voz fofa
- Sistema NÃO captura voz da criança (LGPD). Apenas convida e celebra qualquer toque seguinte.
- Lolinha pula no canto entre toques

**Assets**: 4 sprites animais com 3 frames cada (parado, pulando, voltando), áudios SFX + áudio Lolinha imitando cada um.

**Retry**: 2 cenários — fazenda diurna, fazenda noturna (sons mais suaves, lua aparece).

---

### Átomo 1.3.4 — Você fala bicho!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Pintinho Pio` (passarinho amarelinho)

**Roteiro padrão de celebração**:
```
[BRILHO CORAÇÃO]
[LOLINHA]: Você falou com OS BICHOS!
[GARUZINHO]: Você entende a língua deles agora.
[AÇÃO: Pintinho Pio aparece piando]
[LOLINHA]: O Pintinho Pio quer vir morar com você!
```

---

## 5. Sessão 4 — Vai rimar! Nomes

**Objetivo**: perceber rima usando o próprio nome e nomes conhecidos.
**Conceitos**: `rima`, `consciencia-fonologica`.
**BNCC**: EI02EF09, EI03EF09.

### Átomo 1.4.1 — Palavras que combinam
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `rima`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[GARUZINHO, calmo]: Sabia que palavras podem combinar?
[LOLINHA, curiosa]: Combinar?
[GARUZINHO]: É! É a RIMA.
[PAUSA 1s]
[GARUZINHO, melódico]: Garuzinho... Pinguinho... Carinho.
[LOLINHA]: AAAH! TERMINA IGUAL!
[PAUSA 1s]
[LOLINHA]: Lolinha... Bonequinha... Galinha!
[GARUZINHO]: Ouviu? Termina igualzinho.
[PAUSA 1s]
[LOLINHA, gargalhando]: Ana... banana!
[GARUZINHO, risonho]: Pedro... ledro! Essa eu inventei!
[PAUSA 1.5s]
[LOLINHA]: Rimar é brincar com as palavras. Vem brincar!
```

**Mecânica**: animação com Garuzinho e Lolinha falando, palavras flutuam visuais para reforço (texto grande aparece e some).

**Assets**: animação dupla, palavras em texto grande para reforço visual, áudio com inflexão melódica.

**Retry**: variar com nomes de animais (gato/pato/rato) em variação B; nomes de comida (bolo/colo/polo) em C.

---

### Átomo 1.4.2 — Combina ou não combina?
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `rima`, `discriminacao-fonologica`
- **Critério**: ≥3 de 5 respostas (sem bloqueio)

**Roteiro chave:**
```
[GARUZINHO]: Eu vou falar duas palavras.
[LOLINHA]: Você toca no SIM se combinam, ou no NÃO se não combinam!
[APITO]
[GARUZINHO, melódico]: Ana... banana!
[PAUSA 2s]
[Se acertar SIM]: [LOLINHA]: COMBINA MESMO!
[Se errar]: [GARUZINHO]: Hmm, ouve de novo. Ana... banana! Termina igual?
```

**Mecânica**:
- 2 botões grandes (100px): 😀 verde (combina) e 😐 amarelo (não combina) — sentence case nas legendas: "Sim, combina" / "Não combina"
- 5 pares ditados por Garuzinho com prosódia que enfatiza a rima:
  - Ana / banana ✓
  - Garuzinho / sapato ✗
  - Mia / Maria ✓
  - Lolinha / livro ✗
  - Lara / Sara ✓

**Assets**: áudios dos 5 pares com prosódia melódica, 2 ícones grandes (carinhas), apito.

**Retry**: trocar os pares; manter mesma estrutura. Variação C com nomes de animais.

---

### Átomo 1.4.3 — Acha o par que rima
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `rima`, `correspondencia`
- **Critério**: ≥3 arrastos completados

**Roteiro:**
```
[LOLINHA]: Olha! A gente tem uma palavra aqui.
[AÇÃO: palavra-âncora "BOLA" grande à esquerda]
[LOLINHA]: Quem RIMA com bola?
[AÇÃO: 3-4 cards aparecem à direita]
[GARUZINHO]: Arrasta as palavras que rimam pra cá.
[A cada arrasto correto]: [LOLINHA]: ISSO! Rima!
[A cada arrasto errado]: [GARUZINHO, gentil]: Hmm, essa não rima com bola. Volta!
[AÇÃO: card volta animadamente sem punir]
```

**Mecânica**:
- Palavra-âncora gigante (font display) à esquerda, com ilustração ao lado (bola desenhada)
- 3-4 cards à direita, cada um com palavra grande + ilustração: cola ✓, sola ✓, mão ✗, gato ✗
- Criança arrasta cards que rimam para a "sacola" do Garuzinho
- Snap generoso (raio 60px) quando próximo da sacola
- Cards errados: voltam saltitando sem punição visual

**Assets**: cards SVG com palavras + ilustrações, sacola Garuzinho animada, áudios para cada palavra.

**Retry**: 3 palavras-âncora diferentes (bola → cola/sola; pato → rato/gato; mão → pão/cão).

---

### Átomo 1.4.4 — Você é um rimador!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Sapinho Rimador` (sapo verde com chapéu)

**Roteiro padrão**:
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ É UM RIMADOR!
[GARUZINHO]: Você sabe quando palavras combinam.
[AÇÃO: Sapinho Rimador aparece pulando]
[LOLINHA]: Olha o Sapinho Rimador!
```

---

## 6. Sessão 5 — Vai rimar! Bichos

**Objetivo**: brincar de rimar com nomes de animais.
**Conceitos**: `rima`, `consciencia-fonologica`.

### Átomo 1.5.1 — Bichos que rimam
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Conceitos**: `rima`, `som-animal`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[GARUZINHO]: Sabia que bichos também rimam?
[LOLINHA]: Eba! Quero ver!
[GARUZINHO, melódico]: Pato... Rato... Gato!
[LOLINHA]: AAAH! Todos terminam igual!
[PAUSA 1s]
[GARUZINHO, melódico]: Coelho... Joelho!
[LOLINHA, gargalhando]: Olha! O joelho é uma parte do corpo!
[PAUSA 1s]
[GARUZINHO]: Cachorro... Esquilo... Não combina, né?
[LOLINHA]: Não combina mesmo!
[PAUSA 1s]
[LOLINHA]: Vem brincar de achar os bichos que rimam!
```

**Assets**: cenário de bichos animados pulando em pares quando rimam, sprites de pato/rato/gato/coelho.

**Retry**: 3 conjuntos diferentes de rimas animais.

---

### Átomo 1.5.2 — Acha o bicho que rima
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `rima`, `correspondencia`
- **Critério**: ≥3 de 4 pares

**Mecânica**:
- Animal-âncora à esquerda (ex: PATO grande com ilustração)
- 3 animais à direita: RATO ✓, JACA ✗, COBRA ✗
- Criança arrasta o que rima até o âncora
- Snap generoso, retorno animado em erro

**Roteiro chave:**
```
[GARUZINHO]: Quem rima com PATO?
[Toque/arrasto certo]: [LOLINHA]: O RATO! Pato e rato rimam!
[Toque errado]: [GARUZINHO, gentil]: Hmm, esse não. Tenta outro.
```

**Retry**: 3 conjuntos diferentes (pato/rato; coelho/joelho; gato/sapato).

---

### Átomo 1.5.3 — Festa dos bichos rimadores
- **Tipo**: `play` · **Duração**: 70-90s · **Engine**: `phaser`
- **Conceitos**: `rima`, `descoberta`
- **Critério**: ≥3 pares descobertos

**Roteiro:**
```
[LOLINHA]: É a FESTA dos bichos!
[LOLINHA]: Toca em DOIS bichos que rimam pra eles dançarem juntos!
[A cada par certo]: animais dançam juntos + música curta
[A cada par errado]: animais se afastam educadamente, sem punição
[GARUZINHO]: Achou! Eles rimam!
```

**Mecânica**:
- Cenário "festa" com 6-8 animais espalhados (pato, rato, gato, coelho, joelho-como-personagem, sapato-como-personagem, cobra, peixe)
- Criança toca em 2 animais; sistema verifica se rimam
- Se sim: par dança junto, fica iluminado, contador interno aumenta
- Se não: animais se separam, fazem gesto "não combina" sem punir

**Assets**: cenário festa, 8 sprites animais com animação de dança, áudio festivo curto (3-5s).

**Retry**: 2 configurações de animais diferentes.

---

### Átomo 1.5.4 — Você é o rei da rima!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Coelhinho Joelho` (coelho branco com bandeira que diz "rima")

**Roteiro padrão**:
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ ENCONTROU AS RIMAS DOS BICHOS!
[GARUZINHO]: Você ouve as palavras com muita atenção.
[AÇÃO: Coelhinho Joelho aparece pulando]
[LOLINHA]: O Coelhinho Joelho quer brincar com você!
```

---

## 7. Sessão 6 — Conheci o A

**Objetivo**: reconhecer a letra A pela forma e pelo som inicial.
**Conceitos**: `letra-a`, `som-inicial`, `forma-letra`.
**BNCC**: EI03EF01, EI03EF09.

### Átomo 1.6.1 — A letra A apareceu!
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `letra-a`, `forma-letra`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO] [AÇÃO: Garuzinho aciona o apito]
[GARUZINHO]: Olha o que apareceu!
[AÇÃO: letra A gigante desce do céu, brilhante, coral]
[LOLINHA, surpresa]: UAUUU! É uma letra!
[GARUZINHO]: É a letra A.
[PAUSA 1s]
[GARUZINHO, alongando]: O nome dela é AAAH.
[LOLINHA, imitando]: AAAH!
[PAUSA 1s]
[GARUZINHO]: Olha onde ela aparece...
[AÇÃO: avião sobrevoa com A grande na fuselagem]
[GARUZINHO]: AVIÃO. Começa com A!
[PAUSA 1s]
[AÇÃO: abelha voa pelo cenário]
[LOLINHA]: ABELHA! Também começa com A!
[PAUSA 1s]
[AÇÃO: árvore aparece]
[GARUZINHO]: ÁRVORE. AAAH-ÁRVORE.
[PAUSA 1.5s]
[LOLINHA]: Vem achar a letra A com a gente!
```

**Mecânica**: vídeo linear. Letra A como personagem visual (desce do céu, brilha). Cada palavra-âncora aparece como objeto animado com a letra A destacada.

**Assets**:
- Letra A gigante em forma maiúscula (font display Tailwind), coral
- Sprites animados: avião, abelha, árvore
- `audio/s6-a1-intro.mp3`
- SFX: apito, sons dos objetos (avião, zumbido, vento na árvore)

**Retry**: 3 conjuntos de palavras-A (avião/abelha/árvore; amigo/anel/asa; arroz/abacaxi/anjo).

---

### Átomo 1.6.2 — Acha a letra A
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `letra-a`, `discriminacao-visual`
- **Critério**: ≥3 acertos em 5 tentativas

**Roteiro:**
```
[GARUZINHO]: Olha quantas letras!
[PAUSA 1s]
[LOLINHA, animada]: Acha TODAS as letras A!
[A cada A tocada]: [LOLINHA]: ACHOU! [letra brilha]
[A cada letra errada tocada]: [GARUZINHO, suave]: Essa não é o A. É outra letra. [letra balança levemente, sem punição]
[Após achar todas as A]: [LOLINHA]: VOCÊ ACHOU TODAS!
```

**Mecânica**:
- Tela com 6 letras gigantes espalhadas (3 são A, 3 são distratores: E, M, S)
- Quico toca em letras; A tocada brilha e fica destacada; outras balançam sem punição
- Quando todas as A são tocadas: celebração antecipada antes de avançar
- Letras grandes (mínimo 100px), font display, sentence case A não maiúscula gritada

**Assets**:
- Letras A gigantes em 3 estilos (mesmo glyph, leve variação de cor: coral, coral-claro, coral-escuro)
- Letras distratoras: E, M, S
- `audio/s6-a2-prompts.mp3`

**Retry**: 3 layouts diferentes; em variação C, A vem em minúscula (a) também.

---

### Átomo 1.6.3 — Caça-A na cidade
- **Tipo**: `play` · **Duração**: 90s · **Engine**: `phaser`
- **Conceitos**: `letra-a`, `som-inicial`, `aplicacao`
- **Critério**: ≥3 objetos com A identificados

**Roteiro:**
```
[LOLINHA, eufórica]: Olha a CIDADE!
[LOLINHA]: Toca em tudo que COMEÇA COM A!
[A cada acerto]: [SFX: ding suave] [GARUZINHO]: AVIÃO! Começa com A!
[A cada distrator]: [SFX: som do objeto] [LOLINHA]: Esse é um CARRO. Não começa com A.
[A cada 3 acertos]: [LOLINHA]: VOCÊ ESTÁ ACHANDO TUDO!
```

**Mecânica**:
- Cenário urbano lúdico em SVG (rua com lojas, céu, árvores)
- Objetos com A: avião (no céu), abelha (voando entre árvores), árvore (na esquina), abacate (numa banca)
- Distratores: carro, casa, sol, bicicleta
- Tocar em objeto-A: letra A pula do objeto + áudio com palavra
- Tocar em distrator: objeto faz som mas não há letra A; Lolinha narra o nome dele suavemente
- Contador invisível; após 3 acertos, libera celebração

**Assets**:
- Cenário urbano em SVG
- 4 sprites A-objects (avião, abelha, árvore, abacate)
- 4 sprites distratores
- Letra A "pulando" do objeto (animação Framer Motion)
- `audio/s6-a3-narration.mp3`

**Retry**: 2 cenários — cidade e fazenda (variação muda objetos e distratores).

---

### Átomo 1.6.4 — Você achou o A!
- **Tipo**: `celebrate` · **Duração**: 35s
- Colecionável: `Aviãozinho do A` (mini-avião coral com letra A na asa)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ CONHECEU A LETRA A!
[GARUZINHO]: A primeira letra. Você foi incrível.
[AÇÃO: Aviãozinho do A passa voando]
[LOLINHA]: Olha! É o AVIÃOZINHO DO A!
[GARUZINHO]: Ele quer ir pra sua casinha. Vem ver mais letras?
```

---

## 8. Sessão 7 — Conheci o E

**Objetivo**: reconhecer a letra E pela forma e pelo som inicial.
**Conceitos**: `letra-e`, `som-inicial`, `forma-letra`.

### Átomo 1.7.1 — A letra E chegou!
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Chegou mais uma letra!
[AÇÃO: letra E desce do céu, verde claro]
[LOLINHA]: Olha, ela tem três bracinhos!
[GARUZINHO]: É a letra E. O nome dela é ÊÊÊH.
[LOLINHA, imitando]: ÊÊÊH!
[PAUSA 1s]
[AÇÃO: elefante caminha tranquilo]
[GARUZINHO]: ELEFANTE. Começa com E.
[PAUSA 1s]
[AÇÃO: escada aparece]
[LOLINHA]: ESCADA! Também com E!
[PAUSA 1s]
[AÇÃO: estrela cintila no céu]
[GARUZINHO]: ESTRELA. ÊÊÊH-ESTRELA.
[PAUSA 1.5s]
[LOLINHA]: Vem achar a letra E com a gente!
```

**Assets**: letra E gigante (verde claro), sprites elefante/escada/estrela, áudios.

**Retry**: variação B com edifício/escova/elétrico; variação C com escola/eu (apontando)/estrada.

---

### Átomo 1.7.2 — Acha a letra E
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- Estrutura idêntica a 1.6.2 com E entre distratores (A, O, S, M).

**Roteiro chave:**
```
[GARUZINHO]: Agora acha todos os E!
[LOLINHA]: A letra com os três bracinhos!
```

**Retry**: layouts variados; em C, E maiúsculo e minúsculo (e) misturados.

---

### Átomo 1.7.3 — Caça-E na floresta
- **Tipo**: `play` · **Duração**: 90s · **Engine**: `phaser`
- **Critério**: ≥3 objetos identificados

**Mecânica**: idêntica a 1.6.3 mas cenário floresta. Objetos-E: elefante (raro mas presente lúdico, sai por entre árvores), escada (encostada num tronco), estrela (à noite), espelho (perto de uma cabaninha). Distratores: árvore, cogumelo, lago, pássaro.

**Roteiro chave:**
```
[LOLINHA]: Estamos na floresta! Acha o E aqui!
[A cada acerto]: [GARUZINHO]: ESTRELA! E de estrela!
```

**Retry**: 2 cenários — floresta de dia e floresta de noite (estrela aparece só à noite).

---

### Átomo 1.7.4 — Você achou o E!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Estrelinha do E` (estrela amarela com letra E no centro)

**Roteiro padrão**:
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ ENCONTROU A LETRA E!
[GARUZINHO]: Você é um caçador de letras agora.
[AÇÃO: Estrelinha do E pisca]
```

---

## 9. Sessão 8 — Conheci o I

**Objetivo**: reconhecer a letra I pela forma e pelo som inicial.
**Conceitos**: `letra-i`, `som-inicial`, `forma-letra`.

### Átomo 1.8.1 — A letra I é fininha!
- **Tipo**: `listen` · **Duração**: 50s · **Engine**: `video`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha que letra fininha!
[AÇÃO: letra I desce, azul, alta e estreita]
[LOLINHA]: É um risquinho com um pontinho!
[GARUZINHO]: É a letra I. ÎÎÎH.
[LOLINHA, imitando, agudo]: ÎÎÎH!
[PAUSA 1s]
[AÇÃO: iogurte aparece num potinho]
[GARUZINHO]: IOGURTE. Com I.
[PAUSA 1s]
[AÇÃO: ilha aparece no horizonte]
[LOLINHA]: ILHA!
[PAUSA 1s]
[AÇÃO: iguana surge numa pedra]
[GARUZINHO]: IGUANA! ÎÎÎH-IGUANA.
[PAUSA 1s]
[LOLINHA]: Vem achar o I!
```

**Assets**: letra I gigante (azul), sprites iogurte/ilha/iguana, áudios.

**Retry**: variação com igreja/imã/idéia (representada por lampadinha sobre cabeça).

---

### Átomo 1.8.2 — Acha a letra I
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- Estrutura paralela a 1.6.2 e 1.7.2. Distratores: T, L, J, A.

---

### Átomo 1.8.3 — Ilha do I
- **Tipo**: `play` · **Duração**: 90s · **Engine**: `phaser`
- **Critério**: ≥3 objetos identificados

**Mecânica**: cenário de praia/ilha tropical. Objetos-I: iogurte (num cooler na areia), iguana (em pedra), ilha (mostrada no horizonte), íris (flor roxa). Distratores: coqueiro, peixe, sol, concha.

**Roteiro chave:**
```
[LOLINHA]: Estamos na ILHA! Já começa com I!
[A cada acerto]: [GARUZINHO]: IGUANA! I de iguana!
```

**Retry**: 2 ilhas diferentes (de dia, ao pôr do sol).

---

### Átomo 1.8.4 — Você achou o I!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Iguaninha do I` (iguana verde sorridente)

---

## 10. Sessão 9 — Conheci o O

**Objetivo**: reconhecer a letra O pela forma e pelo som inicial.
**Conceitos**: `letra-o`, `som-inicial`, `forma-letra`.

### Átomo 1.9.1 — A letra O é redondinha!
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha uma letra bem redondinha!
[AÇÃO: letra O desce, laranja, perfeitamente redonda]
[LOLINHA]: Parece uma BOLA!
[GARUZINHO]: É a letra O.
[PAUSA 0.5s]
[GARUZINHO]: Ela faz dois sons. Ôôôh...
[LOLINHA, imitando]: Ôôôh.
[GARUZINHO]: E óóóh!
[LOLINHA]: Óóóh!
[PAUSA 1s]
[AÇÃO: ônibus passa]
[GARUZINHO]: ÔNIBUS.
[PAUSA 1s]
[AÇÃO: óculos aparece]
[LOLINHA]: ÓCULOS!
[PAUSA 1s]
[AÇÃO: ovo se mexe num ninho]
[GARUZINHO]: OVO. O redondo igual a letra!
[PAUSA 1.5s]
[LOLINHA]: Vem brincar com o O!
```

**Nota pedagógica**: O é a primeira vogal com 2 sons diferentes (/o/ fechado e /ɔ/ aberto). Apresentar ambos sem aprofundar — só consciência sonora.

**Assets**: letra O gigante (laranja), sprites ônibus/óculos/ovo, áudios com ambos os sons.

**Retry**: variação com olho/orelha/onda; variação C com objeto/octopo (polvo)/ouro.

---

### Átomo 1.9.2 — Acha a letra O
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- Distratores: A, C, U, Q.

---

### Átomo 1.9.3 — Caça-O na garagem
- **Tipo**: `play` · **Duração**: 90s · **Engine**: `phaser`
- **Critério**: ≥3 objetos identificados

**Mecânica**: cenário garagem/oficina. Objetos-O: ônibus (estacionado), óculos (na mesa de ferramentas), ovo (numa cesta de café da manhã pendurada), osso (na tigela do Garuzinho). Distratores: carro, chave inglesa, lâmpada, pneu.

**Roteiro chave:**
```
[LOLINHA]: Olha a garagem do Garuzinho!
[GARUZINHO]: Toca em tudo que começa com O!
[A cada acerto]: [LOLINHA]: ÔNIBUS! Começa com O!
```

**Retry**: 2 cenários — garagem e cozinha (mesma estrutura, objetos-O diferentes).

---

### Átomo 1.9.4 — Você achou o O!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Ovinho do O` (ovo branco com letra O desenhada, sorriso)

---

## 11. Sessão 10 — Conheci o U (e revisão das vogais)

**Objetivo**: reconhecer a letra U + revisar todas as vogais como conquista.
**Conceitos**: `letra-u`, `som-inicial`, `forma-letra`, `vogais-completo`.

### Átomo 1.10.1 — A letra U é uma curvinha!
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Olha! É a ÚLTIMA letra das vogais!
[AÇÃO: letra U desce, roxa, em forma de copinho]
[LOLINHA]: Ela parece uma xícara!
[GARUZINHO]: É a letra U. ÛÛÛH.
[LOLINHA, imitando]: ÛÛÛH!
[PAUSA 1s]
[AÇÃO: cacho de uva aparece pendurado]
[GARUZINHO]: UVA. Com U.
[PAUSA 1s]
[AÇÃO: urso fofinho acena]
[LOLINHA]: URSO!
[PAUSA 1s]
[AÇÃO: unha desenhada num desenho infantil aparece]
[GARUZINHO]: UNHA. ÛÛÛH-UNHA.
[PAUSA 1.5s]
[LOLINHA]: Vem achar o U!
```

**Assets**: letra U gigante (roxa), sprites uva/urso/unha, áudios.

**Retry**: variação com utensílio/único (mostrado como "um sozinho")/uivo (com lobo desenhado fofo).

---

### Átomo 1.10.2 — Acha a letra U
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- Distratores: V, Y, O, J.

---

### Átomo 1.10.3 — Caça-U na floresta de inverno
- **Tipo**: `play` · **Duração**: 90s · **Engine**: `phaser`
- **Critério**: ≥3 objetos identificados

**Mecânica**: cenário floresta com neve leve. Objetos-U: urso (sai da caverna), uva (pendurada numa parreira protegida), unha (um desenho num caderno aberto), umbigo (ilustração lúdica em cima de uma boneca de neve sorrindo). Distratores: árvore, lago congelado, esquilo, pinha.

**Roteiro chave:**
```
[LOLINHA]: Que cenário fofo!
[GARUZINHO]: Acha tudo que começa com U.
[A cada acerto]: [LOLINHA]: URSO!
```

**Retry**: 2 cenários — floresta de inverno e camping (mesma estrutura).

---

### Átomo 1.10.4 — VOCÊ CONHECEU TODAS AS VOGAIS!
- **Tipo**: `celebrate` (especial — final do Eixo) · **Duração**: 60s
- **Engine**: `phaser`
- Colecionável: `Ursinho do U` + **conquista especial** `Conhecedor das Vogais`

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA, super eufórica]: AAAAAA! VOCÊ FEZ!
[GARUZINHO, emocionado]: Você conheceu TODAS as vogais.
[PAUSA 1s]
[AÇÃO: 5 letras gigantes desfilam pela tela, uma a uma]
[SFX sequencial cada letra]: "AAA" — "ÊÊÊ" — "ÎÎÎ" — "ÔÔÔ" — "ÛÛÛ"
[GARUZINHO acompanha cada uma]: A... E... I... O... U.
[LOLINHA]: A, E, I, O, U!
[PAUSA 1s]
[AÇÃO: 5 colecionáveis das vogais voam juntos formando um arco — Aviãozinho, Estrelinha, Iguaninha, Ovinho, Ursinho]
[LOLINHA]: TODOS OS BICHINHOS DO ALFABETO ESTÃO COM VOCÊ!
[PAUSA 1s]
[AÇÃO: medalha especial "Conhecedor das Vogais" aparece]
[GARUZINHO]: Você ganhou uma MEDALHA especial.
[GARUZINHO]: Conhecedor das Vogais.
[PAUSA 1s]
[LOLINHA]: O que a gente faz agora?
[GARUZINHO]: Você pode brincar mais com as vogais... ou conhecer NÚMEROS!
[AÇÃO: 2 botões grandes — "MAIS LETRAS" e "VER NÚMEROS"]
```

**Mecânica**:
- Cena de celebração maior (60s, não 30s)
- 5 letras desfilam com SFX próprio
- 5 colecionáveis aparecem formando arco visual
- Medalha "Conhecedor das Vogais" aparece como item especial na casinha virtual
- 2 botões grandes:
  - "MAIS LETRAS" → volta para mapa do Eixo Sons e Letras (criança pode rejogar)
  - "VER NÚMEROS" → navega para o Eixo 2 (Contar e Comparar) — cross-eixo

**Assets**:
- Animação especial de celebração (mais elaborada)
- 5 sprites colecionáveis revisitados
- Sprite medalha "Conhecedor das Vogais"
- `audio/s10-a4-final-celebration.mp3` (60s)
- SFX especiais (fanfarra suave, não estridente)

**Retry**: animação ligeiramente diferente a cada conclusão (não cansar), mas medalha só é entregue uma vez. Em retornos, criança vê a medalha já no inventário e a celebração tem fala alternativa "Você ainda é o Conhecedor das Vogais!".

---

## 12. Lista consolidada de colecionáveis

Cada sessão entrega um bichinho/objeto colecionável que vai para a "casinha virtual" da criança (mecânica de coleção visível no mapa do Mundo).

| Sessão | Colecionável | Aparência |
|---|---|---|
| 1 | Tatuzinho Tatactaque | Tatu pequeno cinza, bate os pés produzindo som |
| 2 | Cuquinha Apito | Passarinho amarelo que apita |
| 3 | Pintinho Pio | Pintinho amarelinho |
| 4 | Sapinho Rimador | Sapo verde com chapéu de poeta |
| 5 | Coelhinho Joelho | Coelho branco segurando bandeira "rima" |
| 6 | Aviãozinho do A | Mini-avião coral com letra A na asa |
| 7 | Estrelinha do E | Estrela amarela com letra E no centro |
| 8 | Iguaninha do I | Iguana verde sorridente |
| 9 | Ovinho do O | Ovo branco com letra O e sorriso |
| 10 | Ursinho do U | Urso roxinho fofo + **medalha "Conhecedor das Vogais"** |

**Casinha virtual**: cada colecionável tem uma "casinha" no mapa do Mundo dos Curiosos. Ao tocar no colecionável na casinha, a criança ouve novamente o som/palavra-âncora associada. Reforço espaçado embutido na mecânica de coleção.

---

## 13. Lista consolidada de assets para produção

### Áudios a gravar (vozes `voice_garu` e `voice_lola`)

| Arquivo | Duração | Conteúdo |
|---|---|---|
| `audio/s1-a1-intro.mp3` | 50s | Apresentação dos personagens + sons do corpo |
| `audio/s1-a2-prompts.mp3` | 60s | Prompts de imitação dos 3 sons |
| `audio/s1-a3-encouragements.mp3` | 30s | 5 frases curtas alternadas |
| `audio/s1-a4-celebration.mp3` | 30s | Celebração + apresentação do Tatuzinho |
| `audio/s2-a1-intro.mp3` | 55s | Sons da casa |
| `audio/s2-a2-prompts.mp3` | 60s | Identificar sons |
| `audio/s2-a4-celebration.mp3` | 30s | Celebração + Cuquinha |
| `audio/s3-a1-intro.mp3` | 55s | Sons dos animais |
| `audio/s3-a2-prompts.mp3` | 60s | Identificar animais por som |
| `audio/s3-a4-celebration.mp3` | 30s | Celebração + Pintinho |
| `audio/s4-a1-intro.mp3` | 55s | Rima com nomes |
| `audio/s4-a2-prompts.mp3` | 60s | Combina ou não combina (5 pares) |
| `audio/s4-a3-narration.mp3` | 70s | Acha o par que rima |
| `audio/s4-a4-celebration.mp3` | 30s | Celebração + Sapinho |
| `audio/s5-a1-intro.mp3` | 50s | Rima com bichos |
| `audio/s5-a2-prompts.mp3` | 60s | Acha o bicho que rima |
| `audio/s5-a3-narration.mp3` | 90s | Festa dos bichos |
| `audio/s5-a4-celebration.mp3` | 30s | Celebração + Coelhinho Joelho |
| `audio/s6-a1-intro.mp3` | 55s | Letra A |
| `audio/s6-a2-prompts.mp3` | 60s | Acha A entre letras |
| `audio/s6-a3-narration.mp3` | 90s | Caça-A na cidade |
| `audio/s6-a4-celebration.mp3` | 35s | Celebração + Aviãozinho |
| `audio/s7-a*` | ~3min | Letra E (4 átomos) |
| `audio/s8-a*` | ~3min | Letra I (4 átomos) |
| `audio/s9-a*` | ~3min | Letra O (4 átomos) |
| `audio/s10-a1-3` | ~3min | Letra U (3 primeiros átomos) |
| `audio/s10-a4-final-celebration.mp3` | 60s | **Celebração final do Eixo + medalha** |

**Total estimado de áudio gravado**: ~38 minutos de narração final. Considerar +50% para variações de retry → **~57 minutos de gravação efetiva**.

### SFX a produzir ou licenciar (creative commons)
- Corpo: palma, estalo de língua, sopro, batida de pé
- Casa: campainha, telefone, água, porta, geladeira, TV
- Animais: latido, miado, muu, cacarejo, quack (variação), pio
- Sistema: apito do Garuzinho (piuí suave 0.4s), ding suave (acerto), pluf (erro gentil), confete suave
- Vogais: fanfarra de conclusão (60s, sem estridência)

### Sprites a desenhar (SVG vetorial)

**Personagens (cada um em 8-12 poses base):**
- Garuzinho: parado, falando, apitando (apito brilha), surpreso, balançando cauda, observando, encorajando, festejando suave
- Lolinha: parada, falando, pulando, surpresa, dançando (loop), pulando comemorando, coração brilhando, sentada apoiando

**Cenários (8 cenários únicos):**
- Casinha (sala + cozinha)
- Cerquinha de fazenda
- Cidade lúdica
- Floresta dia + noite (variação)
- Ilha tropical dia + pôr do sol (variação)
- Garagem/oficina
- Cozinha (variação)
- Floresta de inverno + camping (variação)
- Cena festa (S5.A3)

**Objetos (~50 sprites diferentes):**
- Domésticos: campainha, telefone, torneira, porta, geladeira, TV
- Animais cenário: cachorro grande, gato, vaca, galinha, pato
- Letras gigantes: A, E, I, O, U (5 — em cor coral/verde/azul/laranja/roxo)
- Letras pequenas para "achar entre letras": A, E, I, O, U, M, S, T, L, J, V, Y, C, Q
- Objetos-A: avião, abelha, árvore, abacate, anel, asa, anjo
- Objetos-E: elefante, escada, estrela, espelho
- Objetos-I: iogurte, ilha, iguana, íris
- Objetos-O: ônibus, óculos, ovo, osso
- Objetos-U: uva, urso, unha, umbigo (boneca de neve), uivo (lobinho fofo)
- Distratores variados: carro, casa, sol, bicicleta, coqueiro, peixe, concha, chave inglesa, lâmpada, pneu, esquilo, pinha

**Colecionáveis (10):**
- Tatuzinho Tatactaque, Cuquinha Apito, Pintinho Pio, Sapinho Rimador, Coelhinho Joelho, Aviãozinho do A, Estrelinha do E, Iguaninha do I, Ovinho do O, Ursinho do U
- Medalha "Conhecedor das Vogais"

### Animações
- 8-12 animações de personagens (Lottie ou Phaser tween)
- 5 letras descendo do céu com brilho
- Partículas de toque (S1.A3)
- Confete sutil de celebração (não cair-em-tudo)
- Apito brilhando + emitindo som
- Coração da Lolinha pulsando luminoso
- Bichinhos colecionáveis voando para "casinha"

---

## 14. Schema de seed para Supabase

Cada átomo desta camada vira uma linha em `atoms` no Supabase. Exemplo da estrutura para 1.1.1:

```sql
insert into atoms (
  session_id,
  atom_type,
  engine,
  config,
  display_order,
  estimated_duration_seconds,
  success_criteria
) values (
  '<session_id_s1>',
  'listen',
  'video',
  jsonb_build_object(
    'streamId', 'cf-stream-s1-a1',
    'poster', '/img/s1-a1-poster.jpg',
    'captions', '/captions/s1-a1.vtt',
    'characters', jsonb_build_array('garuzinho', 'lolinha'),
    'collectible', null
  ),
  1,
  50,
  jsonb_build_object('minDurationSeconds', 40)
);

-- conceitos associados
insert into atom_concepts (atom_id, concept_id, weight) values
  ('<atom_id>', '<concept_som-corpo>', 3),
  ('<atom_id>', '<concept_palma>', 2),
  ('<atom_id>', '<concept_estalo>', 2),
  ('<atom_id>', '<concept_sopro>', 2);
```

Para átomos Phaser (imitate, play), `config` inclui `scene` (nome da cena Phaser), `assets` (lista), `params`. Padrão:

```jsonb
{
  "scene": "BodyImitateScene",
  "assets": [
    {"key": "btn-palma", "url": "/sprites/btn-palma.svg", "type": "image"},
    {"key": "sfx-palma", "url": "/audio/sfx/palma.mp3", "type": "audio"}
  ],
  "params": {
    "items": ["palma", "estalo", "sopro"],
    "leadCharacter": "lolinha",
    "supportCharacter": "garuzinho",
    "minHitArea": 80
  }
}
```

Migration de seed (`supabase/seed.sql`) pode ser gerada a partir deste documento via script. Recomendo escrever um gerador TS em `scripts/seed-curiosos-eixo-1.ts` que parsa o markdown ou recebe um JSON intermediário.

---

## 15. Próximos passos

### Imediato
1. **Validar com pedagogo infantil** antes de fechar produção
2. **Casting de vozes** para `voice_garu` e `voice_lola`
3. **Briefing de design** para os 10 colecionáveis + cenários + sprites de personagens
4. **Briefing de sound design** para SFX customizados (apito suave, ding gentil, fanfarra final)

### Próximas camadas
- **Camada 3** — Eixo 2 (Contar e Comparar) detalhado, com Garuzinho como líder pedagógico
- **Camada 4** — Eixo 3 (Formas e Cores)
- **Camada 5** — Eixo 4 (Afetos)

### Refinamentos pós-feedback
Quando a primeira sessão estiver implementada e testada com famílias reais, este documento será atualizado para refletir aprendizados (pausas mais longas, palavras-âncora mais ou menos comuns, ajustes de roteiro). Manter este arquivo como **fonte canônica** mas vivo.

---

*Fim da Camada 2 do Eixo 1. 40 átomos especificados.*


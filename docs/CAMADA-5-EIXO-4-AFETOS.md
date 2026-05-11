# Camada 5 — Eixo 4: Afetos (3-4 anos)

> Detalhamento de átomos do Eixo `Afetos` do Mundo dos Curiosos.
>
> **Status**: especificação de produção. Pronto para virar seed de banco + briefing de gravação + tickets de dev Phaser.
> **Volume**: 8 sessões × 4 átomos = 32 átomos.
> **Última atualização**: maio/2026

---

## 0. Premissas confirmadas

Mantidas integralmente do Eixo 1. Diferenças específicas deste eixo (críticas):

### Protagonismo
- **Equilíbrio total Garuzinho/Lolinha**. Ambos modelam emoções igualmente. Garuzinho modela calma, empatia, regulação. Lolinha modela alegria, expressão, energia. Quando o tema é tristeza ou raiva, AMBOS demonstram (cada um a seu modo) — isso normaliza a emoção.

### Tom de narração — não-negociável
- **Mais caloroso que os outros eixos**. Pausa mais longa entre falas (1.5-2s entre frases).
- **Voz `voice_garu` ligeiramente mais grave e mais lenta** neste eixo (1-2% redução de ritmo)
- **Voz `voice_lola` ligeiramente menos eufórica** em sessões 2, 3, 5 (temas mais sensíveis)
- **Sempre afirmativo**: nunca "não fica triste", sempre "está tudo bem ficar triste"

### Conteúdo — princípios pedagógicos
- **Emoções básicas apenas**: feliz, triste, bravo. Não trabalhar frustração, vergonha, inveja, ciúme, ansiedade — emoções complexas ficam para Mundo dos Exploradores (5-6).
- **Temporalidade**: toda emoção negativa é apresentada como **temporária** ("agora está triste, depois passa"). Crítico aos 3-4 anos, que não têm conservação temporal.
- **Validação primeiro, regulação depois**: a sequência S1-S5 valida cada emoção. Só em S6 introduzimos regulação (respiração). Não pular essa ordem.
- **Sem patologização**: nenhuma emoção é "ruim" ou "errada". Tristeza não precisa ser "consertada", precisa ser sentida e acolhida.
- **Empatia, não simpatia**: S5 ensina reconhecer emoção no outro, não "consertar" o outro.

### Ambiente sonoro
- **Música ambiente sutil permitida** neste eixo (única exceção à regra de silêncio). Pode ser tom suave de piano ou acordes longos, sempre baixo volume e nunca em S3 (raiva — silêncio é melhor).

---

## 1. Convenções desta camada

Idênticas aos eixos anteriores. Diferença: pausas mais longas no roteiro (1.5-2s entre falas em vez de 1s).

---

## 2. Sessão 1 — Eu fico feliz

**Objetivo**: reconhecer expressão facial de alegria e nomear "feliz".
**Conceitos**: `emocao-feliz`, `expressao-facial`.
**BNCC**: EI02EO01, EI03EO04.

### Átomo 4.1.1 — A carinha feliz
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `emocao-feliz`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO suave]
[GARUZINHO, calmo]: Hoje a gente vai falar de uma coisa importante.
[PAUSA 1.5s]
[LOLINHA]: Os sentimentos!
[PAUSA 1s]
[AÇÃO: Lolinha pula sorrindo enormemente]
[LOLINHA, alegre]: Olha minha carinha!
[GARUZINHO]: A Lolinha está FELIZ.
[PAUSA 1.5s]
[GARUZINHO]: Quando a gente fica feliz, a gente SORRI.
[AÇÃO: zoom na carinha sorridente]
[LOLINHA, sorrindo]: É bom ficar feliz!
[PAUSA 1.5s]
[AÇÃO: Garuzinho também sorri grande]
[GARUZINHO, sorrindo]: Eu também fico feliz quando estou com você.
[BRILHO CORAÇÃO suave]
[PAUSA 1.5s]
[LOLINHA]: Vem brincar de FELIZ!
```

**Nota narrativa**: aqui o coração da Lolinha brilha pela primeira vez fora de celebração — é uso emocional do elemento.

**Assets**: sprites Garu e Lola com expressões super-sorridentes, animação de brilho do coração, áudios.

**Retry**: B com diferentes contextos (Lolinha feliz por achar brinquedo, Garuzinho feliz por receber abraço); C com criação conjunta.

---

### Átomo 4.1.2 — Acha a carinha feliz
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `emocao-feliz`, `expressao-facial`
- **Critério**: ≥3 de 4 carinhas felizes identificadas

**Roteiro:**
```
[LOLINHA, animada]: Olha essas carinhas!
[GARUZINHO]: Toca SÓ nas felizes!
[A cada acerto]: [LOLINHA]: ESSA TÁ FELIZ!
[A cada erro (toque em carinha não-feliz)]: [GARUZINHO]: Essa é... outra carinha. Vê de novo.
```

**Mecânica**:
- 6 carinhas grandes na tela (90px cada)
- 3 felizes (sorrindo grande), 3 não-felizes (neutras ou levemente sérias — NÃO tristes ainda, distintas só pela boca)
- Toque em feliz: pulsa + brilha
- Toque em não-feliz: balança suave; voz nomeia o que vê ("essa é uma carinha tranquila")
- Não usar carinha triste como distrator (vem na próxima sessão)

**Assets**: 6 sprites de carinhas com mesma estrutura facial, variação só na boca.

**Retry**: 3 layouts diferentes.

---

### Átomo 4.1.3 — Faz a carinha feliz
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `emocao-feliz`, `expressao-corporal`
- **Critério**: ≥3 toques completados

**Roteiro:**
```
[LOLINHA, eufórica]: Vamos fazer carinhas felizes!
[AÇÃO: avatar customizável aparece (cachorrinho fofo com partes editáveis)]
[GARUZINHO]: Toca pra mudar a carinha. Faz ela FELIZ!
[A cada toque]: a boca muda — neutra, sorriso pequeno, sorriso grande
[Quando ficar bem sorridente]: [LOLINHA]: AGORA TÁ MUITO FELIZ!
```

**Mecânica**:
- Avatar de cachorrinho amigável (genérico, não Garu ou Lola — pra ser "qualquer um")
- Toque na boca: cicla entre 4 estados (séria, leve sorriso, sorriso médio, sorriso grande)
- Toque nos olhos: cicla entre 2 estados (abertos normal, brilhantes)
- Quando criança chega no sorriso grande + olhos brilhantes: animação especial de "carinha super feliz" + sons alegres
- Sem objetivo "errado" — todo estado é aceito; sistema só celebra quando atinge o "máximo feliz"

**Assets**: avatar customizável (sprite com partes substituíveis), 4 bocas, 2 estilos de olhos, animação especial.

**Retry**: 2 avatares — cachorrinho / coelhinho.

---

### Átomo 4.1.4 — Você sabe ficar feliz!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Sol Sorriso` (sol antropomórfico com sorriso enorme)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ É FELIZ!
[GARUZINHO]: E ser feliz é gostoso.
[PAUSA 1s]
[AÇÃO: Sol Sorriso aparece brilhando]
[LOLINHA]: O SOL SORRISO quer ir com você!
```

---

## 3. Sessão 2 — Eu fico triste

**Objetivo**: reconhecer expressão de tristeza e nomear "triste".
**Conceitos**: `emocao-triste`, `expressao-facial`.
**BNCC**: EI02EO01, EI03EO04.

### Átomo 4.2.1 — Hoje a Lolinha tá triste
- **Tipo**: `listen` · **Duração**: 60s · **Engine**: `video`
- **Conceitos**: `emocao-triste`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO suave, mais baixo que o normal]
[AÇÃO: Lolinha aparece com orelhinhas abaixadas, sem o sorriso usual]
[GARUZINHO, calmo, suave]: Lolinha, você tá bem?
[PAUSA 1.5s]
[LOLINHA, mais baixinho]: Eu tô meio... TRISTE.
[GARUZINHO]: Tá tudo bem ficar triste.
[PAUSA 2s]
[GARUZINHO]: Quando a gente fica triste, a carinha fica assim...
[AÇÃO: zoom na carinha da Lolinha — boca pra baixo, olhos levemente fechados]
[GARUZINHO]: Boquinha pra baixo.
[PAUSA 1.5s]
[LOLINHA, suave]: Às vezes a gente fica triste.
[GARUZINHO]: E depois passa.
[PAUSA 1.5s]
[AÇÃO: Garuzinho encosta carinhosamente na Lolinha]
[GARUZINHO]: Estou aqui com você.
[BRILHO CORAÇÃO suave]
[PAUSA 2s]
[LOLINHA, levemente melhor]: Obrigada, Garuzinho.
[PAUSA 1s]
[LOLINHA]: Quer aprender sobre estar triste?
```

**Nota crítica**: a tristeza da Lolinha é mostrada como temporária e acolhida. NUNCA explicar o motivo (não "ela está triste porque..."), pra não atrelar tristeza a evento específico. Tristeza é estado válido por si só.

**Música ambiente**: piano suave em tom baixo permitido aqui.

**Assets**: Lolinha em pose triste (orelhinhas abaixadas, postura encolhida), animação de Garuzinho aproximando carinhoso, áudios com inflexão melancólica suave (não dramática).

**Retry**: B com Garuzinho triste e Lolinha consolando (inverte papéis); C com ambos quietos juntos.

---

### Átomo 4.2.2 — Acha a carinha triste
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `emocao-triste`, `expressao-facial`
- **Critério**: ≥3 de 4 carinhas tristes identificadas

**Mecânica**:
- 6 carinhas: 3 tristes + 3 felizes (introduz comparação)
- Toque em triste: voz acolhe "Essa carinha tá TRISTE. Tá tudo bem."
- Toque em feliz: voz nomeia "Essa é feliz."
- Sem punir nem mesmo no erro — todas as identificações são aceitas com nomeação

**Roteiro:**
```
[GARUZINHO]: Toca nas carinhas TRISTES.
[Lembrar criança]: Boquinha pra baixo, olhinhos cansados.
```

---

### Átomo 4.2.3 — A casinha dos sentimentos
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `emocao-triste`, `acolhimento`
- **Critério**: ≥3 interações de acolhimento

**Mecânica**:
- Cenário "casinha" com 4 cantos — sala, cozinha, quarto, quintal
- Em cada canto, um personagem (não Garu/Lola — outros animaizinhos) com uma carinha (alguns tristes, alguns felizes, alguns neutros)
- Toque em personagem triste: aparece opção "dar abraço" (mão grande pode tocar nele)
- Após "abraço": personagem fica menos triste (carinha melhora um pouco, não fica feliz total)
- Garuzinho e Lolinha narram acompanhando

**Roteiro chave:**
```
[LOLINHA]: Olha quem mora na casinha!
[GARUZINHO]: Toca em quem precisa de carinho.
[Ao tocar triste]: [GARUZINHO]: Esse aqui tá triste. Você quer dar carinho?
[Após "abraço"]: [LOLINHA]: Carinho ajuda quando a gente tá triste.
```

**Nota pedagógica**: introduz empatia básica sem chamar de "consertar" o outro. Acolhimento é o ato.

**Assets**: cenário 4 cômodos, 6 personagens com carinhas variadas, mãozinha de carinho arrastável.

**Retry**: 2 cenários — casinha de dia / casinha de noite.

---

### Átomo 4.2.4 — Tristeza tá tudo bem
- **Tipo**: `celebrate` · **Duração**: 35s (um pouco mais longo)
- Colecionável: `Nuvem Suave` (nuvem cinza-claro fofa, com olhinhos calmos — não chorona)

**Roteiro:**
```
[BRILHO CORAÇÃO suave]
[LOLINHA, calorosa]: Você aprendeu sobre estar triste.
[GARUZINHO]: E que ficar triste é normal.
[PAUSA 1.5s]
[GARUZINHO]: Todo mundo fica triste às vezes.
[LOLINHA, suave]: E depois passa.
[PAUSA 1s]
[AÇÃO: Nuvem Suave aparece flutuando]
[GARUZINHO]: A NUVEM SUAVE quer ir com você. Quando você ficar triste, ela tá lá.
```

**Nota**: este colecionável tem função emocional real — é "amigo da tristeza" da criança, sempre disponível na casinha. Não é troféu, é companhia.

---

## 4. Sessão 3 — Eu fico bravo

**Objetivo**: reconhecer expressão de raiva e nomear "bravo".
**Conceitos**: `emocao-bravo`, `expressao-facial`.
**BNCC**: EI02EO01, EI03EO04.

### Átomo 4.3.1 — Hoje o Garuzinho tá bravo
- **Tipo**: `listen` · **Duração**: 60s · **Engine**: `video`
- **Conceitos**: `emocao-bravo`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[AÇÃO: Garuzinho aparece com pelos eriçados, sobrancelha franzida (mas não rosnando — fofo bravo, não ameaçador)]
[LOLINHA, gentil]: Garuzinho, você tá bravo?
[PAUSA 1.5s]
[GARUZINHO, voz um pouco mais grossa, ainda calmo]: Eu tô meio BRAVO.
[LOLINHA]: Tá tudo bem ficar bravo.
[PAUSA 2s]
[GARUZINHO]: Quando a gente fica bravo, a carinha fica assim...
[AÇÃO: zoom — sobrancelhas pra dentro, boquinha apertada]
[GARUZINHO]: Sobrancelhinha pra dentro. Boquinha apertada.
[PAUSA 1.5s]
[LOLINHA]: A gente fica bravo às vezes.
[GARUZINHO]: E também passa.
[PAUSA 1.5s]
[GARUZINHO, expirando]: Fuuuuuu.
[LOLINHA, intrigada]: O que você fez?
[GARUZINHO]: Soltei o ar. Ajuda a passar.
[PAUSA 1.5s]
[GARUZINHO, mais relaxado já]: Olha. Já tô melhor.
[BRILHO CORAÇÃO suave]
[PAUSA 1.5s]
[LOLINHA]: Vem aprender sobre estar bravo.
```

**Nota crítica**:
1. Raiva NÃO é mostrada como agressão. Garuzinho não rosna, não morde, não grita. É "bravinho fofo".
2. Já aqui se prenuncia respiração (S6) sem ainda explicar. Plantando semente.
3. SEM música ambiente. Silêncio reforça a sensação.

**Assets**: Garuzinho em pose bravinha (pelo eriçado, sobrancelha franzida, postura tensa), animação de "soltar o ar", áudios.

**Retry**: B com Lolinha brava (inverte); C com ambos bravos que se acalmam juntos.

---

### Átomo 4.3.2 — Acha a carinha brava
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Critério**: ≥3 de 4 acertos

**Mecânica**: 6 carinhas (3 bravas + 3 felizes/neutras). Toque em brava: voz acolhe.

**Roteiro:**
```
[GARUZINHO]: Toca nas carinhas BRAVAS.
[Ao acertar]: [LOLINHA]: ESSA TÁ BRAVA. E tá tudo bem.
```

---

### Átomo 4.3.3 — Ajuda quem tá bravo
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `emocao-bravo`, `regulacao-introducao`
- **Critério**: ≥3 interações

**Mecânica**:
- Cenário com 3-4 personagens bravinhos
- Ao tocar em personagem bravo: aparecem 2 opções visuais — "soprar com ele" (introdução à respiração) ou "esperar junto"
- Ambas as opções são válidas; cada uma tem animação curta
- Personagem fica menos bravo após interação (não vira feliz total — só menos bravo, mais regulado)

**Roteiro chave:**
```
[LOLINHA]: Esse aqui tá bravo.
[GARUZINHO]: Você quer SOPRAR junto com ele? Ou ESPERAR com ele?
[Ambas opções válidas]
[Após "soprar"]: [GARUZINHO]: Soprar ajuda a passar.
[Após "esperar"]: [LOLINHA]: Ficar junto também ajuda.
```

**Assets**: cenário neutro com 4 personagens bravinhos, mecânica "soprar" (toque longo) e "esperar" (toque + animação de paciência), áudios.

**Retry**: 2 cenários — parque / quintal.

---

### Átomo 4.3.4 — Raiva tá tudo bem
- **Tipo**: `celebrate` · **Duração**: 35s
- Colecionável: `Folha Calma` (folha verde com carinha serena, balançando suavemente)

**Roteiro:**
```
[BRILHO CORAÇÃO suave]
[GARUZINHO]: Você aprendeu sobre estar bravo.
[LOLINHA]: E que ficar bravo é normal também.
[PAUSA 1.5s]
[GARUZINHO]: Todo mundo fica bravo às vezes.
[LOLINHA]: E também passa.
[PAUSA 1s]
[AÇÃO: Folha Calma aparece flutuando suave]
[GARUZINHO]: A FOLHA CALMA quer ir com você. Quando você ficar bravo, ela ajuda a respirar.
```

**Nota**: Folha Calma é amigo-da-raiva, prepara terreno para S6 (respiração).

---

## 5. Sessão 4 — O que me deixa feliz?

**Objetivo**: associar situações cotidianas à alegria + vocabulário expressivo.
**Conceitos**: `emocao-feliz`, `vocabulario-afetivo`.
**BNCC**: EI03EO04, EI03EF01.

### Átomo 4.4.1 — As coisas felizes
- **Tipo**: `listen` · **Duração**: 60s · **Engine**: `video`
- **Conceitos**: `emocao-feliz`, `causa-feliz`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[LOLINHA, animada]: Sabia que muitas coisas deixam a gente feliz?
[PAUSA 1.5s]
[AÇÃO: Lolinha brinca com um brinquedo]
[LOLINHA]: BRINCAR me deixa FELIZ!
[PAUSA 1.5s]
[AÇÃO: Garuzinho recebendo afago]
[GARUZINHO, sorrindo]: Receber CARINHO me deixa feliz.
[PAUSA 1.5s]
[AÇÃO: ambos comendo algo gostoso]
[LOLINHA]: Comer coisa GOSTOSA também!
[PAUSA 1.5s]
[AÇÃO: ambos juntos com sol no céu]
[GARUZINHO]: Estar com QUEM A GENTE GOSTA.
[BRILHO CORAÇÃO]
[PAUSA 1.5s]
[LOLINHA]: E você? O que te deixa feliz?
[PAUSA 1s]
[GARUZINHO]: Vem mostrar pra gente!
```

**Assets**: cenas curtas de cada situação feliz, áudios com inflexão alegre.

**Retry**: B com situações alternativas (cantar, correr, ouvir história); C focada em interação social.

---

### Átomo 4.4.2 — O que me deixa feliz
- **Tipo**: `imitate` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `vocabulario-afetivo`, `expressao`
- **Critério**: ≥3 escolhas feitas

**Mecânica**:
- Tela com pergunta-visual: "O que te deixa FELIZ?" (com balão da Lolinha)
- 6 figuras grandes em cards: brinquedo, abraço, sorvete, família, brincar com bichinho, ler com alguém
- Criança toca nas que a deixam feliz (múltiplas escolhas válidas)
- Cada escolha: card brilha + voz celebra a escolha
- Sem ordem certa; toda escolha é validada

**Roteiro chave:**
```
[LOLINHA]: Toca em TUDO que te deixa feliz!
[A cada escolha]: [GARUZINHO]: [item escolhido] te deixa feliz!
[Final]: [LOLINHA]: Que demais saber o que te deixa feliz!
```

**Assets**: 6 cards com ilustrações grandes e claras, áudios.

**Retry**: 2 conjuntos diferentes de opções.

---

### Átomo 4.4.3 — Crie sua festa feliz
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `expressao`, `criacao`
- **Critério**: ≥3 elementos adicionados

**Mecânica**:
- Cenário "festa" vazio que a criança preenche
- "Estoque" lateral com elementos arrastáveis: bolo, balões, brinquedos, amiguinhos, música (notas musicais), comida gostosa
- Cada item arrastado pro cenário: aparece + som curto + Lolinha celebra ("Mais felicidade!")
- Quando criança coloca 3+ itens: festa "ganha vida" — luzes piscam, personagens dançam suavemente
- Não há "errado"; criança constrói sua festa

**Assets**: cenário base + ~10 itens arrastáveis + animação "festa ativa".

**Retry**: 2 cenários — festa em casa / festa no parque.

---

### Átomo 4.4.4 — Você sabe o que te faz feliz!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Coração Brilhante` (coração dourado pulsando)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[LOLINHA]: VOCÊ SABE O QUE TE DEIXA FELIZ!
[GARUZINHO]: Saber isso é importante.
[PAUSA 1.5s]
[AÇÃO: Coração Brilhante aparece]
[LOLINHA]: Esse CORAÇÃO BRILHANTE guarda as suas coisas felizes!
```

---

## 6. Sessão 5 — Quando alguém está triste

**Objetivo**: reconhecer tristeza no outro; introduzir empatia básica.
**Conceitos**: `empatia`, `emocao-triste`.
**BNCC**: EI02EO02, EI03EO03.

### Átomo 4.5.1 — O amiguinho que tá triste
- **Tipo**: `listen` · **Duração**: 60s · **Engine**: `video`
- **Conceitos**: `empatia`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO suave]
[AÇÃO: cenário com novo personagem — coelhinho com orelhinhas abaixadas]
[LOLINHA, baixinho]: Olha, o coelhinho tá com a carinha triste.
[GARUZINHO]: Como você sabe?
[LOLINHA]: Olha a boquinha dele.
[AÇÃO: zoom na carinha triste do coelhinho]
[PAUSA 1.5s]
[GARUZINHO]: Quando alguém está triste, a gente percebe pela carinha.
[PAUSA 1.5s]
[AÇÃO: Lolinha se aproxima do coelhinho devagar]
[LOLINHA, suave]: Oi coelhinho. Você tá triste?
[AÇÃO: coelhinho acena que sim]
[GARUZINHO]: A gente pode FICAR PERTO. Isso ajuda.
[AÇÃO: Garuzinho senta ao lado do coelhinho em silêncio]
[PAUSA 2s]
[LOLINHA]: A gente não precisa CONSERTAR.
[GARUZINHO]: Só estar junto já ajuda.
[BRILHO CORAÇÃO suave]
[PAUSA 1.5s]
[LOLINHA]: Vem aprender a ajudar amiguinho triste.
```

**Nota crítica**: aqui está o conceito-chave de empatia aos 3-4 anos — RECONHECER e ESTAR JUNTO. Não consertar. Não animar à força. Resistir à tentação de fazer Lolinha "fazer o coelhinho rir".

**Música ambiente**: piano suave permitido.

**Assets**: coelhinho com carinha triste, animação de aproximação suave, áudios com inflexão acolhedora.

**Retry**: B com gatinho; C com passarinho (criança que pode ser percebido como diferente).

---

### Átomo 4.5.2 — Quem precisa de carinho?
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `empatia`, `reconhecimento-emocao`
- **Critério**: ≥3 de 4 identificações

**Mecânica**:
- 4 personagens animais com carinhas variadas (alguns tristes, alguns felizes, alguns neutros)
- Criança toca em quem está triste
- Acerto: personagem responde com sorriso pequeno (acolhimento recebido)
- Erro (toque em feliz): voz reconhece "Esse aqui tá feliz. Procura quem tá triste."

**Roteiro chave:**
```
[GARUZINHO]: Quem aqui precisa de carinho?
[LOLINHA]: Olha as carinhas!
[Ao acertar]: [GARUZINHO]: Sim, esse coelhinho tá triste. Que bom que você viu.
```

---

### Átomo 4.5.3 — Dá um abraço
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `empatia`, `acolhimento`
- **Critério**: ≥3 abraços dados

**Mecânica**:
- Cenário "parquinho" com 4-5 personagens tristes
- Mão grande arrastável (representa a criança)
- Criança arrasta a "mão" até um personagem
- Quando aproxima: personagem ergue cabecinha; toque longo (1.5s) = abraço
- Após abraço: personagem sorri suavemente (não viramuito feliz — fica acolhido, não "consertado")

**Roteiro chave:**
```
[LOLINHA]: Arrasta a mãozinha pra dar abraço!
[Após abraço]: [GARUZINHO]: Olha. Ele se sentiu melhor.
[LOLINHA]: Abraço ajuda.
```

**Assets**: cenário parquinho, 5 personagens animados, mãozinha arrastável.

**Retry**: 2 cenários — parquinho / sala da escolinha.

---

### Átomo 4.5.4 — Você é um amigo!
- **Tipo**: `celebrate` · **Duração**: 35s
- Colecionável: `Mão Amiga` (mão amigável aberta, com coração na palma)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[GARUZINHO, suave]: Você aprendeu a ver quem precisa de carinho.
[LOLINHA]: Isso é ser AMIGO.
[PAUSA 1.5s]
[AÇÃO: Mão Amiga aparece]
[GARUZINHO]: A MÃO AMIGA quer ir com você. Ela lembra que sempre tem alguém pra dar carinho.
```

---

## 7. Sessão 6 — Respira devagar

**Objetivo**: aprender técnica de respiração lenta como autorregulação.
**Conceitos**: `autorregulacao`, `respiracao`.
**BNCC**: EI02CG02, EI03EO02.

### Átomo 4.6.1 — O sopro mágico
- **Tipo**: `listen` · **Duração**: 60s · **Engine**: `video`
- **Conceitos**: `respiracao`, `autorregulacao`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO]: Lembra quando a gente fica BRAVO?
[LOLINHA]: Lembro!
[GARUZINHO]: Tem uma coisa que ajuda. Olha.
[PAUSA 1.5s]
[AÇÃO: Garuzinho infla peitinho como se enchesse de ar — devagarinho]
[GARUZINHO, inspirando]: Inspiraaaa...
[PAUSA 2s — som de inspiração suave]
[AÇÃO: Garuzinho solta o ar como se soprasse vela]
[GARUZINHO, expirando]: Fuuuuuuu...
[PAUSA 2.5s]
[LOLINHA]: O que isso faz?
[GARUZINHO, sereno]: Acalma. Pequena mágica.
[PAUSA 1.5s]
[AÇÃO: animação de "flor abrindo" representando inspiração + "flor fechando" no expirar]
[GARUZINHO]: Quando você tiver bravo, ou triste, faz comigo.
[GARUZINHO, modelando]: Inspiraaaa... (pausa 2s) ...fuuuuu.
[PAUSA 2s]
[LOLINHA, tentando]: Inspiraaaa... fuuuuu!
[GARUZINHO]: Boa, Lolinha!
[PAUSA 1.5s]
[GARUZINHO]: Vem fazer comigo.
```

**Nota crítica**: o ritmo aqui é o conteúdo. Pausas LONGAS (2-2.5s) entre inspirar e expirar. Não acelerar. Modelar visualmente: peito incha quando inspira, encolhe quando expira.

**Assets**: animação detalhada de Garuzinho respirando, "flor abrindo/fechando" como visual de respiração, áudio com sons de inspiração e expiração reais (não exagerados).

**Retry**: B com Lolinha modelando (inverte); C com ambos respirando juntos.

---

### Átomo 4.6.2 — Respira comigo
- **Tipo**: `imitate` · **Duração**: 90s (mais longo) · **Engine**: `phaser`
- **Conceitos**: `respiracao`, `autorregulacao`
- **Critério**: ≥3 ciclos completos de respiração guiada

**Mecânica**:
- Tela calma, fundo azul-claro/lavanda suave
- "Flor" gigante no centro
- Animação cíclica:
  1. Flor começa fechada
  2. Voz do Garuzinho: "Inspiraaaaaaa..." (3s) — flor abre devagar
  3. Pausa breve (0.5s)
  4. Voz: "...fuuuuuuuu" (3s) — flor fecha devagar
  5. Repete por 3 ciclos
- Criança não precisa fazer nada — só assistir/respirar junto
- Botão "PRONTO" disponível após 1º ciclo (não força conclusão)
- A cada ciclo, Lolinha narra encorajadora: "isso aí... boa..."

**Roteiro chave:**
```
[GARUZINHO, calmo]: Vamos respirar juntinhos.
[LOLINHA, baixinho]: Olha a flor.
[Início ciclo]: [GARUZINHO]: Inspiraaaaa... (flor abre) ...fuuuuuu (flor fecha).
[Após cada ciclo]: [LOLINHA]: Tá indo bem.
[Após 3 ciclos]: [GARUZINHO, calmo]: Como você se sente?
```

**Assets**: animação de flor respirante (Lottie/Framer Motion), áudios de respiração modelada, música ambiente piano sutil.

**Retry**: 2 visuais — flor / balão (mesma mecânica).

---

### Átomo 4.6.3 — Quando você quiser
- **Tipo**: `play` · **Duração**: 60-120s (criança decide) · **Engine**: `phaser`
- **Conceitos**: `respiracao`, `autonomia`
- **Critério**: tocar no botão de respiração ≥1 vez

**Mecânica**:
- Tela com cenário tranquilo (paisagem suave)
- Botão grande "RESPIRAR JUNTO" no canto
- Quando criança toca: aciona animação de respiração + Garuzinho/Lolinha respiram visíveis
- Pode tocar várias vezes
- Ideia pedagógica: a criança DESCOBRE que pode acessar a respiração quando quiser

**Roteiro chave:**
```
[LOLINHA]: Quando você quiser respirar comigo, toca aqui!
[GARUZINHO]: Pode fazer quantas vezes quiser.
[Após cada respiração]: [GARUZINHO]: Bom respirar, né?
```

**Assets**: cenário sereno (campo com flores, céu pastel), botão grande coral pulsante, animações reutilizadas.

**Retry**: 2 cenários — campo / praia ao pôr do sol.

---

### Átomo 4.6.4 — Você sabe se acalmar!
- **Tipo**: `celebrate` · **Duração**: 35s
- Colecionável: `Folha Respirante` (folha verde grande que respira — abre e fecha sutilmente)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[GARUZINHO, suave]: Você aprendeu uma coisa importante.
[LOLINHA]: Respirar te ajuda!
[PAUSA 1.5s]
[AÇÃO: Folha Respirante aparece flutuando, respirando]
[GARUZINHO]: A FOLHA RESPIRANTE fica com você. Toca nela quando precisar.
```

**Nota**: este colecionável é interativo na casinha virtual — toque nele aciona respiração guiada. Recurso real de autorregulação que a criança pode acessar a qualquer momento dentro do app.

---

## 8. Sessão 7 — Posso pedir ajuda

**Objetivo**: reconhecer que pedir ajuda é positivo + verbalizar pedido.
**Conceitos**: `pedir-ajuda`, `comunicacao`.
**BNCC**: EI02EO03, EI03EO04.

### Átomo 4.7.1 — Pedir ajuda é forte
- **Tipo**: `listen` · **Duração**: 55s · **Engine**: `video`
- **Conceitos**: `pedir-ajuda`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[AÇÃO: Lolinha tentando alcançar brinquedo numa prateleira alta]
[LOLINHA, esforçando]: Hmmf... não alcanço!
[PAUSA 1.5s]
[GARUZINHO, próximo]: Você precisa de ajuda?
[PAUSA 1s]
[LOLINHA]: Sim! Você me ajuda?
[GARUZINHO, sorrindo]: Claro!
[AÇÃO: Garuzinho ajuda a alcançar — ambos felizes]
[PAUSA 1.5s]
[LOLINHA]: Obrigada!
[PAUSA 1.5s]
[GARUZINHO]: Pedir ajuda é uma coisa FORTE.
[LOLINHA, intrigada]: Forte? Como assim?
[GARUZINHO]: É forte porque a gente RECONHECE que precisa.
[PAUSA 1.5s]
[GARUZINHO]: E aí a gente consegue.
[PAUSA 1.5s]
[LOLINHA]: Você pode pedir ajuda também!
[GARUZINHO]: Pro papai, pra mamãe, pra alguém que cuida de você.
[BRILHO CORAÇÃO]
[PAUSA 1.5s]
[LOLINHA]: Vem aprender a pedir ajuda.
```

**Nota crítica**: pedir ajuda é tratado como ATO DE FORÇA, não de fraqueza. Mudança de narrativa importante. Aos 3-4 anos plantar essa raiz é importante.

**Assets**: cenário com prateleira alta, Lolinha tentando + Garuzinho ajudando, áudios com inflexão calorosa.

**Retry**: B com Garuzinho precisando de ajuda; C com ambos pedindo a um humano (mãe/pai estilizado).

---

### Átomo 4.7.2 — Quem precisa de ajuda?
- **Tipo**: `imitate` · **Duração**: 60s · **Engine**: `phaser`
- **Conceitos**: `pedir-ajuda`, `reconhecimento`
- **Critério**: ≥3 de 4 identificações

**Mecânica**:
- 4 cenas mini: personagem tentando algo difícil (alcançar, levantar, abrir, achar)
- Criança toca em quem precisa de ajuda
- Acerto: personagem fica feliz; aparece adulto-figura ajudando
- Sem erro punitivo — sistema reconhece todos os toques com nomeação

**Roteiro chave:**
```
[GARUZINHO]: Olha as cenas! Quem precisa de ajuda?
[Ao acertar]: [LOLINHA]: SIM! Esse precisa de ajuda. Que bom que você viu.
```

---

### Átomo 4.7.3 — Diz "me ajuda?"
- **Tipo**: `play` · **Duração**: 70s · **Engine**: `phaser`
- **Conceitos**: `pedir-ajuda`, `comunicacao`, `verbalizacao`
- **Critério**: ≥3 interações de pedido

**Mecânica**:
- Cenário simples — criança vê cena com obstáculo (algo alto, algo difícil)
- Botão grande "PEDIR AJUDA" pulsa
- Ao tocar: personagem (escolha da criança entre figura-pai, figura-mãe, professora) aparece e ajuda
- Cena se resolve com animação positiva
- Sistema NÃO captura voz da criança — apenas o gesto de pedir

**Roteiro chave:**
```
[LOLINHA]: Aqui você não alcança o brinquedo.
[GARUZINHO]: Quem pode te ajudar? Toca em PEDIR AJUDA!
[Após toque]: [GARUZINHO]: Você pediu! Olha, vem ajuda!
[AÇÃO: figura adulta aparece e resolve]
```

**Assets**: 3 cenas com obstáculos diferentes, 3 figuras adultas estilizadas (gênero-neutras), animações de "ajuda chegando".

**Retry**: 2 conjuntos de cenas.

---

### Átomo 4.7.4 — Você sabe pedir ajuda!
- **Tipo**: `celebrate` · **Duração**: 30s
- Colecionável: `Sininho Ajuda` (sininho dourado pequeno com carinha amigável)

**Roteiro:**
```
[BRILHO CORAÇÃO]
[GARUZINHO]: Você aprendeu uma coisa muito importante.
[LOLINHA]: Pedir ajuda é coisa de gente forte!
[PAUSA 1.5s]
[AÇÃO: Sininho Ajuda aparece tilintando suave]
[GARUZINHO]: O SININHO AJUDA quer ir com você.
```

---

## 9. Sessão 8 — Eu sou eu (final do Eixo + final do Mundo)

**Objetivo**: construir imagem positiva de si — nome, características, preferências.
**Conceitos**: `identidade`, `autoestima`.
**BNCC**: EI02EO05, EI03EO06.

### Átomo 4.8.1 — Eu sou único
- **Tipo**: `listen` · **Duração**: 65s · **Engine**: `video`
- **Conceitos**: `identidade`, `autoestima`
- **Critério**: ≥80% assistido

**Roteiro:**
```
[APITO]
[GARUZINHO, calmo]: Hoje a gente vai falar de uma coisa especial.
[PAUSA 1.5s]
[LOLINHA]: VOCÊ.
[PAUSA 2s]
[GARUZINHO]: Você é UM-A SÓ no mundo todo.
[LOLINHA]: Só tem UM-A de você.
[PAUSA 1.5s]
[AÇÃO: espelho aparece refletindo... a própria criança? Não — animal genérico fofo que representa]
[GARUZINHO]: Você tem um NOME. Esse nome é seu.
[PAUSA 1.5s]
[LOLINHA]: Eu sou Lolinha.
[GARUZINHO]: E eu sou Garuzinho.
[PAUSA 1s]
[LOLINHA]: E você?
[PAUSA 2.5s — esperando criança "responder" mentalmente]
[GARUZINHO]: Você tem seu nome especial.
[PAUSA 1.5s]
[GARUZINHO]: Você gosta de coisas. Tem cores favoritas. Comidas favoritas.
[LOLINHA]: BICHINHOS favoritos!
[PAUSA 1.5s]
[GARUZINHO]: Tudo isso é VOCÊ.
[BRILHO CORAÇÃO grande]
[PAUSA 2s]
[LOLINHA, sentido]: E a gente gosta de você do jeito que você é.
[PAUSA 2s]
[GARUZINHO]: Vem conhecer mais sobre você mesmo.
```

**Nota crítica**: este é o átomo emocionalmente mais carregado de todo o Mundo dos Curiosos. Pausas longas são essenciais. A frase final ("gostamos de você do jeito que você é") precisa ser sentida pela voz, não corrida.

**Música ambiente**: piano + cordas suaves permitido.

**Assets**: cenário íntimo (não festivo), espelho estilizado, animação de Garuzinho e Lolinha próximos olhando para a "tela" (a criança), áudios com inflexão extremamente carinhosa.

**Retry**: B com Garuzinho falando primeiro; C com ambos em uníssono em algumas frases.

---

### Átomo 4.8.2 — Como eu sou?
- **Tipo**: `imitate` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `identidade`, `autoexpressao`
- **Critério**: ≥3 escolhas feitas

**Mecânica**:
- Sequência de "perguntas-visuais" simples sobre a criança
- Cada pergunta tem 2-4 cards com opções visuais
- Perguntas (nessa ordem):
  1. Sua cor favorita? (cards com 4 cores)
  2. Você gosta de... (cards: brincar, ouvir histórias, correr, desenhar)
  3. Seu bichinho favorito? (cards: cachorro, gato, coelhinho, peixinho)
  4. Você é... (cards: alegre, quieto, curioso, brincalhão)
- Criança toca; sistema "lembra" das escolhas
- Cada escolha é validada com voz: "Você gosta de [escolha]! Que legal!"

**Roteiro chave:**
```
[GARUZINHO]: Vamos descobrir como você é!
[Cada pergunta]: voz pergunta + opções aparecem
[Após escolha]: [LOLINHA]: VOCÊ é assim! Que legal!
[Final]: [GARUZINHO]: Olha tudo o que aprendi sobre você...
[AÇÃO: cards escolhidos reaparecem juntos formando "retrato"]
```

**Assets**: 4 sets de cards (~16 cards no total), animação de "retrato montando" no final.

**Retry**: perguntas idênticas mas em ordem aleatória.

---

### Átomo 4.8.3 — Eu, eu, eu!
- **Tipo**: `play` · **Duração**: 80s · **Engine**: `phaser`
- **Conceitos**: `identidade`, `autoexpressao`, `criacao`
- **Critério**: ≥3 elementos customizados

**Mecânica**:
- Avatar customizável (animal fofo neutro) que a criança "veste"
- Opções de customização: cor do pelo (5 opções), tipo de acessório (laço, coleira, chapéu, óculos), expressão (3 sorrisos)
- Cada modificação: avatar reage feliz
- Quando criança termina (ou quando toca em "PRONTO"): avatar pula e Garuzinho/Lolinha celebram a criação
- O avatar criado vira "Mini-Eu" — fica disponível na casinha virtual

**Roteiro chave:**
```
[LOLINHA]: Vamos fazer um MINI-EU!
[GARUZINHO]: Toca pra mudar como ele é!
[A cada mudança]: [LOLINHA]: Tá ficando lindo!
[Final]: [GARUZINHO]: Olha! É um MINI-VOCÊ!
```

**Assets**: avatar base com partes substituíveis, ~15 opções de customização.

**Retry**: criança pode recriar quantas vezes quiser.

---

### Átomo 4.8.4 — VOCÊ É UM CORAÇÃO CURIOSO! (final do Mundo dos Curiosos)
- **Tipo**: `celebrate` (super-especial — fim do Mundo) · **Duração**: 90s
- **Engine**: `phaser`
- Colecionáveis: `Espelhinho do Eu` + **medalha** `Coração Curioso` + **conquista de Mundo** `Curioso Completo`

**Roteiro:**
```
[BRILHO CORAÇÃO grande, prolongado]
[LOLINHA, emocionada]: VOCÊ É VOCÊ. E você é INCRÍVEL.
[PAUSA 2s]
[GARUZINHO, sentido]: Você aprendeu sobre sentimentos.
[LOLINHA]: E sobre PEDIR AJUDA.
[GARUZINHO]: E sobre RESPIRAR quando precisa.
[LOLINHA]: E sobre AMIGOS.
[PAUSA 2s]
[AÇÃO: medalha "Coração Curioso" aparece]
[GARUZINHO]: Você ganhou a medalha CORAÇÃO CURIOSO.
[PAUSA 1.5s]
[AÇÃO: tela amplia, mostrando TODOS os colecionáveis dos 4 eixos juntos — 38 colecionáveis + 3 medalhas anteriores + a nova]
[LOLINHA, emocionada]: E olha! Você completou TUDO no Mundo dos Curiosos!
[PAUSA 2s]
[GARUZINHO]: Você conheceu sons, letras, números, formas, cores, e sentimentos.
[PAUSA 1.5s]
[AÇÃO: medalha especial gigante aparece — "Curioso Completo"]
[GARUZINHO]: Essa medalha é a maior de todas. CURIOSO COMPLETO.
[PAUSA 2s]
[LOLINHA, suave]: Quando você crescer mais um pouquinho...
[GARUZINHO, gentil]: A gente vai te encontrar de novo.
[PAUSA 1.5s]
[LOLINHA]: Mas a gente vai ser GRANDE também! Vou ser a LOLA.
[GARUZINHO]: E eu vou ser o GARU.
[PAUSA 2s]
[LOLINHA, animada]: Até lá, você pode brincar com a gente quando quiser!
[GARUZINHO]: A casinha tá cheia dos seus amiguinhos.
[BRILHO CORAÇÃO]
[PAUSA 2s]
[LOLINHA]: Você sempre vai ser nosso CORAÇÃO CURIOSO.
[AÇÃO: botão "VOLTAR PRA CASINHA" + opção menor "MAIS UMA VEZ"]
```

**Mecânica**:
- Cena final maior — 90s, não 60s
- Revisão visual de TODOS os 38 colecionáveis (10+10+10+8) em desfile
- 3 medalhas anteriores aparecem (Conhecedor das Vogais, Contador Estrela, Mestre das Formas)
- Medalha do eixo aparece (Coração Curioso)
- Medalha SUPREMA do Mundo aparece (Curioso Completo) — diferenciada visualmente, dourada
- **Prenúncio narrativo do Mundo dos Exploradores**: "vamos ser grandes — Lola e Garu"
- 2 botões: voltar pra casinha (default) / refazer (opcional)

**Assets especiais**:
- Animação de desfile de 38 colecionáveis
- 4 medalhas em sequência
- Medalha "Curioso Completo" gigante e dourada
- `audio/eixo4/s8-a4-mundo-final.mp3` (90s, narração mais elaborada e emotiva)
- Música ambiente: piano + cordas + fanfarra suave (não estridente)

**Retry**: medalha "Curioso Completo" é entregue uma vez só. Em retornos, fala alternativa "Você ainda é o nosso Coração Curioso!".

---

## 10. Lista consolidada de colecionáveis do Eixo 4

| Sessão | Colecionável | Aparência / função |
|---|---|---|
| 1 | Sol Sorriso | Sol antropomórfico sorrindo enorme |
| 2 | Nuvem Suave | Nuvem cinza-claro fofa, olhinhos calmos — companhia para tristeza |
| 3 | Folha Calma | Folha verde serena balançando — companhia para raiva |
| 4 | Coração Brilhante | Coração dourado pulsando — guarda das coisas felizes |
| 5 | Mão Amiga | Mão aberta com coração na palma |
| 6 | Folha Respirante | Folha verde que respira (abre/fecha) — **interativa: aciona respiração guiada** |
| 7 | Sininho Ajuda | Sininho dourado pequeno amigável |
| 8 | Espelhinho do Eu + **medalha "Coração Curioso"** + **conquista "Curioso Completo"** |

**Casinha após Eixo 4 (fim do Mundo dos Curiosos)**: 38 colecionáveis + 4 medalhas + 1 conquista suprema de Mundo.

**Interatividade especial dos colecionáveis afetivos**: na casinha virtual, os colecionáveis do Eixo 4 têm comportamento especial:
- Tocar em `Folha Respirante` → aciona ciclo de respiração guiada (mesmo do átomo 4.6.3)
- Tocar em `Sininho Ajuda` → toca som suave + mensagem do Garuzinho "Quando precisar, peça ajuda"
- Tocar em `Mão Amiga` → animação de abraço entre Garu e Lola
- Tocar em `Coração Brilhante` → mostra as escolhas que a criança fez em S4.A2 (suas coisas felizes)

Esses são recursos de regulação emocional REAIS dentro do app — não decoração.

---

## 11. Assets do Eixo 4

### Áudios — sensibilidade extra
**Total estimado**: ~35 min gravado + 50% retries = ~52 min.

**Diretrizes específicas para o estúdio**:
- Inflexão sempre calorosa, nunca neutra
- Pausas longas (não cortar no edit)
- Volume estável (sem variação dramática)
- Voz `voice_garu` 1-2% mais lenta que nos outros eixos
- Voz `voice_lola` menos eufórica em S2, S3, S5

### Música ambiente (única exceção à regra de silêncio)
- Piano suave + cordas longas, sempre baixo volume
- Disponível em: S1, S2, S4, S5, S6, S7, S8
- **NÃO usar em S3** (raiva — silêncio é melhor)

### SFX específicos
- Som suave de inspiração e expiração (S6) — real, não exagerado
- "Tilintar" do sininho (S7)
- Pulse cardíaco sutil (S4 — coração brilhante)

### Sprites — atenção especial
- **Expressões emocionais** dos personagens: Garu/Lola precisam de pelo menos 8 expressões cada (alegre, sorrindo, triste, bravinho, calmo, surpreso, acolhedor, sereno)
- **Carinhas de identificação** (S1.A2, S2.A2, S3.A2, S5.A2): conjunto de 6-8 carinhas com mesma estrutura mas variação só na boca/sobrancelha
- **Avatar customizável** (S1.A3, S8.A3): partes substituíveis
- **Espelhinho do Eu** (S8): item que mostra reflexo dos colecionáveis na casinha
- 8 colecionáveis + medalha Coração Curioso + medalha-suprema Curioso Completo

### Cenários
- Cenário neutro caloroso (S1)
- Quartinho íntimo (S2)
- Quintal/parquinho (S3, S5)
- Cenário-festa criada pela criança (S4)
- Cenário sereno respiração (S6)
- Cenário cotidiano com obstáculo (S7)
- Cenário "espelho do eu" (S8)

---

## 12. Schema seed Supabase — Eixo 4

```sql
insert into concepts (axis_id, slug, display_name, bncc_code) values
  ('<axis_id_eixo4>', 'emocao-feliz', 'Emoção feliz', 'EI02EO01'),
  ('<axis_id_eixo4>', 'emocao-triste', 'Emoção triste', 'EI02EO01'),
  ('<axis_id_eixo4>', 'emocao-bravo', 'Emoção bravo', 'EI02EO01'),
  ('<axis_id_eixo4>', 'expressao-facial', 'Expressão facial', 'EI03EO04'),
  ('<axis_id_eixo4>', 'empatia', 'Empatia', 'EI03EO03'),
  ('<axis_id_eixo4>', 'autorregulacao', 'Autorregulação', 'EI03EO02'),
  ('<axis_id_eixo4>', 'respiracao', 'Respiração consciente', 'EI02CG02'),
  ('<axis_id_eixo4>', 'pedir-ajuda', 'Pedir ajuda', 'EI02EO03'),
  ('<axis_id_eixo4>', 'identidade', 'Identidade pessoal', 'EI03EO06'),
  ('<axis_id_eixo4>', 'autoestima', 'Autoestima', 'EI02EO02');
```

Para átomos com música ambiente, adicionar em `config`:

```jsonb
{
  "musicAmbient": "calm-piano-loop.mp3",
  "musicVolume": 0.15
}
```

**Trigger especial**: completar S8.A4 (final do Mundo) dispara entry em `progress` com flag `world_completed: true` + emite evento para o painel do pai (notificação especial "Seu filho completou o Mundo dos Curiosos!").

---

## 13. Próximos passos

### Validação crítica antes da gravação
Eixo 4 é o **MAIS SENSÍVEL** de todos. Validação obrigatória com:
1. **Pedagogo infantil especializado em socioemocional** — não apenas educação geral
2. **Psicólogo clínico infantil** — para garantir que abordagem de tristeza/raiva não patologiza
3. **Famílias-piloto** — teste qualitativo com 5-10 crianças de 3-4 anos antes do scale

### Casting de voz especialmente cuidadoso
Atrizes e atores que vão gravar este eixo devem ter:
- Experiência em narração infantil socioemocional (referências: Daniel Tigre, Mundo Bita)
- Capacidade de modular volume e pausa (não correr roteiro)
- Empatia genuína perceptível na voz

### Camadas pós-Mundo dos Curiosos
Com os 4 eixos detalhados, **camada conceitual do Mundo dos Curiosos está completa**. Próximos trabalhos:

- **Spec do Mundo dos Exploradores (5-6 anos)** — arquitetura de 5 tiers (com Capítulo), átomos canônicos (apresentar/reconhecer/produzir/aplicar), Garu e Lola na versão jovem
- **Spec da casinha virtual** — UI/UX da coleção, interatividade dos colecionáveis afetivos
- **Spec do onboarding pai** — fluxo de cadastro, consentimento LGPD, escolha de voz, perfis múltiplos
- **Spec do painel do pai** — dashboard, relatórios, notificação de "Mundo completado"

---

## 14. Nota final do conteúdo do Mundo dos Curiosos

Com esta camada, está **fechado o desenho pedagógico completo do Mundo dos Curiosos (3-4 anos)**:

- 4 Eixos: Sons e Letras, Contar e Comparar, Formas e Cores, Afetos
- 38 Sessões totais
- 152 Átomos totais
- 38 Colecionáveis + 4 medalhas + 1 conquista suprema de Mundo
- ~210 minutos de áudio gravado (incluindo retries)
- ~30 cenários únicos
- ~150 sprites únicos (objetos, personagens, formas, colecionáveis)
- 20 códigos BNCC trabalhados — cobertura completa dos 5 campos de experiência

Pronto para virar:
- Seed de banco Supabase (script TS a escrever)
- Briefing de produção de áudio para casting
- Briefing de design para ilustradores
- Tickets de dev Phaser para minijogos

---

*Fim da Camada 5 do Eixo 4. Mundo dos Curiosos pedagogicamente especificado.*


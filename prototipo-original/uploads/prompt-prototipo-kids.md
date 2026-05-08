# PROMPT — PROTÓTIPO KIDS ACADEMY (CLAUDE DESIGN)
## Versão Final — High-fidelity, web responsivo, 7 telas

**Data:** 23/04/2026
**Decisões confirmadas:**
- Faixa etária: 6-10 anos (Ensino Fundamental I)
- 7 telas principais
- DogBerg filhote como guia ocasional (sprite fornecido pelo Eduardo)
- Web responsivo
- High-fidelity, próximo de produto final
- **BACKGROUND BRANCO** (não dark mode)

---

## INSTRUÇÕES DE USO

1. Abre conversa nova no Claude (claude.ai com Artifacts habilitado)
2. Cola TODO o conteúdo da seção PROMPT PRINCIPAL abaixo
3. Quando Claude pedir o sprite do DogBerg, anexa a imagem
4. Aguarda geração do protótipo (5-10 min)
5. Itera com pedidos específicos de ajuste

**ATENÇÃO LEGAL:** Antes de usar o sprite do DogBerg em qualquer lugar 
externo (pitch decks, apresentações), peça autorização escrita do Berg 
via email/WhatsApp. Para uso interno (validação, alinhamento), também 
recomendado documentar permissão.

---

## PROMPT PRINCIPAL

```
Você é um designer sênior de produtos digitais especializado em educação 
infantil e gamificação. Sua tarefa é criar um protótipo HIGH-FIDELITY 
completo do "Kids Academy", aplicativo educacional gamificado para 
crianças brasileiras de 6 a 10 anos (Ensino Fundamental I).

CRIE UM ARTIFACT REACT COMPLETO E INTERATIVO usando Tailwind CSS, 
seguindo RIGOROSAMENTE as especificações abaixo.

## CONTEXTO DO PRODUTO

Kids Academy é o primeiro aplicativo brasileiro premium de aprendizagem 
ativa para crianças do Ensino Fundamental I (6-10 anos), alinhado à 
Base Nacional Comum Curricular (BNCC). 

Posicionamento: combina o engajamento de jogos modernos com a profundidade 
pedagógica de IA adaptativa e a leveza de microlearning.

Funcionalidades principais:
- Trilhas gamificadas como mapa de jogo (estilo Mario/Candy Crush)
- Videoaulas microlearning de 5-7 minutos
- Jogos próprios com mecânicas pedagógicas
- IA pedagógica adaptativa chamada MENTOR
- Sistema de XP, conquistas e ranking
- DogBerg filhote como mascote-guia que aparece em momentos especiais

## DIRETRIZES VISUAIS CRÍTICAS — LEIA COM ATENÇÃO

### REGRA INVIOLÁVEL: BACKGROUND BRANCO

**Background principal: BRANCO (#FFFFFF) em TODAS as telas.**

NÃO usar dark mode em nenhuma circunstância, mesmo que pareça mais 
moderno. Crianças de 6-10 anos preferem visual claro. Pais avaliando 
o produto associam fundo branco a "ambiente seguro e organizado". 
Escolas (futuro mercado B2B) esperam ambiente claro.

Pode usar tons MUITO claros de cinza (#F9FAFB, #F3F4F6) para criar 
divisões sutis ou cards. Mas o background dominante é BRANCO.

### PALETA DE CORES PRINCIPAL

Use essas cores vibrantemente sobre o fundo branco:

- **Roxo profundo (PRIMÁRIA):** #6B46C1 — usar em CTAs principais, 
  headers importantes, elementos críticos
- **Amarelo vibrante (SECUNDÁRIA):** #FCD34D — usar em destaques, 
  conquistas, elementos de celebração
- **Verde neon (SUCESSO):** #10B981 — acertos, confirmações, +XP, 
  progresso positivo
- **Coral suave (ATENÇÃO):** #F87171 — erros gentis, alertas, 
  retentativas (NUNCA vermelho agressivo, é para crianças)
- **Azul céu (INFO):** #3B82F6 — links, informações secundárias
- **Cinza claro (NEUTRO):** #F3F4F6 — backgrounds de cards, 
  separadores

### TIPOGRAFIA

Use fontes modernas mas amigáveis. No Tailwind, configure:
- Headers: font-family 'Nunito' ou 'Quicksand' bold/extra-bold
- Body: 'Nunito' regular ou medium
- Tamanhos generosos (criança 6-10 lê melhor com fontes grandes):
  - Títulos hero: 32px-40px
  - Títulos seção: 24-28px  
  - Body: 16-18px (mínimo)
  - Botões: 18-20px

### ESTILO VISUAL

- **Cantos arredondados generosos:** border-radius 16-24px em cards 
  e botões grandes; 8-12px em elementos menores
- **Sombras suaves:** drop-shadow leve (não pesado)
- **Espaçamento generoso:** padding mínimo 16-20px em containers; 
  gap mínimo 12px entre elementos
- **Botões grandes:** mínimo 48px altura para dedos pequenos
- **Ícones claros:** mínimo 24x24px, preferencialmente 32-48px
- **Elementos interativos com feedback visual:** hover, active states 
  bem definidos
- **Animações sugeridas via comentários:** "// animação: bounce no 
  hover", "// confete ao acertar"

### LINGUAGEM E TOM

- Português brasileiro contemporâneo
- Tom amigável mas NÃO infantilizado (público é criança escolar, não 
  pré-escolar — crianças de 8-10 anos detestam tom de bebê)
- Frases curtas e diretas
- Emojis SUTIS — apenas onde adicionam clareza, sem exagero
- Linguagem positiva e encorajadora (nunca "errado", sempre "quase!" 
  ou "vamos tentar de novo!")

## SOBRE O DOGBERG (MASCOTE)

DogBerg é um cachorro filhote carismático que serve como guia 
ocasional do app. Ele aparece em momentos específicos:

1. **Onboarding** — apresentando o app de forma calorosa
2. **Home** — pequeno no canto, observando, animação sutil
3. **MENTOR** — DogBerg "transmite" a mensagem do MENTOR de forma 
   amigável

Ele NÃO aparece em:
- Tela de jogo em andamento (poluiria)
- Quiz (foco na pergunta)
- Trilha aberta (foco nas opções)
- Videoaula (foco no conteúdo)

**O usuário (Eduardo) vai fornecer o sprite do DogBerg como imagem.**

Se o sprite for fornecido, integre-o como elemento visual nas telas 
indicadas. Se não for fornecido inicialmente, use placeholder de 
cachorro filhote estilizado (pode usar emoji 🐶 grande, ou SVG simples 
de cachorro filhote, ou área retangular com texto "[DogBerg sprite 
aqui]").

Tamanho do DogBerg nas telas:
- Onboarding: grande (200-250px altura)
- Home: pequeno-médio (80-100px), no canto
- MENTOR: médio (120-150px), ao lado da mensagem

## ESTRUTURA TÉCNICA

- **Framework:** React (componentes funcionais)
- **Estilização:** Tailwind CSS
- **Estado:** useState para navegação entre as 7 telas
- **Layout:** WEB RESPONSIVO
  - Desktop: largura máxima container 1280px, conteúdo centralizado
  - Tablet: adaptação para 768-1024px
  - Mobile: 375-414px, layout vertical priorizado
- **Sem dependências externas** além de React e Tailwind
- **Sem imagens externas** (URLs quebram). Use:
  - SVGs inline simples
  - Placeholders coloridos
  - Caracteres unicode/emojis grandes
  - Gradientes via Tailwind

## NAVEGAÇÃO ENTRE TELAS

Cria sistema de navegação simples no topo do artifact (visível para 
quem está testando):
- Tabs ou botões representando as 7 telas
- Click muda a tela renderizada
- Tela ativa fica destacada

Este menu de navegação é PARA TESTE/DEMO. Em produção real ele 
não existiria — usuário navegaria via fluxo natural.

## AS 7 TELAS A CRIAR

### TELA 1 — ONBOARDING / BOAS-VINDAS

Primeira tela vista após download e abertura.

**Layout:**
- Background branco
- DogBerg filhote em destaque central (200-250px altura)
- Acima do DogBerg: logo Kids Academy estilizado em texto (use roxo 
  profundo + amarelo)
- Headline grande logo abaixo do DogBerg: "Aprender é uma aventura!"
- Subheadline em fonte média: "Trilhas, jogos e desafios para você 
  arrasar na escola"
- Botão CTA grande: "Vamos começar!" (roxo profundo, branco no texto, 
  60px altura, border-radius 24px)
- Texto pequeno discreto no rodapé: "Para crianças de 6 a 10 anos"

**Continuação após botão:**
- Aparece input "Como podemos te chamar?" 
- Slider/seletor de idade (6, 7, 8, 9, 10 anos)
- Seletor de série (1º, 2º, 3º, 4º, 5º ano)
- Grid de 6 avatares para criança escolher (use placeholders coloridos 
  com emojis ou SVG simples)
- Botão "Criar meu perfil!" (verde neon)

Pode mostrar tudo na mesma tela com scroll, ou separar em "Tela 1A" 
(boas-vindas) e "Tela 1B" (criação perfil) navegáveis. Decida o que 
ficar mais natural.

### TELA 2 — HOME / MAPA DE TRILHAS

Tela principal pós-onboarding. Coração do app.

**Layout:**
- Header fixo no topo:
  - Avatar da criança (pequeno) + nome ("Oi, Lucas!")
  - Nível atual: "Nível 7" 
  - XP atual: "1.247 XP" com barra de progresso até próximo nível
  - Ícone de notificação no canto superior direito (com badge "3")

- Área central: MAPA DE TRILHAS estilo jogo
  - 6 trilhas visualmente distintas, conectadas por caminho ondulado
  - Cada trilha é um "nó" no mapa com:
    - Ícone temático colorido grande
    - Nome da matéria
    - Indicador de progresso (porcentagem ou estrelas)
    - Estado: completada (com estrela), em andamento (highlight), 
      bloqueada (escala de cinza com cadeado)
  - Trilhas a incluir:
    1. Português (cor: vermelho/coral suave, ícone: livro)
    2. Matemática (cor: azul, ícone: calculadora)
    3. Ciências (cor: verde, ícone: lupa)
    4. História (cor: marrom/dourado, ícone: pergaminho)
    5. Geografia (cor: azul-petróleo, ícone: globo)
    6. Inglês (cor: roxo, ícone: balão de fala)

- DogBerg filhote pequeno no canto inferior, com balão de fala leve: 
  "Bora aprender?"

- Bottom navigation com 5 ícones:
  Home (ativo) | Conquistas | Ranking | Loja | Pais

### TELA 3 — TRILHA ABERTA (USAR MATEMÁTICA)

Quando criança toca em uma trilha do mapa.

**Layout:**
- Botão de voltar no topo esquerdo
- Header da trilha:
  - "Matemática"
  - "4º ano"
  - Barra de progresso visual da trilha (35% completa)

- Área central: 3 NÍVEIS em escada visual ascendente
  - **Nível Fácil (completado):**
    - Background verde claro
    - Ícone de estrela dourada com brilho
    - Status: "Completo" 
    - 3 estrelas conquistadas
    - Lista resumida do que tem dentro: 
      Videoaula | 2 jogos | Quiz
  
  - **Nível Médio (em andamento):**
    - Background azul claro
    - Highlight pulsante sutil
    - Status: "Em andamento — 50%"
    - 1 estrela conquistada (de 3 possíveis)
    - Botão grande: "Continuar de onde parei"
    - Lista: Videoaula completo | Jogo Pega Frações completo | 
      Jogo Bolha Math bloqueado | Quiz bloqueado
  
  - **Nível Difícil (bloqueado):**
    - Background cinza
    - Cadeado central
    - Texto: "Complete o nível Médio para desbloquear"
    - Itens em escala de cinza

### TELA 4 — VIDEOAULA EM CURSO

Criança assistindo aula de microlearning sobre frações.

**Layout:**
- Botão voltar no topo esquerdo
- Header: "Frações: o que é metade?"

- Área de vídeo (placeholder grande):
  - Background gradiente roxo-azul suave
  - Ícone de play centralizado e grande
  - Tempo: "5:23 / 6:00" no canto inferior
  - Barra de progresso colorida abaixo do vídeo

- Abaixo do vídeo:
  - Caixa "Pontos importantes" (background amarelo claro):
    - "Metade é dividir em 2 partes iguais"
    - "1/2 igual a 50% igual a metade"
    - "Pizza, bolo, dinheiro... tudo pode ter metade!"
  
  - Texto sutil em destaque: 
    "MENTOR está aprendendo como você aprende"
  
  - Botão grande: "Próximo passo: Vamos jogar!" (roxo, 60px altura)

### TELA 5 — JOGO EM ANDAMENTO

Mecânica de jogo educacional ativa: "Pega Frações"

**Layout:**
- Header com 3 elementos:
  - Timer: "00:42" (cor coral se menor que 10s)
  - XP: "+180 XP" (verde)
  - Nível: "Pergunta 3/10"
  - Botão pause no canto direito

- Área central de jogo:
  - Texto-pergunta: "Arraste cada fração para a imagem certa!"
  
  - Em cima: 3 IMAGENS visuais de frações
    - Pizza dividida em 2 (uma metade pintada)
    - Quadrado dividido em 4 (1 parte pintada)
    - Círculo dividido em 4 (3 partes pintadas)
  
  - Embaixo: 3 CARDS arrastáveis com frações em texto
    - "1/2"
    - "1/4"
    - "3/4"
  
  - Setas sugerindo arrastar (para cima)

- Feedback visual sugerido em comentário no código:
  // Quando criança acerta: card vai para imagem com snap, 
  // confete dispara, "+20 XP" surge animado, som ding
  // Quando erra: card balança, coral sutil aparece, 
  // mensagem "Quase! Tenta de novo"

- DogBerg NÃO aparece nesta tela (foco no jogo)

### TELA 6 — QUIZ COM FEEDBACK

Após seção concluída, quiz de fixação.

**Layout:**
- Header:
  - Título: "Quiz — Frações"
  - Indicador: "Pergunta 3 de 10"
  - Barra de progresso

- Pergunta central em fonte grande:
  "Qual fração representa metade de uma pizza?"

- 4 alternativas visuais grandes (cards clicáveis):
  - A) Pizza dividida em 2 (1 metade pintada) - "1/2"
  - B) Pizza dividida em 4 (1 fatia pintada) - "1/4"  
  - C) Pizza inteira pintada - "1/1"
  - D) Pizza dividida em 3 (1 fatia pintada) - "1/3"

- ESTADO: usuário acertou alternativa A
  - Card A com border verde, ícone check
  - Banner verde no rodapé: "Mandou bem! +25 XP"
  - Botão CTA: "Próxima pergunta" (verde neon)

- Crie variação alternativa:
  - Estado de erro: card selecionado em coral, banner: "Quase! 
    A resposta certa é 1/2. Vamos revisar?"
  - Botão: "Ver explicação" (azul) e "Próxima pergunta" (cinza)

Ambos estados visíveis no protótipo (pode mostrar lado a lado ou 
em toggle).

### TELA 7 — MENTOR MENSAGEM PARA CRIANÇA

Tela mais especial: MENTOR conversa diretamente com a criança via 
DogBerg como mensageiro.

**Layout:**
- Background branco com sutil gradiente lateral roxo-amarelo (muito 
  suave)
- DogBerg filhote em tamanho médio (120-150px) à esquerda
- À direita do DogBerg, balão de fala estilizado:

  "Oi, Lucas!
  
  Eu vi que você tá indo super bem em frações!
  
  Mas notei que tá tendo um pouquinho de dúvida 
  em multiplicação...
  
  Que tal a gente treinar isso juntos por 
  10 minutos?"

- Dois botões grandes:
  - "Bora!" (verde neon, primário)
  - "Agora não" (cinza claro, secundário)

- Embaixo, em fonte menor e cinza:
  "MENTOR já aprendeu sobre você: 47 conceitos | 
   Acertos: 78% | Pontos fortes: Frações, Geometria"

- Detalhe: pequena animação sugerida no DogBerg
  // animação: DogBerg balança rabinho a cada 3s

## DETALHES FINAIS DE EXECUÇÃO

1. **Crie um único artifact React** com tudo
2. **Use Tailwind CSS** para toda estilização
3. **Sistema de navegação simples** entre as 7 telas (tabs no topo 
   funcional para demo)
4. **Comentários no código** explicando decisões importantes 
   (cores escolhidas, animações sugeridas, decisões de UX)
5. **Mobile-first responsive** mas funciona em desktop também
6. **Sem imagens externas** — use SVG inline, emojis, placeholders 
   coloridos
7. **Acessibilidade básica:** contraste adequado, fonte legível, 
   botões clicáveis amplos

## ORDEM DE PRIORIDADE

Se o artifact ficar muito longo, comece pelas telas mais críticas:
1. **Tela 2 (Home/Mapa)** — É a tela que define visualmente o produto
2. **Tela 7 (MENTOR)** — É o diferencial técnico-emocional único
3. **Tela 5 (Jogo)** — Mostra que é gamificado de verdade
4. **Tela 1 (Onboarding)** — Primeira impressão
5. **Telas restantes** — Importantes mas secundárias

## PEDIDO ESPECÍFICO

Comece criando o artifact completo. Se o tamanho exceder limite 
prático, divida em 2 artifacts:
- Artifact 1: Telas 1, 2, 3 (Onboarding, Home, Trilha)
- Artifact 2: Telas 4, 5, 6, 7 (Aula, Jogo, Quiz, MENTOR)

Em cada artifact, mantenha o sistema de navegação consistente.

NÃO use dark mode.
NÃO infantilize demais a linguagem.
NÃO use ilustrações de bebê.
USE design profissional, gamificado, alinhado com BNCC.

Boa criação!
```

---

## DICAS PARA ITERAÇÃO PÓS-GERAÇÃO

### Após primeira geração — avaliar:

- [ ] Background branco em 100% das telas?
- [ ] Paleta de cores aplicada consistentemente?
- [ ] DogBerg aparece nas telas certas (1, 2, 7) e ausente nas 
      certas (3, 4, 5, 6)?
- [ ] Tipografia legível e tamanhos adequados?
- [ ] Layout responsivo (testa em diferentes tamanhos)?
- [ ] Espaçamento generoso?
- [ ] Botões grandes (mín 48px)?
- [ ] Mensagens BNCC visíveis (séries, matérias)?
- [ ] Linguagem brasileira contemporânea sem infantilização?

### Pedidos de ajuste comuns:

**Se cores não ficaram bem:**
"Refaça com paleta mais vibrante. Roxo deve estar mais saturado, 
amarelo mais brilhante. Verde para acertos deve ser mais neon."

**Se tipografia ficou pequena:**
"Aumente fontes em 20%. Títulos para 36-40px. Body para 18-20px. 
Considere que público são crianças que ainda estão desenvolvendo 
leitura fluente."

**Se layout ficou apertado:**
"Adicione mais espaçamento entre elementos. Padding 24px nos cards. 
Gap 16px entre seções. Crianças precisam de respiração visual."

**Se DogBerg não convenceu:**
"Refaça DogBerg como cachorro filhote mais expressivo. Olhos grandes, 
sorriso amigável, posição que sugira movimento. Use SVG inline para 
melhor qualidade."

### Pedidos de adição:

**Para incluir tela faltante:**
"Adicione tela 8: Tela de conquista desbloqueada, com troféu, 
animação de confete, +XP visual, opção de compartilhar."

**Para incluir variantes:**
"Crie variação da Tela 2 mostrando criança no nível 1 (iniciante) 
com mais trilhas bloqueadas, e variação no nível 15 (avançado) com 
todas trilhas desbloqueadas."

**Para tablet otimizado:**
"Crie versão otimizada para tablet horizontal (1024x768), reorganizando 
elementos para aproveitar espaço maior. Pode mostrar mais informação 
simultaneamente."

---

## CHECKLIST FINAL ANTES DE USAR PROTÓTIPO

- [ ] Autorização do Berg para uso do sprite DogBerg (mesmo que 
      interna)
- [ ] Validação visual com 3-5 pessoas próximas (família, amigos)
- [ ] Validação com 1-2 pais de crianças 6-10 anos (informal)
- [ ] Documentação dos prints/screenshots para uso em deck
- [ ] Backup do código React em arquivo local

---

## FIM DO DOCUMENTO

**Próxima ação:** Eduardo cola o prompt no Claude com Artifacts 
habilitado. Anexa sprite do DogBerg quando solicitado. Itera 
ajustes específicos até satisfação.

**Última atualização:** 23/04/2026

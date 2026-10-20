<!-- GERADO por scripts/maintenance/build-registry.mjs a partir de docs/source/catalogo-original.md. Não edite à mão. -->

# Catálogo unificado — 82 skills originais → 7 skills do plugin

As 82 dependências originais foram reunidas por função. Este catálogo preserva o nome, a função e as condições
de chamada de cada uma e diz onde ela vive agora. Máquina: `dependencies.json`.

| Skill do plugin | Absorveu | Papel |
|---|---|---|
| `systemdesignmax` | — | orquestrador: fluxo, seleção, conflitos, evidências |
| `design-taste-frontend` | 2 (motor + alias) | motor de direção e construção |
| `design-engine-legacy` | 4 | motores/adaptadores legados (opt-in) |
| `design-styles` | 70 | 67 estilos Bergside + 3 clássicos opt-in |
| `image-direction` | 4 | brandkit, web, mobile, image-to-code |
| `design-qa` | 2 | auditoria Vercel + playwright-cli |
| `ui-components` | — (novo) | ponte para shadcn/ui e Spell UI gratuitos |

## A. Motor de direção e construção

Um único motor por projeto. `redesign-existing-projects` é alias aposentado e resolve para `design-taste-frontend`.

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `design-taste-frontend` | Motor principal (tasteskill v2, anti-slop): direção de arte destilada de 247 sites de galeria; sorteia direções pesquisadas (ideia, composição, tipo, paleta, fotos, blueprints de seção), impõe house style sem clichês medido em browser real e roda loop de olhar-e-corrigir em screenshots. Cobre páginas (landing, marketing, portfólio, produto, one-pager) e telas de app (dashboards, admin, settings, inbox), cada uma com run e regras próprias. | como motor padrão ao construir, desenhar, redesenhar, polir ou revisar páginas ou telas de aplicativo, em qualquer stack; ou quando o usuário diz que a página parece genérica, templated, "AI-made" ou pede visual premiado. Não acumular com outro motor legado. Quando um estilo opt-in for solicitado, manter apenas o workflow compatível do motor e atribuir a direção visual ao estilo escolhido, documentando desvios. |  | automática | `skills/design-taste-frontend/SKILL.md` |
| `redesign-existing-projects` | APOSENTADA (alias): redesigns, restyles e design reviews vivem dentro de design-taste-frontend (rota "Redesign or review": audita a página real no browser, preserva conteúdo e comportamento, reconstrói com antes/depois em screenshots). Se chamada pelo nome, seguir a design-taste-frontend. | nunca diretamente. | resolver sempre para design-taste-frontend; se ela não estiver instalada, instalar via npx skills add (repositório Leonxlnx/taste-skill). | alias (aposentada) | `skills/design-taste-frontend/SKILL.md` |

## B. Motores legados e adaptadores (opt-in) — skill `design-engine-legacy`

Só por pedido nominal. Substituem o motor atual; nunca acumulam.

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `design-taste-frontend-v1` | LEGADO/OPT-IN: a taste-skill original v1 (High-Agency Frontend), mantida para projetos que dependem do comportamento exato dela. Dials fixos (variance 8, motion 6, density 4), React/Next + Tailwind, verificação obrigatória de dependências, isolamento de client components e proibição de emojis. | somente quando chamada pelo nome e o projeto depende do comportamento exato da v1. | em projetos novos (usar design-taste-frontend); nunca junto com outro motor. | opt-in (só pelo nome) | `skills/design-engine-legacy/references/v1.md` |
| `design-taste-frontend-v2-experimental` | LEGADO/OPT-IN: a taste-skill single-file com dials que foi o padrão antes da v2. Inferência de brief (página, vibe, referências, audiência), três dials (variance/motion/density) e disciplina anti-defaults. Escopo restrito: landing pages, portfólios e redesigns — NÃO dashboards, tabelas de dados ou UI de produto multi-etapa. | somente quando chamada pelo nome, para PÁGINAS. | para dashboards ou telas de app (usar design-taste-frontend); em projetos novos; nunca junto com outro motor. | opt-in (só pelo nome) | `skills/design-engine-legacy/references/v2-experimental.md` |
| `gpt-taste` | Skill clássica para GPT/Codex (opt-in): engenharia de design nível Awwwards com randomização forçada via "script Python" simulado (1 arquitetura de hero, 1 stack tipográfica sem Inter, 3 componentes, 2 paradigmas GSAP), estrutura AIDA e motion GSAP em scroll. | somente quando chamada pelo nome, sobretudo em contexto GPT/Codex e quando motion GSAP pesado é desejado. | em dashboards operacionais ou projetos sem motion desejado; usar como proprietário visual de páginas, sem acumular outro estilo. | opt-in (só pelo nome) | `skills/design-engine-legacy/references/gpt-taste.md` |
| `stitch-design-taste` | Skill clássica para Google Stitch (opt-in): gera um DESIGN.md semântico — atmosfera, paleta com hex e funções, arquitetura tipográfica, comportamentos de componente, grids, motion e anti-patterns — escrito na linguagem descritiva que o agente do Stitch interpreta para gerar telas premium. NÃO é o estilo Bergside "stitch" (consultar entrada própria). | somente quando chamada pelo nome e o pipeline usa o Google Stitch (labs.google/stitch) para gerar telas. | para implementar código direto; nunca usar o DESIGN.md como estilo de código do projeto. | opt-in (só pelo nome) | `skills/design-engine-legacy/references/stitch-design-taste.md` |

## C. Estilos clássicos opt-in — skill `design-styles`

Só por pedido nominal.

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `industrial-brutalist-ui` | Look mecânico duro: tipografia suíça, grids rígidos, contraste extremo de escala e cor utilitária. Dois arquétipos — Swiss Industrial Print (claro, impresso) OU Tactical Telemetry/CRT (escuro, terminal militar) — escolher UM e não misturar no mesmo projeto. | somente quando chamada pelo nome, para looks industriais, técnicos ou militares. | em produtos consumer amigáveis; não alternar os dois arquétipos no mesmo projeto. | opt-in (só pelo nome) | `skills/design-styles/styles/industrial-brutalist-ui.md` |
| `minimalist-ui` | UI editorial de produto "documento": monocromia quente, contraste tipográfico extremo (serifa editorial + sans + mono), grids bento ultra-flat, pastéis dessaturados pontuais. Proíbe Inter/Roboto, ícones genéricos de traço grosso, sombras duras, gradientes, pills grandes e emojis. | somente quando chamada pelo nome, para look de workspace premium utilitário. | em marcas coloridas, lúdicas ou com fotografia rica. | opt-in (só pelo nome) | `skills/design-styles/styles/minimalist-ui.md` |
| `high-end-visual-design` | Look calmo e polido de agência high-end: contraste suave, whitespace generoso, motion por springs, micro-interações hápticas (double-bezel), com arquétipos de vibe e layout sorteados por projeto (Ethereal Glass, Editorial Luxury, Soft Structuralism; bento assimétrico, cascata Z, split editorial). | somente quando chamada pelo nome, para experiências premium nível Awwwards sem agressividade. | em densidade extrema de dados ou marcas rústicas/energéticas. | opt-in (só pelo nome) | `skills/design-styles/styles/high-end-visual-design.md` |

## D. QA — skill `design-qa`

Auditoria estática + browser real.

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `web-design-guidelines` | Auditoria de UI da Vercel: revisa o código contra as Web Interface Guidelines (acessibilidade, forms, foco, performance, detalhes de interação), buscando as regras mais recentes na URL-fonte antes de cada revisão e reportando em formato terso file:line. | após implementar ou restylar, quando o pedido é "revisar minha UI", checar acessibilidade/UX ou auditar boas práticas. | para gerar design (não cria nada visual). | automática | `skills/design-qa/references/web-design-guidelines.md` |
| `playwright-cli` | Automação de browser via CLI do Playwright: abrir/navegar, snapshot com refs, click/type/fill/select/drag/hover, upload, eval de JS, screenshots e testes — a camada de execução e verificação visual real no browser. | para validar visualmente o que foi construído (screenshots em larguras), inspecionar estados e rodar verificações em browser real. | para decidir estética (não é skill de design). | automática | `skills/design-qa/references/playwright-cli.md` |

## E. Imagem — skill `image-direction`

Somente quando a etapa de imagem está no escopo.

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `brandkit` | Geração de imagens de brand kit premium: boards de brand guidelines, sistemas de logo, decks de identidade e apresentações de mundo visual — grade de painéis em canvas escuro, tipografia esparsa, mockups de UI, texturas de impressão e um forte conceito de marca por board. | para visualizar identidade de marca em imagem (boards de logo/identidade) antes ou junto do design de código. | para gerar código ou telas de app funcionais. | automática | `skills/image-direction/references/brandkit.md` |
| `image-to-code` | Website image-first para código: gera as próprias imagens de design (grandes, legíveis, uma por seção), analisa-as profundamente e só então implementa o frontend fiel às imagens — proíbe boards comprimidos ilegíveis, cards-aninhados e heros genéricos. | em tarefas web visualmente importantes quando o fluxo imagem→análise→código for desejado. | quando o usuário quer código direto sem etapa de imagem, ou para telas de app mobile. | automática | `skills/image-direction/references/image-to-code.md` |
| `imagegen-frontend-mobile` | Direção de arte em imagem para apps mobile: conceitos e fluxos de telas premium nativas (onboarding, auth, home, chat, fintech, saúde) exibidas em mockup de celular com frame visível, hierarquia limpa e consistência entre telas. Gera apenas imagens — não escreve código. | para concept art de telas/fluxos mobile. | para websites, landing pages, dashboards desktop ou implementação de código. | automática | `skills/image-direction/references/imagegen-frontend-mobile.md` |
| `imagegen-frontend-web` | Direção de arte em imagem para websites: regra dura de UMA imagem horizontal POR seção (8 seções = 8 imagens), variedade de composição (hero não-padrão), espinha narrativa, paleta única consistente e referências que desenvolvedores/modelos de código conseguem recriar com fidelidade. | para gerar referências visuais de seções de landing/marketing antes de codar. | para apps mobile (usar imagegen-frontend-mobile) ou quando a etapa de imagem não for pedida. | automática | `skills/image-direction/references/imagegen-frontend-web.md` |

## F. Estilos universais — skill `design-styles` (um estilo por superfície, nunca misturar)

67 estilos Bergside/typeui.sh (inclui as variantes Antigravity `flat`, `material`, `skeumorphism`). Leia só o arquivo do escolhido.

### brutalist-bold

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `bold` | Presença forte com tipografia pesada, cores de alto contraste e layouts imponentes. | marcas que precisam de impacto imediato. | leitura prolongada ou dados densos. | automática | `skills/design-styles/styles/bold.md` |
| `brutalism` | Estética anti-design bruta inspirada no concreto: elementos sem adornos, layouts dissonantes e minimalismo funcional. | projetos de vanguarda e cultura. | e-commerce ou produtos convencionais. | automática | `skills/design-styles/styles/brutalism.md` |
| `neobrutalism` | Brutalismo moderno com bordas grossas, cores de acento vivas e layouts cruas de alto contraste sobre superfícies quentes. | marcas ousadas atuais. | contextos conservadores. | automática | `skills/design-styles/styles/neobrutalism.md` |
| `pulse` | Estilo dinâmico e vibrante com bordas grossas, formas geométricas, alto contraste e tipografia cheia de movimento. | esporte, música e energia jovem. | calma/serenidade. | automática | `skills/design-styles/styles/pulse.md` |

### corporate-data

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `ant` | Sistema estruturado e corporativo ao estilo Ant Design: clareza, consistência e eficiência para apps web densos em dados. | ERPs, admins, tabelas e back-offices. | landing pages ou marcas expressivas. | automática | `skills/design-styles/styles/ant.md` |
| `corporate` | Design profissional alinhado à marca com grids estruturados, layouts minimalistas e padrões empresariais consistentes. | sites institucionais e B2B. | projetos lúdicos. | automática | `skills/design-styles/styles/corporate.md` |
| `enterprise` | Estética de plataforma cloud escura com grids modulares, painéis glass e forte hierarquia de dados. | dashboards de produtividade. | sites de marketing. | automática | `skills/design-styles/styles/enterprise.md` |
| `material` | Material Design do Google: superfícies em camadas, theming dinâmico, motion integrado e padrões responsivos multiplataforma. | apps do ecossistema Google/Android. | identidades autorais fortes. | automática | `skills/design-styles/styles/material.md` |
| `professional` | Design de negócios polido com tipografia moderna, layouts estruturados e identidade confiável. | consultorias e serviços. | projetos lúdicos. | automática | `skills/design-styles/styles/professional.md` |
| `roku` | Dashboard de app com estética roxa, navegação superior, layouts em cards e fluxos dev-first. | painéis de desenvolvedor. | sites de marketing. | automática | `skills/design-styles/styles/roku.md` |
| `stitch` | Design corporativo limpo de alto contraste para fluxos orientados a dados, com drag-and-drop intuitivo e layouts estruturados. NÃO é o stitch-design-taste (gerador de DESIGN.md para Google Stitch). | ferramentas de trabalho com dados. | marketing. | automática | `skills/design-styles/styles/stitch.md` |

### editorial-warm

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `basic` | Linguagem visual impressa (livros, revistas, relatórios) com grids editoriais e tipografia expressiva. | documentos longos, relatórios e blogs. | apps interativos densos. | automática | `skills/design-styles/styles/basic.md` |
| `cafe` | Interface aconchegante de cafeteria: tons quentes, tipografia suave e layouts limpos e relaxados. | cafeterias, confeitarias e marcas acolhedoras. | fintechs ou tech sério. | automática | `skills/design-styles/styles/cafe.md` |
| `claude` | Estética de diário de pesquisa impresso em pedra quente: pergaminho marfim (nunca branco puro), tinta slate quase preta, editorial quase acromático e autoridade calma. | produtos de leitura, reflexão e IA editorial. | energia pop ou varejo vibrante. | automática | `skills/design-styles/styles/claude.md` |
| `editorial` | Layout editorial de revista com serifa refinada, grids estruturados e experiência de leitura elegante. | revistas, blogs e portfólios. | dashboards. | automática | `skills/design-styles/styles/editorial.md` |
| `impeccable` | Pôster editorial gráfico e moderno, quente e confiante: seções alternando creme e laranja queimado com cor de marca âmbar. É o estilo Bergside/typeui.sh — NÃO o projeto homônimo "Impeccable" de outra origem. | portfólios e marcas de estúdio. | dashboards ou dados densos. | automática | `skills/design-styles/styles/impeccable.md` |
| `modern` | Estilo editorial contemporâneo com serifa, paletas mínimas e layouts limpos para produtos digitais polidos. | produtos digitais polidos. | estéticas retrô. | automática | `skills/design-styles/styles/modern.md` |
| `paper` | Design com textura de papel, poucas cores, tipografia serif/sans limpa e qualidade tátil de impresso. | notas, journals e leitura tátil. | dashboards. | automática | `skills/design-styles/styles/paper.md` |
| `refined` | Minimalismo moderno curado com serifa elegante e paletas sofisticadas discretas. | luxo discreto e moda. | vibes caóticas. | automática | `skills/design-styles/styles/refined.md` |
| `terracotta` | Interface editorial em tons de barro assado: superfícies creme quentes, títulos ink-brown em serifa display e um único acento terracota. | artesanato, gastronomia e marcas terrosas. | tech frio. | automática | `skills/design-styles/styles/terracotta.md` |

### minimal-clean

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `clean` | Simplicidade com muito espaço em branco, tipografia legível e paleta limitada para reduzir ruído visual. | SaaS, documentação e produtos que precisam de clareza. | marcas que pedem energia. | automática | `skills/design-styles/styles/clean.md` |
| `codex` | Interface radicalmente mínima em tela em branco: superfície ponta-a-ponta quase sem cor, tipografia carregando o peso visual, preto como única cor de preenchimento/divisor/card. | ferramentas de escrita e código. | vitrines ricas ou marketing. | automática | `skills/design-styles/styles/codex.md` |
| `flat` | Minimalismo bidimensional com cores vibrantes, tipografia limpa e nenhum efeito 3D — rápido e amigável. | apps de massa que priorizam performance. | quando profundidade/realismo importa. | automática | `skills/design-styles/styles/flat.md` |
| `geometric` | Design estruturado e geométrico com tipografia limpa, cores neutras, formas precisas e layouts discretos. | ferramentas profissionais que não devem chamar atenção. | marcas expressivas. | automática | `skills/design-styles/styles/geometric.md` |
| `minimal` | Design despido com espaço em branco, tipografia limpa e cor contida para foco máximo. | portfólios e produtos minimalistas. | quem quer vitrine rica. | automática | `skills/design-styles/styles/minimal.md` |
| `shadcn` | Design inspirado em shadcn/ui: componentes mínimos e limpos, paleta monocromática e padrões utility-first. | SaaS modernos com Tailwind. | identidades ilustradas. | automática | `skills/design-styles/styles/shadcn.md` |
| `sleek` | Minimalismo moderno com linhas limpas, paleta intencional, interações sutis e espaçamento consistente. | produtos tech elegantes. | estéticas decorativas. | automática | `skills/design-styles/styles/sleek.md` |
| `spacious` | Espaço generoso, padding consistente e layouts em grid para interfaces limpas e respiráveis. | conteúdo premium e onboarding. | densidade de dados. | automática | `skills/design-styles/styles/spacious.md` |
| `square` | Estética refinada e delicada com tipografia fina, paletas mínimas e layouts polidos de sofisticação. | marcas sofisticadas discretas. | energia jovem. | automática | `skills/design-styles/styles/square.md` |

### narrative-conversion

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `dramatic` | Design teatral de alto contraste com layouts ousados, visuais imersivos e composições não convencionais. | eventos, filmes e campanhas. | apps de trabalho. | automática | `skills/design-styles/styles/dramatic.md` |
| `immersive` | Interface imersiva estilo exposição interativa: storytelling, animação e gamificação sobre um canvas contínuo na cor da marca (verde profundo). | experiências e exibições interativas. | produtividade. | automática | `skills/design-styles/styles/immersive.md` |
| `levels` | Design focado em conversão: remove atrito e guia o usuário à ação com clareza, confiança e velocidade. | landing pages e funis de conversão. | apps internos. | automática | `skills/design-styles/styles/levels.md` |
| `storytelling` | Design narrativo que usa visual, copy e interação para guiar o usuário por jornadas emocionais. | páginas de história e campanhas. | ferramentas utilitárias. | automática | `skills/design-styles/styles/storytelling.md` |

### playful-friendly

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `artistic` | Alto contraste e expressividade com tipografia criativa e cores ousadas para interfaces visualmente marcantes. | portfólios, campanhas e cultura. | finanças, saúde ou contextos sóbrios. | automática | `skills/design-styles/styles/artistic.md` |
| `claymorphism` | Formas 3D arredondadas como argila maciça: elementos fofos, inflados e coloridos. | apps consumer lúdicos. | contextos corporativos. | automática | `skills/design-styles/styles/claymorphism.md` |
| `colorful` | Paletas vibrantes e gradientes de alto contraste para experiências modernas e memoráveis. | consumer apps e campanhas. | dashboards sérios ou luxo discreto. | automática | `skills/design-styles/styles/colorful.md` |
| `creative` | Design lúdico guiado por personagens, tipografia expressiva e gráficos ousados. | landing pages e projetos criativos. | ferramentas de produtividade. | automática | `skills/design-styles/styles/creative.md` |
| `doodle` | Estilo desenhado à mão com rabiscos, fontes manuscritas e linhas imperfeitas para um tom informal. | marcas informais e divertidas. | contextos formais. | automática | `skills/design-styles/styles/doodle.md` |
| `expressive` | Design vibrante com personalidade: cores ousadas, gráficos lúdicos e layouts dinâmicos com estrutura. | marcas expressivas. | ferramentas sóbrias. | automática | `skills/design-styles/styles/expressive.md` |
| `fiction` | Interface cartunesca e energética inspirada em livros infantis: fundo creme, display bold, blocos saturados, contornos pretos grossos e formas bem arredondadas. | produtos infantis e lúdicos. | fintechs ou corporativo. | automática | `skills/design-styles/styles/fiction.md` |
| `friendly` | Design acolhedor e intuitivo com elementos arredondados, amplo espaço em branco e pastéis suaves. | apps de consumidor e educação. | contextos técnicos densos. | automática | `skills/design-styles/styles/friendly.md` |
| `gradient` | Transições suaves de cor e superfícies ricas em gradiente para profundidade moderna e lúdica. | landing pages vibrantes. | editorial monocromático. | automática | `skills/design-styles/styles/gradient.md` |
| `lingo` | Design lúdico-mínimo com cores vivas, formas arredondadas, bordas 3D táteis e ilustrações amigáveis. | produtos approacháveis (estilo Duolingo). | corporativo sério. | automática | `skills/design-styles/styles/lingo.md` |
| `riso` | Estética de impressão risográfica de duas cores, alegre e joyful, sobre papel off-white quente contínuo. | cultura, zines e arte. | produtos sérios. | automática | `skills/design-styles/styles/riso.md` |
| `sketch` | Interface de esboço à mão com lápis sobre papel creme, acentos teal suaves, títulos manuscritos e controles pill arredondados. | produtos amigáveis em fase de ideação. | corporativo. | automática | `skills/design-styles/styles/sketch.md` |
| `vibrant` | Design vivo e colorido com tipografia bold e lúdica, acentos quentes e energia visual dinâmica. | marcas jovens. | sobriedade. | automática | `skills/design-styles/styles/vibrant.md` |

### premium-dark

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `bento` | Grid modular de blocos-card com hierarquia clara, espaçamento suave e contraste discreto — organizado e escaneável. | páginas de produto, features e dashboards leves. | narrativas longas contínuas. | automática | `skills/design-styles/styles/bento.md` |
| `contemporary` | Minimalismo da era atual com grids bento, suporte a dark mode e layouts acessíveis de alta performance. | produtos tech atuais. | identidades editoriais clássicas. | automática | `skills/design-styles/styles/contemporary.md` |
| `glassmorphism` | Efeito vidro fosco com camadas translúcidas, blur sutil e bordas luminosas para profundidade moderna. | interfaces modernas com profundidade. | densidade extrema de dados (legibilidade). | automática | `skills/design-styles/styles/glassmorphism.md` |
| `power` | Estética dark premium com títulos bold, paleta monocromática e sensação de luxo. | experiências de marca premium. | apps leves e amigáveis. | automática | `skills/design-styles/styles/power.md` |
| `premium` | Estética premium inspirada na Apple: espaçamento preciso, tipografia moderna e linguagem visual refinada. | produtos de alto padrão. | marcas rústicas. | automática | `skills/design-styles/styles/premium.md` |

### retro-game

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `dithered` | Técnica de pontos (dithering) que simula tons com paleta limitada para visuais nostálgicos, retrô e de alto contraste. | projetos com vibe retrô/analógico-digital. | interfaces premium clean. | automática | `skills/design-styles/styles/dithered.md` |
| `fantasy` | Estética fantástica inspirada em games: visual premium, paletas ricas e elementos temáticos imersivos. | games, RPG e entretenimento. | B2B. | automática | `skills/design-styles/styles/fantasy.md` |
| `neumorphism` | Elementos extrudados suaves com sombras internas e externas sobre superfícies monocromáticas — aspecto tátil e embutido. | players e controles táteis. | requisitos rígidos de acessibilidade/contraste. | automática | `skills/design-styles/styles/neumorphism.md` |
| `pacman` | Design retrô arcade com fontes pixel, bordas pontilhadas, cores contrastantes e estética 8-bit. | games e diversão nostálgica. | produtos sérios. | automática | `skills/design-styles/styles/pacman.md` |
| `retro` | Design nostálgico com tipografia vintage, paletas retrô de alto contraste e elementos visuais do passado. | marcas nostálgicas. | tech de ponta. | automática | `skills/design-styles/styles/retro.md` |
| `sega` | Interface arcade para games com a fonte pixel VT323, cantos 0px e botões pill que afundam em blocos sólidos. | jogos retrô. | apps de trabalho. | automática | `skills/design-styles/styles/sega.md` |
| `skeumorphism` | Mimicry do mundo real com superfícies texturizadas, efeitos 3D e metáforas físicas familiares. | apps para leigos e nostalgia pré-2013. | estéticas flat modernas. | automática | `skills/design-styles/styles/skeumorphism.md` |
| `tetris` | Design inspirado no clássico de blocos: cores lúdicas, fontes display e layouts compactos de alta energia. | games e diversão. | contextos formais. | automática | `skills/design-styles/styles/tetris.md` |
| `vintage` | Nostalgia anos 1950–90 com toques skeuomórficos, texturas granuladas, paletas retrô e tipografia pixel. | marcas retrô autênticas. | minimalismo moderno. | automática | `skills/design-styles/styles/vintage.md` |

### tech-futurist

| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |
|---|---|---|---|---|---|
| `agentic` | Interface conversacional AI-first com controles mínimos, resultados claros e fluxos de tarefa delegados a IA. | produtos de IA/chat em que o usuário delega tarefas. | apps tradicionais densos em dados. | automática | `skills/design-styles/styles/agentic.md` |
| `cosmic` | Estética sci-fi futurista com temas escuros, acentos neon vibrantes e elementos espaciais imersivos. | tech, IA e gaming. | marcas humanas e acolhedoras. | automática | `skills/design-styles/styles/cosmic.md` |
| `futuristic` | Design voltado ao futuro com tipografia tech, layouts modernos e estética de inovação. | produtos de inovação. | marcas tradicionais. | automática | `skills/design-styles/styles/futuristic.md` |
| `matrix` | Interface cyber escura (dark-only) inspirada em Matrix: moda minimalista e elementos digitais high-tech. | tech e projetos temáticos do filme. | clareza corporativa. | automática | `skills/design-styles/styles/matrix.md` |
| `mono` | Design monoespaçado inspirado em matrix: alto contraste, densidade compacta e estética hacker-chic. | dev tools e terminais. | consumer comum. | automática | `skills/design-styles/styles/mono.md` |
| `neon` | Brilho neon elétrico com pares de cores de alto contraste para interfaces chamativas. | gaming, música e nightlife. | leitura longa. | automática | `skills/design-styles/styles/neon.md` |
| `perspective` | Profundidade espacial com vistas isométricas, pontos de fuga e camadas que guiam o olhar em realismo 3D. | produtos técnicos e infográficos. | leitura simples. | automática | `skills/design-styles/styles/perspective.md` |

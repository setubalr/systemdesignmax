# Diagnóstico e varredura (etapas 1c e 2)

O resultado sai fraco quando o agente aplica as poucas coisas que lembra e pula o resto. Esta etapa impede isso:
**toda estratégia da base é examinada, uma por uma, contra o site e o brief**, e cada uma recebe uma decisão escrita.
Nada é aplicado por hábito e nada é esquecido em silêncio.

Saída: `.taste-skill/VARREDURA.md`. As etapas 3 a 7 leem esse arquivo, como leem o `DESIGN-BRIEF.md`.

## Proporção

| Pedido | Diagnóstico | Varredura |
|---|---|---|
| Site, página, app ou redesign completo | inteiro | todas as linhas do catálogo |
| Uma tela ou um fluxo | blocos que a tela toca | linhas dos blocos P0 e P1 e as da superfície dela |
| Componente ou ajuste pontual | pular | só as linhas que o componente toca |
| `--audit` | inteiro | todas as linhas, coluna "Decisão" vira recomendação |

## A. Diagnóstico (etapa 1c)

Depois do brief e do "antes" gravado pelo motor (`inspect.mjs --out .taste-skill/before`) e pelo `design-qa`, dê
nota de **0 a 5** a cada bloco, com a evidência ao lado (medição, screenshot, arquivo:linha):

| Bloco | O que olhar |
|---|---|
| Fundação visual | escala tipográfica, grid e espaçamento, paleta e contraste, imagens, consistência dos componentes |
| Técnica | LCP, INP, CLS, responsivo real, acessibilidade (`hig-web.md` §2), SEO e Open Graph |
| Movimento | existe? é consistente? tem feedback de hover e foco? respeita reduced-motion? |
| Narrativa | a página conta problema → produto → prova → ação, ou é uma lista de blocos? |
| Mídia | qualidade das imagens e vídeos; há fotos próprias, interface real, 3D? |

Depois: os **3 maiores ganhos por esforço** e o **nível de intervenção**:

| Nível | Entra | Quando |
|---|---|---|
| 1. Polimento | P0 inteiro + microinterações essenciais | institucional, prazo curto, eixo Movimento 1–2 |
| 2. Movimento | Nível 1 + P1 inteiro | a maioria dos projetos |
| 3. Experiência | Nível 2 + P2 + P3 em 1–2 momentos | lançamento, campanha, marca grande, eixo Movimento 4–5 |

Regra de contenção: **no máximo dois momentos protagonistas por página** (uma cena de scroll, um 3D, um shader,
uma assinatura). O resto é discreto. Se a fundação tem nota abaixo de 3, ela vem antes de qualquer animação:
animar uma base fraca só destaca o amadorismo.

## B. Como varrer (etapa 2)

Para **cada linha** do catálogo da seção C, responda cinco perguntas e escreva uma linha no arquivo:

1. **Existe hoje?** `sim`, `parcial` ou `não`, com onde (seção, tela, arquivo).
2. **Cabe neste produto?** `sim` ou `não`, com o motivo tirado de uma linha do brief (público, ação, sentimento,
   eixo, inventário). "Fica bonito" não é motivo.
3. **Onde caberia?** A seção ou tela exata. Uma estratégia sem lugar não cabe.
4. **Com o quê?** A camada (seção D) e a receita ou componente do plugin (coluna "No plugin").
5. **Decisão:** `aplicar`, `adaptar`, `manter` (já está bom), `descartar` ou `pedir` (depende de ativo ou
   autorização que não temos).

Leia a skill indicada na coluna "No plugin" **antes** de decidir a linha, só a parte necessária. É assim que a
orquestradora puxa todas as skills: a varredura passa por cada uma delas.

## C. Catálogo de estratégias (a base)

Origem: **PM** = plano mestre de site premium; **HIG** = `hig-web.md`; **M** = motor; **S** = skill irmã.
Regra da casa: **livre**; **limite** (tem regra de uso no motor); **proibido** (só por pedido nominal do usuário,
registrado em `conflitos.md`).

### P0 — Fundação visual (sempre; nunca `descartar`)

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| F1 | Escala tipográfica fluida (`clamp()`), até 2 famílias, sem pesos finos em texto | motor `references/type.md`, tipo sorteado no `draw.mjs` | CSS | livre |
| F2 | Grid único, margens iguais, base de 8 px, ritmo entre seções 120–240 px | motor `references/layout.md` | CSS | livre |
| F3 | Cor por tokens, contraste ≥ 4.5:1, modo escuro quando fizer sentido | motor `references/colour.md`, `ui-components/scripts/style-to-shadcn.mjs` | CSS | livre |
| F4 | Tokens de tudo: cor, espaço, raio, duração, easing | motor `references/motion.md` §4 | CSS | livre |
| F5 | Imagens em alta, mesma proporção e tratamento, AVIF/WebP, `width`/`height` | motor `references/imagery.md` | HTML/CSS | livre |
| F6 | Componentes consistentes (raio, elevação, espaçamento) | `ui-components` (shadcn) | React | livre |
| F7 | Sabor visual de um estilo | `design-styles/styles/index.json` | CSS | decidir sim ou não, sempre |
| F8 | Vidro e blur só em barra, menu e overlay | `hig-web.md`, `design-styles/styles/allowances.json` | CSS | limite |

### P0 — Técnica e acessibilidade (sempre; nunca `descartar`)

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| T1 | Metas: LCP < 2,5 s, INP < 200 ms, CLS < 0,1 | `design-qa` | medição | livre |
| T2 | Checklist web da HIG (alt, foco, teclado, semântica, `lang`, zoom) | `hig-web.md` §2, `design-qa` | HTML/CSS | livre |
| T3 | Responsivo pensado para o celular, sem rolagem lateral em 390 px | `inspect.mjs` | CSS | livre |
| T4 | Metadados, Open Graph, favicon, sitemap, 404, estados vazios | `design-qa` | HTML | livre |
| T5 | `prefers-reduced-motion` com a página pronta como estado reduzido | `motion.md` §8 | CSS | livre |
| T6 | Conteúdo legível sem JavaScript (porta `html.js`) | `motion.md` §6 | CSS | livre |

### P1 — Scroll e fluidez

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| S1 | Rolagem com peso (Lenis) | `Stage.smooth()`, `references/motion-stack.md` | JS | limite: off no toque e no reduced |
| S2 | Revelar ao rolar, uma vez | receitas "Reveal on scroll (once)", "Lines that rise on scroll" | CSS + observer | limite |
| S3 | Movimento ligado ao scroll (deriva, progresso, logotipo que escala) | receita "Scroll-linked progress without JavaScript" | CSS | limite: < 8% |
| S4 | Âncoras suaves que preservam o foco | `scroll-behavior: smooth` + foco no destino | CSS | livre |

### P1 — Entrada e texto

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| E1 | Sequência de entrada em 1,2 s | receita "Load sequence in 1.2 seconds" | CSS | limite: 4 elementos |
| E2 | Título que sobe da máscara | receita "Masked line reveal" | CSS | livre |
| E3 | Texto dividido em linhas, palavras ou letras | `Stage.split`, SplitText | JS | limite: letras só em título de 1–3 palavras |
| E4 | Stagger com ritmo | tokens `--stagger-line`, `--stagger-item` | CSS | limite: 4 passos |
| E5 | Imagem que se revela (clip-path, escala) | receitas "Image shutter", "Opening window" | CSS | livre |
| E6 | Números que rolam até o valor | receita "Rolling figures" | CSS + JS pequeno | limite |
| E7 | Frase que se preenche com o scroll | receita "Ink fill" | CSS | limite: uma por página |

### P1 — Interação e microinterações

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| I1 | Hover, foco, ativo e desabilitado em tudo que é clicável | receita "Press and hover" | CSS | livre |
| I2 | Carregando, sucesso e erro em formulários | `ui-components` (shadcn), `design-qa` | React | livre |
| I3 | Transição entre páginas | receita "Page to page" (View Transitions); em React, Motion `AnimatePresence` / `layoutId` | CSS / React | limite: até 480 ms |
| I4 | Menu e diálogo animados, com foco e Esc | receita "Menu or dialog", shadcn | CSS + React | livre |
| I5 | Accordion e revelação progressiva | receita "Accordion" | CSS | livre |
| I6 | Índice com prévia de imagem | receita "Index with preview" | CSS + JS pequeno | livre |
| I7 | A coisa viva da página | motor, passo 4 | React | livre |
| I8 | Efeito de marketing (1–2 por página) | `ui-components/references/spell-ui-catalog.json` | React | limite |
| I9 | Botão magnético, cursor customizado | — | JS | proibido |

### P2 — Narrativa de scroll

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| N1 | Argumento: problema → produto → prova → ação | motor `references/copy.md` §1 | conteúdo | livre |
| N2 | Cena de scroll (fixa e animada pelo scroll) | `references/scenes.md`, `assets/scenes/stage.js` | JS (GSAP) | limite: 2–3 por página |
| N3 | Título fixo enquanto o conteúdo passa | receitas "Pinned story", "Held picture, passing captions" | CSS | limite |
| N4 | Parallax em camadas | `motion.md` §5 | CSS | limite: < 8% |
| N5 | Galeria lateral | receitas "Sideways gallery", "Drag row" | CSS primeiro | limite |
| N6 | Marquee de texto | movimento "Edge-to-edge marquee" | CSS | limite: um, pausável |
| N7 | Cor por capítulo | movimento "Colour by chapter" | CSS | livre |
| N8 | Sequência de imagens ou vídeo controlada pelo scroll | cena em `stage.js` | JS | limite |
| N9 | Herói que recua, folha sobre imagem, rodapé cortina | receitas "Receding hero", "Sheet over a held picture", "Curtain footer" | CSS | livre |

### P3 — 3D e efeitos (só no nível 3, e conta como momento protagonista)

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| X1 | Objeto 3D (React Three Fiber, Three.js) | `references/motion-stack.md` | React | limite: com pôster e fallback |
| X2 | Campo de shader, gradiente líquido | `motion-stack.md` (Paper Shaders) | React | limite: conta como gradiente |
| X3 | Distorção de imagem no hover | `motion-stack.md` | JS | limite |
| X4 | Grão, ruído, gradient mesh | — | CSS | proibido |
| X5 | Preloader com marca | — | JS | proibido |

### Mídia

| ID | Estratégia | No plugin | Camada | Regra |
|---|---|---|---|---|
| D1 | Fotos e interface reais do projeto | motor `references/imagery.md` | HTML | livre |
| D2 | Imagens do mundo do assunto em acervos abertos | motor `scripts/assets.mjs` | HTML | livre, com crédito |
| D3 | Imagem gerada | `image-direction` | — | se houver ferramenta e o usuário autorizar |
| D4 | Uma imagem em movimento (vídeo mudo em loop) | `assets.mjs --video` | HTML | limite: pausável |
| D5 | Fragmentos reais da interface (software) | motor `assets/app.css`, `assets/charts.js` | HTML/CSS | livre |

## D. Camada de implementação: CSS primeiro, React, JavaScript por último

Toda linha `aplicar` ou `adaptar` declara a camada, nesta ordem de preferência:

1. **CSS.** Transições, keyframes, scroll timelines (`animation-timeline`), View Transitions, `:has()`,
   `grid-template-rows` para abrir, `clip-path`, container queries. Roda sem script, não bloqueia a leitura e é o
   que mais aguenta em celular fraco. A maior parte das receitas do motor já é CSS.
2. **React.** Componentes, estado, formulários, a coisa viva, transições entre telas e entre estados
   (Motion `AnimatePresence`, `layoutId`), 3D com React Three Fiber. Em projeto React ou Next.js, todo o movimento
   de componente mora no componente, com CSS (CSS Modules ou Tailwind) sempre que o CSS alcançar.
3. **JavaScript de animação** (GSAP, Lenis, SplitText) só quando o CSS não alcança: cenas com scrub, timelines
   longas, divisão de texto, sequências de imagem.

**Stack.** Projeto existente: mantém o stack dele (sem migração de framework). Site novo sem stack definido:
Next.js + TypeScript (React), com o CSS do motor. A wiring de cada biblioteca está em
`design-taste-frontend/references/motion-stack.md`.

## E. Modelo do arquivo

Grave em `.taste-skill/VARREDURA.md`:

```markdown
# VARREDURA — <produto> (<data>)

## Diagnóstico (antes)
| Bloco | Nota 0–5 | Evidência |
|---|---|---|
| Fundação visual | | |
| Técnica | | |
| Movimento | | |
| Narrativa | | |
| Mídia | | |

3 maiores ganhos: 1. … 2. … 3. …
Nível: <1 | 2 | 3> — motivo: …
Momentos protagonistas (máx. 2): …

## Skills consultadas
| Skill | Consultada em | Resultado |
|---|---|---|
| design-taste-frontend | | |
| design-styles | | <estilo escolhido ou "nenhum" e por quê> |
| ui-components | | <componentes shadcn e Spell UI escolhidos ou "nenhum"> |
| image-direction | | <fonte de imagem decidida> |
| design-qa | | <auditoria do antes: achados críticos> |

## Varredura
| ID | Existe hoje | Cabe? (motivo do brief) | Onde | Camada | Decisão |
|---|---|---|---|---|---|
| F1 | | | | | |
…
```

## Gate

Avance para a etapa 3 só quando:

- todas as linhas do catálogo que a proporção exige têm decisão;
- nenhuma linha P0 está como `descartar`;
- toda decisão `aplicar` ou `adaptar` tem lugar e camada;
- há no máximo dois momentos protagonistas, e o nível escolhido comporta cada um;
- cada skill da tabela "Skills consultadas" tem uma linha preenchida (`design-engine-legacy` só entra por pedido
  nominal).

Releia o arquivo antes de construir cada seção. Uma decisão que não aparece no código é uma pendência no relatório.

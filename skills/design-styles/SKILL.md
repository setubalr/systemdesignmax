---
name: design-styles
description: "Biblioteca única de 70 direções visuais (67 estilos Bergside/typeui.sh + 3 clássicos opt-in: minimalist-ui, industrial-brutalist-ui, high-end-visual-design), com índice de tokens e matriz de escolha por tipo de produto. Use para escolher e aplicar UM estilo por superfície em um redesign ou projeto novo: quando o usuário pede um estilo pelo nome (brutalism, glassmorphism, shadcn, claude, material…), pergunta qual visual combina com o produto, ou quando o orquestrador precisa de um contrato visual com tokens. Não mistura estilos e não substitui o motor design-taste-frontend."
---

# design-styles — 70 estilos, um índice, um contrato

Esta skill **substitui 70 skills separadas** (67 do Bergside/typeui.sh e 3 clássicas do taste-skill) por uma só:
o texto repetido (missão, fluxo, formato de saída, gates de qualidade) está aqui uma vez; cada estilo ficou
reduzido ao que o torna diferente — marca, fundamentos, tokens e regras.

```
styles/index.json      índice: slug, família, origem, invocação, tokens, fontes, quando usar/evitar
styles/<slug>.md       um arquivo por estilo (leia SÓ o escolhido)
```

## Papéis — quem manda em quê

- **Motor** (`design-taste-frontend`): **dono da direção** — ideia, composição, herói, seções, imagem,
  movimento e os gates do inspetor.
- **Estilo** (esta skill): **sabor opcional** — tipografia, paleta, forma e as regras do motor que a sua
  linguagem precisa. Nunca troca a composição sorteada pelo motor.
- **Marca existente do projeto** vence o estilo. O estilo só preenche o que a marca não define.
- **Um sabor por superfície.** Superfícies diferentes (landing vs. app) podem usar estilos diferentes **se
  compartilharem a identidade do projeto** (logo, cor de marca, voz, tipografia-base).

## Quando usar um estilo (e quando não)

Sem estilo, o motor sorteia tipografia e paleta da própria biblioteca (44 sistemas de tipo, 56 paletas), e isso já
varia de projeto para projeto. Um estilo entra quando:

- o usuário o nomeou (os 3 clássicos `minimalist-ui`, `industrial-brutalist-ui` e `high-end-visual-design` só
  entram assim); ou
- a personalidade do `DESIGN-BRIEF` pede uma linguagem que o motor não sorteia: vidro, neon, clay, neumorfismo,
  pixel/retrô, brutalismo, rabisco, papel e afins.

Não use um estilo só para "ter um estilo". Escolher `shadcn` ou `clean` para todo SaaS é exatamente o que torna
os resultados iguais.

## Como aplicar

1. **Há identidade obrigatória?** A marca fixa cor e fonte (`--keep palette,type` no motor); o estilo contribui só
   forma e regras liberadas, ou fica de fora.
2. **Candidatos:** a matriz abaixo é ponto de partida por tipo de produto. Cruze com os eixos do brief (tom,
   expressão, época, temperatura) e rejeite os que colidem com `index.json` → `avoid`.
3. **Leia apenas o arquivo do escolhido** (`styles/<slug>.md`).
4. **Entregue ao motor:** `draw.mjs ... --direction <id> --style <slug>`. O sheet passa a mostrar tipografia e
   cores do estilo e grava as regras liberadas de `styles/allowances.json`; `inspect.mjs` e `lint.mjs` as
   respeitam. Todas as outras regras do motor continuam valendo.
5. Projeto shadcn/Tailwind: `ui-components` gera o tema (`style-to-shadcn.mjs <slug>`) com contraste medido.

> Nunca "faça uma média" entre dois estilos. Se o pedido mistura (ex.: "brutalista mas premium"), escolha o
> dono da superfície e tome emprestado no máximo um *detalhe* do outro, declarando-o como desvio.

## Matriz por tipo de produto

| Tipo de produto | Candidatos (ordem de aderência) |
|---|---|
| SaaS / B2B / dashboards | `shadcn`, `clean`, `corporate`, `enterprise`, `ant`, `stitch`, `geometric` |
| Ferramentas de dev | `mono`, `roku`, `codex`, `matrix`, `shadcn` |
| IA / chat / agentes | `agentic`, `claude`, `codex`, `cosmic` |
| Landing de conversão | `levels`, `bold`, `contemporary`, `bento`, `gradient` |
| Premium / luxo discreto | `premium`, `power`, `refined`, `square`, `high-end-visual-design`* |
| Editorial, blog, portfólio | `editorial`, `modern`, `basic`, `minimal`, `paper`, `impeccable` |
| Consumer lúdico / educação | `friendly`, `lingo`, `creative`, `claymorphism`, `fiction`, `vibrant` |
| Games / retrô | `pacman`, `sega`, `tetris`, `retro`, `vintage`, `dithered`, `fantasy`, `skeumorphism` |
| Cultura, arte, zines | `artistic`, `riso`, `doodle`, `sketch`, `brutalism`, `neobrutalism` |
| Gastronomia, artesanato | `cafe`, `terracotta`, `paper` |
| Narrativa / campanha / eventos | `storytelling`, `immersive`, `dramatic` |
| Ecossistema Google / Android | `material` |
| Finanças, saúde, institucional sóbrio | `corporate`, `professional`, `clean`, `spacious` |
| Controles táteis / players | `neumorphism`* (só com contraste reforçado), `skeumorphism` |
| Industrial / telemetria | `industrial-brutalist-ui`* |

`*` = opt-in: só quando o usuário pedir pelo nome.

## Famílias (todas as 70 entradas)

| Família | Estilos |
|---|---|
| minimal-clean | `minimal` `clean` `codex` `geometric` `sleek` `spacious` `square` `flat` `shadcn` `minimalist-ui`* |
| editorial-warm | `editorial` `basic` `modern` `refined` `paper` `claude` `terracotta` `cafe` `impeccable` |
| corporate-data | `corporate` `professional` `enterprise` `ant` `stitch` `roku` `material` |
| premium-dark | `premium` `power` `contemporary` `bento` `glassmorphism` `high-end-visual-design`* |
| tech-futurist | `futuristic` `cosmic` `matrix` `mono` `neon` `agentic` `perspective` `industrial-brutalist-ui`* |
| brutalist-bold | `brutalism` `neobrutalism` `bold` `pulse` |
| narrative-conversion | `immersive` `levels` `storytelling` `dramatic` |
| playful-friendly | `friendly` `creative` `doodle` `fiction` `lingo` `claymorphism` `expressive` `vibrant` `colorful` `gradient` `sketch` `riso` `artistic` |
| retro-game | `retro` `vintage` `dithered` `pacman` `sega` `tetris` `fantasy` `skeumorphism` `neumorphism` |

## Contrato de aplicação (vale para todos os estilos)

Isto resume o que os 67 arquivos upstream repetiam, aplicado à **implementação** (não à redação de guias):

1. **Tokens primeiro, componentes depois.** Defina cor, tipografia, espaçamento e raio como variáveis; só então
   estados e variantes. Prefira tokens semânticos a valores soltos.
2. **Estados obrigatórios** onde se aplicam: default, hover, `focus-visible`, active, disabled, loading, error.
3. **Entrada**: teclado, ponteiro e toque. Alvos de toque ≥ 44 px em mobile.
4. **Responsivo e casos de borda**: rótulos longos, vazio/carregando/erro, overflow, telas pequenas.
5. **Acessibilidade vence estética**: WCAG 2.2 AA, foco visível, contraste de texto ≥ 4.5:1 e de componente ≥ 3:1.
   Se o estilo pede contraste baixo (ex.: `neumorphism`, `glassmorphism`), reforce bordas/foco/texto e registre o desvio.
6. **Regra testável**: toda regra visual aponta para um token, um limite ou um exemplo; evite adjetivos soltos.
7. **Anti-padrões**: não misture metáforas visuais; não use movimento sem função; respeite `prefers-reduced-motion`.
8. **QA** antes de dar como pronto: passe por `design-qa` (auditoria + browser).

### Quando o pedido é *escrever* um guia de design system (não implementar)

Use esta estrutura: contexto e metas → tokens e fundamentos → regras por componente (anatomia, variantes,
estados, responsivo) → requisitos de acessibilidade com critérios testáveis → tom e conteúdo com exemplos →
anti-padrões → checklist de QA. "Deve" = inegociável, "deveria" = recomendação; toda regra "faça" vem com ao menos
um exemplo "não faça" e, para padrão novo, uma nota de migração.

## Observações e armadilhas

- Tokens upstream às vezes são inconsistentes (ex.: `bold`, `pacman`, `mono`, `pulse`, `dramatic`,
  `glassmorphism`: texto escuro sobre fundo escuro). `ui-components/scripts/style-to-shadcn.mjs` detecta e corrige
  com aviso; ao implementar manualmente, **meça o contraste**.
- `claude` e `codex` são **nomes de estilos**, não seleção de modelo. `impeccable` é o estilo Bergside, não o
  projeto homônimo. `stitch` é um estilo corporativo de dados; **não** é `stitch-design-taste`
  (gerador de DESIGN.md, em `design-engine-legacy`). `minimal` ≠ `minimalist-ui`.
- Fontes proprietárias (ex.: "Anthropic Sans", SF Pro) não estão disponíveis ao projeto; troque por uma gratuita
  **da mesma classe** (Fontshare, Google Fonts ou a biblioteca de tipos do motor) e registre. Inter não é o
  fallback padrão: ela já é a fonte de 11 estilos e é um dos motivos de os resultados se parecerem.
- Os arquivos `styles/<slug>.md` são curtos (tokens essenciais + fontes). As regras "Fazer/Evitar" repetidas
  neles são genéricas; a direção real vem do motor e do brief.
- No Windows, `styles/claude.md` é lido pelo Claude Code como um `CLAUDE.md` da pasta (o sistema de arquivos não
  diferencia maiúsculas). É só o texto do estilo, não uma instrução.
- `matrix` é dark-only. `flat`/`material`/`skeumorphism` são variantes Antigravity do mesmo repositório.
- Não instale bibliotecas homônimas (Ant Design, Material UI…) só porque o estilo cita o nome: o estilo é uma
  linguagem visual, não uma dependência.
- Fontes e conteúdo: Bergside/typeui.sh (MIT) e Leonxlnx/taste-skill-classics (MIT). Ver `NOTICE.md` na raiz do plugin.

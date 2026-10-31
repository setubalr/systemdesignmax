# Fluxo detalhado (etapas 0–7)

Cada etapa tem uma saída e chama skills definidas. Não avance sem a saída.

## 0. Proteger

- Confirme projeto/pasta, ambiente (local/staging/produção) e se pode editar. Junte essas perguntas às da
  descoberta (etapa 1) numa única mensagem.
- `git status` e branch; crie um ponto de retorno (branch `redesign/<tema>` ou commit) se autorizado. Anote os
  comandos de build e dev. Nunca trabalhe direto sobre produção.
- Alterações pré-existentes do usuário não são suas: não as reverta nem as inclua.
- Pare se a edição não foi autorizada ou a pasta não é o projeto.

## 1. Entender (projeto, produto, diagnóstico)

**Projeto (técnico).** Framework, método de estilo (Tailwind v3/v4, CSS modules…), `components.json`, rotas,
jornadas críticas, tokens e componentes existentes, temas, i18n. Rode o app e grave o "antes":

- motor: `inspect.mjs <url> --out .taste-skill/before` (`--app` para telas de trabalho);
- `design-qa`: auditoria estática (Vercel) e o checklist de `hig-web.md` §2, com arquivo:linha.

Áreas sem acesso (login, dados) ficam marcadas como bloqueadas, não supostas.

**Produto.** Siga `descoberta.md` e grave `.taste-skill/DESIGN-BRIEF.md`. É a etapa que impede o resultado de sair
igual a todos os outros; não a encurte para ganhar tempo em um redesign completo.

**Diagnóstico.** `varredura.md` §A: nota 0–5 por bloco, três maiores ganhos, nível de intervenção (1, 2 ou 3) e
os momentos protagonistas pretendidos.

Saída: brief + baseline + diagnóstico + lista do que o projeto já faz bem (preservar).

## 2. Varrer

Siga `varredura.md` §B e §C. Para cada estratégia do catálogo, leia a parte da skill indicada e decida: existe?
cabe? onde? com que camada? `aplicar`, `adaptar`, `manter`, `descartar` ou `pedir`. Nesta etapa cada skill é
consultada:

- `design-taste-frontend`: as receitas de `motion.md`, as cenas de `scenes.md`, `motion-stack.md`, tipo, cor,
  layout e imagem do motor;
- `design-styles`: `styles/index.json` contra os eixos do brief (linha F7);
- `ui-components`: o que o shadcn e o catálogo do Spell UI cobrem das linhas F6, I2, I4 e I8;
- `image-direction`: a fonte de imagem (linhas D1 a D4) e se há ferramenta de geração;
- `design-qa`: os achados do antes viram linhas T1 a T4.

Saída: `.taste-skill/VARREDURA.md` que passa no gate de `varredura.md`.

## 3. Conceituar

- `draw.mjs --options 3` com os parâmetros tirados do brief (`--sector`, `--tone`, `--have`, `--keep`).
- Monte os três conceitos de `descoberta.md` §8. Cada um usa só estratégias `aplicar`/`adaptar` da varredura e
  nomeia seus momentos protagonistas (no máximo dois). Estilo de `design-styles` só no conceito que precisa dele.
- Mostre os conceitos e obtenha a escolha (obrigatória para mudança grande de marca ou navegação; `--auto` deixa
  você decidir nos demais casos). Registre no brief.

## 4. Dirigir

- Deal completo: `draw.mjs <mesmos argumentos> --direction <id> [--style <slug>]`. Com `--style`, o motor usa a
  tipografia e a paleta do estilo, mantém a composição e libera as regras do estilo no inspetor e no lint.
- Projeto shadcn/Tailwind: `ui-components/scripts/style-to-shadcn.mjs <slug>` gera o tema com contraste medido.
- Escreva a frase da ideia e a coisa viva (motor, passo 4) a partir do inventário do brief.
- Critérios de aceite mensuráveis: contraste ≥ 4.5:1, sem rolagem lateral em 390 px, foco visível, `inspect.mjs`
  sem FAIL, checklist HIG sem item crítico, LCP < 2,5 s e não pior que o baseline.

## 5. Construir

- Ordem: tokens/tema (cor, espaço, tipo, raio, **duração e easing**) → componentes base → **uma tela
  representativa** → checagem rápida (build + screenshot + teclado) → demais telas.
- Camada: CSS primeiro, React em seguida, JavaScript de animação por último (`varredura.md` §D). Em React, o
  movimento do componente fica no componente; bibliotecas e wiring em `design-taste-frontend/references/motion-stack.md`.
- Siga o run do motor (cópia, imagem, movimento, cenas). Instale componentes por
  `search → view → add --dry-run → add` e liste dependências novas.
- Toda linha `aplicar`/`adaptar` da varredura vira código; ao terminar uma seção, marque na varredura o que foi
  feito.
- Preserve handlers, chamadas de API, formulários, permissões, rotas e dados. Mudar comportamento exige pedido.

## 6. Verificar

- Gates do projeto (build/lint/typecheck/testes): comando e resultado, ou "não existe".
- Motor: `lint.mjs` e `inspect.mjs` (e `scenes.mjs` com cenas) até 0 FAIL; olhar todos os screenshots e
  criticar com `critique.md`, no máximo três rodadas.
- `design-qa`: auditoria Vercel (arquivo:linha) e jornadas em browser (desktop, tablet, mobile, teclado, estados,
  temas, `prefers-reduced-motion`). Dados só de teste autorizados.
- Checklist de `hig-web.md` §2 sem item crítico. O auditor externo HIG Doctor só com autorização.
- **Portões de qualidade:**
  1. Desempenho: animações só em `transform`, `opacity` e `clip-path`; metas de LCP, INP e CLS.
  2. Acessibilidade: teclado completo, foco visível, contraste 4.5:1, reduced-motion com a página pronta.
  3. Celular: testado na largura real; 3D e efeitos pesados com fallback.
  4. Consistência: no máximo 2–3 curvas de easing e 3 durações em todo o site (os tokens).
  5. Contenção: nada se move por cima do texto sendo lido nem atrasa o botão principal; até dois momentos
     protagonistas.
- Refaça o diagnóstico (`varredura.md` §A) com as mesmas medidas: as notas do depois vão para o relatório.
- Compare o resultado com o brief: o sentimento-alvo, a hipótese e o que devia ser evitado da categoria.

## 7. Entregar

- Relatório curto (`relatorio.md`): diagnóstico antes × depois, varredura cumprida, implementado × comprovado,
  pendências, como reverter.
- Publicar só com autorização explícita; depois verifique a rota principal e um fluxo crítico em produção.

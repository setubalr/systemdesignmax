# Fluxo detalhado (etapas 0–6)

Cada etapa tem uma saída. Não avance sem ela.

## 0. Proteger

- Confirme projeto/pasta, ambiente (local/staging/produção) e se pode editar. Junte essas perguntas às da
  descoberta (etapa 1) numa única mensagem.
- `git status` e branch; crie um ponto de retorno (branch `redesign/<tema>` ou commit) se autorizado. Anote os
  comandos de build e dev. Nunca trabalhe direto sobre produção.
- Alterações pré-existentes do usuário não são suas: não as reverta nem as inclua.
- Pare se a edição não foi autorizada ou a pasta não é o projeto.

## 1. Entender

**Projeto (técnico).** Framework, método de estilo (Tailwind v3/v4, CSS modules…), `components.json`, rotas,
jornadas críticas, tokens e componentes existentes, temas, i18n. Rode o app e grave o "antes" com o motor
(`inspect.mjs <url> --out .taste-skill/before`, `--app` para telas de trabalho). Áreas sem acesso (login, dados)
ficam marcadas como bloqueadas, não supostas.

**Produto.** Siga `descoberta.md` e grave `.taste-skill/DESIGN-BRIEF.md`. É a etapa que impede o resultado de sair
igual a todos os outros; não a encurte para ganhar tempo em um redesign completo.

Saída: brief + baseline + lista do que o projeto já faz bem (preservar).

## 2. Conceituar

- `draw.mjs --options 3` com os parâmetros tirados do brief (`--sector`, `--tone`, `--have`, `--keep`).
- Monte os três conceitos de `descoberta.md` §8. Estilo de `design-styles` só no conceito que precisa dele.
- Mostre os conceitos e obtenha a escolha (obrigatória para mudança grande de marca ou navegação; `--auto` deixa
  você decidir nos demais casos). Registre no brief.

## 3. Dirigir

- Deal completo: `draw.mjs <mesmos argumentos> --direction <id> [--style <slug>]`. Com `--style`, o motor usa a
  tipografia e a paleta do estilo, mantém a composição e libera as regras do estilo no inspetor e no lint.
- Projeto shadcn/Tailwind: `ui-components/scripts/style-to-shadcn.mjs <slug>` gera o tema com contraste medido.
- Escreva a frase da ideia e a coisa viva (motor, passo 4) a partir do inventário do brief.
- Critérios de aceite mensuráveis: contraste ≥ 4.5:1, sem scroll horizontal em 390 px, foco visível, `inspect.mjs`
  sem FAIL, LCP não pior que o baseline.

## 4. Construir

- Ordem: tokens/tema → componentes base → **uma tela representativa** → checagem rápida (build + screenshot +
  teclado) → demais telas.
- Siga o run do motor (cópia, imagem, movimento, cenas). Instale componentes por
  `search → view → add --dry-run → add` e liste dependências novas.
- Preserve handlers, chamadas de API, formulários, permissões, rotas e dados. Mudar comportamento exige pedido.

## 5. Verificar

- Gates do projeto (build/lint/typecheck/testes): comando e resultado, ou "não existe".
- Motor: `lint.mjs` e `inspect.mjs` (e `scenes.mjs` com cenas) até 0 FAIL; olhar todos os screenshots e
  criticar com `critique.md`, no máximo três rodadas.
- `design-qa`: auditoria Vercel (arquivo:linha) e jornadas em browser (desktop, tablet, mobile, teclado, estados,
  temas, `prefers-reduced-motion`). Dados só de teste autorizados.
- Compare o resultado com o brief: o sentimento-alvo, a hipótese e o que devia ser evitado da categoria.

## 6. Entregar

- Relatório curto (`relatorio.md`): implementado × comprovado, pendências, como reverter.
- Publicar só com autorização explícita; depois verifique a rota principal e um fluxo crítico em produção.

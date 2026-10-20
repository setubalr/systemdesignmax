# Fluxo detalhado (etapas 0–7)

Cada etapa tem **entrada**, **ações**, **saída** e **critério de parada**. Não avance sem a saída.

## 0. Proteger

- Entrada: pedido do usuário. Pergunte **uma vez**, em bloco, o que faltar: projeto/pasta, ambiente (local/staging/
  produção), o que *não* pode mudar (marca, rotas, dados), se pode editar arquivos, se publicar está autorizado.
- Ações: `git status` e branch; crie um ponto de retorno (branch `redesign/<tema>` ou commit) **somente se autorizado**;
  anote o comando de build/dev. Nunca trabalhe diretamente sobre produção.
- Saída: autorização de edição registrada; mecanismo de retorno; estado inicial (árvore limpa ou lista de alterações
  pré-existentes do usuário, que **não** são suas).
- Pare se: edição não autorizada ou o diretório não é o projeto certo.

## 1. Diagnosticar

- Mapear: framework, estilos (Tailwind v3/v4, CSS modules…), `components.json`, rotas, jornadas críticas, tokens
  existentes, componentes reutilizáveis, tema claro/escuro, i18n.
- Rodar o app e **capturar baseline**: screenshots de cada rota principal em 3 larguras, estados vazio/erro quando
  acessíveis. Limitações (login, dados) viram "bloqueado", não suposição.
- Se `design-taste-frontend` está no escopo, siga a rota **Redesign or review** dele para o registro do "antes".
- Saída: inventário curto + baseline com caminhos de arquivo + lista do que o projeto faz bem (preservar).

## 2. Direcionar

- Classificar a superfície (página × app) e escolher o motor (padrão: `design-taste-frontend`).
- Escolher estilo (`design-styles`): 1 principal + até 2 alternativas, com motivo. Marca obrigatória vence.
- Gerar tokens (`ui-components` → `style-to-shadcn.mjs` se shadcn) e **critérios de aceite mensuráveis**
  (ex.: contraste ≥ 4.5:1; sem scroll horizontal em 375 px; todas as rotas com foco visível; LCP não pior que o baseline).
- Mudança grande de marca/navegação → apresentar a direção (tokens + 1 tela de referência) e **obter aceite**.
- Saída: decisão registrada (motor, estilo, descartados, desvios) + critérios de aceite.

## 3. Assets (somente se aplicável)

- Entrar em `image-direction` apenas se pedido. Confirmar ferramenta/custo, gerar arquivo real, abrir e analisar.
- Sem ferramenta: marcar *bloqueada*, propor wireframe em HTML ou descrição; **não** alegar geração.

## 4. Implementar

- Ordem: tokens/tema → componentes base (ui-components) → **uma tela representativa** → validar (etapa 6 resumida:
  build + screenshot + teclado) → só então ampliar às demais telas.
- Preservar handlers, chamadas de API, formulários, permissões, rotas e dados. Mudança de comportamento exige
  pedido explícito.
- Instalar componentes por `search → view → add --dry-run → add`; listar dependências novas.
- Commits pequenos e descritivos (se o usuário autorizou commits).

## 5. Auditar

- Rodar gates do projeto (build/lint/typecheck/testes) e registrar comando + resultado (ou "não existe").
- `design-qa`: auditoria Vercel (arquivo:linha) + checagens do motor (ex.: `inspect.mjs`/`lint.mjs` do
  `design-taste-frontend` quando o ambiente permitir executá-los).
- Saída: lista de achados com severidade.

## 6. Validar

- Subir a prévia e percorrer as jornadas com `design-qa`/playwright-cli: desktop, tablet, mobile; teclado; estados;
  temas existentes; `prefers-reduced-motion`.
- Escrever dados **somente** de teste autorizados. Sem sessão para áreas protegidas → bloqueado.
- Corrigir e retestar; máx. 3 tentativas por abordagem.
- Saída: evidências antes × depois + critérios de aceite marcados (cumprido / não cumprido / não testado).

## 7. Entregar

- Separar o **implementado** do **comprovado**. Listar pendências e riscos. Informar como reverter.
- Publicar apenas com autorização explícita e validação compatível; depois, verificar produção (a rota principal e um
  fluxo crítico) e reportar o resultado real.
- Fechar com o relatório (`relatorio.md`).

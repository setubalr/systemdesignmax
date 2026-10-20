# shadcn/ui — o que é gratuito e como usar com este plugin

shadcn/ui é código aberto (MIT): você copia o componente para o seu projeto. Tudo abaixo é gratuito e foi
verificado contra a CLI real (`shadcn@4.22.1`) e a documentação oficial (https://ui.shadcn.com/docs).

## Comandos (confirmados em `npx shadcn@latest --help`)

| Objetivo | Comando |
|---|---|
| Ler a configuração real do projeto | `npx shadcn@latest info` (`--json` para máquina) |
| Iniciar num projeto sem `components.json` | `npx shadcn@latest init` *(altera arquivos: peça aprovação)* |
| Buscar componentes/blocos | `npx shadcn@latest search @shadcn -q dashboard -t block` |
| Ver o código sem instalar | `npx shadcn@latest view @shadcn/dashboard-01` |
| Documentação e exemplos de uso | `npx shadcn@latest docs button card` |
| Instalar com pré-visualização | `npx shadcn@latest add button --dry-run` → `add button` |
| Ver diferenças antes de sobrescrever | `npx shadcn@latest add button --diff` |
| Aplicar preset (tema/fonte) | `npx shadcn@latest apply <preset> --only theme,font` |
| Decodificar/abrir um preset | `npx shadcn@latest preset decode <code>` / `preset open <code>` |
| Registrar outro registry | `npx shadcn@latest registry add @namespace` |
| MCP para o agente | `npx shadcn@latest mcp` (ou `mcp init --client claude`) |

Skill oficial opcional (instala o contexto do projeto para o agente): `pnpm dlx skills add shadcn/ui`.
Ela ativa quando há `components.json`; este plugin não a substitui, só convive com ela.

## O que há de gratuito para reaproveitar

- **Componentes** (`@shadcn/button`, `dialog`, `table`, `form`, `sidebar`, `chart`, …).
- **Blocos** completos: `dashboard-01` (sidebar + gráficos + tabela), `login-01`…`login-05` (7 variações no
  registry), `sidebar-*`. Use `search -t block` para a lista atual — ela cresce.
- **Gráficos**: `@shadcn/chart` (recharts) + dezenas de exemplos `chart-*` (78 itens na busca "chart").
- **Temas/presets**: o tema vem das variáveis CSS; `apply` troca tema/fonte de um projeto existente.
- **Registries de terceiros gratuitos**: qualquer um que você configure em `components.json > registries`
  (ex.: `@spell`). Namespaces: `@namespace/item`.

## Boas práticas neste plugin

1. `info` primeiro; nunca presumir Tailwind v3 vs v4 (muda o formato das variáveis).
2. `search` → `view` → `add --dry-run` → `add`. Mostre ao usuário o que será criado.
3. O shadcn entrega **estrutura e acessibilidade (Radix)**; a identidade visual vem do estilo escolhido.
   Nunca deixe o look padrão passar como "redesign".
4. Depois de instalar: `design-qa` (build, lint, teclado, foco visível, screenshots).
5. Em Windows a CLI pode imprimir `Assertion failed: ... async.c` ao encerrar. É um ruído do Node no
   desligamento; confira o código de saída e o resultado, não essa linha.

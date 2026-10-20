---
name: ui-components
description: "Fonte de componentes gratuitos para o redesign: shadcn/ui (componentes, blocos, gráficos, temas, presets, CLI e MCP) e Spell UI (@spell, animações e efeitos de marketing). Use quando o projeto tem components.json ou usa React + Tailwind e é preciso escolher, instalar ou tematizar componentes; ao converter os tokens de um estilo de design-styles em tema shadcn; ou ao decidir se um componente animado cabe na superfície. Não escolhe a direção visual (isso é do motor e do estilo)."
---

# ui-components — shadcn/ui + Spell UI, conectados ao resto do sistema

Esta skill é a ponte entre **o que o design decidiu** (motor + estilo) e **o que o código usa** (componentes
gratuitos). Ela não decide estética: recebe tokens e superfície, devolve componentes instalados e tema aplicado.

## Quando usar

- Existe `components.json` na raiz, ou o stack é React/Vite/Next + Tailwind.
- O estilo escolhido em `design-styles` precisa virar tema (`--primary`, `--background`, `--radius`…).
- Falta um componente/bloco (dashboard, login, sidebar, gráfico) ou um efeito de marketing (texto animado,
  fundo, marquee).
- **Não usar** para: escolher o estilo; reescrever o projeto para shadcn se ele não usa; instalar bibliotecas
  inteiras "por garantia".

## Fluxo (siga a ordem)

1. **Ler o projeto, não supor.** `npx shadcn@latest info` (framework, Tailwind v3/v4, aliases, componentes
   instalados). Sem `components.json`: perguntar antes de rodar `shadcn init` — ele altera arquivos.
2. **Conectar registries gratuitos** (idempotente, dry-run por padrão):
   `node <plugin>/skills/ui-components/scripts/connect-registries.mjs --cwd <projeto>` e, aprovado,
   `--write`. Isso registra `@spell`. O `@shadcn` já é o padrão.
3. **Aplicar o estilo como tema**:
   `node <plugin>/skills/ui-components/scripts/style-to-shadcn.mjs <slug> --cwd <projeto>`.
   Imprime as variáveis CSS (HSL para Tailwind v3, hex para v4), um dark mode derivado, e roda o contraste WCAG.
   Revise e cole no CSS global; **não** grave automaticamente. Ver `references/tokens-to-shadcn.md`.
4. **Buscar antes de escrever**: `npx shadcn@latest search @shadcn -q <termo>` e
   `npx shadcn@latest search @spell -q <termo>`; inspecionar com `view`/`docs`; instalar com
   `add --dry-run` primeiro, depois `add`. Ver `references/shadcn.md`.
5. **Efeitos de marketing (Spell UI) só onde cabem**: ver `references/spell-ui.md` e o catálogo
   `references/spell-ui-catalog.json` (`surface`, `weight`, `animated`, `externalRequests`).
6. **Entregar para o QA**: listar o que foi instalado, dependências novas e arquivos tocados; `design-qa`
   verifica build, teclado, `prefers-reduced-motion` e screenshots.

`<plugin>` é a raiz do plugin instalado (`${CLAUDE_PLUGIN_ROOT}` no Claude Code).

## Regras de encaixe com o resto

| Situação | Decisão |
|---|---|
| Estilo = `shadcn` | Já é o look nativo: use o tema padrão do shadcn e só ajuste tokens pelo script. |
| Qualquer outro estilo | O shadcn vira **estrutura e acessibilidade** (Radix, foco, teclado); o **visual** vem dos tokens do estilo + overrides no tema. Não deixe a aparência padrão do shadcn "vazar" por cima. |
| Motor `design-taste-frontend` quer direção própria | O motor manda no visual; esta skill só fornece primitivos. Se o motor proibir um padrão (ex.: cards genéricos), componha de forma diferente — não reaplique o bloco como veio. |
| Superfície = app/dashboard | Prefira shadcn (`dashboard-01`, `sidebar-*`, `chart`, tabelas). Spell UI só utilitários leves (`badge`, `kbd`, `spinner`, `copy-button`). |
| Superfície = página de marketing | Spell UI permitido para 1–2 momentos de impacto, respeitando peso e `prefers-reduced-motion`. |
| Item `weight: heavy` (WebGL/three/opentype) | Exige justificativa, carregamento tardio e fallback estático. |
| Item `externalRequests: true` (`tweet`, `spotify-card`) | Faz requisições a terceiros: pedir autorização por causa de privacidade/CSP. |

## Segurança e licença

- shadcn/ui é MIT; Spell UI é MIT (verificado no `LICENSE` e no `registry.json` públicos; nenhum item marcado como
  pago). Mesmo assim, **confira `shadcn view @spell/<item>` antes de instalar**: o registry é de terceiros e
  pode mudar. Código de registry é código executado no seu app: leia os arquivos retornados.
- Nunca grave tokens/credenciais de registry privado no repositório. Registries privados ficam fora deste plugin.
- Não instale dependências novas sem listar (`dependencies` do item) e sem checar peso no bundle.
- O MCP do shadcn (`.mcp.json` do plugin) apenas busca/instala itens dos registries do `components.json`.

## Saída esperada

1. Tema aplicado (diff do CSS) + resultado do contraste.
2. Lista de itens instalados com origem (`@shadcn/…` ou `@spell/…`), dependências adicionadas e arquivos criados.
3. Decisões recusadas (ex.: "light-rays dispensado: WebGL sem ganho para esta página").

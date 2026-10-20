# systemdesignmax

Plugin do Claude Code para **redesenhar e projetar sistemas** com método: ele diagnostica o projeto, escolhe **um**
motor de direção e **um** estilo por superfície, usa componentes **gratuitos** (shadcn/ui e Spell UI), implementa,
audita e valida em browser real — e só reporta o que foi comprovado.

As **82 skills** de design que existiam soltas foram **unificadas por função** em 6 especialistas, coordenados por uma
orquestradora, um agente (system prompt) e um comando único.

```
/systemdesignmax:design redesenhar o painel de chamadas, mantendo a marca --style shadcn
```

## O que vem no plugin

| Componente | Nome | O que faz |
|---|---|---|
| Comando | `/systemdesignmax:design` | entrada única; aceita `--audit`, `--style`, `--engine`, `--images`, `--publish` |
| Agente | `systemdesignmax` | system prompt completo (`prompts/system-prompt.md` é a fonte) |
| Skill | `systemdesignmax` | **orquestradora**: fluxo 0–7, seleção, conflitos, evidências |
| Skill | `design-taste-frontend` | **motor** de direção e construção (inclui o antigo `redesign-existing-projects`) |
| Skill | `design-styles` | **70 estilos** com tokens + matriz por tipo de produto |
| Skill | `ui-components` | **shadcn/ui + Spell UI** gratuitos; converte estilo → tema; contraste WCAG |
| Skill | `image-direction` | `brandkit`, imagem web, imagem mobile, `image-to-code` |
| Skill | `design-qa` | auditoria Vercel (Web Interface Guidelines) + `playwright-cli` |
| Skill | `design-engine-legacy` | v1, v2-experimental, `gpt-taste`, `stitch-design-taste` — **opt-in** |
| MCP | `shadcn` | servidor oficial (`npx shadcn@latest mcp`) para buscar/instalar itens dos registries |

## Como as 82 skills foram unificadas

| Antes | Agora | Lógica do merge |
|---|---|---|
| 67 estilos Bergside + 3 clássicos (`minimalist-ui`, `industrial-brutalist-ui`, `high-end-visual-design`) | `design-styles` (70) | 7 de 14 seções eram texto idêntico nos 67 arquivos (só o nome mudava). O texto comum virou **um contrato**; cada estilo ficou com marca, fundamentos, tokens e regras. Índice consultável em `styles/index.json`. |
| `design-taste-frontend` + `redesign-existing-projects` | `design-taste-frontend` | O alias já era a rota "Redesign or review" do motor. Skill mantida **íntegra** (scripts, biblioteca, inspetor). |
| `v1`, `v2-experimental`, `gpt-taste`, `stitch-design-taste` | `design-engine-legacy` | Mesma função (motor antigo), todas opt-in. Um ponto de entrada com limites explícitos. |
| `brandkit`, `image-to-code`, `imagegen-frontend-web`, `imagegen-frontend-mobile` | `image-direction` | Regras comuns (ferramenta/custo, arquivo real, uma imagem por seção) + um modo por alvo. |
| `web-design-guidelines` + `playwright-cli` | `design-qa` | Duas lentes da mesma etapa: auditoria estática + prova em browser. |
| — | `ui-components` | **Novo**: a ponte com shadcn/ui e Spell UI. |

Onde cada original vive agora: [`dependencies.json`](skills/systemdesignmax/references/dependencies.json) (máquina) e
[`catalogo.md`](skills/systemdesignmax/references/catalogo.md) (legível, com função e condições de chamada).
Os textos originais do catálogo e da instrução de sistema estão em [`docs/source/`](docs/source).

## shadcn/ui e Spell UI — gratuitos e conectados

- **shadcn/ui** (MIT): componentes, blocos (`dashboard-01`, `login-*`, `sidebar-*`), gráficos, temas/presets, CLI e MCP.
  O plugin registra o MCP oficial e ensina o fluxo `info → search → view → add --dry-run → add`.
- **Spell UI** ([spell.sh](https://spell.sh), MIT, 33 componentes): conectado como registry `@spell`. O catálogo marca
  cada item por superfície (`marketing`/`app`/`both`), peso (`light`/`medium`/`heavy`) e requisições externas, para a
  skill usar efeitos **só onde cabem**.
- **Estilo → tema**: `style-to-shadcn.mjs` transforma os tokens de qualquer um dos 67 estilos em variáveis do tema
  (HSL para Tailwind v3, hex para v4), deriva dark mode e **mede o contraste WCAG**. Ele também detectou e corrige
  tokens upstream inconsistentes (ex.: texto escuro sobre fundo escuro em `bold`, `pacman`, `mono`, `pulse`…).

```bash
# registrar @spell em components.json (dry-run; --write grava)
node skills/ui-components/scripts/connect-registries.mjs --cwd <seu-projeto>

# aplicar um estilo como tema shadcn (imprime CSS; não grava arquivos)
node skills/ui-components/scripts/style-to-shadcn.mjs claude --cwd <seu-projeto>

npx shadcn@latest search @spell -q text
npx shadcn@latest add @spell/blur-reveal --dry-run
```

## Instalação

No Claude Code:

```text
/plugin marketplace add setubalr/systemdesignmax
/plugin install systemdesignmax@systemdesignmax
```

Requisitos: Node.js ≥ 18 (scripts e `npx shadcn`). Para validação em browser: `playwright-cli`
(ver `skills/design-qa/references/playwright-cli.md`). O motor `design-taste-frontend` usa seus próprios scripts
Node (inspetor em browser real) quando o ambiente permite executá-los.

Outros agentes (Codex, Cursor…): copie a pasta `skills/` para o mecanismo de skills do agente e use
[`prompts/system-prompt.md`](prompts/system-prompt.md) como instrução de sistema.

## Como o agente decide (resumo)

1. **Proteger → Diagnosticar → Direcionar → (Assets) → Implementar → Auditar → Validar → Entregar.**
2. Precedência: segurança → escopo do usuário → funcionalidade e acessibilidade → marca obrigatória → estilo → estética das dependências.
3. Um motor; um estilo por superfície; nunca misturar; legados e 3 estilos clássicos só por pedido nominal.
4. Nunca afirma ter rodado/gerado/publicado sem a ação real; separa **implementado** de **comprovado**.

## Manutenção

```bash
node scripts/validate.mjs        # 780+ verificações: frontmatter, links, 82 mapeadas, 67 estilos × contraste, manifestos
node scripts/sync-prompt.mjs     # regenera agents/systemdesignmax.md a partir de prompts/system-prompt.md

# regenerar dados a partir das fontes (clonadas à parte)
node scripts/maintenance/build-registry.mjs --bergside <awesome-design-skills/skills> --classics <taste-skill-classics/skills>
node scripts/maintenance/build-spell-catalog.mjs <spell-ui/registry.json>
```

O workflow `.github/workflows/validate.yml` roda a validação a cada push.

## Licenças e créditos

MIT (veja [`LICENSE`](LICENSE)). O plugin incorpora conteúdo de terceiros sob MIT/Apache-2.0 — taste-skill,
taste-skill-classics, imagegen-skills, awesome-design-skills (Bergside/typeui.sh), vercel-labs/agent-skills,
microsoft/playwright-cli — e referencia shadcn/ui e Spell UI. Atribuições completas em [`NOTICE.md`](NOTICE.md).

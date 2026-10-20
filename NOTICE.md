# Avisos de terceiros

Este plugin reúne e adapta conteúdo de projetos abertos. Os textos das licenças estão em [`LICENSES/`](LICENSES).
As adaptações (reorganização, geração de índices, cabeçalhos, tradução de metadados) são deste repositório; o conteúdo
upstream de cada arquivo permanece sob a licença de origem.

| Origem | Licença | Onde aparece | Alterações |
|---|---|---|---|
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — `skills/taste-skill` (v2.1.3) | MIT | `skills/design-taste-frontend/` | cópia integral, sem alterações |
| [Leonxlnx/taste-skill-classics](https://github.com/Leonxlnx/taste-skill-classics) | MIT | `skills/design-engine-legacy/references/*`, `skills/design-styles/styles/{minimalist-ui,industrial-brutalist-ui,high-end-visual-design}.md` | frontmatter removido; cabeçalho de contexto adicionado nos 3 estilos |
| [Leonxlnx/imagegen-skills](https://github.com/Leonxlnx/imagegen-skills) | MIT | `skills/image-direction/references/*` | frontmatter removido |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) (typeui.sh) | MIT | `skills/design-styles/styles/*.md`, `index.json` | texto comum extraído para `design-styles/SKILL.md`; cada estilo reformatado e traduzido nos rótulos; família atribuída por este projeto |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — `web-design-guidelines` | MIT (README do repositório) | `skills/design-qa/references/web-design-guidelines.md` | frontmatter removido. As regras em si são buscadas em tempo de execução de `vercel-labs/web-interface-guidelines` |
| [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) | Apache-2.0 | `skills/design-qa/references/playwright-cli*` | frontmatter removido |
| [xxtomm/spell-ui](https://github.com/xxtomm/spell-ui) (spell.sh) | MIT | `skills/ui-components/references/spell-ui-catalog.json` (metadados), `LICENSES/spell-ui.MIT` | apenas metadados do `registry.json`; o código dos componentes **não** é copiado, é instalado do registry pelo usuário |
| [shadcn/ui](https://ui.shadcn.com) | MIT | referenciado (CLI/MCP/registry); nenhum código copiado | — |

Os arquivos em `docs/source/` são os documentos originais fornecidos pelo autor deste repositório (catálogo de 82 skills
e instrução de sistema), preservados para rastreabilidade do merge.

Marcas e nomes (Anthropic, Claude, Vercel, Google, Material, Ant Design, etc.) pertencem aos seus donos; nomes de
estilos como `claude`, `codex`, `material` e `ant` descrevem linguagens visuais e não implicam afiliação.

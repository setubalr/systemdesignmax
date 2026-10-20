---
name: design-engine-legacy
description: "Motores e adaptadores de direção de arte LEGADOS e opt-in, reunidos em uma skill: taste-skill v1, taste-skill v2-experimental, gpt-taste e stitch-design-taste. Use SOMENTE quando o usuário pedir um deles pelo nome, ou quando o projeto depende do comportamento exato de uma dessas versões. Em projetos novos use design-taste-frontend."
disable-model-invocation: true
---

# design-engine-legacy — quatro skills antigas, um ponto de entrada

Reúne quatro skills que cumprem a mesma função (direção de arte para frontend) em versões anteriores ao motor atual.
Nada aqui roda sozinho: **só por pedido nominal**. O motor padrão é `design-taste-frontend`.

| Modo | Pedido nominal | Para quê | Limites | Arquivo |
|---|---|---|---|---|
| `v1` | `design-taste-frontend-v1` | taste-skill original: dials fixos (variance 8, motion 6, density 4), React/Next + Tailwind, verificação de dependências, sem emojis | projetos que dependem do comportamento exato da v1 | `references/v1.md` |
| `v2-experimental` | `design-taste-frontend-v2-experimental` | skill de arquivo único com dials e inferência de brief | **só páginas** (landing, portfólio, redesign). Nunca dashboards, tabelas ou produto multi-etapa | `references/v2-experimental.md` |
| `gpt-taste` | `gpt-taste` | engenharia de design "Awwwards" com randomização, AIDA e GSAP em scroll | contexto GPT/Codex; não para backoffice; GSAP só com necessidade verificada | `references/gpt-taste.md` |
| `stitch-design-taste` | `stitch-design-taste` | gera um `DESIGN.md` semântico para o Google Stitch | só no fluxo Stitch; **não** é estilo de código; criar o arquivo ≠ operar o Stitch | `references/stitch-design-taste.md` (+ `stitch-design-md-example.md`) |

## Regras

1. **Um motor por projeto.** Estes modos *substituem* `design-taste-frontend`; nunca rode dois nem tire "média" de prompts.
2. Antes de aplicar, confirme com o usuário que o motor atual será trocado e registre o motivo.
3. Leia **só** o arquivo do modo escolhido, por inteiro, imediatamente antes de usá-lo.
4. `gpt-taste` descreve sorteios com "script Python" simulado: **rotule como simulação** ou execute com ferramenta real;
   nunca fabrique um log de execução.
5. Os conflitos de regra (ex.: o legado proíbe algo que a marca exige) seguem a prioridade do orquestrador:
   segurança → escopo → funcionalidade e acessibilidade → identidade obrigatória → contrato visual → estética do legado.
6. `redesign-existing-projects` **não** está aqui: é alias do motor atual (`design-taste-frontend`, rota "Redesign or review").
7. Se o ambiente não puder executar o que o modo exige (script, GSAP, Stitch), marque o modo como **bloqueado** e
   proponha alternativa; não diga que o fluxo original foi executado.

Origem: Leonxlnx/taste-skill-classics (MIT). Ver `NOTICE.md`.

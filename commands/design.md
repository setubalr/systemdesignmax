---
description: Redesenha ou audita a UI de um projeto com o fluxo do SystemDesignMax (descoberta do produto, conceitos, motor, estilo opcional, QA)
argument-hint: <alvo ou pedido> [--audit] [--auto] [--style <slug>] [--engine legacy:<modo>] [--images] [--publish]
---

Execute o fluxo do SystemDesignMax para este pedido: $ARGUMENTS

1. Invoque a skill `systemdesignmax` e siga-a (etapas 0 a 6). Leia as demais skills só quando a etapa exigir.
2. A etapa 1 (Entender) inclui a descoberta do produto (`skills/systemdesignmax/references/descoberta.md`) e grava
   `.taste-skill/DESIGN-BRIEF.md` antes de qualquer escolha visual.
3. Opções:
   - `--audit` → entender e verificar; **não edite arquivos**. O brief serve para julgar o que existe.
   - `--auto` → escolha você o conceito na etapa 2 e diga por quê (mudança grande de marca ou navegação ainda
     exige a escolha do usuário).
   - `--style <slug>` → use esse estilo de `design-styles` como sabor do motor (`draw.mjs --style <slug>`); valide o
     slug em `styles/index.json`. Estilos opt-in ficam liberados por esse pedido nominal.
   - `--engine legacy:<v1|v2-experimental|gpt-taste|stitch-design-taste>` → `design-engine-legacy` no lugar do motor,
     confirmando a troca.
   - `--images` → habilita imagens geradas (`image-direction`), após confirmar ferramenta e custo.
   - `--publish` → só registre a intenção; publicar continua exigindo autorização explícita no chat.
4. Sem argumentos, pergunte uma vez, em bloco: projeto/pasta, se pode editar, o que não pode mudar e as perguntas de
   produto de `descoberta.md` §2 (com sugestões de resposta).
5. Entregue o relatório de `skills/systemdesignmax/references/relatorio.md`.

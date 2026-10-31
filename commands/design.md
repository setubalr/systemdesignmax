---
description: Redesenha ou audita a UI de um projeto com o fluxo completo do Setúbal Design (descoberta, diagnóstico, varredura de todas as estratégias, conceitos, motor, QA)
argument-hint: <alvo ou pedido> [--audit] [--auto] [--style <slug>] [--engine legacy:<modo>] [--images] [--publish]
---

Execute o fluxo do Setúbal Design para este pedido: $ARGUMENTS

1. Invoque a skill `setubal-design` (a skill mãe) e siga-a, etapas 0 a 7. Ela chama cada skill do plugin na sua
   etapa; não pule nenhuma obrigatória.
2. A etapa 1 (Entender) grava `.taste-skill/DESIGN-BRIEF.md` (`skills/setubal-design/references/descoberta.md`) e o
   diagnóstico 0–5. A etapa 2 (Varrer) grava `.taste-skill/VARREDURA.md`
   (`skills/setubal-design/references/varredura.md`) antes de qualquer escolha visual.
3. Opções:
   - `--audit` → entender, diagnosticar e varrer; **não edite arquivos**. A varredura vira lista de recomendações.
   - `--auto` → escolha você o conceito na etapa 3 e diga por quê (mudança grande de marca ou navegação ainda
     exige a escolha do usuário).
   - `--style <slug>` → use esse estilo de `design-styles` como sabor do motor (`draw.mjs --style <slug>`); valide o
     slug em `styles/index.json`. Estilos opt-in ficam liberados por esse pedido nominal.
   - `--engine legacy:<v1|v2-experimental|gpt-taste|stitch-design-taste>` → `design-engine-legacy` no lugar do motor,
     confirmando a troca.
   - `--images` → habilita imagens geradas (`image-direction`), após confirmar ferramenta e custo.
   - `--publish` → só registre a intenção; publicar continua exigindo autorização explícita no chat.
4. Sem argumentos, pergunte uma vez, em bloco: projeto/pasta, se pode editar, o que não pode mudar e as perguntas de
   produto de `descoberta.md` §2 (com sugestões de resposta).
5. Entregue o relatório de `skills/setubal-design/references/relatorio.md`.

---
description: Redesenha ou audita a UI de um projeto com o fluxo completo do SystemDesignMax (motor, estilo, componentes gratuitos, QA)
argument-hint: <alvo ou pedido> [--audit] [--style <slug>] [--engine legacy:<modo>] [--images] [--publish]
---

Execute o fluxo do SystemDesignMax para este pedido: $ARGUMENTS

1. Invoque a skill `systemdesignmax` e siga-a integralmente (etapas 0 a 7). Leia as demais skills somente quando a
   etapa exigir.
2. Interprete as opções:
   - `--audit` → apenas diagnóstico, auditoria e validação; **não edite arquivos**.
   - `--style <slug>` → use esse estilo de `design-styles` (valide o slug em `styles/index.json`; se for um estilo
     opt-in, o pedido nominal já está feito).
   - `--engine legacy:<v1|v2-experimental|gpt-taste|stitch-design-taste>` → use `design-engine-legacy` no lugar do motor
     padrão, confirmando a troca.
   - `--images` → habilita a etapa de imagem (`image-direction`), após confirmar ferramenta e custo.
   - `--publish` → apenas registre a intenção; publicar continua exigindo autorização explícita no chat.
3. Sem argumentos, pergunte uma vez: projeto/pasta, o que não pode mudar, se pode editar, e se há marca obrigatória.
4. Entregue o relatório no formato de `skills/systemdesignmax/references/relatorio.md`, separando o implementado do comprovado.

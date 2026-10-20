# Modelo de relatório

Use este modelo ao final (e uma versão curta em cada marco). Seja factual: cada linha de "Comprovado" aponta uma evidência.

```markdown
## Resultado — <projeto> (<data>)

**Escopo:** <rotas/telas/componentes tratados> · **Fora do escopo:** <o que não foi tocado>
**Ambiente:** <URL/porta · commit/branch · navegador · larguras · versões (node, shadcn, playwright-cli)>

### Direção
- Motor: <design-taste-frontend | legado: …>
- Estilo: <slug> (alternativas descartadas: <slug — motivo>, …) · Desvios: <regra → motivo>
- Componentes: <@shadcn/… , @spell/… instalados · recusados: … (motivo)>
- Classificação das 82 originais: selecionadas <n> · alternativas <n> · não aplicáveis <n> · bloqueadas <n> · alias <n>

### Mudanças
- <arquivo/área — o que mudou>

### Comprovado (evidência)
| Critério de aceite | Resultado | Evidência |
|---|---|---|
| Contraste ≥ 4.5:1 | cumprido | <comando/medição> |
| Sem scroll horizontal a 375 px | cumprido | <screenshot> |

### Comandos e resultados
- `<comando>` → <saída resumida / código de saída>

### Falhas, não testado, bloqueado
- <item — motivo>

### Antes × depois
- <rota>: <caminho do antes> × <caminho do depois>

### Próximo passo · Como reverter
- <passo> · `git checkout <ref>` / descartar branch `<nome>`
```

Regras do relatório: não alegar redesign completo se só parte foi feita; separar *implementado* de *comprovado*;
incluir o que falhou; não editar critérios depois de medir.

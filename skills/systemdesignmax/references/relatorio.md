# Modelo de relatório

Curto e factual. O relatório existe para a pessoa entender o que mudou e decidir o próximo passo, não para provar
conformidade com o processo.

```markdown
## Resultado — <projeto>

**Conceito:** <nome> — <frase da hipótese do brief>
**Direção:** <direção do motor (seed)> · estilo: <slug ou "nenhum"> · marca mantida: <o quê>
**Ideia e coisa viva:** <frase da ideia> · <a interação>

### Mudanças
- <área/arquivo> — <o que mudou>

### Comprovado
- <critério> — <resultado> — <evidência: comando, medição ou screenshot>

### Não feito ou não testado
- <item> — <motivo>

### Para trocar antes de publicar
- <conteúdo de exemplo, imagens provisórias, créditos de imagens encontradas>

**Como reverter:** <branch/commit>
```

Regras: não alegar redesign completo se só parte foi feita; separar implementado de comprovado; incluir o que
falhou; não mudar critérios depois de medir.

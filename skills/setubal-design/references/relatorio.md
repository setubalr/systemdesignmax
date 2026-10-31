# Modelo de relatório

Curto e factual. O relatório existe para a pessoa entender o que mudou e decidir o próximo passo, não para provar
conformidade com o processo.

```markdown
## Resultado — <projeto>

**Conceito:** <nome> — <frase da hipótese do brief>
**Direção:** <direção do motor (seed)> · estilo: <slug ou "nenhum"> · marca mantida: <o quê>
**Ideia e coisa viva:** <frase da ideia> · <a interação>
**Nível:** <1 | 2 | 3> · momentos protagonistas: <até dois>

### Diagnóstico
| Bloco | Antes | Depois | Evidência |
|---|---|---|---|
| Fundação visual | | | |
| Técnica | | | |
| Movimento | | | |
| Narrativa | | | |
| Mídia | | | |

### Varredura
- Aplicadas: <IDs> · Adaptadas: <IDs> · Mantidas: <IDs> · Descartadas: <IDs com motivo curto>
- Pendentes (`pedir` ou não feitas): <IDs e o que falta>

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
falhou; não mudar critérios depois de medir; uma nota "depois" só vale com a mesma medição do "antes".

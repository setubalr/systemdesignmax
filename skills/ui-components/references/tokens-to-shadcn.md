# Tokens de estilo → tema shadcn

`scripts/style-to-shadcn.mjs <slug>` converte os tokens de `design-styles/styles/index.json` em variáveis do tema.

## Mapeamento

| Token do estilo | Variável shadcn | Observação |
|---|---|---|
| `surface` | `--background`, `--card`, `--popover` | |
| `text` | `--foreground` (+ `*-foreground`) | corrigido se reprovar contraste (ver abaixo) |
| `primary` | `--primary`, `--ring`, `--chart-1` | `--primary-foreground` = melhor entre branco/#111 |
| `secondary` | **`--brand-secondary`**, `--chart-2` | **não** vira `--secondary` |
| `danger` | `--destructive` | |
| `success` / `warning` | `--success` / `--warning` (extras), `--chart-3/4` | registrar no Tailwind (v4: `@theme inline`; v3: `tailwind.config`) |
| derivados | `--secondary`, `--muted`, `--accent`, `--border`, `--input` | misturas de `surface` e `text` |

Por que `secondary` do estilo não é `--secondary` do shadcn: no estilo ele é uma **segunda cor de marca**;
no shadcn `--secondary` é uma **superfície sutil** de botão secundário. Misturar os dois quebraria hover/estados.

## Formato

- Tailwind v3 (`tailwind.config` preenchido no `components.json`): canais HSL (`--primary: 222 47% 11%`).
- Tailwind v4 (campo vazio): hex direto + `@theme inline` para os tokens extras.
- `--format hex|hsl` força o formato.

## Correções automáticas (sempre avisadas)

Alguns tokens upstream são inconsistentes (ex.: `bold` e `pacman` têm fundo escuro com texto `#111827`). O script:

- troca `text` por branco/#111 se o contraste sobre `surface` for < 4.5:1;
- clareia/escurece `primary`, `danger`, `success`, `warning`, `secondary` o mínimo necessário para o texto
  sobre eles passar 4.5:1;
- sai com código 1 se um par essencial ainda reprovar.

Esses ajustes alteram a cor da marca em alguns pontos. Se o projeto tem marca obrigatória, **a marca vence** e
os tokens do estilo são ignorados onde conflitam (ver prioridade de conflitos no orquestrador).

## Dark mode

Os estilos só definem um tema. O script deriva `.dark` (fundo quase preto tingido, primário neutro invertido,
primário colorido clareado até 4.5:1). É um **ponto de partida** — valide visualmente. Estilos já escuros
(`surface` escura) emitem `:root, .dark` iguais.

## Fontes

O script lista fontes fora de uma allowlist de fontes livres (ex.: "Anthropic Sans" não é instalável). Use
Inter/Geist como fallback gratuito e registre a decisão.

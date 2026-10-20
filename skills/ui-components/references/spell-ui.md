# Spell UI (spell.sh) — registry `@spell`

"Refined UI components for Design Engineers": 33 componentes React/Tailwind copiáveis, em sua maioria de
**animação e efeitos de marketing**. Repositório: https://github.com/xxtomm/spell-ui · Docs: https://spell.sh/docs.

## Gratuito?

Sim, pelo que foi verificado: o `LICENSE` do repositório é **MIT** e o `registry.json` público lista 33 itens,
todos `registry:component`, sem marcação de pago/pro. O endpoint `https://spell.sh/r/{name}.json` responde
sem autenticação. Reconfira antes de depender disso em produção: o site é de terceiros.

## Conexão

```bash
node <plugin>/skills/ui-components/scripts/connect-registries.mjs --cwd <projeto>          # dry-run
node <plugin>/skills/ui-components/scripts/connect-registries.mjs --cwd <projeto> --write  # grava @spell
npx shadcn@latest view @spell/blur-reveal
npx shadcn@latest add @spell/blur-reveal --dry-run
```

Equivale a adicionar em `components.json`:

```json
{ "registries": { "@spell": "https://spell.sh/r/{name}.json" } }
```

## Catálogo e como escolher

`spell-ui-catalog.json` traz, por item: `surface` (`marketing` | `app` | `both`), `weight`
(`light` | `medium` | `heavy`), `animated`, `externalRequests`, dependências e o comando de instalação.

| Superfície | Pode | Evite |
|---|---|---|
| Marketing / landing | texto animado (`blur-reveal`, `words-stagger`, `shimmer-text`…), `marquee`, `logos-carousel`, `tilt-card`, `perspective-book` | empilhar mais de 1–2 efeitos; competir com o motor |
| App / dashboard | `badge`, `kbd`, `spinner`, `bars-spinner`, `copy-button`, `label-input`, `color-selector`, `animated-checkbox`, `fallback-avatar`, `qr-code`, `chart` | qualquer efeito de fundo ou texto animado em telas de trabalho |
| Qualquer | — | `heavy`: `light-rays`, `animated-gradient` (WebGL), `signature` (opentype.js). Só com justificativa, fallback estático e carregamento tardio |

## Checklist antes de instalar um item

- [ ] `view` lido por inteiro (é código que vai rodar no app).
- [ ] Dependências novas listadas ao usuário (`motion`, `three`, `qrcode`…).
- [ ] Respeita `prefers-reduced-motion` (se não respeitar, envolva/condicione ou descarte).
- [ ] Tem foco/teclado se for interativo; contraste preservado com os tokens do estilo.
- [ ] `externalRequests: false`, ou a rede de terceiros foi autorizada (`tweet`, `spotify-card`).
- [ ] Combina com o estilo: o item herda `--primary`/`--background`; não force cores soltas.

Nota: alguns itens trazem `"use client"` (convenção Next). Em Vite é inofensivo; deixe ou remova.

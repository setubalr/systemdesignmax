# Estilo: Enterprise (`enterprise`)

> Dark-themed cloud-platform aesthetic with modular grids, glass-like panels, and strong data hierarchy for productivity dashboards.

- **Família:** corporate-data
- **Usar em:** dashboards de produtividade.
- **Evitar em:** sites de marketing.

## Marca

Enterprise design emphasizes grids, modular components, and strong visual hierarchy to present complex data in a clear and accessible way. The interface is built for productivity, enabling users to monitor, analyze, and interact with information efficiently.

## Fundamentos

- **Estilo visual:** modern, clean, cloud-platform aesthetic (Heroku/Vercel/GitHub inspired), dark theme, subtle gradients, soft shadows, glass-like panels, rounded components
- **Escala tipográfica:** 12/14/16/20/24/32
- **Fontes:** primary=IBM Plex Sans · display=IBM Plex Sans · mono=IBM Plex Sans
- **Pesos:** 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Espaçamento:** 8pt baseline grid

## Tokens de cor

| Token | Valor |
|---|---|
| primary | `#0C5CAB` |
| secondary | `#0a4a8a` |
| success | `#10b981` |
| warning | `#f59e0b` |
| danger | `#ef4444` |
| surface | `#09090b` |
| text | `#fafafa` |

Papéis de cor declarados: primary, neutral, success, warning, danger.

## Regras

**Fazer**
- prefer semantic tokens over raw values
- preserve visual hierarchy
- keep interaction states explicit
- design for empty/loading/error states
- ensure responsive behavior by default
- document accessibility rationale

**Evitar**
- avoid low contrast text
- avoid inconsistent spacing rhythm
- avoid decorative motion without purpose
- avoid ambiguous labels
- avoid mixing multiple visual metaphors
- avoid inaccessible hit areas

## Acessibilidade

WCAG 2.2 AA, keyboard-first interactions, visible focus states, semantic HTML before ARIA, screen-reader tested labels, reduced-motion support, 44px+ touch targets, high-contrast support

## Tom de escrita

concise, confident, helpful, clear, friendly, professional, action-oriented, low-jargon

---
Regras gerais, QA e contrato de saída: ver `../SKILL.md`. Fonte: skills/enterprise/SKILL.md.

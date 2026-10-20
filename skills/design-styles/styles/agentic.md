# Estilo: Agentic (`agentic`)

> Conversational AI-first interface with minimal controls, clear outcomes, and delegated task flows for agentic workflows.

- **Família:** tech-futurist
- **Usar em:** produtos de IA/chat em que o usuário delega tarefas.
- **Evitar em:** apps tradicionais densos em dados.

## Marca

The agentic design style emphasizes conversational interactions, clear outcomes, and minimal controls, allowing users to delegate tasks to AI instead of manually managing complex workflows.

## Fundamentos

- **Estilo visual:** modern, bold
- **Escala tipográfica:** 14/16/18/24/32/40
- **Fontes:** primary=Playfair Display · display=Playfair Display · mono=JetBrains Mono
- **Pesos:** 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Espaçamento:** 8pt baseline grid

## Tokens de cor

| Token | Valor |
|---|---|
| primary | `#FF5701` |
| secondary | `#F6F6F1` |
| success | `#16A34A` |
| warning | `#D97706` |
| danger | `#DC2626` |
| surface | `#FFFFFF` |
| text | `#111827` |

Papéis de cor declarados: surface/subtle layers.

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
Regras gerais, QA e contrato de saída: ver `../SKILL.md`. Fonte: skills/agentic/SKILL.md.

# Apple HIG traduzida para a web

A Human Interface Guidelines (HIG) da Apple é escrita para apps nativos. Este arquivo traduz os princípios que valem
para site, em palavras nossas, e transforma as regras de auditoria web em checklist. É usado em três etapas: no
**diagnóstico** (etapa 1), na **varredura** (etapa 2, linhas com origem `HIG`) e na **verificação** (etapa 6).

**Licença.** O texto da HIG é © Apple Inc. Não copie trechos dela para o projeto nem para o relatório do cliente;
cite a URL canônica. Fontes SF Pro e SF Symbols não são licenciadas para publicação em site: use a fonte da marca
do cliente ou uma fonte livre da biblioteca do motor.

## 1. Princípios que viram regra no site

| Área | Princípio | Regra no site | Onde o plugin aplica |
|---|---|---|---|
| Movimento | Movimento com propósito, nunca enfeite | Toda animação responde a "para quê": mostrar origem, confirmar ação, suavizar mudança, explicar o produto ou ser o momento protagonista | `design-taste-frontend/references/motion.md` §3 |
| Movimento | Movimento opcional | `prefers-reduced-motion` obrigatório; a página reduzida é a página pronta | `motion.md` §8, `inspect.mjs` (`reduced-hidden`) |
| Movimento | Nada longo em interação frequente | Hover, menu e abas rápidos (150–250 ms); digitação e atalhos sem animação | `motion.md` §3 |
| Movimento | Feedback breve que segue o gesto | Pressionar dá resposta em 100–160 ms | receita "Press and hover" |
| Tipografia | Poucas famílias; evitar pesos finos em texto | Até 2 famílias; hierarquia por tamanho, peso e cor | `type.md` do motor |
| Tipografia | Layout que aguenta qualquer tamanho de texto | `rem` e `clamp()`; zoom de 200% não quebra; nada abaixo de 12 px | `type.md`, auditoria |
| Layout | Agrupar o que é relacionado; espaço para o essencial | Ritmo de seções claro; um assunto dominante por tela | `layout.md` do motor |
| Layout | Revelação progressiva | Accordion, revelar ao rolar, detalhes sob demanda | receitas "Accordion" e "Reveal on scroll" |
| Layout | Alinhamento rigoroso | Um grid, margens iguais, poucas bordas esquerdas de texto | `inspect.mjs` (moldura) |
| Materiais | Vidro com parcimônia e nunca no conteúdo | `backdrop-filter` só em barra, menu ou overlay, e só quando o estilo libera vidro | `conflitos.md`, `allowances.json` |
| Materiais | Escurecer atrás do vidro sobre fundo claro | Camada de escurecimento para manter contraste | `colour.md` do motor |
| Cor | Cores semânticas que se adaptam ao modo | Tokens (`--ground`, `--ink`, `--accent`…) com variante escura quando fizer sentido | `colour.md`, `style-to-shadcn.mjs` |
| Acessibilidade | Desde o início, não no fim | Contraste ≥ 4.5:1, foco visível, teclado completo, nomes acessíveis | `design-qa` |
| Imagens | Alta resolução, sem distorção | `width`/`height`, AVIF/WebP, nunca esticar | `imagery.md` do motor |
| Escrita | Texto claro e direto | Links que dizem o destino; botões com verbo | `copy.md` do motor |
| Carregamento | Mostrar conteúdo o quanto antes | Sem preloader; esqueleto só onde há espera real | `motion.md` regra 1 |
| Onboarding | Deixar a pessoa usar logo | Nada de portão antes do conteúdo | `motion.md` §9 |
| Feedback | Confirmar ações e erros | Estados de sucesso, erro e carregando em formulários | `design-qa` |

## 2. Checklist web (auditoria)

Derivado das regras web do auditor HIG Doctor (`raintree-technology/apple-hig-skills`, MIT). Severidade:
**crítico** bloqueia a entrega; **sério** precisa de correção ou justificativa; **moderado** entra no relatório.

| Severidade | Verificar | Correção |
|---|---|---|
| crítico | Imagem sem `alt` | `alt` descritivo, ou `alt=""` se for decorativa |
| crítico | SVG inline sem acessibilidade | `role="img"` com `<title>` ou `aria-label`, ou `aria-hidden="true"` se decorativo |
| crítico | Título ou botão vazio | Texto visível ou `aria-label` |
| crítico | `<html>` sem `lang` | `lang="pt-BR"` (ou o idioma do site) |
| crítico | Vídeo com fala sem legenda | `<track kind="captions">` |
| crítico | Zoom bloqueado (`user-scalable=no`, `maximum-scale=1`) | Remover do meta viewport |
| crítico | `<marquee>` ou `<blink>` | Animação CSS que respeita reduced-motion |
| sério | `div`/`span` com clique e sem papel | `<button>` nativo |
| sério | Link "clique aqui", "saiba mais" | Texto que nomeia o destino |
| sério | `tabindex` positivo | `0` ou `-1` |
| sério | `aria-hidden` em elemento focável | Tirar do foco ou remover o `aria-hidden` |
| sério | Hover sem equivalente de foco | Mesma resposta em `:focus-visible` / `onFocus` |
| sério | `outline: none` sem foco substituto | Estilizar `:focus-visible` |
| sério | Mídia com autoplay e som | Só mudo, com controles visíveis |
| sério | Cabeçalho e navegação feitos de `div` | `<header>`, `<nav>`, `<main>`, `<footer>` |
| moderado | Cor inline e `px` fixo em fonte | Tokens e `rem`/`clamp()` |
| moderado | `line-height` abaixo de 1.2, texto justificado, fonte abaixo de 12 px | Corrigir no token de tipo |
| moderado | `!important` e `z-index` extremo | Organizar camadas |
| moderado | `overflow: hidden` no `body` | Remover; trava rolagem e foco |
| moderado | Alvo de toque pequeno | Mínimo de 44×44 px |

Pontos positivos que valem registrar: propriedades lógicas (`margin-inline`), `aspect-ratio`, `gap`, `clamp()` em
fonte, `max-width` em blocos de texto, estilos de impressão.

## 3. Auditor externo (opcional)

O projeto HIG Doctor tem uma CLI de auditoria (`npx hig-doctor <pasta>`, conforme o README dele). Ela baixa pacotes
da internet: rode **só com autorização explícita do usuário** e confira as opções com `--help` antes. Sem
autorização, faça o checklist acima à mão e com `design-qa`.

## 4. Páginas canônicas

| Tema | URL |
|---|---|
| Movimento | https://developer.apple.com/design/human-interface-guidelines/motion |
| Tipografia | https://developer.apple.com/design/human-interface-guidelines/typography |
| Layout | https://developer.apple.com/design/human-interface-guidelines/layout |
| Cor | https://developer.apple.com/design/human-interface-guidelines/color |
| Modo escuro | https://developer.apple.com/design/human-interface-guidelines/dark-mode |
| Materiais | https://developer.apple.com/design/human-interface-guidelines/materials |
| Acessibilidade | https://developer.apple.com/design/human-interface-guidelines/accessibility |
| Imagens | https://developer.apple.com/design/human-interface-guidelines/images |
| Escrita | https://developer.apple.com/design/human-interface-guidelines/writing |
| Carregamento | https://developer.apple.com/design/human-interface-guidelines/loading |
| Onboarding | https://developer.apple.com/design/human-interface-guidelines/onboarding |
| Feedback | https://developer.apple.com/design/human-interface-guidelines/feedback |

As URLs vêm do snapshot do HIG Doctor de fevereiro de 2025. Para algo recente (por exemplo, Liquid Glass), abra a
página canônica antes de decidir.

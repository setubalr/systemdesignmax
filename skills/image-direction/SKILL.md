---
name: image-direction
description: "Direção de arte por imagem em quatro modos: brandkit (pranchas de identidade), imagegen-frontend-web (uma imagem horizontal por seção de site), imagegen-frontend-mobile (telas e fluxos de app em mockup de celular) e image-to-code (imagens primeiro, análise, depois código fiel). Use quando o escopo pedir referência visual gerada antes ou junto do código, concept art de telas ou prancha de marca. Não usar por padrão em redesigns de dashboards nem quando o usuário quer código direto."
---

# image-direction — quatro skills de imagem, uma porta de entrada

Reúne `brandkit`, `imagegen-frontend-web`, `imagegen-frontend-mobile` e `image-to-code`. Elas compartilham o mesmo
núcleo (imagens legíveis, uma ideia por imagem, consistência de paleta e marca, referências que um desenvolvedor
consegue recriar) e diferem no **alvo**. Esta skill escolhe o modo e impõe as regras comuns; os textos completos
ficam em `references/` e são lidos **só do modo escolhido**.

## Escolha do modo

| O pedido é… | Modo | Arquivo | Gera código? |
|---|---|---|---|
| Visualizar identidade de marca (logo, sistema, deck de identidade) | `brandkit` | `references/brandkit.md` | não |
| Referências visuais de **seções** de landing/marketing antes de codar | `imagegen-frontend-web` | `references/imagegen-frontend-web.md` | não |
| Concept art de **app mobile** (onboarding, auth, home, chat, fintech, saúde) | `imagegen-frontend-mobile` | `references/imagegen-frontend-mobile.md` | não |
| Fluxo completo: imagem → análise profunda → implementação fiel | `image-to-code` | `references/image-to-code.md` | **sim** |

Combinações: `brandkit` pode preceder `imagegen-frontend-web`/`image-to-code` para fixar a identidade.
**Não encadeie os modos para produzir a mesma referência repetidas vezes.**

## Regras comuns (antes de qualquer geração)

1. **Escopo explícito.** Só entre aqui se o usuário pediu imagem/referência/prancha (`--images`) ou se o conceito
   escolhido no `DESIGN-BRIEF` depende de imagens que o projeto não tem e há ferramenta de geração. Redesign de
   dashboard/app de trabalho normalmente **não** precisa disso.
2. **Ferramenta e custo.** Descubra qual ferramenta de geração de imagem o ambiente tem e estime o custo/quantidade
   (ex.: 8 seções = 8 imagens). Se não houver ferramenta, marque o modo como **bloqueado**, proponha alternativa
   (wireframe em HTML, descrição por seção) e **não diga que gerou imagem**.
3. **Marca existente é preservada.** Logo novo só com autorização. Uma prancha gerada não é um logo vetorial nem
   prova de originalidade jurídica.
4. **Arquivo real e análise.** Gere o arquivo, abra-o, descreva o que realmente aparece (texto legível? grid correto?)
   e só então use como referência. Nunca descreva uma imagem que você não viu.
5. **Uma imagem por seção (web) / por tela (mobile)**, legível, sem boards comprimidos de miniaturas.
6. **Consistência com o contrato visual:** paleta, tipografia e tom vêm do estilo escolhido em `design-styles`
   (ou da marca). A imagem ilustra o contrato, não o substitui.
7. **Direitos e privacidade:** sem rostos/marcas de terceiros reconhecíveis sem autorização; sem dados reais de
   clientes em mockups; nada sensível em prompts.
8. **Do imagem ao código:** implemente com `design-taste-frontend` e `ui-components`; valide com `design-qa`
   comparando screenshot final × imagem de referência, e registre as diferenças aceitas.

## Saída esperada

Lista de arquivos gerados (caminho), prompt/seção de cada um, ferramenta usada, custo estimado, análise curta de cada
imagem e a decisão de usar/descartar. Origem do conteúdo: Leonxlnx/imagegen-skills (MIT) — ver `NOTICE.md`.

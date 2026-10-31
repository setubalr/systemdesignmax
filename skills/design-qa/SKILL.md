---
name: design-qa
description: "Auditoria e verificação do que foi construído, em uma skill: revisão estática de UI contra as Web Interface Guidelines da Vercel (acessibilidade, formulários, foco, performance, detalhes de interação) e validação em browser real com playwright-cli (screenshots por largura, teclado, estados, jornadas). Use depois de implementar ou restilizar, quando o pedido for 'revisar minha UI', checar acessibilidade/UX, auditar boas práticas, ou provar que o resultado funciona. Não gera nem decide design."
---

# design-qa — auditar e provar

Reúne `web-design-guidelines` (auditoria estática) e `playwright-cli` (browser real). São duas lentes da mesma etapa:
**a auditoria acha o que está errado no código; o browser prova o que acontece de verdade.** Uma não substitui a outra.

## Ordem

A skill mãe (`setubal-design`) chama esta skill duas vezes: na etapa 1, para registrar o **antes** (os achados viram
as linhas T1 a T4 da varredura), e na etapa 6, para provar o **depois** com as mesmas medidas.

1. **Gates do projeto** (o que existir): build, lint, typecheck, testes. Registre comando e resultado. Se não existir,
   escreva "não existe" — não invente sucesso.
2. **Auditoria estática** — `references/web-design-guidelines.md`. Busque as regras atuais na URL-fonte antes de cada
   revisão (WebFetch), leia os arquivos-alvo e reporte em `arquivo:linha`, terso. Auditoria estática **não** prova
   acessibilidade assistiva real. Some o checklist web da Apple HIG (`setubal-design/references/hig-web.md` §2): item
   crítico bloqueia a entrega.
3. **Validação em browser** — `references/playwright-cli.md` (+ `references/playwright-cli/*.md`).
   - Obtenha referências de elementos por snapshot e **renove-as após cada mudança de DOM**.
   - Captura em **desktop (≥1280), tablet (~768) e mobile (~375)**, e nos temas existentes (claro/escuro).
   - Teclado: Tab/Shift+Tab percorre tudo na ordem lógica; foco sempre visível; Esc fecha modais; sem armadilha de foco.
   - Estados: vazio, carregando, erro, desabilitado, hover/focus/active; textos longos; zoom 200%.
   - Movimento: `prefers-reduced-motion` respeitado.
   - Registre comandos e resultados. Escreva apenas em **dados de teste autorizados**.
4. **Corrigir e retestar** (máx. 3 tentativas por abordagem; depois, mude de estratégia ou reporte bloqueio).
5. **Relatório de evidências** (formato abaixo).

## O que cada evidência prova (e o que não prova)

| Evidência | Prova | Não prova |
|---|---|---|
| Ler o código | intenção | que compila ou funciona |
| Build/lint passou | sintaxe, tipos | comportamento |
| Login de teste | fluxo de login | telas autenticadas |
| Abrir um modal | que abre | que persiste dados |
| Screenshot | aparência naquela largura/estado | API, regras de negócio, leitor de tela |
| Auditoria Vercel | aderência a boas práticas | experiência com tecnologia assistiva |

Sem sessão/credencial para a área protegida: **a conclusão sobre ela fica bloqueada**. Não enfraqueça a autenticação
nem peça/grave senhas em logs.

## Checklist mínimo de design (além das regras da Vercel)

- Contraste: texto ≥ 4.5:1; texto grande e componentes ≥ 3:1 (meça; não estime a olho).
- Todo controle tem nome acessível; ícones-botão têm `aria-label`; imagens têm `alt` útil ou vazio decorativo.
- Hierarquia de títulos coerente; um `h1` por página.
- Alvos de toque ≥ 44 px; espaçamento entre alvos adjacentes.
- Sem layout shift ao carregar fontes/imagens; sem scroll horizontal indevido.
- Funcionalidade preservada: handlers, rotas, dados e permissões do antes continuam funcionando.
- Fidelidade ao contrato: tokens do estilo realmente aplicados (compare com `design-styles`/tema gerado).

## Formato do relatório

```
Escopo: <o que foi verificado>
Ambiente: <URL/porta/commit/navegador/larguras>
Gates: <comando → resultado>
Achados: <arquivo:linha — severidade — descrição — correção>
Evidências: <screenshots/trace com caminho; antes × depois>
Não testado / bloqueado: <itens e motivo>
```

Origem: vercel-labs/agent-skills (web-design-guidelines, MIT) e microsoft/playwright-cli (Apache-2.0). Ver `NOTICE.md`.

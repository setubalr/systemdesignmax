# Descoberta do produto (etapa 1b)

O motivo mais comum de um redesign sair igual a todos os outros não é falta de estilo: é desenhar antes de entender
o que o produto é. Esta etapa vem **antes** de qualquer estilo, direção ou componente e produz um arquivo,
`.taste-skill/DESIGN-BRIEF.md`, que todas as etapas seguintes leem. Sem ele, não se escolhe direção.

## Proporção

| Pedido | Descoberta |
|---|---|
| Página, site, app ou redesign completo | inteira (seções 1–8) |
| Uma tela ou um fluxo de um produto já entendido | seções 1, 2, 5 e 6, curtas |
| Um componente ou ajuste pontual | pular; seguir o design que já existe |
| `--audit` | seções 1–4, para julgar o que existe contra o que o produto precisa |

## 1. Ler antes de perguntar

Colete o que o projeto já diz sobre si: README, textos das páginas e telas, `package.json` (nome, descrição),
documentação, pitch, termos de domínio no código (nomes de entidades, tabelas, rotas), e-mails/templates, a página
pública se existir (abra no browser). Anote em uma linha cada fato encontrado e de onde veio.

## 2. Perguntar só o que falta (uma vez, em bloco)

Junte as lacunas que **bloqueiam** a direção numa única mensagem, no máximo seis perguntas, cada uma com uma
sugestão de resposta tirada do que você leu (a pessoa confirma ou corrige, não escreve do zero):

1. O que é, em uma frase, e para quem?
2. Qual é a **uma** coisa que a pessoa precisa conseguir fazer (comprar, agendar, entender um número, publicar…)?
3. Como ela deve se **sentir** ao usar (confiança, desejo, calma, energia, pertencimento…)?
4. Três palavras que o produto **é** e três que ele **não pode parecer**.
5. Sites ou apps que você admira (de qualquer setor) e um que você não quer parecer.
6. O que não pode mudar (marca, logo, cores, rotas, textos legais)?

Se a pessoa pediu para você decidir, ou o pedido já responde, não pergunte: escreva sua leitura e siga.

## 3. Público e contexto de uso

Quem usa (papel, experiência com o tema, idade se relevante), onde e em que aparelho, com que frequência
(uma visita × uso diário), sob que pressão (pressa, dinheiro em jogo, saúde, lazer). Isso decide densidade,
tamanho de toque, quantidade de movimento e tom.

## 4. Território da categoria (concorrentes)

Abra 2–3 concorrentes ou referências reais da mesma categoria no browser e capture o primeiro screen de cada
(`.taste-skill/discovery/<nome>.png`). Anote em uma tabela o que **todos** fazem: paleta, tipo de letra, herói,
imagens, movimento, densidade. Esse é o "padrão da categoria". Para cada linha decida: **evitar** (é o que torna
todos iguais) ou **assumir de propósito** (é uma convenção que o público precisa, como tabela em finanças).
Sem browser ou rede: escreva o padrão a partir do que você sabe da categoria e marque como "não verificado".

## 5. O que só este produto tem (inventário)

Oito a doze itens que pertencem a este cliente e a nenhum concorrente: o nome e o que ele significa, o lugar, os
números reais, a restrição com que vive, os materiais, os rituais, os objetos impressos do seu mundo, o que o
produto **produz** (o relatório, o recibo, a rota, o prato). É a mesma lista do passo 1 do motor
(`design-taste-frontend`); feita aqui, ela chega pronta e o motor a reutiliza.

## 6. Personalidade em eixos

Dê uma nota de 1 a 5 em cada eixo e uma justificativa curta tirada das seções acima, nunca da categoria:

| Eixo | 1 | 5 |
|---|---|---|
| Tom | sério | lúdico |
| Expressão | sóbrio | expressivo |
| Densidade | arejado | denso |
| Época | clássico | vanguarda |
| Movimento | quieto | cinético |
| Temperatura | frio | quente |

Os eixos viram parâmetros: `--tone` do motor, quantidade de cenas e movimento, escolha de tipografia e paleta,
e se um estilo de `design-styles` deve entrar.

## 7. Ativos reais e restrições

O que existe de verdade: logo, cores e fontes da marca, fotos próprias, vídeo, a interface real que pode ser
mostrada, ferramenta de geração de imagem disponível. Restrições: acessibilidade exigida, stack, desempenho,
idiomas, conteúdo legal. Vira o `--have` e o `--keep` do motor.

## 8. Hipótese de diferenciação e três conceitos

Escreva a frase: **"Enquanto a categoria \_\_\_, este produto \_\_\_."** Depois monte **três conceitos** que
respondam a ela de formas realmente diferentes. Cada conceito tem:

- a direção do motor (`draw.mjs --options 3`; redesenhe com `--avoid` se duas forem parecidas);
- a frase da ideia do motor ("Nesta página, **[algo do inventário]** vira **[o recurso da direção]**");
- tipografia e paleta (do motor, da marca ou de um estilo de `design-styles`, se o conceito pedir um);
- a personalidade do movimento (quieto, uma cena de scroll, cinético) e a coisa viva da página;
- o que ele **arrisca** e o que ele **ganha**.

Os três precisam diferir em **pelo menos três** destes eixos: classe tipográfica, temperatura de cor, densidade,
composição do herói, tipo de imagem, personalidade do movimento. Dois conceitos que só trocam a cor são um só.

Apresente os três ao usuário em cards curtos (nome, frase, 3 linhas de descrição, riscos) e peça a escolha. Se ele
pediu para você decidir (`--auto`), escolha o que melhor cumpre a hipótese, diga por quê e siga. Para mudanças
grandes de marca ou navegação, a escolha do usuário é obrigatória.

## Modelo do arquivo

Grave em `.taste-skill/DESIGN-BRIEF.md` (crie a pasta se não existir; ela já é a pasta de trabalho do motor):

```markdown
# DESIGN-BRIEF — <produto> (<data>)

## Produto
- Em uma frase: …
- Para quem / contexto de uso / aparelho: …
- A uma ação: …
- Sentimento-alvo: …
- É: <3 palavras> · Não pode parecer: <3 palavras>

## Fontes
- <fato> — <arquivo/URL>  (marque "suposição" no que não foi confirmado)

## Território da categoria
| Aspecto | O que todos fazem | Decisão (evitar / assumir) |
|---|---|---|

## Inventário (só deste produto)
1. …

## Personalidade
| Eixo | Nota | Por quê |
|---|---|---|

## Ativos e restrições
- Marca fixa: … · Imagens reais: … · `--have`: … · `--keep`: …

## Hipótese
Enquanto a categoria …, este produto …

## Conceitos
### A — <nome> (direção `<id>`) …
### B — …
### C — …

## Escolha
Conceito <X> — escolhido por <usuário | agente (--auto)> — motivo: …
```

## Gate

Avance para a etapa 2 só quando o arquivo existir com: produto, a uma ação, sentimento-alvo, inventário com pelo
menos oito itens, eixos preenchidos, hipótese e a escolha registrada. Releia o brief antes de cada seção ou tela
que construir; quando uma decisão de design não puder ser justificada por uma linha dele, ela é padrão de
categoria e deve ser revista.

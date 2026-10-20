#!/usr/bin/env node
// Gera a parte "dados" do merge a partir das fontes originais:
//   - skills/design-styles/styles/<slug>.md   (um arquivo enxuto por estilo)
//   - skills/design-styles/styles/index.json  (índice consultável)
//   - skills/systemdesignmax/references/dependencies.json (as 82 skills originais -> onde vivem agora)
//
// Uso:
//   node scripts/maintenance/build-registry.mjs --bergside <awesome-design-skills/skills> \
//        --classics <taste-skill-classics/skills> [--catalog docs/source/catalogo-original.md]
//
// Só é preciso rodar para atualizar o merge quando as fontes mudarem. Não é usado em runtime.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
if (!args.bergside || !args.classics) {
  console.error("uso: build-registry.mjs --bergside <dir> --classics <dir> [--catalog <md>]");
  process.exit(2);
}
const catalogPath = args.catalog ?? path.join(root, "docs/source/catalogo-original.md");
const read = (p) => fs.readFileSync(p, "utf8").replace(/\r/g, "");
const write = (p, s) => (fs.mkdirSync(path.dirname(p), { recursive: true }), fs.writeFileSync(p, s));

// ---------- 1. catálogo original (82 entradas) ----------
const catalog = {};
for (const block of read(catalogPath).split(/\n(?=### `)/).slice(1)) {
  const slug = block.match(/^### `([^`]+)`/)[1];
  const field = (label) => block.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`))?.[1].trim();
  const meta = block.match(/\*\*Etapa:\*\*\s*(.+?)\s*·\s*\*\*Tipo:\*\*\s*(.+?)\s*·\s*\*\*Invocação:\*\*\s*(.+)/);
  const when = field("Quando chamar") ?? "";
  catalog[slug] = {
    funcao: field("Função"),
    chamar: when.match(/Chamar:\s*(.*?)(?:\s*Não chamar:|$)/)?.[1]?.trim() ?? "",
    evitar: when.match(/Não chamar:\s*(.*)$/)?.[1]?.trim() ?? "",
    etapa: meta?.[1], tipo: meta?.[2], invocacao: meta?.[3],
    fonte: field("Fonte")?.replace(/`/g, ""),
  };
}

// ---------- 2. famílias (decisão de curadoria deste plugin) ----------
const FAMILIES = {
  "minimal-clean": "minimal clean codex geometric sleek spacious square flat shadcn minimalist-ui",
  "editorial-warm": "editorial basic modern refined paper claude terracotta cafe impeccable",
  "corporate-data": "corporate professional enterprise ant stitch roku material",
  "premium-dark": "premium power high-end-visual-design contemporary bento glassmorphism",
  "tech-futurist": "futuristic cosmic matrix mono neon agentic perspective industrial-brutalist-ui",
  "brutalist-bold": "brutalism neobrutalism bold pulse",
  "narrative-conversion": "immersive levels storytelling dramatic",
  "playful-friendly": "friendly creative doodle fiction lingo claymorphism expressive vibrant colorful gradient sketch riso artistic",
  "retro-game": "retro vintage dithered pacman sega tetris fantasy skeumorphism neumorphism",
};
const familyOf = {};
for (const [fam, list] of Object.entries(FAMILIES)) for (const s of list.split(" ")) familyOf[s] = fam;

// ---------- 3. estilos Bergside ----------
const SHARED_SECTIONS = new Set([
  "Mission", "Expected Behavior", "Guideline Authoring Workflow", "Required Output Structure",
  "Component Rule Expectations", "Quality Gates", "Example Constraint Language",
]);
const DEFAULTS = {
  accessibility: "WCAG 2.2 AA, keyboard-first interactions, visible focus states",
  tone: "concise, confident, helpful",
  do: ["prefer semantic tokens over raw values", "preserve visual hierarchy", "keep interaction states explicit"],
  dont: ["avoid low contrast text", "avoid inconsistent spacing rhythm", "avoid ambiguous labels"],
};

function parseFoundations(text) {
  const out = { visual: "", scale: "", fonts: {}, weights: "", palette: [], tokens: {}, spacing: "", extra: [] };
  for (const line of text.split("\n").map((l) => l.trim()).filter(Boolean)) {
    let m;
    if ((m = line.match(/^- Visual style:\s*(.*)/))) out.visual = m[1];
    else if ((m = line.match(/^- Typography scale:\s*(.*?)(?:\s*\|\s*Fonts:\s*(.*?))?(?:\s*\|\s*weights=(.*))?$/))) {
      out.scale = m[1];
      for (const kv of (m[2] ?? "").split(/,\s*(?=\w+=)/)) {
        const [k, v] = kv.split("=");
        if (k && v) out.fonts[k.trim()] = v.trim();
      }
      out.weights = (m[3] ?? "").trim();
    } else if ((m = line.match(/^- Color palette:\s*(.*?)(?:\s*\|\s*Tokens:\s*(.*))?$/))) {
      out.palette = m[1].split(",").map((s) => s.trim()).filter(Boolean);
      for (const kv of (m[2] ?? "").split(/,\s*/)) {
        const [k, v] = kv.split("=");
        if (k && v) out.tokens[k.trim()] = v.trim();
      }
    } else if ((m = line.match(/^- Spacing scale:\s*(.*)/))) out.spacing = m[1];
    else out.extra.push(line);
  }
  return out;
}

const bullets = (t) => t.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
const sameList = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

function renderStyle(slug, name, fm, sec, f, meta, extraSections) {
  const rules = { do: bullets(sec["Rules: Do"] ?? ""), dont: bullets(sec["Rules: Don't"] ?? "") };
  const acc = (sec["Accessibility"] ?? "").trim();
  const tone = (sec["Writing Tone"] ?? "").trim();
  const L = [];
  L.push(`# Estilo: ${name} (\`${slug}\`)`, "");
  L.push(`> ${fm.description}`, "");
  L.push(`- **Família:** ${familyOf[slug]}`);
  if (meta.chamar) L.push(`- **Usar em:** ${meta.chamar}`);
  if (meta.evitar) L.push(`- **Evitar em:** ${meta.evitar}`);
  const brand = (sec["Brand"] ?? "").trim();
  if (brand && brand !== fm.description) L.push("", "## Marca", "", brand);
  L.push("", "## Fundamentos", "");
  if (f.visual) L.push(`- **Estilo visual:** ${f.visual}`);
  if (f.scale) L.push(`- **Escala tipográfica:** ${f.scale}`);
  const fonts = Object.entries(f.fonts).map(([k, v]) => `${k}=${v}`).join(" · ");
  if (fonts) L.push(`- **Fontes:** ${fonts}`);
  if (f.weights) L.push(`- **Pesos:** ${f.weights}`);
  if (f.spacing) L.push(`- **Espaçamento:** ${f.spacing}`);
  for (const e of f.extra) L.push(e.startsWith("- ") ? e : `- ${e}`);
  L.push("", "## Tokens de cor", "", "| Token | Valor |", "|---|---|");
  for (const [k, v] of Object.entries(f.tokens)) L.push(`| ${k} | \`${v}\` |`);
  if (f.palette.length) L.push("", `Papéis de cor declarados: ${f.palette.join(", ")}.`);
  L.push("", "## Regras", "");
  L.push("**Fazer**", ...rules.do.map((r) => `- ${r}`), "", "**Evitar**", ...rules.dont.map((r) => `- ${r}`));
  if (acc && acc !== DEFAULTS.accessibility) L.push("", "## Acessibilidade", "", acc);
  if (tone && tone !== DEFAULTS.tone) L.push("", "## Tom de escrita", "", tone);
  for (const [h, body] of extraSections) L.push("", `## ${h}`, "", body.trim());
  L.push("", "---", `Regras gerais, QA e contrato de saída: ver \`../SKILL.md\`. Fonte: ${meta.fonte ?? "—"}.`, "");
  return L.join("\n");
}

const index = {};
const styleDirs = fs.readdirSync(args.bergside).filter((d) => fs.existsSync(path.join(args.bergside, d, "SKILL.md")));
for (const slug of styleDirs) {
  const raw = read(path.join(args.bergside, slug, "SKILL.md"));
  const fm = {
    name: raw.match(/^name:\s*"?(.*?)"?\s*$/m)?.[1],
    description: raw.match(/^description:\s*"?(.*?)"?\s*$/m)?.[1]?.replace(/\\"/g, '"'),
  };
  const managed = raw.split("<!-- TYPEUI_SH_MANAGED_START -->")[1].split("<!-- TYPEUI_SH_MANAGED_END -->")[0];
  const sec = {};
  const extra = [];
  for (const part of managed.split(/\n(?=## )/).slice(1)) {
    const h = part.split("\n")[0].replace(/^##\s*/, "").trim();
    const body = part.split("\n").slice(1).join("\n");
    if (SHARED_SECTIONS.has(h)) continue;
    if (["Brand", "Style Foundations", "Accessibility", "Writing Tone", "Rules: Do", "Rules: Don't"].includes(h)) sec[h] = body;
    else extra.push([h, body]);
  }
  const f = parseFoundations(sec["Style Foundations"] ?? "");
  const meta = catalog[slug] ?? {};
  if (!familyOf[slug]) throw new Error(`sem família: ${slug}`);
  if (!meta.funcao) throw new Error(`sem entrada no catálogo: ${slug}`);
  const name = managed.match(/^# (.*?) Design System Skill/m)?.[1]?.trim() || slug;
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  write(path.join(root, "skills/design-styles/styles", `${slug}.md`), renderStyle(slug, title, fm, sec, f, meta, extra));
  const rules = { do: bullets(sec["Rules: Do"] ?? ""), dont: bullets(sec["Rules: Don't"] ?? "") };
  index[slug] = {
    name: title, family: familyOf[slug], origin: "bergside", invocation: "auto",
    description: fm.description, visual: f.visual, fonts: f.fonts, tokens: f.tokens,
    customRules: !(sameList(rules.do, DEFAULTS.do) && sameList(rules.dont, DEFAULTS.dont)),
    use: meta.chamar, avoid: meta.evitar,
  };
}

// ---------- 4. estilos clássicos (opt-in, texto integral preservado) ----------
const CLASSICS = {
  "industrial-brutalist-ui": "brutalist-skill",
  "minimalist-ui": "minimalist-skill",
  "high-end-visual-design": "soft-skill",
};
for (const [slug, dir] of Object.entries(CLASSICS)) {
  const raw = read(path.join(args.classics, dir, "SKILL.md"));
  const body = raw.replace(/^---[\s\S]*?\n---\n/, "").trim();
  const meta = catalog[slug];
  const head = [
    `# Estilo clássico (opt-in): \`${slug}\``, "",
    `> ${meta.funcao}`, "",
    `- **Família:** ${familyOf[slug]}`, `- **Usar em:** ${meta.chamar}`, `- **Evitar em:** ${meta.evitar}`,
    "- **Invocação:** somente quando o usuário pedir o estilo pelo nome. Texto original abaixo, sem alterações.", "", "---", "", "",
  ].join("\n");
  write(path.join(root, "skills/design-styles/styles", `${slug}.md`), head + body + "\n");
  index[slug] = {
    name: slug, family: familyOf[slug], origin: "taste-skill-classics", invocation: "opt-in",
    description: meta.funcao, use: meta.chamar, avoid: meta.evitar,
  };
}
write(
  path.join(root, "skills/design-styles/styles/index.json"),
  JSON.stringify(Object.fromEntries(Object.entries(index).sort(([a], [b]) => a.localeCompare(b))), null, 2) + "\n",
);

// ---------- 5. registro das 82 skills originais ----------
const MERGE = {
  "design-taste-frontend": { skill: "design-taste-frontend", path: "skills/design-taste-frontend/SKILL.md", mode: "engine" },
  "design-taste-frontend-v1": { skill: "design-engine-legacy", path: "skills/design-engine-legacy/references/v1.md", mode: "legacy-engine" },
  "design-taste-frontend-v2-experimental": { skill: "design-engine-legacy", path: "skills/design-engine-legacy/references/v2-experimental.md", mode: "legacy-engine" },
  "gpt-taste": { skill: "design-engine-legacy", path: "skills/design-engine-legacy/references/gpt-taste.md", mode: "legacy-engine" },
  "stitch-design-taste": { skill: "design-engine-legacy", path: "skills/design-engine-legacy/references/stitch-design-taste.md", mode: "legacy-adapter" },
  "redesign-existing-projects": { skill: "design-taste-frontend", path: "skills/design-taste-frontend/SKILL.md", mode: "alias", aliasOf: "design-taste-frontend" },
  "web-design-guidelines": { skill: "design-qa", path: "skills/design-qa/references/web-design-guidelines.md", mode: "qa-audit" },
  "playwright-cli": { skill: "design-qa", path: "skills/design-qa/references/playwright-cli.md", mode: "qa-browser" },
  "brandkit": { skill: "image-direction", path: "skills/image-direction/references/brandkit.md", mode: "image" },
  "image-to-code": { skill: "image-direction", path: "skills/image-direction/references/image-to-code.md", mode: "image" },
  "imagegen-frontend-mobile": { skill: "image-direction", path: "skills/image-direction/references/imagegen-frontend-mobile.md", mode: "image" },
  "imagegen-frontend-web": { skill: "image-direction", path: "skills/image-direction/references/imagegen-frontend-web.md", mode: "image" },
};
const registry = {};
for (const [slug, c] of Object.entries(catalog)) {
  const target = MERGE[slug] ?? { skill: "design-styles", path: `skills/design-styles/styles/${slug}.md`, mode: "style" };
  registry[slug] = {
    role: c.tipo, stage: c.etapa, invocation: c.invocacao, upstream: c.fonte,
    mergedInto: target.skill, path: target.path, mode: target.mode,
    ...(target.aliasOf ? { aliasOf: target.aliasOf } : {}),
    ...(index[slug] ? { family: index[slug].family } : {}),
  };
}
const total = Object.keys(registry).length;
if (total !== 82) throw new Error(`esperava 82 entradas, achei ${total}`);
write(
  path.join(root, "skills/systemdesignmax/references/dependencies.json"),
  JSON.stringify({ total, note: "Mapa das 82 skills originais para o local onde vivem após o merge.", skills: registry }, null, 2) + "\n",
);
console.log(`ok: ${Object.keys(index).length} estilos, ${total} entradas no registro`);

// ---------- 6. catálogo legível (gerado; não edite à mão) ----------
const esc = (s = "") => String(s).replace(/\|/g, "\|");
const row = (slug) => {
  const c = catalog[slug], r = registry[slug];
  return `| \`${slug}\` | ${esc(c.funcao)} | ${esc(c.chamar)} | ${esc(c.evitar)} | ${r.invocation} | \`${r.path}\` |`;
};
const HEAD = "| Skill original | Função | Chamar | Não chamar | Invocação | Onde vive agora |\n|---|---|---|---|---|---|";
const groups = [
  ["A. Motor de direção e construção", ["design-taste-frontend", "redesign-existing-projects"],
    "Um único motor por projeto. `redesign-existing-projects` é alias aposentado e resolve para `design-taste-frontend`."],
  ["B. Motores legados e adaptadores (opt-in) — skill `design-engine-legacy`", ["design-taste-frontend-v1", "design-taste-frontend-v2-experimental", "gpt-taste", "stitch-design-taste"],
    "Só por pedido nominal. Substituem o motor atual; nunca acumulam."],
  ["C. Estilos clássicos opt-in — skill `design-styles`", ["industrial-brutalist-ui", "minimalist-ui", "high-end-visual-design"], "Só por pedido nominal."],
  ["D. QA — skill `design-qa`", ["web-design-guidelines", "playwright-cli"], "Auditoria estática + browser real."],
  ["E. Imagem — skill `image-direction`", ["brandkit", "image-to-code", "imagegen-frontend-mobile", "imagegen-frontend-web"], "Somente quando a etapa de imagem está no escopo."],
];
const fixed = new Set(groups.flatMap(([, l]) => l));
const L = ["<!-- GERADO por scripts/maintenance/build-registry.mjs a partir de docs/source/catalogo-original.md. Não edite à mão. -->", "",
  "# Catálogo unificado — 82 skills originais → 7 skills do plugin", "",
  "As 82 dependências originais foram reunidas por função. Este catálogo preserva o nome, a função e as condições",
  "de chamada de cada uma e diz onde ela vive agora. Máquina: `dependencies.json`.", "",
  "| Skill do plugin | Absorveu | Papel |", "|---|---|---|",
  "| `systemdesignmax` | — | orquestrador: fluxo, seleção, conflitos, evidências |",
  "| `design-taste-frontend` | 2 (motor + alias) | motor de direção e construção |",
  "| `design-engine-legacy` | 4 | motores/adaptadores legados (opt-in) |",
  "| `design-styles` | 70 | 67 estilos Bergside + 3 clássicos opt-in |",
  "| `image-direction` | 4 | brandkit, web, mobile, image-to-code |",
  "| `design-qa` | 2 | auditoria Vercel + playwright-cli |",
  "| `ui-components` | — (novo) | ponte para shadcn/ui e Spell UI gratuitos |", ""];
for (const [title, list, note] of groups) L.push(`## ${title}`, "", note, "", HEAD, ...list.map(row), "");
const byFamily = {};
for (const [slug, m] of Object.entries(index)) if (!fixed.has(slug)) (byFamily[m.family] ??= []).push(slug);
L.push("## F. Estilos universais — skill `design-styles` (um estilo por superfície, nunca misturar)", "",
  `${Object.values(byFamily).flat().length} estilos Bergside/typeui.sh (inclui as variantes Antigravity \`flat\`, \`material\`, \`skeumorphism\`). Leia só o arquivo do escolhido.`, "");
for (const [fam, list] of Object.entries(byFamily).sort()) L.push(`### ${fam}`, "", HEAD, ...list.sort().map(row), "");
write(path.join(root, "skills/systemdesignmax/references/catalogo.md"), L.join("\n"));
console.log("ok: catalogo.md");

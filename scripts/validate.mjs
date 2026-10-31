#!/usr/bin/env node
// Valida a integridade do plugin. Sem dependências. Sai com 1 se algo falhar.
//   node scripts/validate.mjs
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => path.relative(root, p).replace(/\\/g, "/");
const read = (p) => fs.readFileSync(p, "utf8").replace(/\r/g, "");
const errors = [];
const fail = (m) => errors.push(m);
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) fail(msg); };

// ---------- frontmatter (subconjunto de YAML suficiente para SKILL.md) ----------
function frontmatter(file) {
  const m = read(file).match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const out = {};
  const lines = m[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    if (/^[>|][+-]?$/.test(v)) {
      const buf = [];
      while (i + 1 < lines.length && /^\s+/.test(lines[i + 1])) buf.push(lines[++i].trim());
      v = buf.join(" ");
    } else if (/^".*"$/.test(v)) {
      try { v = JSON.parse(v); } catch { out.__error = `valor com aspas inválido em ${k}`; }
    } else if (/^"/.test(v) || (/: /.test(v) && !/^'/.test(v))) {
      out.__error = `valor sem aspas contém ": " ou aspas abertas em ${k} (o YAML falharia no Claude Code)`;
    }
    out[k] = v;
  }
  return out;
}

// ---------- skills ----------
const skillsDir = path.join(root, "skills");
const skillNames = fs.readdirSync(skillsDir).filter((d) => fs.existsSync(path.join(skillsDir, d, "SKILL.md")));
const expectedSkills = ["setubal-design", "design-taste-frontend", "design-engine-legacy", "design-styles", "image-direction", "design-qa", "ui-components"];
ok(expectedSkills.every((s) => skillNames.includes(s)) && skillNames.length === expectedSkills.length, `skills esperadas ${expectedSkills.join(", ")}; achadas ${skillNames.join(", ")}`);
const seen = new Set();
for (const name of skillNames) {
  const file = path.join(skillsDir, name, "SKILL.md");
  const fm = frontmatter(file);
  ok(fm, `${rel(file)}: sem frontmatter`);
  if (!fm) continue;
  ok(!fm.__error, `${rel(file)}: ${fm.__error}`);
  ok(fm.name === name, `${rel(file)}: name "${fm.name}" difere da pasta "${name}"`);
  ok(typeof fm.description === "string" && fm.description.length > 40, `${rel(file)}: description ausente/curta`);
  ok((fm.description ?? "").length <= 1024, `${rel(file)}: description com ${(fm.description ?? "").length} chars (> 1024)`);
  ok(!seen.has(fm.name), `${rel(file)}: name duplicado`);
  seen.add(fm.name);
  // caminhos citados em crases que apontam para dentro da própria skill
  const text = read(file);
  for (const m of text.matchAll(/`((?:references|styles|scripts|assets|library)\/[^`\s*<>]+?\.[a-z]+)`/g)) {
    ok(fs.existsSync(path.join(skillsDir, name, m[1])), `${rel(file)}: referência quebrada \`${m[1]}\``);
  }
}
const legacy = frontmatter(path.join(skillsDir, "design-engine-legacy/SKILL.md"));
ok(legacy?.["disable-model-invocation"] === "true", "design-engine-legacy deve ter disable-model-invocation: true");

// ---------- registro das 82 ----------
const deps = JSON.parse(read(path.join(skillsDir, "setubal-design/references/dependencies.json")));
const entries = Object.entries(deps.skills);
ok(entries.length === 82 && deps.total === 82, `dependencies.json deve ter 82 entradas (tem ${entries.length})`);
for (const [slug, e] of entries) {
  ok(fs.existsSync(path.join(root, e.path)), `dependencies.json: ${slug} -> caminho inexistente ${e.path}`);
  ok(skillNames.includes(e.mergedInto), `dependencies.json: ${slug} -> skill inexistente ${e.mergedInto}`);
}
ok(deps.skills["redesign-existing-projects"]?.aliasOf === "design-taste-frontend", "alias redesign-existing-projects deve apontar para design-taste-frontend");

// ---------- estilos ----------
const stylesDir = path.join(skillsDir, "design-styles/styles");
const index = JSON.parse(read(path.join(stylesDir, "index.json")));
const slugs = Object.keys(index);
ok(slugs.length === 70, `index.json deve ter 70 estilos (tem ${slugs.length})`);
const files = fs.readdirSync(stylesDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
ok(slugs.every((s) => files.includes(s)) && files.every((s) => slugs.includes(s)), "styles/*.md e index.json divergem");
const stylesSkill = read(path.join(skillsDir, "design-styles/SKILL.md"));
for (const s of slugs) ok(stylesSkill.includes("`" + s + "`"), `design-styles/SKILL.md não menciona o estilo \`${s}\``);
for (const [s, m] of Object.entries(index)) {
  if (m.origin === "bergside") ok(m.tokens && m.tokens.primary && m.tokens.surface && m.tokens.text, `estilo ${s}: tokens essenciais ausentes`);
  const fam = new RegExp("\\|\\s*" + m.family + "\\s*\\|[^\\n]*`" + s + "`").test(stylesSkill);
  ok(fam, `design-styles/SKILL.md: ${s} não está na linha da família ${m.family}`);
}
const optIn = Object.entries(index).filter(([, m]) => m.invocation === "opt-in").map(([s]) => s).sort().join(",");
ok(optIn === "high-end-visual-design,industrial-brutalist-ui,minimalist-ui", `estilos opt-in inesperados: ${optIn}`);

// ---------- conversor de tema: todos os estilos com tokens precisam passar o contraste ----------
const conv = path.join(skillsDir, "ui-components/scripts/style-to-shadcn.mjs");
for (const [s, m] of Object.entries(index)) {
  if (!m.tokens) continue;
  for (const fmt of ["hex", "hsl"]) {
    const r = spawnSync(process.execPath, [conv, s, "--format", fmt, "--json"], { encoding: "utf8" });
    ok(r.status === 0, `style-to-shadcn ${s} (${fmt}) falhou o contraste ou quebrou: ${(r.stderr || r.stdout).slice(0, 160)}`);
  }
}

// ---------- catálogo do Spell UI ----------
const spell = JSON.parse(read(path.join(skillsDir, "ui-components/references/spell-ui-catalog.json")));
ok(spell.count === spell.items.length && spell.count > 0, "spell-ui-catalog.json: contagem inconsistente");
ok(spell.items.every((i) => i.install.startsWith("npx shadcn@latest add @spell/")), "spell-ui-catalog.json: comando de instalação inesperado");

// ---------- manifestos ----------
const plugin = JSON.parse(read(path.join(root, ".claude-plugin/plugin.json")));
const market = JSON.parse(read(path.join(root, ".claude-plugin/marketplace.json")));
const mcp = JSON.parse(read(path.join(root, ".mcp.json")));
ok(plugin.name === "setubal-design" && market.plugins[0].name === plugin.name, "nomes do plugin/marketplace divergem");
ok(plugin.version === market.plugins[0].version, "versão do plugin e do marketplace divergem");
const shadcnMcp = mcp.mcpServers?.shadcn;
ok(shadcnMcp?.command === "node" && shadcnMcp.args?.[0] === "${CLAUDE_PLUGIN_ROOT}/scripts/mcp-shadcn.mjs", ".mcp.json: o shadcn deve iniciar por node ${CLAUDE_PLUGIN_ROOT}/scripts/mcp-shadcn.mjs (npx direto falha no Windows)");
ok(fs.existsSync(path.join(root, "scripts/mcp-shadcn.mjs")), "scripts/mcp-shadcn.mjs ausente");

// ---------- descoberta e hierarquia motor × estilo ----------
const orchestrator = read(path.join(skillsDir, "setubal-design/SKILL.md"));
ok(orchestrator.includes("references/descoberta.md") && fs.existsSync(path.join(skillsDir, "setubal-design/references/descoberta.md")), "a orquestradora deve apontar para references/descoberta.md");
ok(orchestrator.includes("DESIGN-BRIEF.md"), "a orquestradora deve exigir o DESIGN-BRIEF.md");

// ---------- skill mãe: varredura obrigatória e todas as skills chamadas ----------
for (const ref of ["varredura.md", "hig-web.md", "workflow.md", "conflitos.md", "relatorio.md"]) {
  ok(orchestrator.includes(`references/${ref}`) && fs.existsSync(path.join(skillsDir, "setubal-design/references", ref)), `a skill mãe deve apontar para references/${ref}`);
}
ok(orchestrator.includes("VARREDURA.md"), "a skill mãe deve exigir o VARREDURA.md");
for (const s of expectedSkills) ok(orchestrator.includes("`" + s + "`"), `a skill mãe não chama a skill \`${s}\``);
const varredura = read(path.join(skillsDir, "setubal-design/references/varredura.md"));
const catalogIds = [...varredura.split("\n## E.")[0].matchAll(/^\| ([A-Z]\d+) \|/gm)].map((m) => m[1]); // só o catálogo, sem o modelo do arquivo
ok(new Set(catalogIds).size === catalogIds.length && catalogIds.length >= 40, `varredura.md: catálogo com IDs repetidos ou curto (${catalogIds.length})`);
for (const p of ["F", "T", "S", "E", "I", "N", "X", "D"]) ok(catalogIds.some((id) => id.startsWith(p)), `varredura.md: bloco ${p} ausente do catálogo`);
ok(read(path.join(skillsDir, "design-taste-frontend/SKILL.md")).includes("VARREDURA.md"), "o motor deve ler o VARREDURA.md");
ok(!/systemdesignmax/i.test(read(path.join(root, "commands/design.md")) + read(path.join(root, "prompts/system-prompt.md")) + orchestrator), "nome antigo systemdesignmax ainda aparece no comando, no prompt ou na skill mãe");
const allowances = JSON.parse(read(path.join(stylesDir, "allowances.json"))).styles;
const rulesSrc = read(path.join(skillsDir, "design-taste-frontend/scripts/lib/rules.mjs")) + read(path.join(skillsDir, "design-taste-frontend/scripts/lint.mjs"));
for (const [s, rules] of Object.entries(allowances)) {
  ok(slugs.includes(s), `allowances.json: estilo inexistente ${s}`);
  for (const r of rules) ok(rulesSrc.includes(`'${r}'`), `allowances.json: ${s} libera regra desconhecida ${r}`);
}
const drawStyle = spawnSync(process.execPath, [path.join(skillsDir, "design-taste-frontend/scripts/draw.mjs"), "--sector", "saas", "--brief", "validate", "--options", "2", "--style", "glassmorphism"], { encoding: "utf8", env: { ...process.env, TASTE_SKILL_HISTORY: path.join(os.tmpdir(), "sdm-validate-history.json") } });
ok(drawStyle.status === 0, `draw.mjs --style falhou: ${(drawStyle.stderr || "").slice(0, 160)}`);

// ---------- pilha de movimento: versões fixas, iguais às do stage.js, e linkada pela skill ----------
const motionStack = read(path.join(skillsDir, "design-taste-frontend/references/motion-stack.md"));
const stageSrc = read(path.join(skillsDir, "design-taste-frontend/assets/scenes/stage.js"));
ok(!/[\w.-]@(latest|[\^~]|\d+(?!\.\d))/.test(motionStack), "motion-stack.md: pacote sem pin exato (pacote@latest, ^, ~ ou só o major)");
for (const pin of ["gsap@3.15.0", "lenis@1.3.26"]) ok(motionStack.includes(pin) && stageSrc.includes(pin), `motion-stack.md e stage.js devem fixar ${pin}`);
ok(read(path.join(skillsDir, "design-taste-frontend/SKILL.md")).includes("references/motion-stack.md"), "design-taste-frontend/SKILL.md deve listar references/motion-stack.md");

// ---------- agente em sincronia com o prompt ----------
const sync = spawnSync(process.execPath, [path.join(root, "scripts/sync-prompt.mjs"), "--check"], { encoding: "utf8" });
ok(sync.status === 0, "agents/setubal-design.md desatualizado em relação a prompts/system-prompt.md");
ok(fs.existsSync(path.join(root, "commands/design.md")), "commands/design.md ausente");

// ---------- higiene: nada de segredo ----------
const secretRe = /(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{24,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === ".git" || f.name === "node_modules") continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(md|json|mjs|js|css|ya?ml|txt)$/.test(f.name)) ok(!secretRe.test(read(p)), `possível segredo em ${rel(p)}`);
  }
})(root);

if (errors.length) {
  console.error(`FALHOU (${errors.length} problema(s) em ${checks} verificações):`);
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}
console.log(`ok: ${checks} verificações (${skillNames.length} skills, ${slugs.length} estilos, ${entries.length} originais mapeadas)`);

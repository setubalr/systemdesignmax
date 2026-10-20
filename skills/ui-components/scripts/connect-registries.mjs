#!/usr/bin/env node
// Registra os registries gratuitos no components.json do projeto (idempotente).
//
//   node connect-registries.mjs [--cwd <projeto>] [--only @spell] [--write]
//
// Sem --write apenas mostra o que mudaria (dry-run). Nunca sobrescreve um registry já configurado
// com outra URL: avisa e mantém o existente. O registry padrão @shadcn não precisa de entrada.
import fs from "node:fs";
import path from "node:path";

const FREE_REGISTRIES = {
  "@spell": "https://spell.sh/r/{name}.json", // Spell UI — MIT, 33 componentes (xxtomm/spell-ui)
};

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const cwd = path.resolve(opt("cwd", process.cwd()));
const only = opt("only") ? new Set(opt("only").split(",")) : null;
const write = argv.includes("--write");

const file = path.join(cwd, "components.json");
if (!fs.existsSync(file)) {
  console.error(`components.json não encontrado em ${cwd}. Rode primeiro: npx shadcn@latest init`);
  process.exit(1);
}
const raw = fs.readFileSync(file, "utf8");
const cfg = JSON.parse(raw);
cfg.registries ??= {};

const changes = [];
for (const [ns, url] of Object.entries(FREE_REGISTRIES)) {
  if (only && !only.has(ns)) continue;
  const cur = cfg.registries[ns];
  if (cur === undefined) { cfg.registries[ns] = url; changes.push(`+ ${ns} -> ${url}`); }
  else if ((typeof cur === "string" ? cur : cur.url) !== url) console.error(`aviso: ${ns} já aponta para ${typeof cur === "string" ? cur : cur.url}; mantido.`);
  else console.error(`ok: ${ns} já configurado.`);
}
if (!changes.length) { console.error("nada a alterar."); process.exit(0); }
console.log(changes.join("\n"));
if (!write) { console.error("\n(dry-run) rode com --write para gravar."); process.exit(0); }
const indent = raw.match(/^(\s+)"/m)?.[1] ?? "  ";
fs.writeFileSync(file, JSON.stringify(cfg, null, indent) + (raw.endsWith("\n") ? "\n" : ""));
console.error(`components.json atualizado (${changes.length} alteração).`);

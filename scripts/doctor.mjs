#!/usr/bin/env node
// Diagnostica o ambiente para o plugin: Node, npx, navegador para o inspetor e playwright-cli. Sem dependências.
//   node scripts/doctor.mjs           relatório legível
//   node scripts/doctor.mjs --json    relatório em JSON
// Sai com 1 só se faltar o mínimo (Node ≥ 18 e npx).
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const win = process.platform === "win32";
const run = (cmd) => spawnSync(cmd, { shell: true, encoding: "utf8", timeout: 20000, windowsHide: true });
const checks = [];
const add = (level, item, detail, fix) => checks.push({ level, item, detail, fix });

const major = Number(process.versions.node.split(".")[0]);
if (major < 18) add("FAIL", "Node", `v${process.versions.node}`, "Instale Node 22 LTS ou mais novo (nodejs.org).");
else if (major < 22) add("WARN", "Node", `v${process.versions.node}: lint, draw, shadcn e o MCP funcionam; inspect.mjs e scenes.mjs precisam de Node 22+ (WebSocket nativo)`, "Atualize para Node 22 LTS ou mais novo.");
else add("OK", "Node", `v${process.versions.node}`);

const npx = run("npx --version");
if (npx.status === 0) add("OK", "npx", `v${npx.stdout.trim()}${win ? " (MCP do shadcn iniciado via scripts/mcp-shadcn.mjs, compatível com Windows)" : ""}`);
else add("FAIL", "npx", "não encontrado no PATH", "Reinstale o Node.js com o npm incluído e abra um novo terminal.");

try {
  const { findChrome } = await import(new URL("../skills/design-taste-frontend/scripts/lib/cdp.mjs", import.meta.url));
  const chrome = findChrome();
  if (chrome) add("OK", "Navegador (inspetor)", chrome);
  else add("WARN", "Navegador (inspetor)", "Chrome, Edge ou Chromium não encontrado", "Instale um deles ou defina CHROME_PATH com o executável.");
} catch (e) {
  add("WARN", "Navegador (inspetor)", `não foi possível verificar (${e.message})`);
}

const pw = run("playwright-cli --version");
if (pw.status === 0) add("OK", "playwright-cli", pw.stdout.trim().split("\n")[0]);
else add("WARN", "playwright-cli", "não instalado (validação de jornadas do design-qa)", "Veja skills/design-qa/references/playwright-cli.md.");

if (process.argv.includes("--json")) console.log(JSON.stringify({ root, platform: process.platform, checks }, null, 1));
else {
  console.log(`systemdesignmax · doctor  (${process.platform}, ${root})\n`);
  for (const c of checks) {
    console.log(`${c.level.padEnd(4)}  ${c.item}: ${c.detail}`);
    if (c.fix && c.level !== "OK") console.log(`      → ${c.fix}`);
  }
}
process.exit(checks.some((c) => c.level === "FAIL") ? 1 : 0);

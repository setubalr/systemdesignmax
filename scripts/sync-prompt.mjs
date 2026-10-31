#!/usr/bin/env node
// Mantém prompts/system-prompt.md como fonte única e gera agents/setubal-design.md a partir dele.
//   node scripts/sync-prompt.mjs          grava o agente
//   node scripts/sync-prompt.mjs --check  sai com 1 se o agente estiver desatualizado (usado pelo validate)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const prompt = fs.readFileSync(path.join(root, "prompts/system-prompt.md"), "utf8").replace(/\r/g, "");
const body = prompt.split("\n").slice(1).join("\n").replace(/^\n+/, ""); // sem o título H1

const agent = `---
name: setubal-design
description: "Agente Setúbal Design: a partir da skill mãe setubal-design, puxa todas as skills do plugin (motor, estilos, componentes shadcn/Spell UI, imagem e QA), diagnostica o site, varre todas as estratégias de UI premium e entrega com evidências. Use para redesenhar ou melhorar a UI/UX de um projeto, dar acabamento premium a um site ou escolher um estilo visual."
---

<!-- GERADO por scripts/sync-prompt.mjs a partir de prompts/system-prompt.md. Não edite aqui. -->
${body}`;

const target = path.join(root, "agents/setubal-design.md");
if (process.argv.includes("--check")) {
  const cur = fs.existsSync(target) ? fs.readFileSync(target, "utf8").replace(/\r/g, "") : "";
  if (cur !== agent) { console.error("agents/setubal-design.md está desatualizado: rode node scripts/sync-prompt.mjs"); process.exit(1); }
  console.log("ok: agente em sincronia com o prompt");
} else {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, agent);
  console.log("agents/setubal-design.md gerado");
}

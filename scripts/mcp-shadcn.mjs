#!/usr/bin/env node
// Inicia o servidor MCP oficial do shadcn (`npx -y shadcn@latest mcp`) de forma portátil.
// No Windows, `npx` é `npx.cmd` e falha com ENOENT quando o cliente MCP o chama sem shell; este lançador
// resolve isso e repassa stdio, sinais e código de saída. Usado por .mcp.json.
import { spawn } from "node:child_process";

const win = process.platform === "win32";
// .cmd precisa de shell no Windows (Node ≥ 18.20/20.12 recusa .cmd sem shell); com shell, o comando vai como uma
// string fixa, sem argumentos externos concatenados.
const child = win
  ? spawn("npx -y shadcn@latest mcp", { stdio: "inherit", shell: true, windowsHide: true })
  : spawn("npx", ["-y", "shadcn@latest", "mcp"], { stdio: "inherit" });

child.on("error", (err) => {
  console.error(`setubal-design: não foi possível iniciar o MCP do shadcn (${err.code || err.message}). Confira se Node e npx estão no PATH: node scripts/doctor.mjs`);
  process.exit(1);
});
child.on("exit", (code, signal) => process.exit(signal ? 1 : code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));

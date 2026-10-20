#!/usr/bin/env node
// Gera skills/ui-components/references/spell-ui-catalog.json a partir de registry.json do repositório
// xxtomm/spell-ui (MIT). Uso: node scripts/maintenance/build-spell-catalog.mjs <caminho/para/spell-ui/registry.json>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const src = process.argv[2];
if (!src) { console.error("uso: build-spell-catalog.mjs <registry.json>"); process.exit(2); }
const reg = JSON.parse(fs.readFileSync(src, "utf8"));

// Curadoria deste plugin: onde cada item faz sentido e o que custa.
const SURFACE = {
  marketing: "blur-reveal special-text shimmer-text highlighted-text slide-up-text text-marquee words-stagger randomized-text gradient-wave-text signature perspective-book tilt-card light-rays animated-gradient marquee logos-carousel tweet spotify-card exploding-input",
  both: "badge kbd spinner bars-spinner copy-button label-input color-selector animated-checkbox fallback-avatar rich-button flow-button pop-button qr-code",
  app: "chart",
};
const surfaceOf = {};
for (const [s, list] of Object.entries(SURFACE)) for (const n of list.split(" ")) surfaceOf[n] = s;
const HEAVY = new Set(["light-rays", "animated-gradient", "signature"]);        // WebGL / three / parsing de fonte
const EXTERNAL = new Set(["tweet", "spotify-card"]);                            // fazem requisições a terceiros
const MOTION = (i) => (i.dependencies ?? []).some((d) => d === "motion") || ["flow-button", "pop-button", "tilt-card", "exploding-input", "gradient-wave-text", "light-rays", "animated-gradient", "text-marquee"].includes(i.name);

const items = reg.items.map((i) => {
  if (!surfaceOf[i.name]) throw new Error(`item sem classificação de superfície: ${i.name}`);
  return {
    name: i.name, title: i.title, category: i.category, description: i.description,
    install: `npx shadcn@latest add @spell/${i.name}`,
    dependencies: i.dependencies ?? [], registryDependencies: i.registryDependencies ?? [],
    surface: surfaceOf[i.name],
    weight: HEAVY.has(i.name) ? "heavy" : (i.dependencies ?? []).length ? "medium" : "light",
    animated: MOTION(i),
    externalRequests: EXTERNAL.has(i.name),
  };
});
const out = {
  registry: "@spell", url: "https://spell.sh/r/{name}.json", license: "MIT",
  licenseSource: "https://github.com/xxtomm/spell-ui/blob/main/LICENSE",
  pricing: "Todos os itens do registry.json público são registry:component sob MIT; nenhum marcado como pro/pago.",
  checkedAt: new Date().toISOString().slice(0, 10), count: items.length, items,
};
fs.writeFileSync(path.join(root, "skills/ui-components/references/spell-ui-catalog.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`ok: ${items.length} itens`);

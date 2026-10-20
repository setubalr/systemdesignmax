#!/usr/bin/env node
// Converte os tokens de um estilo de design-styles em variáveis CSS do tema shadcn/ui.
//
//   node style-to-shadcn.mjs <slug> [--cwd <projeto>] [--format auto|hex|hsl] [--radius 0.5rem] [--json]
//
// - `--format auto` lê components.json: `tailwind.config` preenchido => Tailwind v3 (canais HSL "H S% L%");
//   vazio => Tailwind v4 (valor hex direto).
// - Não escreve em arquivo algum: imprime o bloco para você revisar e colar no CSS global.
// - Sai com código 1 se algum par essencial falhar o contraste WCAG AA (texto 4.5:1, componente 3:1).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(here, "../../design-styles/styles/index.json");

// ---------- cor ----------
const hexToRgb = (h) => {
  let s = h.replace("#", "");
  if (s.length === 3) s = [...s].map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
};
const rgbToHex = (r) => "#" + r.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");
const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const luminance = (hex) => { const [r, g, b] = hexToRgb(hex).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mix = (a, b, t) => rgbToHex(hexToRgb(a).map((v, i) => v * (1 - t) + hexToRgb(b)[i] * t));
const isHex = (v) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v ?? "");
const bestOn = (bg) => (contrast(bg, "#FFFFFF") >= contrast(bg, "#111111") ? "#FFFFFF" : "#111111");
// Ajusta `bg` (clareando/escurecendo em passos de 4%) até que o melhor par de primeiro plano atinja `min`.
const ensureOn = (bg, min = 4.5) => {
  let cur = bg;
  for (let i = 0; i < 25 && contrast(cur, bestOn(cur)) < min; i++) {
    cur = mix(cur, bestOn(cur) === "#FFFFFF" ? "#000000" : "#FFFFFF", 0.04);
  }
  return cur;
};
const toHsl = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

// ---------- entrada ----------
const [slug, ...rest] = process.argv.slice(2);
const opt = (name, dflt) => { const i = rest.indexOf(`--${name}`); return i >= 0 ? rest[i + 1] : dflt; };
if (!slug || slug.startsWith("--")) { console.error("uso: style-to-shadcn.mjs <slug> [--cwd dir] [--format auto|hex|hsl] [--radius 0.5rem] [--json]"); process.exit(2); }
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const style = index[slug];
if (!style) { console.error(`estilo desconhecido: ${slug}. Veja ${path.relative(process.cwd(), indexPath)}`); process.exit(2); }
if (!style.tokens) { console.error(`${slug} é um estilo clássico (opt-in) sem tokens estruturados; derive os tokens do texto do estilo manualmente.`); process.exit(2); }

const cwd = path.resolve(opt("cwd", process.cwd()));
let format = opt("format", "auto");
let v3 = false;
if (format === "auto") {
  try {
    const cj = JSON.parse(fs.readFileSync(path.join(cwd, "components.json"), "utf8"));
    v3 = Boolean(cj.tailwind?.config);
  } catch { /* sem components.json: assume v4 */ }
  format = v3 ? "hsl" : "hex";
}

const RADIUS_BY_FAMILY = {
  "brutalist-bold": "0rem", "retro-game": "0.25rem", "corporate-data": "0.375rem", "minimal-clean": "0.5rem",
  "editorial-warm": "0.375rem", "premium-dark": "0.75rem", "tech-futurist": "0.375rem",
  "narrative-conversion": "0.5rem", "playful-friendly": "1rem",
};
const radius = opt("radius", RADIUS_BY_FAMILY[style.family] ?? "0.5rem");

// ---------- mapeamento ----------
const warnings = [];
const t = style.tokens;
for (const k of ["primary", "surface", "text"]) if (!isHex(t[k])) warnings.push(`token ${k} ausente ou não-hex em ${slug}; usando padrão`);
const surface = isHex(t.surface) ? t.surface : "#FFFFFF";
let text = isHex(t.text) ? t.text : "#111827";
if (contrast(text, surface) < 4.5) {
  const fixed = bestOn(surface);
  warnings.push(`token text (${text}) reprova contraste sobre surface (${surface}) = ${contrast(text, surface).toFixed(2)}:1; substituído por ${fixed}. (Tokens upstream inconsistentes.)`);
  text = fixed;
}
const fill = (name, hex) => {
  const adj = ensureOn(hex);
  if (adj.toLowerCase() !== hex.toLowerCase()) warnings.push(`${name} ${hex} ajustado para ${adj} para sustentar texto sobre ele com contraste ≥ 4.5:1.`);
  return adj;
};
const primary = fill("primary", isHex(t.primary) ? t.primary : text);
const brand2 = fill("secondary", isHex(t.secondary) ? t.secondary : mix(primary, surface, 0.5));
const danger = fill("danger", isHex(t.danger) ? t.danger : "#DC2626");
const success = fill("success", isHex(t.success) ? t.success : "#16A34A");
const warning = fill("warning", isHex(t.warning) ? t.warning : "#D97706");
const darkSurface = luminance(surface) < 0.18;

// neutros derivados: shadcn usa --secondary/--muted/--accent como superfícies sutis, não como cor de marca
const muted = mix(surface, text, darkSurface ? 0.1 : 0.05);
const accent = mix(surface, text, darkSurface ? 0.16 : 0.09);
const border = mix(surface, text, darkSurface ? 0.22 : 0.15);
const mutedFg = mix(text, surface, 0.38);

const vars = {
  background: surface, foreground: text,
  card: surface, "card-foreground": text, popover: surface, "popover-foreground": text,
  primary, "primary-foreground": bestOn(primary),
  secondary: muted, "secondary-foreground": text,
  muted, "muted-foreground": mutedFg,
  accent, "accent-foreground": text,
  destructive: danger, "destructive-foreground": bestOn(danger),
  border, input: border, ring: primary,
  "chart-1": primary, "chart-2": brand2, "chart-3": success, "chart-4": warning, "chart-5": danger,
  "brand-secondary": brand2, "brand-secondary-foreground": bestOn(brand2),
  success, "success-foreground": bestOn(success),
  warning, "warning-foreground": bestOn(warning),
};

// ---------- contraste ----------
const checks = [
  ["foreground / background", vars.foreground, vars.background, 4.5, true],
  ["primary-foreground / primary", vars["primary-foreground"], vars.primary, 4.5, true],
  ["muted-foreground / background", vars["muted-foreground"], vars.background, 4.5, false],
  ["destructive-foreground / destructive", vars["destructive-foreground"], vars.destructive, 4.5, true],
  ["primary / background (componente)", vars.primary, vars.background, 3, false],
  ["border / background (componente)", vars.border, vars.background, 1.3, false],
].map(([label, a, b, min, essential]) => ({ label, ratio: +contrast(a, b).toFixed(2), min, essential, ok: contrast(a, b) >= min }));
const failed = checks.filter((c) => !c.ok);

// ---------- fontes ----------
const KNOWN_FREE = new Set(["Inter", "Geist", "Geist Mono", "JetBrains Mono", "Fira Code", "Roboto", "Roboto Mono", "Poppins", "Montserrat", "DM Sans", "Space Grotesk", "Space Mono", "Playfair Display", "Lora", "IBM Plex Sans", "IBM Plex Mono", "Manrope", "Nunito", "Work Sans", "Outfit", "Sora", "Fraunces", "VT323", "Press Start 2P", "Caveat", "Patrick Hand", "Source Serif 4", "Merriweather", "Bricolage Grotesque", "Instrument Serif", "Archivo", "Rubik", "Plus Jakarta Sans", "Libre Baskerville", "Cormorant Garamond", "Courier Prime", "Silkscreen"]);
const fonts = style.fonts ?? {};
const unknownFonts = Object.values(fonts).filter((f) => !KNOWN_FREE.has(f));
if (unknownFonts.length) warnings.push(`fontes a verificar (licença/disponibilidade): ${[...new Set(unknownFonts)].join(", ")} — tenha fallback gratuito (ex.: Inter / Geist) se não houver licença.`);

// ---------- saída ----------
if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ slug, format, radius, vars, fonts, checks, warnings }, null, 2));
  process.exit(failed.some((c) => c.essential) ? 1 : 0);
}
const val = (hex) => (format === "hsl" ? toHsl(hex) : hex);
const decl = (k) => `  --${k}: ${val(vars[k])};`;
const core = Object.keys(vars).filter((k) => !/^(brand-secondary|success|warning)/.test(k));
const extra = Object.keys(vars).filter((k) => /^(brand-secondary|success|warning)/.test(k));
const out = [];
out.push(`/* style-to-shadcn: estilo "${slug}" (${style.family}) — formato ${format === "hsl" ? "Tailwind v3 (canais HSL)" : "Tailwind v4 (hex)"} */`);
out.push(`/* Revise antes de colar. Gerado a partir de tokens; não substitui a decisão de direção do motor. */`);
out.push(`${darkSurface ? ":root, .dark" : ":root"} {`);
out.push(...core.map(decl), ...extra.map(decl), `  --radius: ${radius};`);
const sans = fonts.primary, mono = fonts.mono, display = fonts.display;
if (sans) out.push(`  --font-sans: "${sans}", ui-sans-serif, system-ui, sans-serif;`);
if (display && display !== sans) out.push(`  --font-display: "${display}", ui-sans-serif, system-ui, sans-serif;`);
if (mono) out.push(`  --font-mono: "${mono}", ui-monospace, SFMono-Regular, monospace;`);
out.push("}");
if (!darkSurface) {
  out.push("", "/* Dark mode derivado (o estilo só define tema claro). Valide contraste e a identidade antes de usar. */", ".dark {");
  const dBg = mix("#0B0B0C", surface, 0.04), dFg = mix("#FAFAFA", surface, 0.06);
  const sat = (() => { const [r, g, b] = hexToRgb(primary); return (Math.max(r, g, b) - Math.min(r, g, b)) / 255; })();
  let dPrimary = primary;
  if (sat < 0.12) dPrimary = dFg;                       // marca neutra: inverte (preto no claro => quase branco no escuro)
  else for (let i = 0; i < 25 && contrast(dPrimary, dBg) < 4.5; i++) dPrimary = mix(dPrimary, "#FFFFFF", 0.06);
  const dMuted = mix(dBg, dFg, 0.1), dBorder = mix(dBg, dFg, 0.18);
  const dark = {
    background: dBg, foreground: dFg, card: mix(dBg, dFg, 0.04), "card-foreground": dFg, popover: mix(dBg, dFg, 0.04), "popover-foreground": dFg,
    primary: dPrimary, "primary-foreground": bestOn(dPrimary), secondary: dMuted, "secondary-foreground": dFg,
    muted: dMuted, "muted-foreground": mix(dFg, dBg, 0.4), accent: mix(dBg, dFg, 0.16), "accent-foreground": dFg,
    border: dBorder, input: dBorder, ring: dPrimary,
  };
  out.push(...Object.entries(dark).map(([k, v]) => `  --${k}: ${val(v)};`), "}");
  const dChecks = [["dark foreground / background", dFg, dBg, 4.5], ["dark primary-foreground / primary", bestOn(dPrimary), dPrimary, 4.5]];
  for (const [label, a, b, min] of dChecks) checks.push({ label, ratio: +contrast(a, b).toFixed(2), min, essential: true, ok: contrast(a, b) >= min });
}
if (format === "hex") {
  out.push("", "/* Tailwind v4: exponha os tokens extras ao utilitário (bg-brand-secondary, text-success…) */", "@theme inline {");
  for (const k of extra) out.push(`  --color-${k}: var(--${k});`);
  out.push("}");
} else {
  out.push("", "/* Tailwind v3: registre os tokens extras em tailwind.config.ts > theme.extend.colors, ex.:", ...extra.filter((k) => !k.endsWith("foreground")).map((k) => `   ${JSON.stringify(k)}: { DEFAULT: "hsl(var(--${k}))", foreground: "hsl(var(--${k}-foreground))" },`), "*/");
}
console.log(out.join("\n"));
console.error("\n— contraste (WCAG) —");
for (const c of checks) console.error(`${c.ok ? "ok  " : c.essential ? "FALHA" : "aviso"} ${String(c.ratio).padEnd(5)} (mín ${c.min})  ${c.label}`);
for (const w of warnings) console.error(`aviso: ${w}`);
if (failed.some((c) => c.essential)) {
  console.error("\nPar essencial reprovado: ajuste o token (ex.: escurecer o texto/primary) ou escolha outro estilo; não publique assim.");
  process.exit(1);
}

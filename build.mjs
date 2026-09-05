// Generates one small public page per week carrying schema.org/Recipe JSON-LD,
// which is what Bring!'s importer fetches and parses. Their required fields are
// author, title and ingredients; image and quantities are recommended.
import fs from "fs";
import path from "path";
import { buyCount, BUY } from "./shop-units.mjs";

const D = JSON.parse(fs.readFileSync("plan-data-family.json", "utf8"));
const HH = 2.9;                        // J + V at 1.5 + toddler at 0.4
const OUT = "bring-pages";
fs.mkdirSync(OUT, { recursive: true });

// liquids read better in litres on a shopping list
const LIQUID = new Set(["trim_milk", "coconut_milk_lite", "passata"]);
const fmt = (g, key) => {
  if (key === "egg") { const n = Math.ceil(g / 50); return n + (n === 1 ? " egg" : " eggs"); }
  const unit = LIQUID.has(key) ? ["L", "ml"] : ["kg", "g"];
  return g >= 1000
    ? (g / 1000).toFixed(1).replace(/\.0$/, "") + " " + unit[0]
    : (g >= 100 ? Math.round(g / 10) * 10 : Math.round(g / 5) * 5) + " " + unit[1];
};

// cooking qualifiers are useless in a trolley
const SHOP_NAME = {
  egg: "Eggs", egg_white: "Egg whites", greek_yog: "Greek yoghurt, 0%",
  basmati_dry: "Basmati rice", jasmine_dry: "Jasmine rice", pasta_dry: "Pasta",
  soba_dry: "Soba noodles", couscous_dry: "Couscous", quinoa_dry: "Quinoa",
  rice_noodle_dry: "Rice noodles", oats: "Rolled oats",
};
const shopName = (x) => SHOP_NAME[x.key] ||
  x.name.replace(/, raw$/, "").replace(/, dry weight$/, "").replace(/, drained$/, "");

// Bring parses quantity-first strings, so lead with the amount.
function itemsFor(week) {
  const wk = D.shopping[week - 1], agg = {};
  wk.family.forEach(x => { agg[x.key] = agg[x.key] || { ...x, g: 0 }; agg[x.key].g += x.g * HH; });
  wk.solo.forEach(x => { agg[x.key] = agg[x.key] || { ...x, g: 0 }; agg[x.key].g += x.g; });
  const all = Object.values(agg);
  const order = ["Meat, fish & deli", "Dairy, eggs & chilled", "Fruit & vegetables", "Freezer", "Pantry"];
  const buy = all.filter(x => !x.staple)
    .sort((a, b) => order.indexOf(a.cat) - order.indexOf(b.cat) || b.g - a.g);
  const staples = all.filter(x => x.staple).sort((a, b) => b.g - a.g);
  return { buy, staples };
}

const cap = (t) => String(t).charAt(0).toUpperCase() + String(t).slice(1);
// the row already names the product, so a self-naming unit shows only a count
function visAmount(x) {
  const b = BUY[x.key];
  if (!b) return fmt(x.g, x.key);
  const n = Math.max(1, Math.ceil(x.g / b.per - 0.15));
  if (b.generic || b.spell) return n + " " + (n === 1 ? b.one : b.many);
  return "× " + n;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function page(week) {
  const { buy, staples } = itemsFor(week);
  const ingredients = buy.map(x => buyCount(x.key, x.g, shopName(x)) || (fmt(x.g, x.key) + " " + shopName(x)));
  const ld = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: "Week " + week + " shopping list",
    author: { "@type": "Person", name: "Household" },
    description: "Weekly grocery list. Quantities cover three people.",
    recipeYield: "1 week",
    recipeCategory: "Grocery list",
    recipeIngredient: ingredients,
    recipeInstructions: [{ "@type": "HowToStep", text: "Shop the list. Quantities already cover the whole household." }],
  };

  const group = {};
  buy.forEach(x => (group[x.cat] = group[x.cat] || []).push(x));

  return `<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Week ${week} shopping list</title>
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
<style>
  :root { color-scheme: light; }
  body { margin:0; background:#f2f6ea; color:#24312a; font:15px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif; }
  .wrap { max-width: 720px; margin: 0 auto; padding: 28px 20px 60px; }
  h1 { font-size: 26px; margin: 0 0 4px; }
  p.sub { margin: 0 0 20px; color: #5c6d61; font-size: 14px; }
  h2 { font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: #446e3a;
       background:#e6f1da; display:inline-block; padding:5px 12px; border-radius:999px; margin: 24px 0 10px; }
  ul { list-style:none; margin:0; padding:0; }
  li { display:flex; gap:10px; padding:6px 0; border-bottom:1px solid #e4ecda; }
  li b { font-weight:600; font-variant-numeric: tabular-nums; min-width: 76px; }
  nav { margin: 22px 0 0; display:flex; gap:8px; flex-wrap:wrap; }
  nav a { text-decoration:none; border:1px solid #d2dec4; background:#fff; color:#5c6d61;
          border-radius:999px; padding:7px 15px; font-size:13.5px; }
  nav a[aria-current] { background:#446e3a; border-color:#446e3a; color:#fff; }
  .staples { color:#636f64; }
  footer { margin-top:34px; color:#636f64; font-size:12.5px; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Week ${week} shopping list</h1>
  <p class="sub">${buy.length} items. Tap the button to send the list to Bring!.</p>

  <script async src="//platform.getbring.com/widgets/import.js"></script>
  <div data-bring-import data-bring-language="en"></div>

  <nav>${[1,2,3,4].map(w => `<a href="week${w}.html"${w===week?' aria-current="page"':''}>Week ${w}</a>`).join("")}</nav>

${Object.keys(group).map(cat => `  <h2>${esc(cat)}</h2>
  <ul>
${group[cat].map(x => `    <li><b>${esc(visAmount(x))}</b> <span>${esc(cap(shopName(x)))}</span></li>`).join("\n")}
  </ul>`).join("\n\n")}

  <h2>Pantry, check before you go</h2>
  <ul class="staples">
${staples.map(x => `    <li><b>${esc(visAmount(x))}</b> <span>${esc(cap(shopName(x)))}</span></li>`).join("\n")}
  </ul>

  <footer>Pantry amounts are what the week uses, not what to buy. Quantities cover three people and are already scaled.</footer>
</div>
</body>
</html>`;
}

[1, 2, 3, 4].forEach(w => {
  fs.writeFileSync(path.join(OUT, `week${w}.html`), page(w));
});
fs.writeFileSync(path.join(OUT, "index.html"),
  `<!doctype html><html lang="en-NZ"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Shopping lists</title>
<style>body{margin:0;background:#f2f6ea;color:#24312a;font:15px system-ui,sans-serif}
.w{max-width:720px;margin:0 auto;padding:40px 20px}a{display:block;padding:14px 18px;margin:10px 0;
background:#fff;border:1px solid #e4ecda;border-radius:14px;text-decoration:none;color:#24312a}</style>
</head><body><div class="w"><h1>Shopping lists</h1>
${[1,2,3,4].map(w => `<a href="week${w}.html">Week ${w}</a>`).join("\n")}
</div></body></html>`);

const sizes = fs.readdirSync(OUT).map(f => f + " " + (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + "KB");
console.log("wrote " + OUT + "/: " + sizes.join(", "));
const { buy } = itemsFor(1);
console.log("\nweek 1 has " + buy.length + " buy items. First five as Bring will read them:");
buy.slice(0, 5).forEach(x => console.log("  " + fmt(x.g) + " " + x.name));

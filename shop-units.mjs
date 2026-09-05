// How things are actually bought, versus how the plan weighs them.
// Typical NZ supermarket sizes. `per` is grams of the EDIBLE weight the plan uses,
// so a banana is its peeled weight, not the weight with the skin on.
// `generic: true` means the unit is a container ("punnet", "tin"), so the product
// name has to follow it. Without it the unit names the product: "5 potatoes".
export const BUY = {
  // fruit, bought by the piece
  banana:       { per: 118, one: "banana",   many: "bananas" },
  apple:        { per: 150, one: "apple",    many: "apples" },
  orange:       { per: 130, one: "orange",   many: "oranges" },
  peach:        { per: 150, one: "peach",    many: "peaches" },
  pear:         { per: 170, one: "pear",     many: "pears" },
  avocado:      { per: 140, one: "avocado",  many: "avocados" },
  lemon_juice:  { per: 45,  one: "lemon",    many: "lemons" },

  // vegetables, bought by the piece
  cucumber:     { per: 400, one: "telegraph cucumber", many: "telegraph cucumbers" },
  capsicum:     { per: 160, one: "capsicum", many: "capsicums" },
  onion:        { per: 150, one: "onion",    many: "onions" },
  red_onion:    { per: 130, one: "red onion",many: "red onions" },
  carrot:       { per: 85,  one: "carrot",   many: "carrots" },
  courgette:    { per: 200, one: "courgette",many: "courgettes" },
  kumara:       { per: 250, one: "kumara",   many: "kumara" },
  potato:       { per: 170, one: "potato",   many: "potatoes" },
  tomato:       { per: 120, one: "tomato",   many: "tomatoes" },
  lettuce:      { per: 400, one: "cos lettuce", many: "cos lettuces" },
  chilli:       { per: 15,  one: "chilli",   many: "chillies" },

  // bunches, bulbs, punnets and bags: the unit is the container
  spring_onion: { per: 100, generic: true, one: "bunch",  many: "bunches" },
  herbs:        { per: 30,  generic: true, one: "packet", many: "packets" },
  garlic:       { per: 40,  generic: true, one: "bulb",   many: "bulbs" },
  ginger:       { per: 50,  generic: true, one: "knob",   many: "knobs" },
  celery:       { per: 500, generic: true, one: "bunch",  many: "bunches" },
  spinach:      { per: 120, generic: true, one: "bag",    many: "bags" },
  rocket:       { per: 100, generic: true, one: "bag",    many: "bags" },
  cherry_tom:   { per: 250, generic: true, one: "punnet", many: "punnets" },
  mushroom:     { per: 250, generic: true, one: "punnet", many: "punnets" },
  bean_sprouts: { per: 200, generic: true, one: "bag",    many: "bags" },
  bok_choy:     { per: 200, generic: true, one: "head",   many: "heads" },
  cabbage:      { per: 300, generic: true, one: "bag",    many: "bags" },
  strawberries: { per: 250, generic: true, one: "punnet", many: "punnets" },
  blueberries:  { per: 125, generic: true, one: "punnet", many: "punnets" },
  raspberries:  { per: 125, generic: true, one: "punnet", many: "punnets" },

  // freezer bags
  berries:      { per: 500, generic: true, one: "bag", many: "bags" },
  peas:         { per: 500, generic: true, one: "bag", many: "bags" },
  corn:         { per: 500, generic: true, one: "bag", many: "bags" },
  edamame:      { per: 500, generic: true, one: "bag", many: "bags" },
  broccoli:     { per: 500, generic: true, one: "bag", many: "bags" },
  green_beans:  { per: 500, generic: true, one: "bag", many: "bags" },
  snow_peas:    { per: 500, generic: true, one: "bag", many: "bags" },
  mango:        { per: 500, generic: true, one: "bag", many: "bags" },

  // packaged goods that name themselves
  egg:           { per: 50, one: "egg",              many: "eggs" },
  vogels:        { per: 40, spell: true, one: "slice", many: "slices" },
  wrap_wm:       { per: 60, one: "wholemeal wrap",   many: "wholemeal wraps" },
  wrap_lc:       { per: 45, one: "lower-carb wrap",  many: "lower-carb wraps" },
  pita:          { per: 60, one: "wholemeal pita",   many: "wholemeal pitas" },
  tortilla_corn: { per: 30, one: "corn tortilla",    many: "corn tortillas" },
  rice_cake:     { per: 9,  one: "rice cake",        many: "rice cakes" },
  corn_thins:    { per: 6,  one: "corn thin",        many: "corn thins" },

  // tins
  tuna_can:          { per: 95,  generic: true, one: "tin", many: "tins" },
  chickpeas:         { per: 240, generic: true, one: "tin", many: "tins" },
  kidney_beans:      { per: 240, generic: true, one: "tin", many: "tins" },
  cannellini:        { per: 240, generic: true, one: "tin", many: "tins" },
  lentils:           { per: 240, generic: true, one: "tin", many: "tins" },
  canned_tom:        { per: 400, generic: true, one: "tin", many: "tins" },
  coconut_milk_lite: { per: 400, generic: true, one: "tin", many: "tins" },
};

// names as you would look for them on a shelf, not as a nutrition table writes them.
// lower case where the name follows a container word ("3 punnets cherry tomatoes").
export const SHOP_NAME = {
  egg: "Eggs", banana: "Bananas", apple: "Apples", orange: "Oranges",
  greek_yog: "Greek yoghurt, 0%", chicken_breast: "Chicken breast",
  beef_mince: "Beef mince, premium lean", beef_rump: "Rump steak",
  lamb_leg: "Lamb leg steak", white_fish: "Tarakihi or snapper",
  hoki: "Hoki fillets", salmon: "Salmon fillets", prawns: "Prawns",
  garlic: "garlic", ginger: "fresh ginger", kumara: "Kumara",
  basmati_dry: "Basmati rice", jasmine_dry: "Jasmine rice", pasta_dry: "Pasta",
  soba_dry: "Soba noodles", couscous_dry: "Couscous", quinoa_dry: "Quinoa",
  rice_noodle_dry: "Rice noodles", oats: "Rolled oats",
  herbs: "parsley or coriander", cabbage: "coleslaw mix",
  lemon_juice: "Lemons or limes", spinach: "baby spinach",
  cherry_tom: "cherry tomatoes", mushroom: "button mushrooms",
  spring_onion: "spring onions", celery: "celery",
  tuna_can: "tuna in springwater", canned_tom: "chopped tomatoes",
  kidney_beans: "kidney beans", chickpeas: "chickpeas",
  cannellini: "cannellini beans", lentils: "brown lentils",
  coconut_milk_lite: "lite coconut milk",
  broccoli: "frozen broccoli florets", green_beans: "frozen green beans",
  snow_peas: "frozen snow peas", berries: "frozen mixed berries",
  mango: "frozen mango", peas: "frozen peas", corn: "frozen sweetcorn",
  edamame: "frozen edamame",
};

export const LIQUID = new Set(["trim_milk", "coconut_milk_lite", "passata"]);

export const shopName = (key, fallback) =>
  SHOP_NAME[key] || String(fallback)
    .replace(/, raw$/, "").replace(/, dry weight$/, "").replace(/, drained$/, "")
    .replace(/, peeled$/, "").replace(/, crushed$/, "").replace(/, grated$/, "")
    .replace(/, whole$/, "");

// "3 punnets cherry tomatoes", "5 potatoes", or null when it is genuinely bought by weight
export function buyCount(key, grams, name) {
  const b = BUY[key];
  if (!b) return null;
  const n = Math.max(1, Math.ceil(grams / b.per - 0.15));   // never leave her short
  const unit = n === 1 ? b.one : b.many;
  return (b.generic || b.spell) && name ? n + " " + unit + " " + String(name) : n + " " + unit;
}

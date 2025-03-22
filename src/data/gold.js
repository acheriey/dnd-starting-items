const flavorTextOptions = [
    "tucked in a stained cloth pouch.",
    "stuffed into an old sock.",
    "hidden in a boot you forgot you owned.",
    "rattling around in a cracked leather pouch.",
    "stashed inside an empty ration tin.",
    "loose in your pocket, clinking with every step.",
    "kept in a pouch marked 'Definitely Not Cursed'.",
    "smelling faintly of fish.",
    "rolled up in a napkin from a tavern called 'The Tipsy Troll'.",
    "mixed with sand and a couple dead bugs.",
    "coated in sticky candy residue.",
    "sealed in a tiny jar labeled 'Emergency Fun'.",
    "wrapped in a handkerchief with embroidered ducks.",
    "in a pouch that squeaks when opened.",
    "found inside a sock labeled 'Plan B'.",
    "partially melted together—fireball incident?",
    "jammed in a carved wooden frog.",
    "alongside a note that just says 'RUN'.",
    "tangled in twine and questionable lint.",
    "with one coin stamped with your face… poorly.",
    "sitting beside a gold-painted rock.",
    "buried beneath a crushed granola bar.",
    "kept in a pouch that smells like wet dog.",
    "stored with a single marble and a dead beetle.",
    "next to a tiny love letter sealed with a kiss.",
    "still warm. That’s unsettling.",
    "rattling ominously despite being silent.",
    "in a bag embroidered with your ex’s name (oops).",
    "coated in a thin layer of glitter. You’re not sure why.",
    "cursed? maybe. valuable? absolutely."
  ];
  
  const rareCoinVariants = [
    "a copper coin that whispers your name at night.",
    "a silver piece with a skull where the king's face should be.",
    "a gold coin that always lands on its edge.",
    "a coin made of obsidian, cold to the touch.",
    "a platinum piece with a glowing rune carved on one side.",
    "a two-headed coin that feels... wrong.",
    "a gold coin bitten clean through, still warm.",
    "an ancient coin stamped with a long-forgotten god.",
    "a cursed coin that vanishes whenever you're broke.",
    "a bronze token stamped 'Free Drink – The Abyss'."
  ];
  
  const trinketsAndGems = [
    "a small uncut ruby (worth 25 gp).",
    "a polished moonstone (worth 50 gp).",
    "a black pearl shard (worth 100 gp).",
    "a tiny emerald earring (worth 75 gp).",
    "a chunk of amber with a preserved bug (worth 20 gp).",
    "a crystal shard pulsing faintly with energy (worth 60 gp).",
    "a carved opal figurine (worth 40 gp).",
    "a gem-inlaid ring (worth 35 gp).",
    "a miniature idol of gold and bone (worth 120 gp).",
    "a pouch of powdered diamond dust (worth 75 gp)."
  ];
  
  function getRandomGold() {
    const gp = Math.floor(Math.random() * 15);
    const pp = Math.random() < 0.1 ? 1 : 0;
    const sp = gp === 0 ? Math.floor(Math.random() * 10) : 0;
    const cp = gp === 0 ? Math.floor(Math.random() * 10) : 0;
  
    const coinParts = [];
    if (gp > 0) coinParts.push(`${gp} gold`);
    if (pp > 0) coinParts.push(`${pp} platinum`);
    if (sp > 0) coinParts.push(`${sp} silver`);
    if (cp > 0) coinParts.push(`${cp} copper`);
    
  
    const baseGold = coinParts.join(", ");
    const flavor = flavorTextOptions[Math.floor(Math.random() * flavorTextOptions.length)];
  
    const hasRareCoin = Math.random() < 0.15;
    const rareCoin = hasRareCoin
      ? ` You also find ${rareCoinVariants[Math.floor(Math.random() * rareCoinVariants.length)]}`
      : "";
  
    const hasTrinket = Math.random() < 0.1;
    const trinket = hasTrinket
      ? ` Bonus loot: ${trinketsAndGems[Math.floor(Math.random() * trinketsAndGems.length)]}`
      : "";
  
    if (!baseGold && !hasRareCoin && !hasTrinket) {
      return "No gold. Just pocket lint and broken dreams.";
    }
  
    return `${baseGold ? baseGold + ", " : ""}${flavor}${rareCoin}${trinket}`;
  }
  
  export default getRandomGold;
  
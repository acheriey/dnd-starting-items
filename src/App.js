import React, { useState } from "react";
import "./App.css";

const backpackItems = [
  "Smutty romance novel",
  "Aroma oils labeled 'Goblin Musk'",
  "Broken necklace from your ex",
  "Enchanted mug that always smells like cocoa",
  "Tiny stuffed owlbear",
  "Crumpled love letter",
  "Potion of questionable origin",
  "Wooden spoon engraved with 'Champion of Soup'",
];

const goldRanges = ["3 cp", "15 sp", "1d6 gp", "2 gp, 5 sp", "7 gp", "a single platinum piece", "no gold, just lint"];

function App() {
  const [items, setItems] = useState([]);
  const [gold, setGold] = useState("");

  const rollItems = () => {
    const shuffled = [...backpackItems].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const randomGold = goldRanges[Math.floor(Math.random() * goldRanges.length)];

    setItems(selected);
    setGold(randomGold);
  };

  return (
    <div className="container">
      <h1>What does my D&D character have?</h1>

      {items.length === 0 ? (
        <>
          <p>Generate random starting items for your D&D PC.</p>
          <button onClick={rollItems}>Roll</button>
        </>
      ) : (
        <>
          <h2><em>Your backpack has…</em></h2>
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2><em>Your coin purse has…</em></h2>
          <ul>
            <li>{gold}</li>
          </ul>

          <button onClick={rollItems}>Roll Again</button>
        </>
      )}
    </div>
  );
}

export default App;

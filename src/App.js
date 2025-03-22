import React, { useState } from "react";
import "./App.css";
import backpackItems from "./data/items";
import getRandomGold from "./data/gold"; // ✅ THIS must be correct

function App() {
  const [items, setItems] = useState([]);
  const [gold, setGold] = useState("");

  const rollItems = () => {
    const shuffled = [...backpackItems].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const randomGold = getRandomGold();

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
            {items.map((item, i) => <li key={i}>{item}</li>)}
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

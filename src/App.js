import React, { useState } from "react";
import "./App.css";
import backpackItems from "./data/items";
import getRandomGold from "./data/gold"; 

function App() {
  const [items, setItems] = useState([]);
  const [gold, setGold] = useState("");
  const [isRolling, setIsRolling] = useState(false);


  setIsRolling(true);
  setItems([]);

selected.forEach((item, index) => {
  setTimeout(() => {
    setItems(prev => [...prev, item]);
  }, index * 300); // 300ms delay per item
});

  setGold("");
  
  setTimeout(() => {
    const shuffled = [...backpackItems].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const randomGold = getRandomGold();
  
    setItems(selected);
    setGold(randomGold);
    setIsRolling(false);
  }, 600); // delay for effect
  

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

          <button
           onClick={rollItems}
            className={isRolling ? "rolling" : ""}
          >
            {isRolling ? "Rolling..." : "Roll"}
          </button>

        </>
      )}
    </div>
  );
}

export default App;

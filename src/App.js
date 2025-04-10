import React, { useState } from "react";
import "./App.css";
import backpackItems from "./data/items";
import getRandomGold from "./data/gold";
import loadingFlavorText from "./data/loadingText";

function App() {
  const [items, setItems] = useState([]);
  const [gold, setGold] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const rollItems = () => {
    const flavor = loadingFlavorText[Math.floor(Math.random() * loadingFlavorText.length)];
    setLoadingText(flavor);
    setIsRolling(true);
    setIsLoading(true);
    setItems([]);
    setGold("");

    setTimeout(() => {
      const shuffled = [...backpackItems].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      const randomGold = getRandomGold();

      selected.forEach((item, index) => {
        setTimeout(() => {
          setItems(prev => [...prev, item]);
        }, index * 300);
      });

      setGold(randomGold);
      setIsRolling(false);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="container">
      {!isLoading && items.length === 0 && <h1>What does my D&D character have?</h1>}
      {isLoading ? (
        <div className="loading-screen">
          <p className="flavor-text">{loadingText}</p>
          <img src="/loading-image.png" alt="Loading backpack" className="backpack-img" />
        </div>
      ) : items.length === 0 ? (
        <>
          <p>Generate random starting items for your D&D PC.</p>
          <button onClick={rollItems} className={isRolling ? "rolling" : ""}>
            {isRolling ? "Rolling..." : "Look inside your backpack"}
          </button>
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

          <button onClick={rollItems} className={isRolling ? "rolling" : ""}>
            {isRolling ? "Rolling..." : "Find a different backpack"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;

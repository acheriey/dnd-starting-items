import React, { useState } from "react";
import "./App.css";
import backpackItems from "./data/items";
import getRandomGold from "./data/gold";
import loadingFlavorText from "./data/loadingText";

function App() {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [gold, setGold] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [chaosMode, setChaosMode] = useState(false);

  const rollItems = async () => {
    const flavor = loadingFlavorText[Math.floor(Math.random() * loadingFlavorText.length)];
    setLoadingText(flavor);
    setIsRolling(true);
    setIsLoading(true);
    setItems([]);
    setDisplayedItems([]);
    setGold("");

    setTimeout(async () => {
      let selected;
      if (chaosMode) {
        selected = await fetchChaosItems();
      } else {
        const shuffled = [...backpackItems].sort(() => 0.5 - Math.random());
        selected = shuffled.slice(0, 3);
      }

      setItems(selected);

      const randomGold = getRandomGold();

      selected.forEach((item, index) => {
        setTimeout(() => {
          setDisplayedItems(prev => [...prev, item]);
        }, index * 300);
      });

      
      setTimeout(() => {
        setGold(randomGold);
        setIsRolling(false);
        setIsLoading(false);
      }, (selected.length + 1) * 300);
    }, 2500);
  };

  const fetchChaosItems = async () => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a creative D&D item generator. Only generate humorous or quirky backpack contents for a character."
            },
            {
              role: "user",
              content: "Come up with three random items that an adventurer finds in their backpack. Let it be a mix of non magical and magical items, none with obvious combat utility. It should be quirky, weird, random, cute, humorous, or just plain useless. Keep it short like with no item name."
            }
          ],
        }),
      });

      const data = await response.json();
      const raw = data.choices[0].message.content;
      const generatedItems = raw.split("\n").filter(Boolean);
      return generatedItems.map(item => item.trim());


          } catch (err) {
      console.error("Failed to fetch chaos items:", err);
      return [
        "???",
        "A sock full of teeth (yours?)",
        "Something that purrs... but only at night"
      ];
    }
  };

  return (
    <div className="container">
      {!isLoading && items.length === 0 && (<h1>What does my D&D character have?</h1>)}

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

          <div className="toggle-container">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={chaosMode}
                onChange={() => setChaosMode(!chaosMode)}
              />
              <div className="slider"></div>
              <span className="toggle-text">Enable Chaos Mode</span>
            </label>
            <div className="toggle-caption">Use AI to generate possibly wilder items</div>
          </div>
        </>
      ) : (
        <>
          <h2><em>Your backpack has...</em></h2>
          <ul>
            {displayedItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2><em>And your money situation is...</em></h2>
          <ul>
            <li>{gold}</li>
          </ul>

          <button onClick={rollItems} className={isRolling ? "rolling" : ""}>
            {isRolling ? "Rolling..." : "Find a different backpack"}
          </button>

          <div className="toggle-container">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={chaosMode}
                onChange={() => setChaosMode(!chaosMode)}
              />
              <div className="slider"></div>
              <span className="toggle-text">Enable Chaos Mode</span>
            </label>
            <div className="toggle-caption">Use AI to generate possibly wilder items</div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

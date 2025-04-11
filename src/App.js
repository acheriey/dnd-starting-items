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
              "role": "system",
              "content": "You are a creative assistant that specializes in quirky, immersive fantasy RPG item creation. Always return a single flavorful item as a sentence, suitable for a humorous or moody fantasy setting."
            },
            {
              role: "user",
              content: `Generate 3 whimsical, flavorful item that could appear in a Dungeons & Dragons-style adventurer's backpack. It should be written as a single sentence, like a quirky inventory entry. Choose from one of these categories and match the tone accordingly:

 Magical but Mundane – Slightly enchanted items with minor, amusing or peculiar magical effects. Nothing powerful or combat-related. Think passive or aesthetic utility.
 Sentimental & Personal – Objects filled with emotional value, nostalgia, or mysterious past attachments. Often bittersweet, poetic, or deeply personal.
 Weird, Funny, or Gross – Outlandish, absurd, or mildly disturbing objects with humorous or uncanny flair.
 Cursed or Suspicious – Odd or eerie objects that seem dangerous, unsettling, or mildly cursed. Evoke mystery or danger without being outright evil.
 Survival & Utility – Practical adventuring gear with a twist: handmade, oddly specific, or creatively designed for niche uses.

Examples:
- A spoon that makes any food taste faintly of honey.
- Childhood stuffed bear with one eye.
- Rock that looks exactly like a butt.
- Potion labeled 'Definitely Not Poison' (it's empty).
- Bone whistle that repels rats.

**Do not number the items.**  
Just list three immersive item descriptions as standalone sentences. No intro text, no explanation—just the items.
`
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

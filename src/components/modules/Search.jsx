import React, { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";

import styles from "./Search.module.css"

import loading from "../../lottie/loading.json";
import Lottie from "react-lottie-player";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    searchCoin([]);
    setCoins([]);
    if (!text) return;

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) setCoins(json.coins);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    };

    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={styles.currency}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      <div className={!!coins.length || text ? styles.searchResult : {}}>
        
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              <img src={coin.thumb} alt={coin.name} />
              <p>{coin.name}</p>
            </li>
          ))}
        </ul>
        {!coins.length && !!text && (<Lottie
            animationData={loading}
            play
            loop
            style={{ width: "100px", margin: "100px auto"}}
          />)}
      </div>
    </div>
  );
}

export default Search;

import React from "react";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import styles from "./TableCoin.module.css";
import { marketChart } from "../../services/cryptoApi";

function TableCoin({ coins, currency, setChart }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h</th>
            <th>Totao Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              coin={coin}
              currency={currency}
              setChart={setChart}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableCoin;

const TableRow = ({
  coin,
  setChart,
  currency,
}) => {
  const {
    id,
    symbol,
    name,
    image,
    current_price,
    price_change_percentage_24h,
    total_volume,
    market_cap_rank,
  } = coin;
  const chartHandler = async () => {
    try {
      const res = await fetch(marketChart(id, currency));
      const json = await res.json();
      setChart({...json, coin});
    } catch (error) {}
  };

  return (
    <tr>
      <td>{market_cap_rank}</td>
      <td>
        <div className={styles.symbol} onClick={chartHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{" "}
        {current_price.toLocaleString()}
      </td>
      <td
        className={
          price_change_percentage_24h >= 0 ? styles.success : styles.error
        }
      >
        {price_change_percentage_24h.toFixed(2)}
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt={price_change_percentage_24h}
          onClick={chartHandler}
        />
      </td>
    </tr>
  );
};

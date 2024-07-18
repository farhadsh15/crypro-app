import React, { useState } from "react";
import styles from "./Chart.module.css";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

function Chart({ chart, setChart, currency }) {
  const [type, setType] = useState("prices");

  const typeHandler = event => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_")
      setType(type)
    }
  }

  return (
    <div className={styles.conainer}>
      <span onClick={() => setChart(null)} className={styles.cross}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt="icon" />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>Prices</button>
          <button className={type === "market_caps" ? styles.selected : null}>Market Caps</button>
          <button className={type === "total_volumes" ? styles.selected : null}>Total Volumes</button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>
              {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{" "}
              {chart.coin.current_price.toLocaleString()}
            </span>
          </div>
          <div>
            <p>ATH:</p>
            <span>
              {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{" "}
              {chart.coin.ath.toLocaleString()}
            </span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>
              {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{" "}
              {chart.coin.market_cap.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />  
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

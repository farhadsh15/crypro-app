import React, { useEffect, useState } from "react";

import { getCoinList } from "../../services/cryptoApi";

import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart"

import loading from "../../lottie/loading.json";
import Lottie from "react-lottie-player";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("usd")
  const [chart, setChart] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setCoins([])
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
        window.scroll(0, 0)
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [page, currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      {coins.length > 1 ? (
        <TableCoin coins={coins} currency={currency} setChart={setChart} />
      ) : (
        <Lottie
        animationData={loading}
        play
        loop
        style={{ width: "200px", margin: "200px auto" }}
        />
      )}
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} currency={currency} />}
    </div>
  );
}

export default HomePage;
